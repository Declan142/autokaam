import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const videoGen: Tutorial[] = [
  {
    slug: "youtube-shorts-runway-suno-hindi",
    title: "Building YouTube Shorts With Runway ML and Suno — End-to-End For Indian Channels",
    subtitle: "Script to published short, with original soundtrack — all on a Rs 2,500/month budget",
    excerpt: "A complete AI-powered Shorts production pipeline for Indian creators. Runway ML for video, Suno AI for royalty-free music, CapCut for edits. Channel growth tactics included.",
    body: `YouTube Shorts is currently the fastest-growing content format, and AI tools have dropped production cost 80-90%. This tutorial gives an Indian content creator an end-to-end workflow — even if you don't have your own camera setup.

## Tech Stack (Monthly Budget)

| Tool | Use | Cost |
|------|-----|------|
| ChatGPT Go | Script writing | Rs 0 (till Dec 2026) |
| Runway ML | Video generation | Rs 1,250/mo (Standard) |
| Suno AI | Music | Rs 830/mo (Pro) |
| CapCut | Editing | Rs 0 (free tier) |
| Thumbnails | Canva Pro | Rs 420/mo |
| **Total** | | **~Rs 2,500/mo** |

You can comfortably produce 30-60 Shorts a month on this budget.

## Step 1 — Script With ChatGPT

A Short is a 15-30 second hook + 30-60 second payoff. Template:

\`\`\`
Write a 45-second YouTube Shorts script about [TOPIC].

Structure:
- Hook (first 3 seconds): a surprising fact or question
- Body (15 sec): main content, 3 key points
- CTA (last 5 sec): specific action ("Subscribe," "Follow for part 2")

Audience: Indian viewers aged 18-28, mobile-first
Tone: conversational, high energy
Include: 2-3 visual cues describing what to show
\`\`\`

Iterate two or three times. Lock the final script before moving to production.

## Step 2 — Storyboard (Quick Sketch)

Shorts usually need 5-8 shots. Extract visual cues from the script:

\`\`\`
Shot 1 (0-3s): Close-up of Indian street food vendor
Shot 2 (3-8s): Wide of bustling market
Shot 3 (8-15s): Macro shot of chai pouring
...
\`\`\`

## Step 3 — Video Generation (Runway ML Gen-4)

Runway Gen-4 is currently the best option for short-form clips. 10-second clips maximum (V4 limit).

Prompt structure:

\`\`\`
[CAMERA TYPE] [SHOT TYPE] of [SUBJECT],
[SETTING/ENVIRONMENT],
[LIGHTING],
[CAMERA MOVEMENT],
[MOOD/STYLE]

Example:
35mm macro close-up of hot chai being poured into a glass tumbler,
Indian street tea stall at dusk,
warm golden hour lighting with steam visible,
slow downward tilt,
documentary style, nostalgic mood
\`\`\`

Key prompting principles:
- **Camera specificity**: "35mm," "wide," "drone shot" — shot type matters
- **Lighting is mandatory**: "golden hour," "overhead fluorescent," "neon night" — define the ambient lighting
- **Explicit motion**: "slow pan left," "handheld shaky," "smooth dolly"
- **Avoid text in video**: Runway is weak at text — add titles in CapCut

### Alternatives
- **Pika**: faster, cheaper (~Rs 830/mo); stylised animation is better
- **Sora** (OpenAI): API access now available; premium quality but expensive
- **Luma Dream Machine**: generous free tier

## Step 4 — Music With Suno AI

Suno can generate original music in Hindi, English, or a mix.

### Prompt For A Background Score

\`\`\`
[Instrumental, no lyrics]
Upbeat Bollywood-influenced background music,
tabla and synth fusion, 120 BPM,
energetic for a YouTube Shorts intro,
30 seconds length
\`\`\`

### Prompt For A Vocal Track

\`\`\`
[Style: Hindi indie pop]
Lyrics in Hindi about [topic]:
[paste 4-line hook]

Vocals: young male, soft indie tone
Instruments: acoustic guitar, light percussion, subtle strings
Mood: hopeful, modern
Length: 1 minute
\`\`\`

Suno generates two versions per prompt. Download the best one.

**License note**: Suno Pro allows commercial use. The free tier does not.

## Step 5 — Edit In CapCut

CapCut's free tier is plenty for Shorts:

1. Import all Runway clips (crop to vertical 9:16)
2. Add the Suno music as background
3. Voiceover via ElevenLabs (free tier) or your own voice
4. Captions — CapCut auto-captions Hindi too (Indian-language update shipped)
5. Transitions — keep it minimal, two or three types max
6. Colour grade — apply one LUT for a consistent look

**Shorts-specific settings**:
- Aspect ratio: 9:16 (vertical)
- Duration: 45-60 sec is the sweet spot
- First 3 seconds: the HOOK — retention drops sharply in the first 3s

## Step 6 — Thumbnail (Canva Pro)

Thumbnails matter less for Shorts (auto-scroll feed), but they show up on your channel page:

- Use Canva Pro's free templates
- Bright colour + big, contrasted text
- Face close-up (yours, or generated via Midjourney)

## Step 7 — Upload Strategy

**YouTube best practices for Shorts**:
- Title: 40-60 characters, include the keyword
- Description: 3-4 lines, a mix of Hindi and English
- Tags: 5-10 relevant (\`#Shorts\` is mandatory)
- Hashtags in title: max 3
- Post consistently: daily beats sporadic

**Timing (Indian audience)**:
- Prime slots: 8-10 AM or 7-10 PM IST
- Weekends beat weekdays

## Content Ideas That Work

- **Tech explainers in 60 seconds** ("Claude vs ChatGPT, the real difference" style)
- **Life hacks in Hindi**
- **Indian street-food stories**
- **Cricket / IPL analysis**
- **Movie reviews in a 3-bullet format**
- **AI tool reviews** — your AutoKaam content source!

## Scale Tactics

Once this workflow is working, add automation:
- Batch-generate 10 scripts per week with ChatGPT
- Queue 10 Runway clips for batch generation
- Sunday edit marathon — five Shorts in one sitting

Consistent posting gets algorithm lift. Hit 100 Shorts and you're eligible for YPP monetisation.`,
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
