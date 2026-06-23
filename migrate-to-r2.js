#!/usr/bin/env node

/**
 * migrate-to-r2.js
 *
 * Parses a WordPress XML export, extracts all attachment URLs and post content,
 * then uploads each asset to Cloudflare R2 preserving the original path structure.
 *
 * Usage:
 *   node migrate-to-r2.js <path-to-wordpress-export.xml>
 *
 * Required .env variables:
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 */

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { XMLParser } = require('fast-xml-parser');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

// ── Config ────────────────────────────────────────────────────────────────────

const ACCOUNT_ID   = 'aced351fe613dbbefb0b867922691f28';
const BUCKET       = 'businesscrowd';
const R2_ENDPOINT  = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;
const CONCURRENCY  = 5; // parallel uploads

const R2_ACCESS_KEY_ID     = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error('ERROR: R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be set in .env');
  process.exit(1);
}

const xmlFile = process.argv[2];
if (!xmlFile) {
  console.error('Usage: node migrate-to-r2.js <path-to-wordpress-export.xml>');
  process.exit(1);
}

// ── S3 client (R2-compatible) ─────────────────────────────────────────────────

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Download a URL and return a Buffer */
function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const request = client.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

/** Derive an R2 key from a source URL, rooted under the bucket prefix */
function urlToKey(url) {
  try {
    const { hostname, pathname } = new URL(url);
    // e.g. academy.lovetheidea.co.uk/wp-content/uploads/2024/01/image.png
    //   →  academy.lovetheidea.co.uk/wp-content/uploads/2024/01/image.png
    return path.posix.join(hostname, pathname).replace(/^\//, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\?.*$/, '');
  }
}

/** Guess MIME type from file extension */
function mimeType(key) {
  const ext = path.extname(key).toLowerCase();
  const map = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.gif': 'image/gif',  '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webm': 'video/webm',
    '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg',
    '.js':  'application/javascript', '.css': 'text/css',
    '.html': 'text/html', '.xml': 'application/xml',
    '.json': 'application/json', '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  return map[ext] || 'application/octet-stream';
}

/** Upload a Buffer to R2 */
async function uploadToR2(key, buffer, contentType) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
}

/** Run promises with limited concurrency */
async function pLimit(tasks, concurrency) {
  const results = [];
  const running = [];
  for (const task of tasks) {
    const p = task().then((r) => { running.splice(running.indexOf(p), 1); return r; });
    running.push(p);
    results.push(p);
    if (running.length >= concurrency) await Promise.race(running);
  }
  return Promise.allSettled(results);
}

// ── Parse WordPress XML ───────────────────────────────────────────────────────

function parseWordPressXML(xmlPath) {
  console.log(`\nParsing ${xmlPath} …`);
  const raw = fs.readFileSync(xmlPath, 'utf8');

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    cdataPropName: '__cdata',
    textNodeName: '#text',
    parseTagValue: false,
    isArray: (name) => ['item', 'wp:author', 'wp:category', 'wp:tag', 'wp:postmeta', 'category'].includes(name),
  });

  const doc = parser.parse(raw);
  const channel = doc?.rss?.channel;
  if (!channel) throw new Error('Could not find <channel> in XML');

  const items = Array.isArray(channel.item) ? channel.item : [];
  console.log(`Found ${items.length} items in export\n`);
  return { channel, items };
}

/** Extract all unique media URLs from the parsed items */
function collectMediaURLs(items) {
  const urls = new Set();

  const addIfURL = (val) => {
    if (typeof val === 'string' && /^https?:\/\//i.test(val.trim())) {
      urls.add(val.trim());
    }
  };

  for (const item of items) {
    const postType = item['wp:post_type']?.__cdata || item['wp:post_type'] || '';

    // Attachment URLs
    if (postType === 'attachment') {
      const guid = item.guid?.__cdata || item.guid?.['#text'] || item.guid;
      addIfURL(guid);

      const attachURL = item['wp:attachment_url']?.__cdata || item['wp:attachment_url'];
      addIfURL(attachURL);
    }

    // Post meta — may contain _wp_attached_file, thumbnail URLs, etc.
    const metas = Array.isArray(item['wp:postmeta']) ? item['wp:postmeta'] : [];
    for (const meta of metas) {
      const key = meta['wp:meta_key']?.__cdata || meta['wp:meta_key'] || '';
      const val = meta['wp:meta_value']?.__cdata || meta['wp:meta_value'] || '';
      if (typeof val === 'string' && /^https?:\/\//i.test(val.trim())) addIfURL(val.trim());
      // serialized PHP strings often embed URLs — quick regex extraction
      if (typeof val === 'string') {
        const embedded = val.match(/https?:\/\/[^\s"'\\]+/g) || [];
        embedded.forEach(addIfURL);
      }
    }

    // Inline content — grab <img src>, background-image urls, hrefs to files
    const content = item['content:encoded']?.__cdata || '';
    if (content) {
      const srcMatches = content.match(/(?:src|href)=["']([^"']+)["']/gi) || [];
      for (const m of srcMatches) {
        const url = m.replace(/^(?:src|href)=["']/i, '').replace(/["']$/, '');
        addIfURL(url);
      }
      const bgMatches = content.match(/url\(['"]?([^'")]+)['"]?\)/gi) || [];
      for (const m of bgMatches) {
        const url = m.replace(/^url\(['"]?/i, '').replace(/['"]?\)$/, '');
        addIfURL(url);
      }
    }
  }

  return [...urls];
}

// ── Also upload the XML itself ────────────────────────────────────────────────

async function uploadXMLExport(xmlPath) {
  const key = `exports/${path.basename(xmlPath)}`;
  console.log(`Uploading XML export → ${key}`);
  const buffer = fs.readFileSync(xmlPath);
  await uploadToR2(key, buffer, 'application/xml');
  console.log(`  ✓ Uploaded XML export`);
  return key;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const { items } = parseWordPressXML(xmlFile);

  // 1. Upload the XML export itself
  await uploadXMLExport(xmlFile);

  // 2. Collect all media URLs
  const allURLs = collectMediaURLs(items);
  console.log(`\nFound ${allURLs.length} unique media URLs to migrate\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  const errors = [];

  // 3. Download + upload each URL with concurrency limit
  const tasks = allURLs.map((url) => async () => {
    const key = urlToKey(url);
    try {
      // Check if already uploaded (idempotent re-runs)
      try {
        await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
        console.log(`  SKIP  ${key}  (already exists)`);
        skipCount++;
        return;
      } catch (headErr) {
        if (headErr.name !== 'NotFound' && headErr.$metadata?.httpStatusCode !== 404) throw headErr;
      }

      const buffer = await fetchBuffer(url);
      const mime   = mimeType(key);
      await uploadToR2(key, buffer, mime);
      console.log(`  ✓  ${key}  (${(buffer.length / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`  ✗  ${key}  — ${err.message}`);
      errors.push({ url, key, error: err.message });
      errorCount++;
    }
  });

  await pLimit(tasks, CONCURRENCY);

  // 4. Summary
  console.log('\n' + '═'.repeat(60));
  console.log('MIGRATION COMPLETE');
  console.log('═'.repeat(60));
  console.log(`  Uploaded successfully : ${successCount}`);
  console.log(`  Skipped (existed)     : ${skipCount}`);
  console.log(`  Errors                : ${errorCount}`);
  console.log(`  Total URLs processed  : ${allURLs.length}`);

  if (errors.length > 0) {
    const errLog = path.join(process.cwd(), 'migrate-errors.json');
    fs.writeFileSync(errLog, JSON.stringify(errors, null, 2));
    console.log(`\n  Error details written to: ${errLog}`);
  }

  console.log('═'.repeat(60) + '\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
