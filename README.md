# BusinessCrowd

> Get your business in front of the crowd — AI-powered UK business directory and social media promotion platform.

**Live site:** https://businesscrowd.co.uk

---

## Local Development

### Prerequisites

- Ruby 3.x with Bundler
- Node.js 18+ (for import/migration scripts)

### Install & Run

```bash
# Install Ruby gems
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Open http://localhost:4000
```

### Build for Production

```bash
bundle exec jekyll build
# Output goes to _site/
```

---

## WordPress Migration

### 1. Import posts and pages from WP XML export

```bash
npm install
node import-wordpress.js /path/to/export.xml
```

This generates:
- `_posts/YYYY-MM-DD-slug.md` — blog posts
- `_pages/slug.md` — static pages

Install `turndown` for better HTML→Markdown conversion (included in `package.json`).

### 2. Migrate media to Cloudflare R2

**Via SFTP** (from your local machine — requires port 22 access):

```bash
# Create .env from template
cp .env.example .env
# Fill in R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, SFTP_HOST, SFTP_USER, SFTP_PASS, SFTP_PATH

node migrate-sftp-to-r2.js
```

**Via WordPress XML** (downloads media from live site):

```bash
node migrate-to-r2.js /path/to/export.xml
```

---

## Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── _layouts/
│   ├── default.html     # Base layout (nav + footer)
│   ├── post.html        # Blog post layout
│   └── page.html        # Static page layout
├── _includes/
│   ├── header.html      # Sticky nav + mobile menu
│   └── footer.html      # Footer with newsletter form
├── _posts/              # Blog posts (from WP import)
├── _pages/              # Static pages (from WP import)
├── assets/
│   ├── css/main.css     # All styles (matches prototype)
│   └── js/main.js       # Mobile menu + slot picker
├── blog/index.html      # Blog listing page
├── index.html           # Homepage (full prototype implementation)
├── import-wordpress.js  # WP XML → Jekyll markdown importer
├── migrate-to-r2.js     # WP XML media → Cloudflare R2
└── migrate-sftp-to-r2.js # SFTP uploads → Cloudflare R2
```

---

## Cloudflare R2

| Setting | Value |
|---|---|
| Account ID | `aced351fe613dbbefb0b867922691f28` |
| Bucket | `businesscrowd` |
| Endpoint | `https://aced351fe613dbbefb0b867922691f28.r2.cloudflarestorage.com` |

Credentials go in `.env` (gitignored — see `.env.example`).
