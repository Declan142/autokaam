import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const claude: Tutorial[] = [
  {
    slug: "claude-code-setup-india",
    title: "Claude Code Setup in India — Install, Pricing (INR), and Your First Project",
    subtitle: "Anthropic's CLI coding agent — Rs 1,660/mo Pro or Rs 20/hr API — a walkthrough for Indian developers",
    excerpt: "A complete guide to installing Claude Code — Anthropic's official CLI for pair programming — from India. Pricing in INR, auth setup, and a walkthrough of your first terminal-driven project.",
    body: `Claude Code is Anthropic's command-line coding agent — the official way to drive Claude Opus 4.6 from a terminal. For Indian developers, it's a different approach from Cursor or Copilot: terminal-native, file-aware, git-aware, with a 1M context window.

## Why Try It

**Cursor** is IDE-based (a VS Code fork). **Claude Code** is terminal-based. If you:
- Work over SSH on remote servers
- Live in tmux or neovim
- Have a git-heavy workflow (commits, PRs, reviews)
- Navigate large codebases

...then Claude Code is a natural fit.

## Install Steps

Prerequisite: Node 18+. Claude Code installs from npm:

\`\`\`bash
npm install -g @anthropic-ai/claude-code

# or with bun
bun install -g @anthropic-ai/claude-code
\`\`\`

Verify:

\`\`\`bash
claude --version
\`\`\`

## Authentication (India Setup)

Two options:

### Option 1 — Claude Pro / Max Subscription (Recommended For Most)

- **Pro**: $20/mo (~Rs 1,660). Daily message budget, Claude Opus 4.6 access, typical Claude Code usage covered.
- **Max (5x)**: $100/mo (~Rs 8,300). 5x limits, priority.
- **Max (20x)**: $200/mo (~Rs 16,600). 20x limits.

Sign up at [claude.ai](https://claude.ai), subscribe, then in your terminal:

\`\`\`bash
claude
# First run → prompts for login → browser opens → auth flow
\`\`\`

### Option 2 — API Key (Pay-As-You-Go)

Create an API key on the Anthropic console at [console.anthropic.com](https://console.anthropic.com)

\`\`\`bash
export ANTHROPIC_API_KEY="sk-ant-..."
# Add to .bashrc / .zshrc for persistence
\`\`\`

Pricing for Opus 4.6:
- Input: $15/M tokens (~Rs 1,245)
- Output: $75/M tokens (~Rs 6,225)
- A typical 1-hour coding session: Rs 50-200

The Pro subscription is usually better value unless you use it only occasionally.

## Your First Project — A Real Walkthrough

Navigate to a sample Next.js app:

\`\`\`bash
cd ~/my-project
claude
\`\`\`

Prompt (type in the terminal):

\`\`\`
Read src/app/page.tsx and refactor it into smaller components.
Create src/components/ with logical splits.
Update imports. Run tsc --noEmit to verify no errors.
\`\`\`

Claude Code will:
1. Read the page file
2. Propose a plan
3. Ask for permission on each edit
4. Create components
5. Run the type check

You can approve or reject each step.

## Pro Tips For An Indian Setup

### 1. GitHub Integration
\`\`\`bash
gh auth login
# Claude can now read PRs, issues, create commits
\`\`\`

### 2. Slash Commands
Useful commands in Claude Code:
- \`/compact\` — summarize long conversations
- \`/init\` — generate a CLAUDE.md for the project
- \`/review\` — review a git diff

### 3. The CLAUDE.md File
Add a \`CLAUDE.md\` in the project root — Claude Code always reads it:

\`\`\`markdown
# Project Context

## Stack
- Next.js 15 + TypeScript + Tailwind
- PocketBase backend
- Deployed on Cloudflare Pages

## Conventions
- Use cn() helper for className merges
- One component per file in src/components/
- No Docker — direct installs only
\`\`\`

### 4. Indian Network / VPN
On some ISPs, routes to Anthropic are slow. Cloudflare WARP (free) usually fixes it:

\`\`\`bash
# Ubuntu/Debian
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg
# ... then install warp-cli
warp-cli register
warp-cli connect
\`\`\`

## When to Use Claude Code vs Cursor

- **Terminal / SSH / vim**: Claude Code
- **Visual file browsing / debugger**: Cursor
- **Large refactors across many files**: Claude Code (the 1M context handles it)
- **Quick autocomplete while typing**: Cursor or Copilot

You can use both in parallel — Claude Code for planning, Cursor for typing.

## Monitoring Your Quota

Pro hits rate limits. Check status:

\`\`\`
/status
\`\`\`

It shows daily usage. Note that the Claude.ai chat and Claude Code draw on separate quotas.

## Troubleshooting

- **"Not logged in"**: \`claude logout\` then restart with \`claude\`
- **Rate limited**: upgrade to Max or switch to an API key for overflow
- **Slow responses**: try WARP VPN
- **Changes not saving**: check file permissions, or use the \`--dangerously-skip-permissions\` flag (carefully)

Claude Code is a proper daily driver for Indian developers. Also see the [Cursor vs Copilot comparison](/tutorials/cursor-vs-copilot-2026/) for a decision framework.`,
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
    title: "Claude Prompt Engineering for Indian Business Use Cases",
    subtitle: "Structured prompts, Indic language handling, and patterns that consistently work in the Indian context",
    excerpt: "Prompt engineering for Claude Opus 4.6 through the lens of Indian use cases — multilingual outputs, regional handling, business document templates, and legal analysis patterns.",
    body: `Claude Opus 4.6 is a frontier model, but its real value is unlocked when you prompt it in a structured way. Indian use cases add an extra layer: languages mix, cultural context matters, and business documents follow local formats. This guide covers the patterns that work.

## The Anthropic Prompt Template

Anthropic's recommended format uses XML tags:

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
1. Unusual clauses for the Indian context
2. Terms against the freelancer's interests
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

XML tags help Claude parse the prompt cleanly. GPT-style system prompts also work, but XML is Anthropic-native.

## Pattern 1 — Professional English Output

For Indian business audiences, professional English with regional context works best:

\`\`\`
Respond in clear, professional English.
Use Indian examples (cities, companies, currencies in INR) where relevant.
Tone: conversational but professional, as if explaining to a colleague.
\`\`\`

This produces clean, accessible output suitable for most Indian business contexts.

## Pattern 2 — Indic Language Native

For pure Hindi or regional content (e.g., when using Sarvam or native-language use cases):

\`\`\`
Entire response must be in Hindi (Devanagari script).
Use the formal "aap" register, suitable for business contexts.
Avoid transliterated English words where natural Hindi exists.
Length: 300-400 words.
\`\`\`

For truly native fluency in Hindi, [Sarvam AI](/tutorials/sarvam-hindi-banking-voice-automation/) is the better tool. Claude handles Hindi well, but not at Sarvam-grade fluency.

## Pattern 3 — Structured Business Output

For invoice analysis, contract review, or financial summaries:

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

Structured output drops directly into your code.

## Pattern 4 — Long Document Handling

The 1M context window is Claude Opus 4.6's edge. For large docs:

\`\`\`
<instruction>
I'm attaching a 200-page contract.
DO NOT summarize the entire document.
Instead, find these 5 specific items and quote the relevant section verbatim:

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

Specific extraction beats vague summaries.

## Pattern 5 — Chain-of-Thought For Indian Legal

For complex queries (tax, compliance, labour law):

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
Flag anywhere a CA / CS should confirm.
</thinking_style>
\`\`\`

## Pattern 6 — Persona Consistency

For ongoing agents (blog writer, customer support), define a persona:

\`\`\`xml
<persona>
Name: Asha
Role: Customer support agent for TaxWalaAI
Tone: Warm, patient, technically precise
Always: use formal English; offer to switch to Hindi/Tamil/Telugu if the user indicates preference
Never: use Western-centric examples (use INR, Indian cities, Indian cultural references)
Signature: always end with "— Asha, TaxWalaAI team"
</persona>
\`\`\`

Inject this persona at the start of each conversation for consistency.

## Pattern 7 — Safety Rails For The Indian Context

Certain topics need extra care:
- Religious / political opinions
- Regional stereotypes
- Caste references
- Bollywood celebrities (defamation risk)

Add instructions like:

\`\`\`
Do not make statements about specific individuals that could be defamatory under Indian law.
If asked about political parties or religious groups, provide only factual information with sources.
\`\`\`

## Debugging Prompts

Output not what you expected? Check these first:
1. **Temperature** — Claude Code defaults to 0, which works for most tasks. For creative work, go to 0.7+
2. **Task specificity** — "Write a marketing email" vs "Write a 120-word marketing email for a B2B SaaS launch in Bangalore"
3. **Examples** — one or two (few-shot) examples pin down the output format

Claude's full API docs: [docs.anthropic.com](https://docs.anthropic.com). For the terminal use case, see [Claude Code setup](/tutorials/claude-code-setup-india/).`,
    category: "claude",
    level: "intermediate",
    tags: ["Claude", "Prompt Engineering", "Business", "India"],
    image: IMG.chat,
    imageAlt: "AI chat interface",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-10",
    readingTime: 9,
    toolsUsed: ["claude", "sarvam-ai"],
  },
];
