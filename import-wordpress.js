#!/usr/bin/env node
/**
 * import-wordpress.js
 *
 * Parses a WordPress XML export and generates Jekyll markdown files.
 * - Published posts  → _posts/YYYY-MM-DD-slug.md
 * - Published pages  → _pages/slug.md
 * - Converts WP HTML content to Markdown via turndown
 *
 * Usage: node import-wordpress.js <path-to-export.xml>
 */

const fs   = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

// Optional: install turndown for HTML→MD conversion
let TurndownService;
try { TurndownService = require('turndown'); } catch (_) {}

const xmlFile = process.argv[2];
if (!xmlFile) { console.error('Usage: node import-wordpress.js <export.xml>'); process.exit(1); }

const td = TurndownService ? new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' }) : null;

function htmlToMarkdown(html) {
  if (!html) return '';
  if (td) return td.turndown(html);
  // Fallback: strip tags
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .trim();
}

function slugify(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function cdata(val) {
  if (!val) return '';
  if (typeof val === 'object') return val.__cdata || val['#text'] || '';
  return String(val);
}

function frontmatter(obj) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      lines.push(`${k}:`);
      v.forEach(i => lines.push(`  - "${String(i).replace(/"/g, '\\"')}"`));
    } else {
      lines.push(`${k}: "${String(v).replace(/"/g, '\\"')}"`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

// Parse
const raw  = fs.readFileSync(xmlFile, 'utf8');
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  textNodeName: '#text',
  parseTagValue: false,
  isArray: (name) => ['item','category','wp:postmeta'].includes(name),
});
const doc     = parser.parse(raw);
const channel = doc?.rss?.channel;
if (!channel) { console.error('Could not find <channel>'); process.exit(1); }

const ns = {
  wpPostType:   'wp:post_type',
  wpStatus:     'wp:status',
  wpPostDate:   'wp:post_date',
  wpPostName:   'wp:post_name',
  wpPostId:     'wp:post_id',
  wpAuthor:     'dc:creator',
  contentEncoded: 'content:encoded',
  excerptEncoded: 'excerpt:encoded',
};

const items = Array.isArray(channel.item) ? channel.item : [];

let postCount = 0, pageCount = 0;

fs.mkdirSync('_posts', { recursive: true });
fs.mkdirSync('_pages', { recursive: true });

for (const item of items) {
  const postType = cdata(item[ns.wpPostType]).trim();
  const status   = cdata(item[ns.wpStatus]).trim();

  if (!['post', 'page'].includes(postType)) continue;
  if (status !== 'publish') continue;

  const title      = cdata(item.title) || 'Untitled';
  const postDate   = cdata(item[ns.wpPostDate]) || '';
  const slug       = cdata(item[ns.wpPostName]) || slugify(title);
  const content    = cdata(item[ns.contentEncoded]);
  const excerpt    = cdata(item[ns.excerptEncoded]);
  const author     = cdata(item[ns.wpAuthor]);
  const guid       = cdata(item.guid) || '';

  // Categories and tags
  const catEls = Array.isArray(item.category) ? item.category : [];
  const cats   = catEls.filter(c => c['@_domain'] === 'category').map(c => cdata(c));
  const tags   = catEls.filter(c => c['@_domain'] === 'post_tag').map(c => cdata(c));

  const dateStr = postDate ? postDate.slice(0, 10) : new Date().toISOString().slice(0, 10);
  const body    = htmlToMarkdown(content);

  if (postType === 'post') {
    const fm = frontmatter({
      layout: 'post',
      title,
      date: dateStr,
      author,
      categories: cats,
      tags,
      excerpt: excerpt ? htmlToMarkdown(excerpt).slice(0, 200) : '',
      original_url: guid,
    });
    const filename = `_posts/${dateStr}-${slug}.md`;
    fs.writeFileSync(filename, `${fm}\n\n${body}`);
    console.log(`  POST  ${filename}`);
    postCount++;
  } else {
    const fm = frontmatter({
      layout: 'page',
      title,
      permalink: `/${slug}/`,
      date: dateStr,
      original_url: guid,
    });
    const filename = `_pages/${slug}.md`;
    fs.writeFileSync(filename, `${fm}\n\n${body}`);
    console.log(`  PAGE  ${filename}`);
    pageCount++;
  }
}

console.log(`\nDone — ${postCount} posts, ${pageCount} pages written.`);
if (!TurndownService) {
  console.log('Tip: run "npm install turndown" for better HTML→Markdown conversion.');
}
