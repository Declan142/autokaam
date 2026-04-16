import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const imageGen: Tutorial[] = [
  {
    slug: "midjourney-v8-bollywood-poster-design",
    title: "Designing Bollywood-Style Posters With Midjourney V8",
    subtitle: "Use V8's breakthrough text rendering for bilingual posters — prompt templates and tricks",
    excerpt: "Take advantage of Midjourney V8 Alpha's improved text rendering. Bollywood poster aesthetics, stylised titles, and character composition — a complete prompting framework with examples.",
    body: `Midjourney V8 Alpha's biggest jump is text rendering — where earlier versions would mangle "GHATAK" into "GHKTK", the new model now produces clean text. That's a game-changer for anyone building posters, YouTube thumbnails, or Bollywood-style concept art.

## Get Access To V8 First

- You need a Midjourney subscription (Basic $10/mo, Standard $30/mo)
- Join the Discord server: [discord.gg/midjourney](https://discord.gg/midjourney)
- Enable V8 Alpha: \`/settings\` → toggle "V8" under version
- Or hardcode in the prompt: \`--v 8\`

## Basic Bollywood Poster Template

\`\`\`
A Bollywood movie poster for "GHATAK: THE STRIKE",
dramatic male protagonist in center with intense gaze,
action scene backdrop with city skyline at dusk,
bold Hindi-English typography with movie title at top,
saturated warm color grading, golden hour lighting,
vintage film grain, cinematic composition,
poster aspect ratio --ar 2:3 --v 8 --s 300
\`\`\`

Key parameters:
- \`--ar 2:3\` — vertical poster ratio
- \`--v 8\` — explicit V8 model
- \`--s 300\` — higher stylization for a dramatic look
- \`--chaos 20\` — add this for variation in the 4-grid output

## Text Rendering Tricks

V8 is a big jump, but a few tricks still help:

### Trick 1 — Quote The Exact Text
\`\`\`
movie title "DILWALE DULHANIA" in bold cinematic serif font at the top center
\`\`\`

Quoted text renders more reliably.

### Trick 2 — Specify A Font Style
\`\`\`
title in "distressed metal font" with chrome effect
\`\`\`

"Distressed metal," "serif," "sans-serif," "script," "handwritten" — V8 respects these keywords.

### Trick 3 — Avoid Devanagari (For Now)
V8 still struggles with Devanagari. Workaround: use romanised Hindi:

\`\`\`
title "SHAITAAN KA SAYA" in romanised text, bold dripping blood font
\`\`\`

If you need proper Devanagari, add it as a separate Photoshop layer afterwards.

## Celebrity Likeness — The Legal-Safe Approach

Generating specific actor likenesses is against Indian personality-rights law, especially after the [recent Bachchan / SRK rulings](/news/amitabh-bachchan-shahrukh-khan-ai-deepfake-protection/).

**Do this instead**:

\`\`\`
A 50-year-old Indian male actor with salt-pepper beard,
intense brown eyes, classical Indian features,
dressed in dark leather jacket, cinematic headshot
\`\`\`

A generic "Indian male actor" is safe; "Amitabh Bachchan" is not.

## Colour Palettes For A Bollywood Feel

Different genres want different palettes:

**Action/Thriller**: orange-teal grade, neon accents
\`\`\`
orange and teal color grading, neon red accents, high contrast shadows
\`\`\`

**Romance/Drama**: warm sepia, golden hour
\`\`\`
warm sepia tones, golden hour lighting, soft diffusion, dreamy
\`\`\`

**Horror**: desaturated blue-black with red blood pops
\`\`\`
desaturated blue-black palette, scattered red accents, cold menacing atmosphere
\`\`\`

**Comedy**: bright primary colours, vintage poster style
\`\`\`
bright primary colors, vintage 1980s Bollywood poster style, Priya Paul fonts
\`\`\`

## Composition Templates

### 1. Hero-Centric (classic Bollywood)
\`\`\`
central heroic figure in half-body portrait, dramatic backlighting,
secondary characters in smaller scale on sides,
movie title running across the top third, release date at bottom
\`\`\`

### 2. Split-Face Thriller
\`\`\`
extreme close-up of two faces split down the center,
left half protagonist, right half antagonist,
title text running across where faces meet, red accent line
\`\`\`

### 3. Landscape + Silhouette
\`\`\`
expansive Indian landscape (Himalayas/Rajasthan desert/Kerala backwaters),
silhouette of protagonist in foreground,
title text on sky portion, minimalist composition
\`\`\`

## Workflow: Midjourney → Photoshop

To take Midjourney output to a finished poster:

1. **Generate in Midjourney** (4-6 iterations, upscale the best one)
2. **Download the upscale** (2048x3072 minimum)
3. **Photoshop / Figma**:
   - Add the exact Devanagari title with a proper font (e.g., Kalam, Kruti Dev)
   - Logo placement
   - Release date, cast credits
   - Censor board + disclaimer strip

## Pricing Reality Check

- Midjourney Basic ($10 ~ Rs 830/mo): 200 images/month → enough for occasional use
- Standard ($30 ~ Rs 2,500/mo): unlimited relaxed + 15 hrs fast → recommended for active creators
- Pro ($60 ~ Rs 4,980/mo): 30 hrs fast + stealth mode (private)

For creators doing 20+ posters a month, the Standard plan is the sweet spot.

## Alternative Tools

- **[DALL-E 3](/tools/dall-e-3/)**: free for ChatGPT Plus subscribers; decent but weaker on artistic styles
- **FLUX**: open source, runs locally, free if you have a GPU
- **Imagen 3** (Google): strong for photorealism

Midjourney still leads for artistic and dramatic compositions, and with V8 the text-rendering gap is closed.`,
    category: "image-gen",
    level: "beginner",
    tags: ["Midjourney", "Bollywood", "Poster Design", "Design"],
    image: IMG.filmCamera,
    imageAlt: "Film camera on movie set",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-09",
    readingTime: 7,
    toolsUsed: ["midjourney"],
  },
];
