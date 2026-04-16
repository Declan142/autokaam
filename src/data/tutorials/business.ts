import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const business: Tutorial[] = [
  {
    slug: "whatsapp-ai-chatbot-business-15-minutes",
    title: "Build a WhatsApp AI Chatbot in 15 Minutes — For Small Businesses",
    subtitle: "Twilio + OpenAI/Sarvam for a multilingual chatbot — with a no-code option too",
    excerpt: "For small business owners: the quickest path to connecting Twilio WhatsApp Business API with an AI chatbot. Both code and no-code options covered.",
    body: `WhatsApp has 500M+ users in India — your customers are already there. Manual replies are expensive and time-gated (what happens when a customer messages at 2am?). An AI chatbot gives you 24/7 presence, and with the right stack you can be live in 15 minutes.

## Decision: Code vs No-Code

### No-Code Path (Faster, But Limited)
- **BotPenguin** (Indian, starts Rs 1,500/mo)
- **WATI** (Rs 2,800/mo)
- **Interakt** (Rs 999/mo, basic tier)

Pros: drag-drop, templates, 2-hour setup
Cons: hard to customise, recurring cost, shallow AI depth

### Code Path (More Work, Infinitely Flexible)
- Twilio WhatsApp Business API + your backend + AI API
- One-time setup effort, then infinite flexibility
- Cost: Rs 0.80-1.20 per conversation (Twilio) + AI costs

We'll cover the code path because its ceiling is the highest.

## Prerequisites

1. **WhatsApp Business Account** (verified with business docs)
2. **Twilio account** with WhatsApp enabled
3. **OpenAI/Claude/Sarvam API key**
4. **Server** (Cloudflare Workers' free tier works, or Render/Railway)

## Step 1 — Twilio Setup (5 min)

1. Sign up at [twilio.com/console](https://twilio.com/console)
2. Messaging → Try WhatsApp → scan the QR with your WhatsApp Business
3. Note your Account SID + Auth Token
4. You get a Sandbox number; production needs Facebook Business Manager approval (1-2 days)

For development, the Sandbox WhatsApp number is perfect.

## Step 2 — FastAPI Webhook (5 min)

\`\`\`python
# main.py
from fastapi import FastAPI, Form
from twilio.twiml.messaging_response import MessagingResponse
from openai import OpenAI
import os

app = FastAPI()
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

conversations = {}  # In production: use Redis / PostgreSQL

@app.post("/whatsapp")
async def whatsapp_webhook(
    From: str = Form(...),
    Body: str = Form(...),
):
    user_id = From  # e.g., "whatsapp:+919876543210"
    user_message = Body

    # Load history
    history = conversations.get(user_id, [])
    history.append({"role": "user", "content": user_message})

    # Call OpenAI
    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a customer support agent for Acme Corp. Respond in the user's language (Hindi/English/mixed). Keep replies concise — WhatsApp messages should be short."
            },
            *history
        ],
        max_tokens=200
    )
    ai_response = completion.choices[0].message.content

    # Save history (truncate to last 10 messages)
    history.append({"role": "assistant", "content": ai_response})
    conversations[user_id] = history[-10:]

    # Return the Twilio response
    resp = MessagingResponse()
    resp.message(ai_response)
    return str(resp)
\`\`\`

## Step 3 — Deploy (5 min)

### Option A: Cloudflare Workers
\`\`\`bash
wrangler deploy
\`\`\`
Free tier: 100k requests/day — enough for most small businesses.

### Option B: Render
\`\`\`yaml
# render.yaml
services:
  - type: web
    name: whatsapp-bot
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
\`\`\`

Note your public URL (e.g., \`https://mybot.onrender.com\`).

## Step 4 — Connect Twilio To Your URL

Twilio Console → WhatsApp Sandbox → "When a message comes in" → paste your URL + \`/whatsapp\` → save.

Test: send "Hi" to the Twilio WhatsApp number → the AI replies in seconds.

## Enhance With Tool Use

A simple chatbot is boring. Add real business actions:

\`\`\`python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "check_order_status",
            "description": "Check the status of an order by order ID",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string"}
                },
                "required": ["order_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "schedule_demo",
            "description": "Schedule a demo call",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "phone": {"type": "string"},
                    "preferred_time": {"type": "string"}
                },
                "required": ["name", "phone"]
            }
        }
    }
]

# In the completion call:
completion = openai_client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[...],
    tools=TOOLS,
    tool_choice="auto"
)

# Handle tool calls (check_order_status DB lookup, etc.)
\`\`\`

This turns your chatbot into something genuinely useful — checking orders, booking demos, capturing leads.

## Multilingual Handling

Indian audiences may speak 10+ languages. A strong system prompt:

\`\`\`
You are multilingual. Detect the user's language and respond in the same language:
- Hindi (Devanagari or romanized)
- Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi
- English

Match their register. Use polite forms (formal 'aap' in Hindi, formal 'neenga' in Tamil).
\`\`\`

For stronger regional fluency, swap OpenAI for [Sarvam AI](/tutorials/sarvam-hindi-banking-voice-automation/) — better with Indian languages.

## Cost Analysis (1000 messages/day)

- Twilio: Rs 1/conversation × 1000 = Rs 1,000/day
- OpenAI GPT-4o-mini: ~Rs 0.05/msg × 1000 = Rs 50/day
- Server: Rs 0 (CF Workers free) or Rs 500/mo (Render)

**Monthly: ~Rs 30,500 for 30k conversations**

Versus a human agent: Rs 15,000-25,000/month for one agent with 8-hour coverage.

AI: 24/7, 10x volume, same cost.

## Common Pitfalls

1. **Rate limiting**: Twilio's free tier is low — upgrade when you scale
2. **Long responses**: WhatsApp truncates; keep under 1,000 chars
3. **Conversation drift**: save only the last 10 messages; summarize older ones
4. **Sensitive info**: credit cards, passwords — never expose to the LLM; redact before sending
5. **Fallback path**: always offer "Talk to a human agent?"

## Moving To Production

1. Facebook Business verification (1-2 days)
2. Twilio Sandbox → production number
3. WhatsApp-approved message templates for proactive notifications
4. Add analytics (message volume, conversion rate, satisfaction)
5. Build an admin dashboard (log of messages, human-takeover button)

## No-Code Alternative

If you don't want to code:
- **Zapier + OpenAI + WhatsApp**: a Zapier flow \`WhatsApp message → OpenAI → reply\`. Rs 2,000-5,000/mo depending on volume.
- **Make.com (formerly Integromat)**: similar, slightly cheaper

## Scale-Up Patterns

- **Queue system**: Redis + worker for async processing
- **Conversation branching**: quick replies, button flows (Twilio supports these)
- **Persistent memory**: save customer info to your CRM automatically
- **Voice messages**: WhatsApp audio → STT → LLM → TTS back

A WhatsApp chatbot is the single-highest-ROI AI investment for Indian businesses. 15 minutes of setup, 24/7 value.`,
    category: "business",
    level: "beginner",
    tags: ["WhatsApp", "Chatbot", "Twilio", "OpenAI", "Business Automation"],
    image: IMG.chat,
    imageAlt: "WhatsApp chat interface",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-06",
    readingTime: 9,
    toolsUsed: ["chatgpt", "claude", "sarvam-ai"],
    featured: true,
  },
  {
    slug: "ai-hindi-blog-seo-hinglish",
    title: "AI-Assisted Blogging For Indian Audiences — A Complete SEO Workflow",
    subtitle: "Google-friendly Indian content: from keyword research to publish — AI-assisted but not AI-slop",
    excerpt: "A complete workflow for SEO-driven content in Hindi / Hinglish for Indian audiences. Draft with AI, polish by hand, add structured data. Ranking tactics that actually work.",
    body: `Hindi and Hinglish content is the most underserved segment in India. English blogs are oversaturated, but "how to," "what is," and "why" queries in Hindi pull crores of monthly searches — and supply is thin. AI lets you produce volume, but if you go against Google's guidelines you'll get penalised.

## First — Avoid AI Slop

Google's March 2024 core update hit thin, AI-generated content hard. Indian sites that were pumping "100 articles a day from ChatGPT" got de-ranked.

**Rule**: AI drafts, humans edit and add unique value. Pure AI output is not publishable.

## Step 1 — Keyword Research (Hindi-Hinglish)

### Free Tools:
- **Google Search Console** (if your site is live — queries data)
- **Google Suggest** — type "paneer banane ka" and harvest suggestions
- **AnswerThePublic** — okay data for Hindi queries
- **Ubersuggest** free tier

### Find Target Queries

Strong Hindi / Hinglish query patterns:
- "... kya hota hai"
- "... kaise banaye"
- "... ke fayde"
- "... vs ... difference"
- "best ... in India 2026"

Example target: **"AI se resume kaise banaye"**

- Volume: ~2,400/month (India)
- Competition: low (only 3-4 results, English-dominant)
- Intent: how-to, tutorial — a perfect match

## Step 2 — Ask AI For An Outline

\`\`\`
Create a detailed outline for a blog post targeting the Hindi query "AI se resume kaise banaye".

Requirements:
- 1500-2000 words target
- Structured for a Google featured snippet (numbered steps)
- Include an FAQ section (5 Qs)
- 3 internal link opportunities to related topics
- H2, H3 hierarchy

The audience: Indian job seekers, aged 22-35, varying tech familiarity.
Tone: professional English with Indian context.

Return the outline as markdown with just headings — no content yet.
\`\`\`

Lock the outline. Edit where you have real insights.

## Step 3 — Draft Section-By-Section

Don't ask the model for the full blog at once — quality drops. Go section by section:

\`\`\`
Write the intro and section 1 of the blog based on this outline:

[paste outline]

Target section: "Why Your Resume Matters"

Requirements:
- 150-200 words for the intro
- 250-300 words for section 1
- Professional English tone
- Include 1-2 real examples (not generic "John Doe")
- Short paragraphs (2-3 sentences max — mobile readers)
\`\`\`

## Step 4 — Human Edit Layer

Common issues in AI drafts:
1. **Generic examples**: replace with Indian names, cities, companies
2. **Repetition**: the same point phrased three ways — cut to one
3. **Fake statistics**: "88% of users prefer..." — remove or cite a source
4. **Boilerplate intros**: "In today's fast-paced world..." — CUT
5. **Hallucinated tools**: the model may mention a tool that doesn't exist — verify every product or service name

Editing rules:
- For each paragraph after generation: cut one line, add one line of genuine insight
- Replace examples: "Mumbai-based engineer Rahul" instead of a generic name
- Add screenshots and images (Unsplash free, or Midjourney)

## Step 5 — Add What AI Can't

These push rankings:
- **Personal story** — "I tried it myself and here's what happened" (an E-E-A-T signal)
- **India-specific data** — Naukri.com stats, LinkedIn India reports
- **Regional context** — "Candidates from UP-Bihar should note this"
- **Screenshots** — step-by-step with the actual tool UI
- **Video embed** — your own YouTube Short embedded

## Step 6 — Structured Data (Schema Markup)

Tell Google the article structure:

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "AI Se Resume Kaise Banaye — Complete Guide",
  "image": "https://yoursite.com/cover.jpg",
  "datePublished": "2026-04-15",
  "author": {"@type": "Person", "name": "Rohit Sharma"},
  "publisher": {
    "@type": "Organization",
    "name": "Your Blog",
    "logo": {"@type": "ImageObject", "url": "https://yoursite.com/logo.png"}
  }
}
</script>
\`\`\`

Add FAQ schema too — it helps featured snippets.

## Step 7 — Internal Linking

The AI suggested 3 related topics in the outline — turn them into internal links:
- "[7 free resume-building tools](/resume-free-tools/)"
- "[How to optimise your LinkedIn profile](/linkedin-profile-tips/)"
- "[AI-assisted interview prep](/ai-interview-prep/)"

Google infers topical authority from the internal link graph.

## Step 8 — Title + Meta Description

Title tag (max 60 chars):
\`\`\`
AI Se Resume Kaise Banaye — Free ChatGPT Guide 2026
\`\`\`

Meta description (155 chars):
\`\`\`
Build a professional resume in 10 minutes with ChatGPT. ATS-friendly templates, sample prompts, Indian format — free. Step-by-step guide inside.
\`\`\`

Include queries naturally. Don't keyword-stuff.

## Step 9 — Publish + Indexing

1. Submit to [Google Search Console](https://search.google.com/search-console) → URL Inspection → Request Indexing
2. Ping IndexNow (Bing / Yandex)
3. Share on WhatsApp, Telegram, LinkedIn (a traffic signal)
4. Link from an existing high-traffic post (authority flow)

Typical timeline: indexed within 1-3 days, ranking stabilises in 2-4 weeks.

## Content Calendar Idea

Posting 30 days / 30 quality articles isn't sustainable. Realistic:
- **2 posts/week** — research + AI draft + edit = 4-6 hours total
- **Monthly pillar post** (3000+ words, ultimate guide)

Six months of consistent posting → 50-60 posts → meaningful traffic (5-10K monthly).

## Tools Stack

- **ChatGPT** ([Go is free in India through Dec 2026](/news/chatgpt-go-free-indian-users-december-2026/))
- **Claude** for longer or nuanced articles
- **Midjourney** ([Bollywood poster style](/tutorials/midjourney-v8-bollywood-poster-design/)) for featured images
- **Grammarly** (free) for grammar
- **Hemingway Editor** for readability
- **Google Trends** for topic timing

## Avoid These Patterns

- Generating 10 articles on the same day (Google detects the pattern)
- Word-for-word English-to-Hindi translation (robotic — use Hinglish naturally when target audience expects it)
- Only stock photos (add 1-2 unique images per post)
- Click-bait titles (short-term CTR up, long-term CTR down when users bounce)
- No author bio (E-E-A-T requires a real human)

## The 10-Month Reality

- First 3 months: 30-40 articles, slow ranking
- Months 4-6: meaningful organic traffic starts (1-3K/mo)
- Months 7-12: with consistency, 10-50K/mo possible
- Year 2+: with backlinks + E-E-A-T, 100K+

Content compounds. Be patient.`,
    category: "business",
    level: "intermediate",
    tags: ["SEO", "Blogging", "Content Marketing", "AI Writing"],
    image: IMG.chat,
    imageAlt: "Content creation workspace",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-03",
    readingTime: 10,
    toolsUsed: ["chatgpt", "claude"],
  },
];
