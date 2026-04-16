import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const chatgpt: Tutorial[] = [
  {
    slug: "ai-se-resume-kaise-banaye-chatgpt",
    title: "How to Build a Professional Resume With ChatGPT in 10 Minutes",
    subtitle: "From skill bullets to an ATS-optimized CV — free, fast, and Indian-market ready",
    excerpt: "Use ChatGPT to build a professional resume in ten minutes. ATS keywords, Indian-format conventions, and sample prompts that work for freshers and senior candidates alike.",
    body: `A resume is a marketing document, not a biography. A recruiter decides in 6-7 seconds whether to keep reading. ChatGPT efficiently closes that gap — you produce a strong first draft, you polish it, done.

## What You Need To Start

- A ChatGPT account (the free tier is plenty — \`chat.openai.com\`)
- Your existing resume or LinkedIn profile (whichever you have)
- A target job description (copy one listing for the role you want)
- 15 focused minutes

## Step 1 — Dump Structured Context

Give ChatGPT a structured brief — its quality defines your resume's quality. Template:

\`\`\`
You are a senior tech recruiter. I need to build an ATS-optimized resume for the Indian job market.

My background:
- Name: Rohit Sharma
- Current role: Software Engineer at TCS (3 years)
- Education: B.Tech CSE, DTU, 2022
- Skills: Python, React, AWS, Docker, PostgreSQL
- Achievements: Reduced API latency by 40%, led migration of 12 microservices
- Target role: Senior Software Engineer at product companies

Give me 5 strong resume bullet points for my TCS role — quantified, action verbs, outcome-focused. Indian rupee amounts where relevant.
\`\`\`

Note: **make achievements or projects specific**. "Worked on backend" says nothing; "Reduced p99 latency from 800ms to 180ms by adding a Redis layer" is impact.

## Step 2 — Extract Role-Specific Keywords

An ATS (Applicant Tracking System) matches keywords. Paste your target JD into ChatGPT:

\`\`\`
Here's a job description. Extract the 15 most important technical and soft-skill keywords a resume must contain to pass an ATS screen.

[paste JD]
\`\`\`

Incorporate those keywords naturally into your bullets. Don't keyword-stuff — two or three keywords per bullet is plenty.

## Step 3 — Write The Summary

The top of a resume has a 2-3 line summary. Formula:

**[Years] + [Role type] + [Top 3 skills] + [Big outcome]**

Prompt:

\`\`\`
Write a 3-line professional summary for my resume. Target: Senior Software Engineer, product companies.
Highlight: 3+ years Python/React/AWS, latency improvements, microservices leadership.
Tone: confident but not arrogant. Indian context.
\`\`\`

## Step 4 — Format For Indian Recruiters

Indian-market conventions:
- **Photo**: not required (some companies explicitly avoid it; neutral zone)
- **Pages**: one page for freshers, up to two pages for senior candidates
- **Length**: 300-500 words
- **Order**: Summary → Experience → Skills → Education → Projects → Certifications

## Step 5 — Final Review Prompt

Draft ready? Do one final pass:

\`\`\`
Review this resume against [JD]. Give me:
1. Gaps — what's missing for this role
2. Weak bullets — which should be rewritten
3. ATS score estimate (0-100)
4. Top 3 red flags a recruiter would spot

[paste resume]
\`\`\`

## Pro Tips

- **Skip generic buzzwords** — "team player," "hard worker" add no information
- **Numbers beat adjectives** — "improved performance" loses to "cut build time from 12 min to 3 min"
- **Save as PDF** using "FirstName_LastName_Resume.pdf" format
- **Mirror content on LinkedIn** — consistency matters

The ChatGPT free tier handles this task comfortably. If you want advanced prompts and file uploads, [ChatGPT Go](/news/chatgpt-go-free-indian-users-december-2026/) is free in India through December 2026.

Claude users can follow the parallel [Claude prompt engineering guide](/tutorials/claude-prompt-engineering-indian-use-cases/).`,
    category: "chatgpt",
    level: "beginner",
    tags: ["Resume", "ChatGPT", "Career", "ATS", "Job Search"],
    image: IMG.study,
    imageAlt: "Student working on resume with laptop",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-15",
    readingTime: 6,
    toolsUsed: ["chatgpt", "claude"],
    featured: true,
  },
  {
    slug: "chatgpt-gst-filing-accounting-india",
    title: "ChatGPT for GST Filing and Accounting — A Small Business Handbook",
    subtitle: "HSN codes, input credit, GSTR-1 vs GSTR-3B — what AI can cover without a CA bill",
    excerpt: "A practical guide to using ChatGPT for routine GST compliance. HSN lookups, invoice templates, and a monthly filing checklist — without needing a CA consultation for every question.",
    body: `GST is an ongoing pain for small business owners. Monthly filings, input credit reconciliation, HSN code lookups — paying a CA for every confusion isn't sustainable. ChatGPT is surprisingly capable for routine queries, but it's important to know the boundaries.

## First, A Disclaimer

ChatGPT is not a tax consultant. It is strong at three things:
1. **Explaining concepts and definitions** (e.g., "What is ITC reversal?")
2. **Generating document formats and templates** (e.g., "the structure of a GST-compliant invoice")
3. **Producing checklists and reminders** (e.g., "what's required for a GSTR-1 filing?")

It is weak at three things:
1. Real-time rate lookup (rates change; the model may be out of date — verify on the GST portal)
2. Specific legal advice (court cases, notices, litigation)
3. Actually submitting filings (you do that on the GSTN portal)

## Use Case 1 — HSN Code Lookup

A client needs an invoice and you want to confirm the HSN code. Prompt:

\`\`\`
I'm selling "handwoven cotton sarees" in India. What's the likely HSN code and applicable GST rate? Also list 2-3 related HSN codes in case mine is wrong.
\`\`\`

ChatGPT will usually suggest a 4-5 digit HSN and a 5% or 12% rate. Verify on [cbic-gst.gov.in](https://cbic-gst.gov.in) before finalising the invoice.

## Use Case 2 — GST Invoice Template

A compliant invoice format:

\`\`\`
Create a GST-compliant invoice template in markdown for an Indian business. Must include:
- Invoice number and date
- Seller GSTIN, address, state
- Buyer GSTIN, address, state
- HSN code per line item
- CGST/SGST or IGST split
- Total with taxable value breakdown
- Place of supply
- Digital signature placeholder
\`\`\`

Paste the output into Google Docs and reuse it per client.

## Use Case 3 — Input Tax Credit Reconciliation

This is a notoriously confusing topic. Ask ChatGPT to explain the concept:

\`\`\`
Explain ITC reconciliation in simple terms:
1. What is GSTR-2B and how does it differ from GSTR-2A
2. What happens if my purchase invoice doesn't show in the supplier's GSTR-1
3. Step-by-step monthly reconciliation process
4. Common mistakes small businesses make
\`\`\`

## Use Case 4 — Filing Checklist

Build a monthly rhythm:

\`\`\`
Create a GST compliance calendar for a small Indian business (under Rs 5 cr turnover). List every GST-related deadline in a month, what form, what's due. Format as a checklist.
\`\`\`

Take the output and create Google Calendar reminders for each deadline.

## Use Case 5 — Decoding Notices

GSTN portal notices come with cryptic codes. Paste and ask:

\`\`\`
I got this GST notice. Explain in plain English what it means, what my options are, and whether I need a CA:

[paste notice text]
\`\`\`

Warning: **always involve a CA when drafting an actual response to a notice.** Blind-replying to a notice based on ChatGPT output is a bad idea.

## Sanity Checks

For every response:
1. **Date check** — ask ChatGPT about its knowledge cutoff; if it's old, verify current rates
2. **Cross-check with the portal** — HSN codes and rates from [CBIC](https://cbic-gst.gov.in)
3. **CA for edge cases** — large turnover, multi-state operations, or exports → human expert

## Free vs Paid

The free tier (GPT-4o mini) handles all of the above. Upgrade to Plus or Go only if:
- You're running many queries daily
- You need file upload (to analyse invoice PDFs)
- You need longer context

For Indian users, [ChatGPT Go is free through December 2026](/news/chatgpt-go-free-indian-users-december-2026/).`,
    category: "business",
    level: "intermediate",
    tags: ["GST", "ChatGPT", "Small Business", "Accounting", "India"],
    image: IMG.rupee,
    imageAlt: "Rupee notes representing business finance",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-12",
    readingTime: 7,
    toolsUsed: ["chatgpt"],
  },
  {
    slug: "chatgpt-plus-vs-chatgpt-go-india",
    title: "ChatGPT Plus vs ChatGPT Go (India) — Which Tier Should You Pick?",
    subtitle: "Rs 399/mo vs Rs 1,999/mo vs free — a feature comparison and an honest recommendation",
    excerpt: "ChatGPT Go (India-only, free through December 2026), Plus, and the free tier compared. Who each one is best for, what you miss at each tier, and a decision framework based on realistic usage.",
    body: `OpenAI has launched a dedicated "ChatGPT Go" tier for India and kept it free through December 2026. If you're confused about whether Plus is worth it, whether Go is enough, or whether the free tier will do — this guide will make the decision clear.

## Three Tiers — Quick Summary

| Feature | Free | ChatGPT Go (India) | ChatGPT Plus |
|---------|------|-------------------|--------------|
| **Price** | Rs 0 | Rs 0 (until Dec 2026) | Rs 1,999/mo |
| **Model** | GPT-4o mini | GPT-4o | GPT-4o + GPT-5.4 |
| **Messages/day** | 10-15 | 100 | Unlimited |
| **File upload** | Limited | Yes | Yes |
| **Image gen** | 3/day | 10/day | Unlimited |
| **Voice** | Yes | Yes | Yes (advanced) |
| **Custom GPTs** | Limited | Yes | Yes + build |
| **Projects** | No | Yes | Yes |
| **Priority speed** | No | No | Yes |

## Decision Framework

### Free tier — sufficient for:
- Occasional questions (5-10 per day)
- Casual drafting (emails, short paragraphs)
- Basic code help
- Homework research

**Limitation**: a daily cap of 10-15 messages. If you use it regularly, it's frustrating.

### ChatGPT Go — the sweet spot for most Indians:
- Students doing projects (100 messages/day covers coursework)
- Freelancers drafting content or code
- Small business owners
- Anyone doing regular AI-assisted work

**You get roughly 80% of Plus's value at Rs 0.** A no-brainer through December 2026.

### Plus (Rs 1,999/mo) — worth it only if:
- You're a developer sending 200+ messages a day
- You need a long context window (128k+ tokens)
- You want GPT-5.4 specifically (frontier model, better reasoning)
- You want unlimited advanced image gen (DALL-E 3)
- You want to build custom GPTs
- Your file uploads are heavy (large PDFs, spreadsheets)

## Real Usage Patterns

**Student / fresher**: Go > Plus. 100 msg/day covers assignments and projects comfortably.

**Freelance content writer**: Go is enough. If you're consistently handling 50k+ word projects, consider Plus.

**Developer (backend/frontend)**: Plus — or [Claude Code](/tutorials/claude-code-setup-india/) — is usually the better pick. ChatGPT's coding is competent, but Anthropic/Cursor lead for development.

**Business owner / GST / accounting**: Go is plenty. The [GST tutorial](/tutorials/chatgpt-gst-filing-accounting-india/) covers what you need.

**Heavy researcher** (reports, whitepapers): Plus. Long context + file upload + the Projects feature are genuinely useful.

## How To Sign Up For ChatGPT Go In India

1. Go to [chatgpt.com](https://chatgpt.com)
2. Sign up with an Indian mobile number (+91)
3. Settings → Subscription → you should see the "ChatGPT Go — Free" badge
4. If you don't, confirm your number and region are correctly set to India

## What Happens After December 2026?

OpenAI has said Go is free through that date. Reports suggest post-December 2026 pricing will land around Rs 399/mo (not official). That's still about a fifth of Plus.

## Bottom Line

- Every Indian user should enable **ChatGPT Go** (free and best value)
- Developers or heavy users — try **Plus** for one month
- Occasional use — the **Free** tier is fine; upgrade is easy when needed

If you're also weighing Claude, see the [detailed ChatGPT vs Claude breakdown](/compare/chatgpt-vs-claude/).`,
    category: "chatgpt",
    level: "beginner",
    tags: ["ChatGPT", "ChatGPT Go", "Pricing", "India", "Comparison"],
    image: IMG.phone,
    imageAlt: "Phone showing ChatGPT app",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-08",
    readingTime: 5,
    toolsUsed: ["chatgpt"],
  },
];
