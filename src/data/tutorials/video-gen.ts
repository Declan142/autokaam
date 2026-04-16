import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const videoGen: Tutorial[] = [
  {
    slug: "youtube-shorts-runway-suno-hindi",
    title: "AI Se YouTube Shorts Banao — Runway ML + Suno Music (Hindi Channel)",
    subtitle: "End-to-end workflow: script se video, original soundtrack tak — Rs 2,500/month budget mein",
    excerpt: "Indian YouTubers ke liye complete AI shorts production pipeline. Runway ML se video, Suno AI se royalty-free Hindi music, CapCut se edit. Channel growth tactics included.",
    body: `YouTube Shorts abhi ka sabse fast-growing content format hai aur AI tools se production cost 80-90% drop ho gaya hai. Ye tutorial ek Indian content creator ke liye end-to-end workflow deta hai — agar tumhara khud ka camera setup nahi hai bhi.

## Tech Stack (Monthly Budget)

| Tool | Use | Cost |
|------|-----|------|
| ChatGPT Go | Script writing | Rs 0 (till Dec 2026) |
| Runway ML | Video generation | Rs 1,250/mo (Standard) |
| Suno AI | Music | Rs 830/mo (Pro) |
| CapCut | Edit | Rs 0 (free tier) |
| Thumbnail | Canva Pro | Rs 420/mo |
| **Total** | | **~Rs 2,500/mo** |

30-60 shorts/month easily produce ho sakte hain is budget mein.

## Step 1 — Script with ChatGPT

Shorts ka script 15-30 second hook hai + 30-60 second payoff. Template:

\`\`\`
Write a 45-second YouTube Shorts script in Hinglish about [TOPIC].

Structure:
- Hook (first 3 seconds): surprising fact or question
- Body (15 sec): main content, 3 key points
- CTA (last 5 sec): "Follow karo" ya specific action

Audience: 18-28 year old Indians, mobile-first viewers
Tone: conversational, high energy
Include: 2-3 visual cues describing what to show
\`\`\`

Iterate 2-3 times. Final script lock karo before production.

## Step 2 — Storyboard (Quick Sketch)

Shorts ke liye 5-8 shots kaafi hote hain. Script se visual cues extract:

\`\`\`
Shot 1 (0-3s): Close-up of Indian street food vendor
Shot 2 (3-8s): Wide of bustling market
Shot 3 (8-15s): Macro shot of chai pouring
...
\`\`\`

## Step 3 — Video Generation (Runway ML Gen-4)

Runway Gen-4 shortlength video generation ke liye best hai abhi. 10-second clips max (V4 limit).

Prompt structure:

\`\`\`
[CAMERA TYPE] [SHOT TYPE] of [SUBJECT],
[SETTING/ENVIRONMENT],
[LIGHTING],
[CAMERA MOVEMENT],
[MOOD/STYLE]

Example:
35mm macro close-up of hot chai being poured into glass tumbler,
Indian street tea stall at dusk,
warm golden hour lighting with steam visible,
slow downward tilt,
documentary style, nostalgic mood
\`\`\`

Key prompting principles:
- **Camera specificity**: "35mm," "wide," "drone shot" — shot type matter karta hai
- **Lighting mandatory**: "golden hour," "overhead fluorescent," "neon night" — ambient define karo
- **Motion explicit**: "slow pan left," "handheld shaky," "smooth dolly"
- **Avoid text in video**: Runway text mein still weak, title CapCut mein add karo

### Alternatives
- **Pika**: faster, cheaper (~Rs 830/mo); stylized animation better
- **Sora** (OpenAI): recently API mein available, premium quality but expensive
- **Luma Dream Machine**: free tier generous

## Step 4 — Music with Suno AI

Suno Hindi lyrics aur original music dono generate kar sakta hai.

### Prompt for Background Score

\`\`\`
[Instrumental, no lyrics]
Upbeat Bollywood-influenced background music,
tabla and synth fusion, 120 BPM,
energetic for YouTube Shorts intro,
30 seconds length
\`\`\`

### Prompt for Vocal Track

\`\`\`
[Style: Hindi indie pop]
Lyrics in Hindi about [topic]:
[paste 4-line hook]

Vocal: young male, indie soft tone
Instruments: acoustic guitar, light percussion, subtle strings
Mood: hopeful, modern
Length: 1 minute
\`\`\`

Suno generates 2 versions per prompt. Download best one.

**License**: Suno Pro license commercial use allow karta hai. Free tier NOT for commercial.

## Step 5 — Edit in CapCut

CapCut free tier bilkul enough hai Shorts ke liye:

1. Import all Runway clips (vertical 9:16 format crop karo)
2. Add Suno music as background
3. Voiceover: ElevenLabs (free tier) ya apni awaaz
4. Captions: CapCut auto-caption Hindi support karta hai (Indian language update)
5. Transitions: minimal — 2-3 types max
6. Color grade: ek LUT apply karo consistent look ke liye

**Shorts specific settings**:
- Aspect ratio: 9:16 (vertical)
- Duration: 45-60 sec sweet spot
- First 3 seconds: HOOK — retention drops karta hai pehle 3 sec mein

## Step 6 — Thumbnail (Canva Pro)

Shorts actually thumbnails kam matter karte hain (auto-scroll feed), but channel page pe dikhte hain:

- Canva Pro free templates use karo
- Bright color + big text contrast
- Face close-up (apni ya Midjourney generated)

## Step 7 — Upload Strategy

**YouTube best practices Shorts ke liye**:
- Title: 40-60 characters, include keyword
- Description: 3-4 lines, Hindi aur English both
- Tags: 5-10 relevant (#Shorts mandatory)
- Hashtags in title: max 3
- Post consistency: daily > sporadic

**Timing (Indian audience)**:
- Prime slots: 8-10 AM ya 7-10 PM IST
- Weekends better than weekdays

## Content Ideas That Work

- **Tech explainers in 60 sec** ("Claude vs ChatGPT asli fark" type)
- **Hindi life hacks**
- **Indian street food stories**
- **Cricket / IPL analysis**
- **Movie reviews (3 bullet format)**
- **AI tool reviews** — tumhe AutoKaam content backup!

## Scale Tactics

Agar ye workflow chalne lage, automation add karo:
- ChatGPT ke saath 10 scripts batch generate karo per week
- Runway ke saath batch generation (queue 10 clips)
- Sunday ko editing marathon — 5 shorts ek hi baithak mein

Consistent posting schedule se algorithm boost milta hai. 100 shorts pe monetization eligible ho jaoge YPP mein.`,
    category: "video-gen",
    level: "beginner",
    tags: ["YouTube Shorts", "Runway", "Suno", "Video Generation", "Content Creation"],
    image: IMG.filmCamera,
    imageAlt: "Filmmaking equipment",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-07",
    readingTime: 8,
    toolsUsed: ["runway-ml", "suno-ai", "chatgpt"],
  },
];
