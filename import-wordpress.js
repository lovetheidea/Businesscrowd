#!/usr/bin/env node
/**
 * import-wordpress.js
 *
 * Parses WordPress XML exports and generates Jekyll markdown files.
 * - Published posts    → _posts/YYYY-MM-DD-slug.md
 * - Published pages    → _pages/slug.md
 * - Lessons            → _lessons/slug.md  (all statuses — draft lessons still useful)
 * - Published courses  → _courses/slug.md
 * - Published events   → _events/slug.md   (tp_event post type)
 *
 * Usage: node import-wordpress.js <export.xml> [export2.xml] [export3.xml] ...
 */

const fs   = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

let TurndownService;
try { TurndownService = require('turndown'); } catch (_) {}

const xmlFiles = process.argv.slice(2);
if (!xmlFiles.length) { console.error('Usage: node import-wordpress.js <export.xml> ...'); process.exit(1); }

const td = TurndownService ? new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' }) : null;

function htmlToMarkdown(html) {
  if (!html) return '';
  if (td) return td.turndown(html);
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

function getMeta(item, key) {
  const metas = Array.isArray(item['wp:postmeta']) ? item['wp:postmeta'] : [];
  const found = metas.find(m => cdata(m['wp:meta_key']) === key);
  return found ? cdata(found['wp:meta_value']) : '';
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
      const safe = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      lines.push(`${k}: "${safe}"`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

const counts = { post: 0, page: 0, lesson: 0, courses: 0, tp_event: 0 };

fs.mkdirSync('_posts',   { recursive: true });
fs.mkdirSync('_pages',   { recursive: true });
fs.mkdirSync('_lessons', { recursive: true });
fs.mkdirSync('_courses', { recursive: true });
fs.mkdirSync('_events',  { recursive: true });

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  textNodeName: '#text',
  parseTagValue: false,
  isArray: (name) => ['item', 'category', 'wp:postmeta'].includes(name),
});

for (const xmlFile of xmlFiles) {
  console.log(`\nProcessing ${path.basename(xmlFile)}…`);
  const raw     = fs.readFileSync(xmlFile, 'utf8');
  const doc     = parser.parse(raw);
  const channel = doc?.rss?.channel;
  if (!channel) { console.error(`  Could not find <channel> in ${xmlFile}`); continue; }

  const items = Array.isArray(channel.item) ? channel.item : [];

  for (const item of items) {
    const postType = cdata(item['wp:post_type']).trim();
    const status   = cdata(item['wp:status']).trim();

    if (postType === 'attachment') continue;

    const title   = cdata(item.title) || 'Untitled';
    const rawDate = cdata(item['wp:post_date']) || '';
    const slug    = cdata(item['wp:post_name']) || slugify(title);
    const content = cdata(item['content:encoded']);
    const excerpt = cdata(item['excerpt:encoded']);
    const author  = cdata(item['dc:creator']);
    const guid    = cdata(item.guid) || '';
    const dateStr = rawDate ? rawDate.slice(0, 10) : '2024-01-01';
    const body    = htmlToMarkdown(content);

    const catEls    = Array.isArray(item.category) ? item.category : [];
    const cats      = catEls.filter(c => c['@_domain'] === 'category').map(c => cdata(c));
    const tags      = catEls.filter(c => c['@_domain'] === 'post_tag').map(c => cdata(c));
    const courseCats = catEls.filter(c => c['@_domain'] === 'course-category').map(c => cdata(c));
    const courseTags = catEls.filter(c => c['@_domain'] === 'course-tag').map(c => cdata(c));
    const eventCats  = catEls.filter(c => c['@_domain'] === 'tp_event_category').map(c => cdata(c));
    const eventTags  = catEls.filter(c => c['@_domain'] === 'tp_event_tag').map(c => cdata(c));
    const speakers   = catEls.filter(c => c['@_domain'] === 'event-speaker').map(c => cdata(c));

    if (postType === 'post') {
      if (status !== 'publish') continue;
      const fm = frontmatter({ layout: 'post', title, date: dateStr, author, categories: cats, tags, original_url: guid });
      const out = `_posts/${dateStr}-${slug}.md`;
      if (!fs.existsSync(out)) { fs.writeFileSync(out, `${fm}\n\n${body}`); console.log(`  POST     ${out}`); counts.post++; }

    } else if (postType === 'page') {
      if (status !== 'publish') continue;
      const fm = frontmatter({ layout: 'page', title, permalink: `/${slug}/`, date: dateStr, original_url: guid });
      const out = `_pages/${slug}.md`;
      if (!fs.existsSync(out)) { fs.writeFileSync(out, `${fm}\n\n${body}`); console.log(`  PAGE     ${out}`); counts.page++; }

    } else if (postType === 'lesson') {
      // Import all lessons (draft + published) — they form the course library
      const courseId = getMeta(item, '_tutor_course_id_for_lesson');
      const isPreview = getMeta(item, '_is_preview');
      const fm = frontmatter({
        layout: 'lesson',
        title,
        date: dateStr,
        status,
        course_id: courseId,
        is_preview: isPreview === '1' ? 'true' : '',
        original_url: guid,
      });
      const out = `_lessons/${slug}.md`;
      if (!fs.existsSync(out)) { fs.writeFileSync(out, `${fm}\n\n${body}`); console.log(`  LESSON   ${out}`); counts.lesson++; }

    } else if (postType === 'courses') {
      if (status !== 'publish') continue;
      const level    = getMeta(item, '_tutor_course_level');
      const duration = getMeta(item, '_course_duration_in_seconds');
      const benefits = htmlToMarkdown(getMeta(item, '_tutor_course_benefits'));
      const audience = getMeta(item, '_tutor_course_target_audience');
      const durationMins = duration ? Math.round(parseInt(duration, 10) / 60) : '';
      const fm = frontmatter({
        layout: 'course',
        title,
        date: dateStr,
        author,
        level,
        duration_minutes: durationMins,
        benefits,
        audience,
        categories: courseCats,
        tags: courseTags,
        original_url: guid,
      });
      const out = `_courses/${slug}.md`;
      if (!fs.existsSync(out)) { fs.writeFileSync(out, `${fm}\n\n${body}`); console.log(`  COURSE   ${out}`); counts.courses++; }

    } else if (postType === 'tp_event') {
      if (status !== 'publish') continue;
      const dateStart = getMeta(item, 'tp_event_date_start');
      const dateEnd   = getMeta(item, 'tp_event_date_end');
      const timeStart = getMeta(item, 'tp_event_time_start');
      const timeEnd   = getMeta(item, 'tp_event_time_end');
      const location  = getMeta(item, 'tp_event_location') || getMeta(item, 'tp_event_place');
      const price     = getMeta(item, 'tp_event_price');
      const website   = getMeta(item, 'tp_event_website');
      const fm = frontmatter({
        layout: 'event',
        title,
        date: dateStr,
        date_start: dateStart,
        date_end:   dateEnd,
        time_start: timeStart,
        time_end:   timeEnd,
        location,
        price,
        website,
        categories: eventCats,
        tags:       eventTags,
        speakers,
        original_url: guid,
      });
      const out = `_events/${dateStr}-${slug}.md`;
      if (!fs.existsSync(out)) { fs.writeFileSync(out, `${fm}\n\n${body}`); console.log(`  EVENT    ${out}`); counts.tp_event++; }

    } else {
      // Unknown post type — log for awareness
      // console.log(`  SKIP     ${postType}: ${title}`);
    }
  }
}

console.log('\n── Summary ─────────────────────────────');
console.log(`  Posts:   ${counts.post}`);
console.log(`  Pages:   ${counts.page}`);
console.log(`  Lessons: ${counts.lesson}`);
console.log(`  Courses: ${counts.courses}`);
console.log(`  Events:  ${counts.tp_event}`);
console.log('────────────────────────────────────────');
if (!TurndownService) console.log('Tip: npm install turndown for better HTML→Markdown conversion.');
