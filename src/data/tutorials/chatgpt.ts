import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const chatgpt: Tutorial[] = [
  {
    slug: "ai-se-resume-kaise-banaye-chatgpt",
    title: "AI Se Resume Kaise Banaye — ChatGPT Se 10 Minute Mein Professional CV",
    subtitle: "Step-by-step guide: skill bullets se ATS-optimized resume tak, wo bhi free mein",
    excerpt: "ChatGPT ki madad se professional resume banao 10 minute mein. ATS keywords, Indian format, fresher se senior tak har profile ke liye sample prompts aur templates.",
    body: `Resume ek marketing document hai, biography nahi. Recruiter 6-7 seconds mein decide kar leta hai ki aage padhna hai ya nahi. ChatGPT is gap ko efficiently bhar deta hai — tum bulletproof draft banao, human polish karo, done.

## Kya Chahiye Start Karne Ke Liye

- ChatGPT account (free tier kaafi hai, \`chat.openai.com\`)
- Existing resume ya LinkedIn profile (jo bhi ho)
- Target job description (us role ki ek listing copy karo)
- 15 minutes focused time

## Step 1 — Apna Context Dump Karo

ChatGPT ko ek structured dump dena hai — uska quality tumhare resume ka quality define karega. Template:

\`\`\`
You are a senior tech recruiter. I need to build an ATS-optimized resume for an Indian job market.

My background:
- Name: Rohit Sharma
- Current role: Software Engineer at TCS (3 years)
- Education: B.Tech CSE, DTU, 2022
- Skills: Python, React, AWS, Docker, PostgreSQL
- Achievements: Reduced API latency by 40%, led migration of 12 microservices
- Target role: Senior Software Engineer at product companies

Give me 5 strong resume bullet points for my TCS role — quantified, action verbs, outcome-focused. Indian rupee amounts where relevant.
\`\`\`

Notice: **achievements** section achievements ya projects specific banao. "Worked on backend" se kuch nahi milega; "Reduced p99 latency from 800ms to 180ms by adding Redis layer" — ye impact hai.

## Step 2 — Role-Specific Keywords Nikalo

ATS (Applicant Tracking System) keyword matching karta hai. Tumhari target JD ChatGPT mein paste karo aur bolo:

\`\`\`
Here's a job description. Extract the 15 most important technical and soft-skill keywords a resume must contain to pass an ATS screen.

[paste JD]
\`\`\`

Ab in keywords ko apne bullets mein naturally incorporate karo. Keyword stuffing mat karo — har 2-3 keyword per bullet kaafi hain.

## Step 3 — Summary Likhwao

Top pe 2-3 line summary hoti hai. Iska formula:

**[Years] + [Role type] + [Top 3 skills] + [Big outcome]**

Prompt:

\`\`\`
Write a 3-line professional summary for my resume. Target: Senior Software Engineer, product companies.
Highlight: 3+ years Python/React/AWS, latency improvements, microservices leadership.
Tone: confident but not arrogant. Indian context.
\`\`\`

## Step 4 — Format Indian Recruiters Ke Liye

Indian market standards:
- **Photo**: NOT required (kuch companies avoid karti hain, neutral zone)
- **Pages**: 1 page fresher, 2 pages tak senior
- **Length**: 300-500 words
- **Order**: Summary → Experience → Skills → Education → Projects → Certifications

## Step 5 — Final Review Prompt

Draft ready? Ek final pass:

\`\`\`
Review this resume against [JD]. Give me:
1. Gaps — what's missing for this role
2. Weak bullets — which should be rewritten
3. ATS score estimate (0-100)
4. Top 3 red flags a recruiter would spot

[paste resume]
\`\`\`

## Pro Tips

- **Avoid generic buzzwords** — "team player," "hard worker" skip karo
- **Numbers beat adjectives** — "improved performance" vs "cut build time from 12 min to 3 min"
- **Save as PDF** with "FirstName_LastName_Resume.pdf" format
- **LinkedIn mein same resume ka excerpt** daalo, consistency matter karti hai

ChatGPT free tier is task ke liye perfectly enough hai. Agar tum advanced prompts + file uploads chahte ho to [ChatGPT Go](/news/chatgpt-go-free-indian-users-december-2026/) (India mein free) check karo.

For claude users, [Claude prompt engineering for Indians](/tutorials/claude-prompt-engineering-indian-use-cases/) parallel guide hai.`,
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
    title: "ChatGPT For GST Filing & Accounting — Small Business Owner's Handbook",
    subtitle: "HSN codes, input credit, GSTR-1 vs GSTR-3B — AI se samjho without a CA bill",
    excerpt: "Small business owners ke liye ChatGPT se GST compliance handle karne ka practical guide. HSN lookups, invoice templates, filing checklist — all without CA consultation for routine queries.",
    body: `Chhote business owners ke liye GST ek ongoing pain hai. Monthly filings, input credit reconciliation, HSN code lookups — har confusion par CA ko paisa dena sustainable nahi hai. ChatGPT routine queries ke liye surprisingly capable hai, par boundaries samjhna zaroori hai.

## Pehle Disclaimer

ChatGPT tax consultant nahi hai. Ye teen cheezon mein bahut acha hai:
1. **Definition aur concept explain karna** (e.g., "ITC reversal kya hota hai?")
2. **Document format aur templates** (e.g., "GST-compliant invoice ka structure")
3. **Checklists aur reminders** (e.g., "GSTR-1 filing ke liye kya chahiye?")

Ye teen cheezon mein bad hai:
1. Real-time rate lookup (rates change hote hain, AI outdated ho sakta hai — GST portal verify karo)
2. Specific legal advice (court cases, notices, litigation)
3. Filing actually submit karna (ye tum GSTN portal pe karte ho)

## Use Case 1 — HSN Code Lookup

Client ko invoice banana hai, product ka HSN code confirm karna hai. Prompt:

\`\`\`
I'm selling "handwoven cotton sarees" in India. What's the likely HSN code and applicable GST rate? Also list 2-3 related HSN codes in case mine is wrong.
\`\`\`

ChatGPT usually 4-5 digit HSN aur 5%/12% rate suggest karega. Verify on [cbic-gst.gov.in](https://cbic-gst.gov.in) before invoice finalize karo.

## Use Case 2 — GST Invoice Template

Compliant invoice ka format:

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

Template ko Google Docs mein paste karo, har client ke liye reuse.

## Use Case 3 — Input Tax Credit Reconciliation

Ye ek confusing topic hai. ChatGPT concept explain kar sakta hai:

\`\`\`
Explain ITC reconciliation in simple terms:
1. What is GSTR-2B and how does it differ from GSTR-2A
2. What happens if my purchase invoice doesn't show in supplier's GSTR-1
3. Step-by-step monthly reconciliation process
4. Common mistakes small businesses make
\`\`\`

## Use Case 4 — Filing Checklist

Monthly rhythm build karo:

\`\`\`
Create a GST compliance calendar for a small Indian business (under Rs 5 cr turnover). List every GST-related deadline in a month, what form, what's due. Format as a checklist.
\`\`\`

Output use karke Google Calendar mein reminders set karo.

## Use Case 5 — Error Decoding

GSTN portal se notices aate hain jinmein cryptic codes hote hain. Paste prompt:

\`\`\`
I got this GST notice. Explain in plain English what it means, what my options are, and whether I need a CA:

[paste notice text]
\`\`\`

Warning: **Actual notice response draft karte waqt CA involve karo.** ChatGPT pe blindly notice reply karna galat hai.

## Sanity Checks

Har response ke saath ye karo:
1. **Date check** — ChatGPT knowledge cutoff puchho, agar purana hai to current rate verify karo
2. **Cross-check with portal** — HSN/rates hamesha [CBIC website](https://cbic-gst.gov.in) se confirm
3. **CA for edge cases** — turnover bada hai, multi-state hai, exports hain → human expert

## Free vs Paid

Free tier (GPT-4o mini) ye saari use cases handle kar leta hai. Paid (ChatGPT Plus/Go) sirf tab chahiye agar:
- Tumhe bahut saare queries roz karni hain
- File upload chahiye (invoice PDFs analyze karna)
- Longer context chahiye

Indian users ke liye [ChatGPT Go free hai December 2026 tak](/news/chatgpt-go-free-indian-users-december-2026/).`,
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
    title: "ChatGPT Plus Vs ChatGPT Go (India) — Kaunsa Lena Hai?",
    subtitle: "Rs 399/mo vs Rs 1,999/mo vs Free — feature comparison aur honest recommendation",
    excerpt: "ChatGPT Go (India-only, free till Dec 2026) vs Plus vs Free tier. Kaun kiske liye best, kya miss karoge, aur realistic usage patterns ke basis pe decision framework.",
    body: `OpenAI ne India ke liye "ChatGPT Go" ek dedicated tier launch ki hai, aur December 2026 tak free kar di hai. Agar tum confused ho ki Plus lena hai ya Go enough hai ya free tier bhi kaam chalata hai — ye guide clear karega.

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

### Free tier — Sufficient for:
- Occasional questions (5-10 per day)
- Casual drafting (emails, short paragraphs)
- Basic code help
- Study / research for homework

**Limitation**: 10-15 message rate limit daily. Agar tum regular use karte ho to frustrating.

### ChatGPT Go — Sweet spot for most Indians:
- Students doing projects (100 messages/day enough hai)
- Freelancers drafting content / code
- Small business owners
- Anyone doing regular AI-assisted work

**Tumhe milta hai Rs 1,999/mo Plus ka ~80% value, Rs 0 mein.** No-brainer until Dec 2026.

### Plus (Rs 1,999/mo) — Worth it only if:
- Tum developer ho jo roz 200+ messages fire karta hai
- Long-context chahiye (128k+ tokens)
- GPT-5.4 chahiye (frontier model, better reasoning)
- Advanced image gen (DALL-E 3 unlimited)
- Custom GPTs build karne hain
- File uploads bahut heavy hain (large PDFs, spreadsheets)

## Real Usage Patterns

**Student / Fresher**: Go > Plus. 100 msg/day >> homework aur projects ke liye.

**Freelance content writer**: Go adequate hai. Agar 50k+ word projects handle karte ho consistently, tab Plus.

**Developer** (backend / frontend): Plus ya [Claude Code](/tutorials/claude-code-setup-india/) better — dono coding-centric. ChatGPT coding OK hai but Anthropic/Cursor lead kar rahe.

**Business owner / GST / accounting**: Go kaafi hai. [GST tutorial](/tutorials/chatgpt-gst-filing-accounting-india/) wali use cases easily handle karta hai.

**Heavy researcher** (reports, whitepapers): Plus. Long context + file upload + projects feature bahut mafiya hai.

## How To Sign Up ChatGPT Go In India

1. Go to [chatgpt.com](https://chatgpt.com)
2. Sign up with Indian mobile number (+91)
3. Settings → Subscription → should show "ChatGPT Go — Free" badge
4. Agar dikhta nahi, mobile number + region India verified hai ye confirm karo

## December 2026 Ke Baad?

OpenAI announce kar chuki hai ki Go free period tak hai. Post-Dec 2026, pricing ~Rs 399/mo rakhne ki planning hai (official nahi yet, reports se). Tab bhi Plus ka 1/5 price.

## Bottom Line

- Har Indian user ko **ChatGPT Go** enable karna chahiye (free + best value)
- Developer ya heavy user ho → **Plus** ka trial karo 1 month
- Occasional use ho → **Free** chalao, zaroorat padi to upgrade karna easy hai

Aur agar tum Claude se compare kar rahe ho, [Claude vs ChatGPT detailed breakdown](/compare/chatgpt-vs-claude/) check karo.`,
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
