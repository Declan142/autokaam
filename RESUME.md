# AutoKaam — Resume State (Apr 16 2026)

**Status**: LIVE at https://autokaam.com — 222 pages, Google-indexable, magazine style, 100% English copy.

---

## 🔴 NON-NEGOTIABLE RULES

1. **English only in published copy.** No Hinglish in article bodies, section headings, hero text, metadata, or SEO blurbs. Indian context (INR, Indian cities, Bollywood, cricket, Sarvam/Krutrim/Bhashini) stays — describe it in English.
   - OK exceptions: (a) URL slugs already shipped (`ai-se-resume-kaise-banaye-chatgpt`), (b) quoted Hindi queries as examples in SEO tutorials, (c) Hindi names (Sarvam, Krutrim).
2. **Next.js 16, not 15.** Read `node_modules/next/dist/docs/` before writing any dynamic route — `params` is `Promise<{slug: string}>`, `await` before use.
3. **Static export** (`output: "export"` in `next.config.ts`). Every dynamic route needs `generateStaticParams` OR `export const dynamic = "force-static"`. Use plain `<img>` tags with eslint-disable (next/image incompatible with external URLs + static export).
4. **No Docker.** Direct npm / bun installs only.
5. **Deploy = `bash ~/autokaam/deploy.sh`.** Uses `grep -oP 'cfut_\S+'` to pull token from `~/.claude/vault/cloudflare-master.md`. Auto-submits to IndexNow.

---

## Architecture

```
~/autokaam/
  deploy.sh                              # bash to build + deploy
  next.config.ts                         # output: "export", trailingSlash, images.unoptimized
  package.json                           # next 16.2.3, react 19.2.4, marked, tailwind 4
  AGENTS.md                              # Next.js 16 warning (loaded via CLAUDE.md @AGENTS.md)
  CLAUDE.md                              # @AGENTS.md

  src/
    app/
      page.tsx                           # Magazine home (hero + india + launches + tools)
      layout.tsx                         # Root, Inter font, OG metadata (English)
      robots.ts                          # Allow: /  + sitemap
      sitemap.ts                         # 217 URLs (news + tutorials + tools + compare + categories)
      globals.css                        # .kicker .font-serif-heading .card-hover .prose-magazine
      news/
        page.tsx                         # /news/ index
        [slug]/page.tsx                  # /news/<slug>/ article detail
        category/[category]/page.tsx     # /news/category/<c>/ filter (5 categories)
      tutorials/
        page.tsx                         # /tutorials/ index
        [slug]/page.tsx                  # /tutorials/<slug>/ detail
        category/[category]/page.tsx     # /tutorials/category/<c>/ (8 categories)
      tools/page.tsx + [slug]/page.tsx   # /tools/ (existing; cleaned of Hinglish)
      compare/[slugs]/page.tsx           # /compare/a-vs-b/ (existing; cleaned)
      category/[slug]/page.tsx           # /category/<c>/ (existing; cleaned)

    data/
      tools.ts                           # 51 tools (descriptionHi / taglineHi kept but NOT rendered)
      news/
        index.ts                         # re-exports + selectors (getAllNews, getNewsBySlug, getFeaturedNews, getNewsByCategory)
        images.ts                        # IMG = { aiChip, coding, robot, … } Unsplash URLs (shared by tutorials)
        launches.ts (7)                  # GPT-6, Claude Mythos, Cursor 3, Gemma 4, Midjourney V8, Hermes, OpenAI Agents SDK
        india.ts (13)                    # Sarvam, Krutrim, ChatGPT Go, Sarvam Kaze, Google $15B, Oracle, AWS, IndiaAI, MS+Claude, Bollywood, deepfake, cricket, healthcare
        industry.ts (4)                  # DeepSeek V3.2, Anthropic chips, data centers, Frontier Forum
        updates.ts (1)                   # Gemini 750M
      tutorials/
        index.ts                         # re-exports + selectors
        chatgpt.ts (3)                   # resume, GST, Plus-vs-Go
        claude.ts (2)                    # Claude Code setup, prompt engineering
        image-gen.ts (1)                 # Midjourney V8 Bollywood posters
        video-gen.ts (1)                 # YouTube Shorts Runway+Suno
        coding.ts (1)                    # Cursor vs Copilot 2026
        automation.ts (3)                # Sarvam Hindi voice, DeepSeek cost cuts, Gemma+Ollama local
        business.ts (2)                  # WhatsApp chatbot, Hindi-SEO blog workflow
        careers.ts (2)                   # free tools for students, AI career paths

    components/
      Header.tsx                         # Nav: News, Tutorials, Tools, India AI, Compare
      Footer.tsx                         # 4 columns: brand / news / tools / learn+compare
      NewsCard.tsx                       # big image + kicker + serif title + excerpt
      NewsHero.tsx                       # full-bleed image + gradient overlay + kicker + title
      TutorialCard.tsx                   # icon + category + level badge + title
      ToolCard.tsx                       # existing

    lib/
      content-types.ts                   # NewsArticle, Tutorial, NEWS_CATEGORIES, TUTORIAL_CATEGORIES
      markdown.ts                        # marked renderer + formatDate
      tools.ts                           # existing tool selectors
      types.ts                           # existing
```

---

## Design System (globals.css classes)

| Class | Purpose |
|-------|---------|
| `.font-serif-heading` | Georgia serif, tight tracking — all h1/h2 magazine style |
| `.kicker` | Small-caps orange label above headings |
| `.image-overlay` | Gradient from black bottom to transparent top on hero images |
| `.card-hover` | Translate-up + shadow on hover (article cards) |
| `.card-image-zoom` | Smooth image zoom on hover |
| `.prose-magazine` | Article body: Georgia h2, spaced paragraphs, orange links |

Category color mapping (see `NEWS_CATEGORIES`):
- launches → red-500
- updates → blue-500
- research → purple-500
- industry → green-600
- india → orange-500

Tutorial level badges (`TutorialCard`):
- beginner → green
- intermediate → yellow
- advanced → red

---

## Commands

```bash
cd ~/autokaam
npx tsc --noEmit              # type check
npm run build                  # full build (needs ~10s, outputs ./out/)
bash deploy.sh                 # build + CF Pages deploy + IndexNow ping
npm run dev                    # local dev at localhost:3000
```

Pre-flight before every deploy:
```bash
grep -rinE "\b(kaise|karo|chahiye|mein|aur|hain|nahi|bilkul|dhund|samjho)\b" src/app/ src/components/ src/data/tutorials/ | grep -vE "slug|kaise-banaye|\"hi-IN\"|language_code"
# Should return nothing — if it does, Hinglish has leaked back in
```

---

## Content Inventory

### News (25 articles) — see `src/data/news/`

All real April 2026 stories. 1 featured (Sarvam $350M). Every article has India angle. Body is markdown; rendered via `marked` in `[slug]/page.tsx`.

### Tutorials (15) — see `src/data/tutorials/`

3 featured: resume-with-ChatGPT, Claude Code setup, WhatsApp chatbot, Sarvam voice banking. All English copy. All reference tool slugs and cross-link news articles.

### Tools (51) — existing, unchanged

`descriptionHi` and `taglineHi` fields are present but NO LONGER RENDERED on pages. Retained for future bilingual rollout.

---

## Git History (this session)

```
9b13e05 content: finish English sweep across tool, compare, category, layout
7e8def4 content: rewrite tutorials and site copy in English (drop Hinglish)
2ce4e5d feat: magazine overhaul — news + tutorials + Google unblocked
f11cf1e docs: add RESUME.md for next-session quick context
3ce5221 feat: 25 real AI news articles with India angle + noindex for staging
```

---

## Next-Session Ideas (Not Urgent)

- **Analytics**: wire Plausible or CF Web Analytics on `src/app/layout.tsx` (one script tag)
- **RSS**: `src/app/news/rss.xml/route.ts` static feed
- **OG images**: `src/app/news/[slug]/opengraph-image.tsx` via Satori (auto-gen from title + image)
- **Search**: FlexSearch static index + `/search/` page
- **Author pages**: `/author/autokaam-editorial/` for E-E-A-T
- **GSC submit**: manual sitemap submission to Google Search Console
- **Content cadence**: 5-10 news/week (possibly scripted with brain search on recent AI news)
- **More tutorials** to 30 (long-tail keyword targeting)
- **Dark mode toggle** via class-based Tailwind

---

## How To Resume

User types **"resume autokaam"** → read ONLY this file. ~150 lines, full state.

Core build is done. Future work = polish, content, analytics.

**First move after reading**: `cd ~/autokaam && git status` to check for WIP, then ask user what to add.
