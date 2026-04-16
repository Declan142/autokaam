# AutoKaam — Resume State (Apr 16 2026)

**Live**: https://autokaam.com (CF Pages, noindex active)
**Repo**: Declan142/autokaam
**Stack**: Next.js 16 static + Tailwind + Cloudflare Pages

## Current State

### ✅ Live (165 pages)
- Home, 51 tool pages, 96 comparisons, 13 categories, sitemap, robots.txt
- `robots.txt`: Disallow all (user wants Google blocked until redesign)
- `<meta name="robots" content="noindex, nofollow">` on every page

### ⚠️ Written but NOT rendered (invisible to users)
- **25 news articles** in `src/data/news.ts` (~3000 lines, one array)
- Real April 2026 data, India angle, Unsplash images
- Types in `src/lib/content-types.ts` (NewsArticle, Tutorial, NEWS_CATEGORIES, TUTORIAL_CATEGORIES)

### User Verdict on Current Live Site
> "looks shit" — basic database look, no magazine feel, no visuals

## Next Session — Tasks in Order

### Task 0 — Chunk news.ts (saves future context)
Split `src/data/news.ts` (3000 lines, one array) into:
```
src/data/news/
  index.ts          # re-exports combined array
  launches.ts       # GPT-6, Claude Mythos, Cursor 3, Gemma 4, Midjourney V8, Hermes, OpenAI Agents SDK
  india.ts          # Sarvam, Krutrim, ChatGPT Go, Sarvam Kaze, Google $15B, Oracle OCI, AWS, IndiaAI, MS+Claude, Bollywood, deepfake rulings, cricket, healthcare
  industry.ts       # Anthropic chips, DeepSeek V3.2, data centers, Frontier Forum
  updates.ts        # Gemini 750M
```
Each file ~200-400 lines → edits cheap.

### Task 1 — Render news pages
Create:
- `src/app/news/page.tsx` — news index (grid of NewsCard)
- `src/app/news/[slug]/page.tsx` — article detail
- `src/components/NewsCard.tsx` — card with big image, kicker, title
- `src/components/NewsHero.tsx` — featured article hero (full-width image)

Use `generateStaticParams` from `getAllNews()` helper.
All params are `Promise<{slug: string}>` — await before use (Next.js 16).

### Task 2 — Write tutorials
- `src/data/tutorials.ts` — 15 walkthroughs
- Topics: "AI se resume kaise banaye", "ChatGPT for GST filing", "Claude Code setup India", "Free AI tools for students", "WhatsApp AI chatbot for business", etc.
- Bilingual Hindi+English framing

### Task 3 — Render tutorial pages
Same pattern as news: index + `[slug]` detail pages.

### Task 4 — Magazine-style home rewrite
Rewrite `src/app/page.tsx`:
- Full-bleed hero with featured article + big image
- 3-column news grid
- Tutorials carousel
- Tools section below
- Big images, kickers (colored uppercase labels), magazine typography

Styles already added to `src/app/globals.css`:
`.kicker`, `.image-overlay`, `.card-hover`, `.card-image-zoom`, `.prose-magazine`

### Task 5 — Update Header/Footer
Add "News" and "Tutorials" to main nav in `src/components/Header.tsx`.

### Task 6 — Unblock Google
- `src/app/robots.ts` → change back to `allow: "/"`
- `src/app/layout.tsx` → remove `robots: { index: false }` from metadata
- Re-add sitemap reference in robots.ts

### Task 7 — Redeploy
```bash
cd ~/autokaam && bash deploy.sh
```

## Key Rules for Next Session

1. **Next.js 16 params are Promises** — `const { slug } = await params;` in pages and generateMetadata
2. **Dynamic routes** need `export const dynamic = "force-static"` or static export fails
3. **Use Unsplash URLs** (already in news.ts IMG object) — no need to download images
4. **CF token** at `~/.claude/vault/cloudflare-master.md` has Pages Read+Write (self-granted)
5. **Deploy**: `bash ~/autokaam/deploy.sh`

## Commits To Reference
- `3ce5221` — Current HEAD. News data + noindex.
- `87cc7fb` — Category title "Made in India AI AI" fix
- Initial build: 165 pages

## User's Design Direction (Must Follow)
- "Magazine only attracts through visuals" — big images everywhere
- Include Hermes, Microsoft, Google, Azure, Oracle, Google Cloud topics ✅ (done in news)
- Celebrities using AI (Bollywood, cricket) ✅ (done in news)
- Every article has India angle ✅ (done)
- Make it feel like a real AI magazine, not a tool database

## How to Resume in New Session

User types: **"resume autokaam"** or **"continue autokaam news"**

Claude's first action: Read ONLY this file (`RESUME.md`) — that's full state in ~200 lines.

Then start Task 0 (chunk news.ts) to make subsequent edits cheap.
