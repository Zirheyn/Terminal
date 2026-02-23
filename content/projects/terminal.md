---
title: Terminal
description: Minimalist black-and-white portfolio and blog built with Nuxt 4, TypeScript, and Nuxt Content.
tags: [nuxt, content, portfolio, blog]
year: 2026
cover: /projects/terminal-portfolio.png
links:
  repo: https://github.com/briacdev/terminal
  demo: https://briacd.com
---

## Overview

A personal publishing platform combining a developer portfolio, security-focused blog, and visual roadmaps.  
The UI follows a monochrome terminal aesthetic with brutalist cards, strong typography, and content-first layouts.

## Features

- File-based content management with Nuxt Content collections
- Dedicated spaces for articles, projects, and roadmap tracks
- Search and tag filtering on listing pages
- Markdown rendering with table of contents and previous/next navigation
- GitHub activity module on the home page (stats + contribution graph)
- SEO-ready output with Open Graph tags, RSS, sitemap, and robots

## Available Pages

- `/` Home with hero, GitHub activity, featured posts, projects, and roadmaps
- `/blog` Article index with search and tag filters
- `/blog/[slug]` Long-form article page with TOC and navigation
- `/projects` Project index with filters
- `/projects/[slug]` Project detail with repository/demo links
- `/roadmaps` Roadmap index
- `/java` Java learning roadmap timeline
- `/seo` SEO learning roadmap timeline
- `/about` Freelance profile and tooling stack

## Content Structure

- `content/blog/*` for articles
- `content/projects/*` for project showcases
- `content/roadmaps/java/*` and `content/roadmaps/seo/*` for roadmap content
- `content/about.md` for the profile page

## Live Links

- Live website: [briacd.com](https://briacd.com)
- Repository: [github.com/briacdev/terminal](https://github.com/briacdev/terminal)
