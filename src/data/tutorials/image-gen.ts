import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const imageGen: Tutorial[] = [
  {
    slug: "midjourney-v8-bollywood-poster-design",
    title: "Midjourney V8 Se Bollywood-Style Poster Kaise Banaye",
    subtitle: "V8 ka breakthrough text rendering use karke Hindi-English titled posters design karo — prompt templates aur tricks",
    excerpt: "Midjourney V8 Alpha ke improved text rendering ka faida uthao. Bollywood poster aesthetic, Hindi titles, character composition — complete prompting framework with 20+ examples.",
    body: `Midjourney V8 Alpha ka sabse bada jump text rendering hai — jahan pehle "GHATAK" ka poster mangte to "GHKTK" aata, ab clean text render hota hai. Ye un creators ke liye game-changer hai jo poster design, YouTube thumbnails, ya Bollywood-style concepts banate hain.

## Access V8 First

- Midjourney subscription chahiye (Basic $10/mo, Standard $30/mo)
- Discord server join karo: [discord.gg/midjourney](https://discord.gg/midjourney)
- V8 Alpha enable karo: \`/settings\` → toggle "V8" under version
- Ya prompt mein hardcode: \`--v 8\`

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
- \`--v 8\` — V8 model explicit
- \`--s 300\` — stylization higher for dramatic look
- \`--chaos 20\` — add for slight variation in 4-grid output

## Text Rendering Tricks

V8 bada jump hai but still tricks help karte hain:

### Trick 1 — Quote the Exact Text
\`\`\`
movie title "DILWALE DULHANIA" in bold cinematic serif font at the top center
\`\`\`

Quoted text rendering more reliable hai.

### Trick 2 — Specify Font Style
\`\`\`
title in "distressed metal font" with chrome effect
\`\`\`

"Distressed metal", "serif", "sans-serif", "script," "handwritten" — ye keywords V8 respect karta hai.

### Trick 3 — Avoid Devanagari (for now)
V8 Devanagari script mein still struggle karta hai. Workaround: Roman Hindi (Hinglish):

\`\`\`
title "SHAITAAN KA SAYA" in Hinglish romanized text, bold dripping blood font
\`\`\`

Pure Devanagari chahiye to Photoshop mein baad mein add karo (separate layer).

## Celebrity Likeness — Legal Safe Approach

Specific actor likeness generate karna Indian law (personality rights) ke khilaaf hai — especially [recent Bachchan / SRK rulings](/news/amitabh-bachchan-shahrukh-khan-ai-deepfake-protection/) ke baad.

**Do this instead**:

\`\`\`
A 50-year-old Indian male actor with salt-pepper beard,
intense brown eyes, classical Indian features,
dressed in dark leather jacket, cinematic headshot
\`\`\`

Generic "Indian male actor" is safe; "Amitabh Bachchan" is not.

## Color Palettes for Bollywood Feel

Different genre, different palette:

**Action/Thriller**: orange-teal grade, neon accent
\`\`\`
orange and teal color grading, neon red accents, high contrast shadows
\`\`\`

**Romance/Drama**: warm sepia, golden hour
\`\`\`
warm sepia tones, golden hour lighting, soft diffusion, dreamy
\`\`\`

**Horror**: desaturated blue-black, red blood pops
\`\`\`
desaturated blue-black palette, scattered red accents, cold menacing atmosphere
\`\`\`

**Comedy**: bright primary colors, vintage poster style
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

Midjourney ke output ko final poster banane ke liye:

1. **Generate in Midjourney** (4-6 iterations, upscale best one)
2. **Download uppscale** (2048x3072 min)
3. **Photoshop / Figma**:
   - Add exact Devanagari title with proper font (e.g., Kalam, Kruti Dev)
   - Logo placement
   - Release date, cast credits
   - Censor board + disclaimer strip

## Pricing Reality Check

- Midjourney Basic ($10 ~ Rs 830/mo): 200 images/month → enough for occasional use
- Standard ($30 ~ Rs 2,500/mo): unlimited relaxed + 15 hrs fast → recommended for creators
- Pro ($60 ~ Rs 4,980/mo): 30 hrs fast + stealth mode (private)

For content creators doing 20+ posters/month, Standard plan sweet spot hai.

## Alternative Tools

- **[DALL-E 3](/tools/dall-e-3/)**: ChatGPT Plus subscribers get it free; decent but weaker on artistic styles
- **FLUX**: open source, locally runnable, free but requires GPU
- **Imagen 3** (Google): photorealism ke liye strong

Midjourney still leads for artistic / dramatic compositions. V8 ke baad text rendering gap bhi closed.`,
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
