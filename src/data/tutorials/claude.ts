import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const claude: Tutorial[] = [
  {
    slug: "claude-code-setup-india",
    title: "Claude Code Setup India — Install, Pricing (INR), Aur Pehla Project",
    subtitle: "Anthropic ka CLI coding agent — Rs 1,660/mo Pro ya Rs 20/hr API, India se kaise start karein",
    excerpt: "Claude Code (Anthropic's official CLI for pair programming) India se install karne ka complete guide. Pricing breakdown INR mein, auth setup, pehla terminal project walkthrough.",
    body: `Claude Code Anthropic ka command-line coding agent hai — Claude Opus 4.6 ko terminal se drive karne ka official way. Indian developers ke liye ye Cursor / Copilot se alag approach hai: terminal-native, file edits, git-aware, 1M context.

## Ye Kyun Try Karo

**Cursor** IDE-based hai (VS Code fork). Claude Code **terminal-based** hai. Agar tum:
- SSH / remote servers pe kaam karte ho
- Tmux / neovim setup hai
- Git-heavy workflow (commits, PRs, reviews)
- Large codebases navigate karte ho

...to Claude Code natural fit hai.

## Install Steps

Prerequisite: Node 18+. Claude Code npm se install hota hai:

\`\`\`bash
npm install -g @anthropic-ai/claude-code

# or with bun
bun install -g @anthropic-ai/claude-code
\`\`\`

Version check:

\`\`\`bash
claude --version
\`\`\`

## Authentication (India Setup)

Do options hain:

### Option 1 — Claude Pro / Max Subscription (Recommended for Most)

- **Pro**: $20/mo (~Rs 1,660). Daily message budget, Claude Opus 4.6 access, Claude Code unlimited typical usage
- **Max (5x)**: $100/mo (~Rs 8,300). 5x higher limits, priority
- **Max (20x)**: $200/mo (~Rs 16,600). 20x limits

Sign up at [claude.ai](https://claude.ai) → subscribe → terminal mein:

\`\`\`bash
claude
# First run → prompts for login → browser opens → auth flow
\`\`\`

### Option 2 — API Key (Pay-as-you-go)

Anthropic console pe API key banao: [console.anthropic.com](https://console.anthropic.com)

\`\`\`bash
export ANTHROPIC_API_KEY="sk-ant-..."
# .bashrc / .zshrc mein add karo for persistence
\`\`\`

Pricing Opus 4.6 ke liye:
- Input: $15/M tokens (~Rs 1,245)
- Output: $75/M tokens (~Rs 6,225)
- Typical 1-hour coding session: Rs 50-200

Pro subscription usually better value unless tum occasionally use karte ho.

## Pehla Project — Real Walkthrough

Ek sample Next.js app mein navigate karo:

\`\`\`bash
cd ~/my-project
claude
\`\`\`

Prompt (terminal mein type):

\`\`\`
Read src/app/page.tsx and refactor it into smaller components.
Create src/components/ with logical splits.
Update imports. Run tsc --noEmit to verify no errors.
\`\`\`

Claude Code:
1. Page file read karega
2. Plan propose karega
3. Permission maangega har edit ke liye
4. Components create karega
5. Type check run karega

Tum approve / reject har step pe kar sakte ho.

## Pro Tips India Setup

### 1. GitHub Integration
\`\`\`bash
gh auth login
# Claude can now read PRs, issues, create commits
\`\`\`

### 2. Slash Commands
Claude Code mein useful commands:
- \`/compact\` — long conversations summarize
- \`/init\` — CLAUDE.md banao project ke liye
- \`/review\` — git diff review karo

### 3. CLAUDE.md File
Project root mein \`CLAUDE.md\` banao — Claude Code ise hamesha padta hai:

\`\`\`markdown
# Project Context

## Stack
- Next.js 15 + TypeScript + Tailwind
- PocketBase backend
- Deployed on Cloudflare Pages

## Conventions
- Use \`cn()\` helper for className merges
- Components in src/components/, one per file
- No Docker — direct installs only
\`\`\`

### 4. Indian Network / VPN
Kuch ISPs pe Anthropic routes slow ho sakte hain. Cloudflare WARP (free) usually fix kar deta hai:

\`\`\`bash
# Ubuntu/Debian
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg
# ... then install warp-cli
warp-cli register
warp-cli connect
\`\`\`

## When To Use Claude Code vs Cursor

- **Terminal / SSH / vim**: Claude Code
- **Visual file browsing / debugger**: Cursor
- **Big refactors across many files**: Claude Code (1M context handles it)
- **Quick autocomplete while typing**: Cursor / Copilot

Dono parallel bhi use kar sakte ho — main Claude Code for planning, Cursor for typing.

## Quota Monitoring

Pro subscription pe rate limits hit hote hain. Check:

\`\`\`
/status
\`\`\`

Daily usage dikhata hai. Free Claude.ai chat different bucket hai — Claude Code quota alag track hota hai.

## Troubleshooting

- **"Not logged in"**: \`claude logout\` then \`claude\` restart
- **Rate limited**: Upgrade to Max or switch to API key for overflow
- **Slow responses**: WARP VPN try karo
- **Changes not saving**: Check file permissions, ya --dangerously-skip-permissions flag (careful)

Claude Code proper daily driver tool hai Indian developers ke liye. [Cursor vs Copilot comparison](/tutorials/cursor-vs-copilot-2026/) se decision framework bhi check karo.`,
    category: "claude",
    level: "intermediate",
    tags: ["Claude Code", "CLI", "Anthropic", "Developer Tools", "India"],
    image: IMG.coding,
    imageAlt: "Developer coding in terminal",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-14",
    readingTime: 8,
    toolsUsed: ["claude", "cursor"],
    featured: true,
  },
  {
    slug: "claude-prompt-engineering-indian-use-cases",
    title: "Claude Prompt Engineering — Indian Business Use Cases Ke Liye",
    subtitle: "Karo Hindi-English mixed prompts, structured outputs, aur Indic language handling",
    excerpt: "Claude Opus 4.6 ke liye prompt engineering, but Indian use cases ke lens se — Hindi outputs, regional language handling, business document templates, legal analysis patterns.",
    body: `Claude Opus 4.6 frontier model hai, par uska max value unlock tabhi hota hai jab tum structured prompting karo. Indian use cases mein additional layer hai: bhasha mixed hoti hai, cultural context matter karta hai, aur business documents local format follow karte hain. Ye guide un patterns ko cover karta hai.

## The Anthropic Prompt Template

Anthropic ka official format XML tags use karta hai:

\`\`\`xml
<role>
You are a legal analyst specializing in Indian contract law.
</role>

<context>
I'm a freelancer being asked to sign an NDA with a Bangalore startup.
The NDA covers 5 years post-termination.
</context>

<task>
Review the attached NDA and flag:
1. Unusual clauses for Indian context
2. Terms that are against freelancer interests
3. Specific negotiation points
</task>

<output_format>
Return as markdown:
- ## Executive Summary (2-3 lines)
- ## Red Flags (bulleted)
- ## Suggested Edits (clause-by-clause)
- ## Negotiation Script (sample email to founder)
</output_format>

<document>
[paste NDA text]
</document>
\`\`\`

XML tags Claude ko clearly parse karne mein help karte hain. GPT-style system prompts bhi work karte hain, but XML Anthropic-native hai.

## Pattern 1 — Hinglish Output

Tumhara audience Hindi samjhta hai but English bhi chalega. Claude ko instruct karo:

\`\`\`
Respond in Hinglish — primarily English with Hindi phrases for concepts that Indians commonly express in Hindi (e.g., "jugaad," "bhai-behen," "seedha bolo").
Use Devanagari script only when quoting proverbs or cultural sayings.
Tone: conversational, like explaining to a WhatsApp group.
\`\`\`

Ye professional writing ke liye bahut clean output deta hai.

## Pattern 2 — Indic Language Native

Sarvam use karte waqt ya direct Hindi content ke liye:

\`\`\`
Entire response must be in Hindi (Devanagari script).
Use formal "aap" register suitable for business context.
Avoid transliterated English words where natural Hindi exists.
Length: 300-400 shabd.
\`\`\`

Pure Hindi output chahiye to [Sarvam AI](/tutorials/sarvam-hindi-banking-voice-automation/) better hai for native fluency. Claude pure Hindi mein acha hai but Sarvam-grade nahi.

## Pattern 3 — Structured Business Output

Invoice analysis, contract review, ya financial summary:

\`\`\`xml
<output_format>
Return JSON:
{
  "summary": "2-line exec summary",
  "redFlags": [{"clause": "...", "severity": "high|medium|low", "reason": "..."}],
  "suggestedEdits": [{"original": "...", "proposed": "..."}],
  "overallRecommendation": "proceed|negotiate|reject"
}
</output_format>
\`\`\`

Structured output tumhare code mein directly use ho sakta hai.

## Pattern 4 — Long Document Handling

1M context Claude Opus 4.6 ka edge hai. Large docs efficiently process karne ke liye:

\`\`\`
<instruction>
I'm attaching a 200-page contract.
DO NOT summarize the entire document.
Instead, find these specific 5 items and quote the relevant section verbatim:

1. Termination conditions
2. Auto-renewal clauses
3. Liability caps (in INR if specified)
4. IP assignment terms
5. Dispute resolution jurisdiction

Return each as:
## [Item Name]
> [verbatim quote]
**Page**: [number]
**Interpretation**: [1-2 line plain English]
</instruction>
\`\`\`

Specific extraction >> vague summary.

## Pattern 5 — Chain of Thought for Indian Legal

Complex queries (tax, compliance, labor law) ke liye:

\`\`\`
<task>
Walk me through whether I can hire a contractor in Dubai while being a registered Indian LLP.
</task>

<thinking_style>
Before answering, think through:
1. FEMA implications
2. GST on cross-border services
3. TDS obligations under Section 195
4. Treaty benefits (India-UAE DTAA)

Show your reasoning step-by-step, then give a final checklist.
Flag where a CA / CS should confirm.
</thinking_style>
\`\`\`

## Pattern 6 — Persona Consistency

Agar tum Claude ko ongoing ambassador banate ho (blog writer, customer support), persona define karo:

\`\`\`xml
<persona>
Name: Asha
Role: Customer support agent for TaxWalaAI
Tone: Warm, patient, technically precise
Always: Use "aap" form. Offer to switch to Hindi/Tamil/Telugu if user indicates preference.
Never: Use Western-centric examples (use INR, Indian cities, Indian cultural references)
Signature: Always end with "— Asha, TaxWalaAI team"
</persona>
\`\`\`

Har conversation ke start mein ye persona inject karo — consistency mil jayegi.

## Pattern 7 — Safety Rails for India Context

Certain topics Indian context mein extra care chahiye:
- Religious / political opinions
- Regional stereotypes
- Caste references
- Bollywood celebrities (defamation risk)

Instruction add karo:

\`\`\`
Do not make statements about specific individuals that could be defamatory under Indian law.
If user asks opinions on political parties or religious groups, provide only factual information with sources.
\`\`\`

## Debugging Prompts

Output expected nahi mila? Pehle ye check karo:
1. **Temperature** — Claude Code pe default 0 work karta hai mostly. Creative tasks ke liye 0.7+
2. **Task specificity** — "Write a marketing email" vs "Write a 120-word marketing email for a B2B SaaS launch in Bangalore"
3. **Examples** — 1-2 examples (few-shot) output format define karte hain

Claude's full API docs: [docs.anthropic.com](https://docs.anthropic.com). Aur [Claude Code setup](/tutorials/claude-code-setup-india/) terminal use case ke liye.`,
    category: "claude",
    level: "intermediate",
    tags: ["Claude", "Prompt Engineering", "Hinglish", "Business"],
    image: IMG.chat,
    imageAlt: "AI chat interface",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-10",
    readingTime: 9,
    toolsUsed: ["claude", "sarvam-ai"],
  },
];
