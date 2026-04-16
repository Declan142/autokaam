import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const coding: Tutorial[] = [
  {
    slug: "cursor-vs-copilot-2026",
    title: "Cursor vs GitHub Copilot 2026 — Which Should Indian Developers Pick?",
    subtitle: "Agent workflows, INR pricing, team collaboration — a detailed decision framework",
    excerpt: "Cursor 3 (the unified agent workspace) vs GitHub Copilot Workspace. Feature comparison, pricing in INR, when to pick each, and migration tips. An honest take on both.",
    body: `Cursor 3 and Copilot Workspace have both matured through 2026. Both are AI-first IDEs, but their philosophies differ sharply. For an Indian developer, the decision matters — you want a monthly subscription that bills cleanly in INR, and a team workflow that fits.

## 30-Second Summary

| Criteria | Cursor 3 | Copilot Workspace |
|----------|----------|-------------------|
| **Base IDE** | VS Code fork | Inside GitHub.com + VS Code |
| **Pricing** | $20/mo (~Rs 1,660) Pro | $19/mo (~Rs 1,580) Business |
| **Model access** | Claude, GPT-5, Gemini | GPT-5 + Claude (select tiers) |
| **Offline mode** | No | Limited |
| **Agent capability** | Native multi-step | Task-based |
| **Best for** | Solo + startups | Teams with a GitHub-heavy workflow |

## Cursor 3 — The Agent-First Approach

Cursor 3's "Composer" mode is upgraded — it handles multi-file refactors in a single conversation. Real usage:

\`\`\`
You: Add authentication to all /api routes using NextAuth

Cursor:
1. Reads next.config.ts, package.json, existing routes
2. Plans: install next-auth, create [...nextauth].ts, add middleware
3. Shows diffs for 4 files
4. You approve / reject per file
\`\`\`

**Strengths**:
- Planning step before action (you see the full diff before applying)
- Multi-model selector (Claude Opus for refactors, GPT-5 for speed, Gemini for cost)
- Codebase indexing — semantic search across the repo
- Bug-fix mode — paste an error, get an auto-patch

**Weaknesses**:
- Paid-only for serious use (free tier is limited)
- Latency can be jittery on Indian networks
- Separate IDE — a learning curve if you have a lot of VS Code extensions

## Copilot Workspace — The GitHub-Native Approach

Copilot Workspace lives inside GitHub.com. Open an issue, click "Start work" on the side, and Copilot plans the implementation.

Real flow:

\`\`\`
- Open a GitHub issue
- Click "Copilot Workspace"
- Copilot reads issue + repo → proposes a plan
- You edit the plan
- Copilot generates code for the plan
- Creates a PR automatically
\`\`\`

**Strengths**:
- **Zero setup** — works right in the browser
- **Team-ready** — PRs created, reviewable, standard GitHub flow
- **GitHub integration** — Actions, issues, discussions all connected
- **Enterprise compliance** — Microsoft's enterprise agreements are strong

**Weaknesses**:
- Locked to GitHub as a platform (Bitbucket / GitLab users lose out)
- Less hands-on iteration than Cursor
- Slower agent responses

## Feature-By-Feature

### Multi-File Edits
- **Cursor**: wins. Live multi-file diff visualization.
- **Copilot Workspace**: PR-based — good for isolation but slower feedback.

### Model Selection
- **Cursor**: 5+ models, switch mid-task. Great for cost optimisation (use Haiku for simple, Opus for complex).
- **Copilot**: limited to GPT + Claude tiers. Less granular.

### Indian Context
- **Cursor**: INR billing via Paddle, GST invoice auto-generated. Regional payment methods supported.
- **Copilot**: GitHub billing (USD). INR conversion at payment time; no separate GST invoice (enterprise admins handle that).

### Team Workflows
- **Cursor**: friendly for solo and small teams. No collab features beyond git.
- **Copilot**: team-first. PR reviews, issue linking, Slack/Teams notifications.

### Offline / Low-Connectivity
- **Cursor**: local model mode is still experimental (Llama via Ollama).
- **Copilot**: minimal offline. Bad on spotty networks.

## When To Pick Cursor 3

- Solo freelancer / founder
- Startup (2-10 devs)
- You want flexibility to experiment with models
- You already prefer VS Code shortcuts
- Working across varied codebases (Cursor's repo indexing is excellent)

## When To Pick Copilot Workspace

- Team of 10+ using GitHub heavily
- Enterprise compliance needs
- You prefer issue-driven workflows
- You want zero-setup onboarding for junior devs
- You're already paying for GitHub Enterprise

## Alternatives Worth Considering

- **[Claude Code](/tutorials/claude-code-setup-india/)** — terminal-based, 1M context, best for refactors
- **Aider** — open-source CLI alternative
- **Windsurf** (by Codeium) — a Cursor competitor with a generous free tier

## Migration Tips (Cursor → Copilot Or Vice Versa)

If you want to switch:

1. **Settings export** — in Cursor: \`Cmd+Shift+P\` → "Settings Sync." Copilot uses VS Code \`settings.json\` directly.
2. **Extensions** — most VS Code extensions work in Cursor. Reverse is true too.
3. **Keybindings** — both support VS Code format. One-line import.
4. **Model preferences** — not transferable, reconfigure in the new tool.

## Real Usage Cost Analysis

For a solo Indian dev working 6-8 hours a day:

| Scenario | Cursor 3 | Copilot Workspace |
|----------|----------|-------------------|
| Light usage (20 prompts/day) | Pro (~Rs 1,660/mo) | Pro (~Rs 830/mo) |
| Heavy usage (100+ prompts/day) | Pro Max (~Rs 16,600/mo) | Business (~Rs 1,580/mo) |
| Startup team (5 devs) | ~Rs 8,300/mo | ~Rs 7,900/mo |

## Bottom Line

For most **Indian solo developers, freelancers, and early-stage startup engineers**: **Cursor 3**.
For **established GitHub-heavy teams or enterprises**: **Copilot Workspace**.

If you live in the terminal, [Claude Code](/tutorials/claude-code-setup-india/) is a separate league.`,
    category: "coding",
    level: "intermediate",
    tags: ["Cursor", "Copilot", "AI Coding", "Developer Tools", "Comparison"],
    image: IMG.coding,
    imageAlt: "Developer coding environment",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-11",
    readingTime: 7,
    toolsUsed: ["cursor", "github-copilot", "claude"],
  },
];
