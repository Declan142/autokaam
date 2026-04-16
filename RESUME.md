# AutoKaam — Resume State (Apr 16 2026, Session 2)

**Live**: https://autokaam.com (CF Pages, **Google unblocked**, 222 pages)
**Repo**: Declan142/autokaam
**Stack**: Next.js 16 static + Tailwind + Cloudflare Pages

## Current State (After Magazine Overhaul)

### ✅ Live & Crawlable
- **222 pages** prerendered static
  - 1 magazine-style home
  - 25 news articles + index + 5 category pages
  - 15 tutorials + index + 8 category pages
  - 51 tool pages + index + 13 category pages
  - 96 tool comparison pages
- `robots.txt`: `Allow: /` + sitemap reference
- Sitemap: 217 URLs submitted to IndexNow
- JSON-LD: NewsArticle + HowTo schemas on every article

### Architecture
```
src/
  app/
    page.tsx                      # Magazine home (hero + 3-col + india + launches + tools)
    news/
      page.tsx                    # News index
      [slug]/page.tsx             # Article detail
      category/[category]/page.tsx
    tutorials/
      page.tsx                    # Tutorials index
      [slug]/page.tsx             # Tutorial detail
      category/[category]/page.tsx
    tools/…                       # Existing (unchanged)
    compare/…                     # Existing
    category/…                    # Existing
  data/
    news/                         # Chunked by topic (5 files, shared images.ts)
      index.ts                    # Re-exports + selectors
      launches.ts  (7 articles)
      india.ts     (13 articles)
      industry.ts  (4 articles)
      updates.ts   (1 article)
      images.ts                   # Shared Unsplash IMG map
    tutorials/                    # Chunked by category (8 files)
      index.ts                    # Re-exports + selectors
      chatgpt.ts   (3)
      claude.ts    (2)
      image-gen.ts (1)
      video-gen.ts (1)
      coding.ts    (1)
      automation.ts(3)
      business.ts  (2)
      careers.ts   (2)
  components/
    NewsCard.tsx
    NewsHero.tsx
    TutorialCard.tsx
    Header.tsx                    # Updated: News + Tutorials in nav
    Footer.tsx                    # Updated: News/Tools/Tutorials columns
  lib/
    markdown.ts                   # marked-based renderer + formatDate
    content-types.ts              # NewsArticle, Tutorial types
```

### Key Design
- **Magazine typography**: `.font-serif-heading`, `.kicker`, `.image-overlay`, `.card-hover`, `.card-image-zoom`, `.prose-magazine` classes in globals.css
- **Big images everywhere**: Unsplash URLs in `src/data/news/images.ts`, hotlinked
- **Category-colored badges**: red=launches, blue=updates, purple=research, green=industry, orange=india
- **Level badges on tutorials**: green=beginner, yellow=intermediate, red=advanced

## Next Session — Ideas

### Short-term polish
- [ ] Add an author page (`/author/autokaam-editorial`) for E-E-A-T
- [ ] RSS feed at `/news/rss.xml`
- [ ] OG image auto-generation via Satori
- [ ] Google Search Console: submit sitemap + request indexing
- [ ] Add view counts / popular articles (Plausible or CF Analytics)

### Content
- [ ] Write 5-10 more news articles weekly (cron or manual)
- [ ] Expand tutorials to 30 (15 more, target long-tail queries)
- [ ] Add case studies section (real Indian businesses using AI)

### Tech
- [ ] Dark mode toggle
- [ ] Search (FlexSearch static index)
- [ ] Related-by-tag algorithm beyond same-category
- [ ] Hindi-only routes (`/hi/news/...`) for native Hindi readers

## Critical Rules (Still Active)

1. **Next.js 16 params are Promises** — `const { slug } = await params;`
2. **Dynamic routes** need `export const dynamic = "force-static"` OR `generateStaticParams`
3. **Images**: Use plain `<img>` tags with `eslint-disable-next-line @next/next/no-img-element` comment (next/image not compatible with static export + external URLs)
4. **CF token**: `~/.claude/vault/cloudflare-master.md` — deploy.sh uses `grep -oP 'cfut_\S+'` (earlier bug fixed)
5. **Deploy**: `bash ~/autokaam/deploy.sh`

## Commits To Reference
- `f11cf1e` — Last session end. Added RESUME.md.
- `3ce5221` — News data + noindex.
- **This session** — Magazine overhaul pending commit (news rendering, tutorials, home rewrite, Google unblocked)

## How to Resume in New Session

User types: **"resume autokaam"**

Claude's first action: Read ONLY this file (`RESUME.md`) — full state in ~150 lines.

Next iteration = polish, content expansion, or analytics integration. Core build is done.
