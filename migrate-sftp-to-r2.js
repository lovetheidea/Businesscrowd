#!/usr/bin/env node

/**
 * migrate-sftp-to-r2.js
 *
 * Recursively reads all files from a remote SFTP path and uploads each
 * directly to Cloudflare R2, preserving the folder structure.
 *
 * Usage:  node migrate-sftp-to-r2.js
 *
 * Required .env variables:
 *   SFTP_HOST, SFTP_USER, SFTP_PASS, SFTP_PORT (default 22)
 *   SFTP_PATH   — remote path to walk (e.g. /applications/xxx/public_html/wp-content/uploads)
 *   R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 */

require('dotenv').config();

const path    = require('path');
const fs      = require('fs');
const SftpClient = require('ssh2-sftp-client');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

// ── Config ────────────────────────────────────────────────────────────────────

const ACCOUNT_ID  = 'aced351fe613dbbefb0b867922691f28';
const BUCKET      = 'businesscrowd';
const R2_ENDPOINT = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;
const CONCURRENCY = 5;

const {
  SFTP_HOST, SFTP_USER, SFTP_PASS,
  SFTP_PORT = '22',
  SFTP_PATH,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
} = process.env;

for (const [k, v] of Object.entries({ SFTP_HOST, SFTP_USER, SFTP_PASS, SFTP_PATH, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY })) {
  if (!v) { console.error(`ERROR: ${k} is not set in .env`); process.exit(1); }
}

// ── S3 / R2 client ────────────────────────────────────────────────────────────

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function mimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.gif': 'image/gif',  '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webm': 'video/webm',
    '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg',
    '.js': 'application/javascript', '.css': 'text/css',
    '.html': 'text/html', '.xml': 'application/xml', '.json': 'application/json',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  return map[ext] || 'application/octet-stream';
}

/** Derive R2 key from the remote path, relative to the SFTP_PATH root */
function remotePathToKey(remotePath) {
  const rel = remotePath.startsWith(SFTP_PATH)
    ? remotePath.slice(SFTP_PATH.length)
    : remotePath;
  return `wp-content/uploads${rel}`.replace(/\/\//g, '/');
}

async function uploadToR2(key, buffer, contentType) {
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buffer, ContentType: contentType }));
}

async function alreadyExists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch (e) {
    if (e.name === 'NotFound' || e.$metadata?.httpStatusCode === 404) return false;
    throw e;
  }
}

/** Run tasks with limited concurrency */
async function pLimit(tasks, concurrency) {
  const running = [];
  const results = [];
  for (const task of tasks) {
    const p = task().then(r => { running.splice(running.indexOf(p), 1); return r; });
    running.push(p);
    results.push(p);
    if (running.length >= concurrency) await Promise.race(running);
  }
  return Promise.allSettled(results);
}

// ── Recursively list all files via SFTP ───────────────────────────────────────

async function listAllFiles(sftp, dir, collected = []) {
  const entries = await sftp.list(dir);
  for (const entry of entries) {
    const fullPath = `${dir}/${entry.name}`;
    if (entry.type === 'd') {
      await listAllFiles(sftp, fullPath, collected);
    } else if (entry.type === '-') {
      collected.push(fullPath);
    }
  }
  return collected;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const sftp = new SftpClient();

  console.log(`\nConnecting to ${SFTP_HOST} …`);
  await sftp.connect({
    host: SFTP_HOST,
    port: parseInt(SFTP_PORT, 10),
    username: SFTP_USER,
    password: SFTP_PASS,
  });
  console.log('Connected.\n');

  console.log(`Walking ${SFTP_PATH} …`);
  const files = await listAllFiles(sftp, SFTP_PATH);
  console.log(`Found ${files.length} files\n`);

  let successCount = 0, skipCount = 0, errorCount = 0;
  const errors = [];

  const tasks = files.map(remotePath => async () => {
    const key = remotePathToKey(remotePath);
    try {
      if (await alreadyExists(key)) {
        console.log(`  SKIP  ${key}`);
        skipCount++;
        return;
      }
      const buffer = await sftp.get(remotePath);
      await uploadToR2(key, buffer, mimeType(remotePath));
      console.log(`  ✓  ${key}  (${(buffer.length / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`  ✗  ${key}  — ${err.message}`);
      errors.push({ remotePath, key, error: err.message });
      errorCount++;
    }
  });

  await pLimit(tasks, CONCURRENCY);
  await sftp.end();

  console.log('\n' + '═'.repeat(60));
  console.log('MIGRATION COMPLETE');
  console.log('═'.repeat(60));
  console.log(`  Uploaded successfully : ${successCount}`);
  console.log(`  Skipped (existed)     : ${skipCount}`);
  console.log(`  Errors                : ${errorCount}`);
  console.log(`  Total files           : ${files.length}`);

  if (errors.length) {
    const errLog = path.join(process.cwd(), 'migrate-sftp-errors.json');
    fs.writeFileSync(errLog, JSON.stringify(errors, null, 2));
    console.log(`\n  Error details → ${errLog}`);
  }

  console.log('═'.repeat(60) + '\n');
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
