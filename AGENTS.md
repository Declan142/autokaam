# AutoKaam — Agent Guardrails

On a resume, read `~/autokaam/RESUME.md` first. It has the full state in ~150 lines.

## Two things I've already gotten wrong — don't repeat

### 1. This is NOT the Next.js you know

<!-- BEGIN:nextjs-agent-rules -->
Version 16 breaks conventions from your training. Before writing any route:
- `params` is `Promise<{slug: string}>` — `const { slug } = await params;`
- Static export mode — every dynamic route needs `generateStaticParams` (see `src/app/news/[slug]/page.tsx` for the pattern)
- Read `node_modules/next/dist/docs/01-app/` when uncertain — treat it as authoritative
- Use plain `<img>` (with eslint-disable) instead of `next/image` — external Unsplash URLs + static export don't mix
<!-- END:nextjs-agent-rules -->

### 2. Published copy is English only

The user pushed back hard on Hinglish. Rule:
- No "kaise," "karo," "chahiye," "mein," "aur," "bhi," "sahi," "dhund," "samjho" in article bodies, section headings, hero text, SEO prose.
- Indian context stays — INR pricing, Indian cities, Bollywood, cricket, Sarvam / Krutrim / Bhashini — described in English.
- OK exceptions: (a) URL slugs already shipped, (b) quoted Hindi queries as **examples** in SEO tutorials, (c) Hindi proper nouns.

Pre-deploy sanity check:
```bash
grep -rinE "\b(kaise|karo|chahiye|mein|aur|hain|nahi|bilkul|dhund|samjho)\b" src/app/ src/components/ src/data/tutorials/ | grep -vE "slug|kaise-banaye|\"hi-IN\"|language_code"
# Should return nothing
```

## Deploy

`bash ~/autokaam/deploy.sh`. Token comes from `~/.claude/vault/cloudflare-master.md` via `grep -oP 'cfut_\S+'`. Don't change that regex — an earlier pattern (`Token:\s*\K\S+`) was capturing markdown bold markers and auth-failing.
