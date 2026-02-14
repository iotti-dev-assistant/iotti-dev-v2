# iotti.dev v2

Next.js (App Router) codebase for Edu's personal site: **iotti.dev**.

## What’s inside

- `/` — home
- `/blog` — MDX-based posts (from `content/blog/*.mdx`)
- `/playground` — UI experiments gallery
- `/playground/background-effect` — placeholder demo + notes

## Local development

Requirements: Node.js + npm

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Scripts

```bash
npm run lint
npm run build
npm run start
```

## Content: writing posts

Add an `.mdx` file under:

- `content/blog/*.mdx`

Use frontmatter:

```mdx
---
title: "My post"
date: "2026-02-13"
description: "Optional short summary"
---
```

## Background effect inspiration

Background effect inspiration: **ralphstarter.ai**
