import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const business: Tutorial[] = [
  {
    slug: "whatsapp-ai-chatbot-business-15-minutes",
    title: "WhatsApp AI Chatbot Sirf 15 Minute Mein — Business Ke Liye",
    subtitle: "Twilio + OpenAI/Sarvam se multilingual chatbot — bina coding ke workflow tools se bhi option",
    excerpt: "Small business owners ke liye: Twilio WhatsApp Business API + AI chatbot connect karne ka quickest path. Code + no-code dono options covered.",
    body: `WhatsApp India mein 500M+ users hain, customer pehle hi WhatsApp pe hai. Manual reply karna expensive hai, aur time-gated bhi (aadhi raat customer message kare to?). AI chatbot se 24/7 presence mil jati hai, aur setup 15 minutes ka hai agar right stack pick karo.

## Decision: Code vs No-Code

### No-Code Path (Faster but limited)
- **BotPenguin** (Indian, starts Rs 1,500/mo)
- **WATI** (Rs 2,800/mo)
- **Interakt** (Rs 999/mo, basic tier)

Pros: drag-drop, templates, 2-hour setup
Cons: hard to customize, recurring cost, limited AI depth

### Code Path (More Work But Flexible)
- Twilio WhatsApp Business API + your backend + AI API
- One-time setup effort, then infinite flexibility
- Cost: Rs 0.80-1.20 per conversation (Twilio) + AI costs

Hum code path cover karte hain because iski ceiling highest hai.

## Prerequisites

1. **WhatsApp Business Account** (verified with business docs)
2. **Twilio account** with WhatsApp enabled
3. **OpenAI/Claude/Sarvam API key**
4. **Server** (Cloudflare Workers free tier works, or Render/Railway)

## Step 1 — Twilio Setup (5 min)

1. [twilio.com/console](https://twilio.com/console) signup
2. Messaging → Try WhatsApp → scan QR with your WhatsApp Business
3. Get Account SID + Auth Token
4. Sandbox number given — production needs Facebook Business Manager approval (1-2 days later)

For development, Sandbox WhatsApp number works perfectly.

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
                "content": "You are a customer support agent for Acme Corp. Respond in the user's language (Hindi/English/mix). Be concise — WhatsApp messages should be short."
            },
            *history
        ],
        max_tokens=200
    )
    ai_response = completion.choices[0].message.content

    # Save history (truncate to last 10 messages)
    history.append({"role": "assistant", "content": ai_response})
    conversations[user_id] = history[-10:]

    # Return Twilio response
    resp = MessagingResponse()
    resp.message(ai_response)
    return str(resp)
\`\`\`

## Step 3 — Deploy (5 min)

### Option A: Cloudflare Workers
\`\`\`bash
wrangler deploy
\`\`\`
Free tier 100k requests/day — enough for most small businesses.

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

Get your public URL (e.g., \`https://mybot.onrender.com\`).

## Step 4 — Connect Twilio → Your URL

Twilio Console → WhatsApp Sandbox → "When a message comes in" → paste your URL + \`/whatsapp\` → save.

Test: send "Hi" to Twilio WhatsApp number → AI replies within seconds.

## Enhance With Tool Use

Simple chatbot boring hai. Add actual business actions:

\`\`\`python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "check_order_status",
            "description": "Check status of an order by order ID",
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

# In completion call:
completion = openai_client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[...],
    tools=TOOLS,
    tool_choice="auto"
)

# Handle tool calls (check_order_status DB lookup etc.)
\`\`\`

Ye tumhare chatbot ko actually useful bana deta hai — orders check karne, demos book karne, leads capture karne.

## Multilingual Handling

India mein 10+ languages audience ho sakta hai. System prompt:

\`\`\`
You are multilingual. Detect the user's language and respond in the same language:
- Hindi (Devanagari or Hinglish)
- Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi
- English

Match their register. Use polite form ("aap" in Hindi, formal "neenga" in Tamil).
\`\`\`

For stronger regional fluency, swap OpenAI for [Sarvam AI](/tutorials/sarvam-hindi-banking-voice-automation/) — Indian languages better.

## Cost Analysis (1000 messages/day)

- Twilio: Rs 1/conversation × 1000 = Rs 1,000/day
- OpenAI GPT-4o-mini: ~Rs 0.05/msg × 1000 = Rs 50/day
- Server: Rs 0 (CF Workers free) or Rs 500/mo (Render)

**Monthly: ~Rs 30,500 for 30k conversations**

Vs human agent: Rs 15,000-25,000/month per agent, 8-hour coverage.

AI: 24/7, 10x volume, same cost.

## Common Pitfalls

1. **Rate limiting**: Twilio free tier low, upgrade karo jab scale ho
2. **Long responses**: WhatsApp truncates, keep under 1,000 chars
3. **Conversation drift**: Save only last 10 messages, older ones summarize
4. **Sensitive info**: Credit card, passwords — NEVER expose to LLM, redact before sending
5. **Fallback path**: "Human agent chahiye?" always offer

## Move to Production

1. Facebook Business verification (1-2 days)
2. Twilio Sandbox → production number
3. WhatsApp approved message templates for proactive notifications
4. Add analytics (how many messages, conversion rate, satisfaction)
5. Build admin dashboard (messages log, human takeover button)

## No-Code Alternative

Agar tum code nahi karna chahte:
- **Zapier + OpenAI + WhatsApp**: Zapier flow \`WhatsApp message → OpenAI → reply\`. Rs 2,000-5,000/mo depending on volume.
- **Make.com (formerly Integromat)**: similar, slightly cheaper

## Scale Up Patterns

- **Queue system**: Redis + worker for async processing
- **Conversation branching**: quick replies, button flows (Twilio supports)
- **Persistent memory**: save customer info to your CRM automatically
- **Voice messages**: WhatsApp audio → STT → LLM → TTS back

WhatsApp chatbot Indian businesses ke liye single highest ROI AI investment hai. 15 minutes ka setup, 24/7 value.`,
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
    title: "AI Se Hindi Blog Likhwao — SEO-Ready Hinglish Article",
    subtitle: "Google-friendly Indian content: keyword research se publish tak, AI-assisted but not AI-slop",
    excerpt: "Hindi/Hinglish content mein SEO karne ka complete workflow. AI se draft, human polish, structured data. Ranking tactics that actually work for Indian search intent.",
    body: `Hindi / Hinglish content India mein sabse underserved hai. English blogs are oversaturated, but "kaise banaye," "kya hota hai," "kyun zaroori hai" queries har roz crore log search karte hain — supply kam hai. AI se tum volume produce kar sakte ho, par agar Google ki guidelines ke against chale to penalize bhi ho jaoge.

## Pehli Warning — AI Slop Avoid Karo

Google March 2024 core update ne AI-generated thin content ko heavy penalty di. Indian sites jo "ChatGPT se 100 articles roz" generate karte the, wo de-ranked ho gaye.

**Rule**: AI draft karega, human edit karega aur unique value add karega. Pure AI output publish nahi.

## Step 1 — Keyword Research (Hindi-Hinglish)

### Free Tools:
- **Google Search Console** (agar site live hai, queries data)
- **Google Suggest** — "paneer banane ka" type karo, suggestions dekho
- **AnswerThePublic** — Hindi queries mein OK data
- **Ubersuggest** free tier

### Target Queries Find Karo

Good Hindi-Hinglish queries:
- "... kya hota hai"
- "... kaise banaye"
- "... ke fayde"
- "... vs ... difference"
- "best ... in India 2026"

Example target: **"AI se resume kaise banaye"**

Volume: ~2,400/month India
Competition: Low (only 3-4 results English-dominant)
Intent: How-to, tutorial — perfect match

## Step 2 — Outline AI Se Nikalwao

\`\`\`
Create a detailed outline for a Hindi/Hinglish blog post targeting the query "AI se resume kaise banaye".

Requirements:
- 1500-2000 words target
- Structured for Google featured snippet (numbered steps)
- Include FAQ section (5 Qs)
- 3 internal link opportunities to related topics
- H2, H3 hierarchy

The audience: Indian job seekers, 22-35 age, varying tech familiarity.
Tone: Hinglish (primary English, Hindi phrases woven in naturally).

Return the outline as markdown with just headings — no content yet.
\`\`\`

AI ka output outline lock karo. Changes karo jahan insights hain tumhare apne.

## Step 3 — Draft Section-By-Section

Ek baar mein pura blog mat likhwao — quality drops hoti hai. Section-by-section:

\`\`\`
Write the intro and section 1 of the blog based on this outline:

[paste outline]

Target section: "Resume Kyun Important Hai?"

Requirements:
- 150-200 words for intro
- 250-300 words for section 1
- Hinglish tone
- Include 1-2 genuine examples (not "for example, John Doe")
- Short paragraphs (2-3 sentences max — mobile readers)
\`\`\`

## Step 4 — Human Edit Layer

AI drafts mein common issues:
1. **Generic examples**: replace with Indian names, cities, companies
2. **Repetition**: same point phrased 3 ways → cut to 1
3. **Fake statistics**: "88% of users prefer..." → remove or cite source
4. **Boilerplate intros**: "In today's fast-paced world..." → CUT
5. **Hallucinated tools**: AI may mention a tool that doesn't exist — verify every product / service name

Edit rules:
- Har paragraph after generation: ek line cut, ek line add (genuine insight)
- Examples replace: "Mumbai-based engineer Rahul" instead of generic
- Add screenshots / images (Unsplash free, or generate via Midjourney)

## Step 5 — Add Layers That AI Can't

Ye cheezein add karne se ranking jumps:
- **Personal story** — "maine khud try kiya aur ye result aaya" (E-E-A-T signal)
- **India-specific data** — Naukri.com stats, LinkedIn India reports
- **Regional context** — "UP-Bihar ke candidates ke liye ye tip alag"
- **Screenshots** — step-by-step with actual tool UI
- **Video embed** — YouTube Short tumhara hai to embed karo

## Step 6 — Structured Data (Schema Markup)

Google ko article structure batao:

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

FAQ schema bhi add karo — featured snippets ke liye.

## Step 7 — Internal Linking

AI ne outline mein 3 related topic suggest kiye — inhe internal links banao:
- "[resume banane ke 7 free tools](/resume-free-tools/)"
- "[LinkedIn profile optimize karna](/linkedin-profile-tips/)"
- "[interview prep AI se](/ai-interview-prep/)"

Google internal link graph se topical authority infer karta hai.

## Step 8 — Title + Meta Description

Title tag (60 chars max):
\`\`\`
AI Se Resume Kaise Banaye — Free ChatGPT Guide 2026
\`\`\`

Meta description (155 chars):
\`\`\`
10 minute mein professional resume banao ChatGPT se. ATS-friendly templates, Hinglish prompts, aur Indian format — bilkul free. Step-by-step guide inside.
\`\`\`

Queries ko title mein natural include. Don't keyword stuff.

## Step 9 — Publish + Indexing

1. Submit to [Google Search Console](https://search.google.com/search-console) → URL Inspection → Request Indexing
2. IndexNow ping (Bing / Yandex ke liye)
3. Share on WhatsApp / Telegram / LinkedIn (traffic signal)
4. Link from existing high-traffic post (internal authority flow)

Typical timeline: indexed within 1-3 days, ranking stabilizes in 2-4 weeks.

## Content Calendar Idea

30 days / 30 posts sustainable nahi hai agar quality maintain karni hai. Realistic:
- **2 posts/week** — research + AI draft + edit = 4-6 hrs total
- **Pillar post monthly** (3000+ words, ultimate guide)

6 months consistent posting → 50-60 posts → meaningful traffic (5-10K monthly).

## Tools Stack

- **ChatGPT** ([Go free in India till Dec 2026](/news/chatgpt-go-free-indian-users-december-2026/))
- **Claude** for longer / nuanced articles
- **Midjourney** ([Bollywood poster style](/tutorials/midjourney-v8-bollywood-poster-design/)) for featured images
- **Grammarly** (free) for grammar check
- **Hemingway Editor** for readability
- **Google Trends** for topic timing

## Avoid These Patterns

- Generate 10 articles same day (Google pattern-detects)
- Perfect English-to-Hindi translation (sounds robotic, use Hinglish naturally)
- Stock photos only (add 1-2 unique images per post)
- Click-bait titles (CTR boost short-term, CTR drop long-term when users bounce)
- No author bio (E-E-A-T demands real human)

## The 10-Month Reality

Pehle 3 months: 30-40 articles, ranking slow
Months 4-6: meaningful organic traffic starts (1-3K/mo)
Months 7-12: if consistent, 10-50K/mo possible
Year 2+: with backlinks + E-E-A-T, 100K+

Content compounds. Patient raho.`,
    category: "business",
    level: "intermediate",
    tags: ["SEO", "Blogging", "Hindi Content", "AI Writing", "Content Marketing"],
    image: IMG.chat,
    imageAlt: "Content creation workspace",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-03",
    readingTime: 10,
    toolsUsed: ["chatgpt", "claude"],
  },
];
