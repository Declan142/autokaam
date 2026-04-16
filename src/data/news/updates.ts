import { NewsArticle } from "@/lib/content-types";
import { IMG } from "./images";

export const updates: NewsArticle[] = [
{
    slug: "gemini-3-1-pro-750-million-users",
    title: "Gemini Hits 750 Million Users as 3.1 Pro Sets New GPQA Diamond Benchmark",
    subtitle: "Google's AI has grown from 500M to 750M users in six months, driven by integration across Workspace, Pixel, and Android. Gemini 3.1 Pro scored 94.3% on GPQA Diamond",
    excerpt: "Google Gemini has reached 750 million users, up from 500M in late 2025 — a 50% growth in six months. Concurrent with the milestone, Gemini 3.1 Pro hit 94.3% on the GPQA Diamond benchmark, setting a new high-water mark that beats GPT-5.2 and Claude Opus 4.6.",
    body: `Google announced Gemini has crossed 750 million users — a 50% growth from 500 million in late 2025. The scale is driven by deep integration across Google Workspace, Pixel devices, Android's system-level AI, and Search.

## Gemini 3.1 Pro Benchmark Leadership

Concurrent with the milestone, Gemini 3.1 Pro hit new high scores:

- **GPQA Diamond** (graduate-level science reasoning): **94.3%** — new high-water mark
- **Previous leaders**: GPT-5.2 at 92.4%, Claude Opus 4.6 at 91.3%
- **MMLU**: 92.3% (competitive with top models)
- **Indian language benchmark (Sarvam-Eval)**: 81% Hindi, respectable on major regional languages

GPQA Diamond is considered one of the hardest academic reasoning benchmarks — questions that take PhD-level experts hours to solve. Gemini 3.1 Pro's 94.3% is meaningfully ahead of competitors.

## How Gemini Reached 750M Users

The scale has multiple drivers:

**Google Workspace** (Gmail, Docs, Sheets, Slides): Gemini is now the default AI assistant in Workspace. For billions of Gmail users, Gemini is the AI they use whether they chose it or not.

**Android System AI**: On modern Android devices (Samsung Galaxy, Pixel, OnePlus), Gemini is the system-level AI. Google Assistant is fully replaced by Gemini.

**Pixel Drops**: The March 2026 Pixel Drop added Gemini App Actions — letting Gemini control apps directly. This is Google's most aggressive agentic AI move, giving them deeper phone integration than competitors.

**Search integration**: Gemini AI Overviews (previously Search Generative Experience) now power most Google searches. Over 1 billion searches per day show Gemini-generated responses.

**Free tier generosity**: Gemini's free tier is more capable than ChatGPT's free tier, making it accessible to casual users without paying.

## Why This Matters

**Market share shift**: Gemini has likely overtaken ChatGPT in total user count (ChatGPT claims ~700M weekly active). ChatGPT still leads in high-intent professional use; Gemini wins mass-market accessibility.

**Distribution advantage**: Google's distribution moat (Search, Workspace, Android) is hard to match. Even if OpenAI's models are technically better, Google's distribution ensures Gemini captures more users.

**Revenue implications**: Gemini Pro/Ultra subscriptions at $20/$40/month monetize heavy users. Combined with Workspace AI add-ons (priced per seat), Gemini is likely OpenAI's most direct revenue competitor.

## India-Specific Position

Gemini has particularly strong India momentum:

**Free access**: Gemini's base tier has been free for longer than ChatGPT. India users defaulted to Gemini before ChatGPT Go's promotional free tier launched.

**Android dominance**: India is an Android-heavy market (>95% share). System-level Gemini integration reaches nearly every Indian smartphone.

**Hindi quality**: Gemini 3.1 Pro's Hindi support is excellent — competitive with Claude and ahead of older ChatGPT models.

**INR pricing**: Gemini Advanced in India is priced at Rs 1,950/month via Google One AI Premium — similar to ChatGPT Plus and Claude Pro.

## What Users Should Do

**Casual users**: Free Gemini is excellent. No reason to pay unless you hit daily limits or need Deep Research mode.

**Professionals using Workspace**: Gemini Advanced via Google One is natural. The Workspace integration alone justifies the price.

**Developers**: Gemini Deep Research and Gemini Agents are legitimately useful. For non-Workspace professional users, consider ChatGPT Pro or Claude Pro alongside Gemini.

**Power users**: Subscribe to multiple tools. The productivity gain from having Claude, Gemini, and ChatGPT available outweighs the cost for anyone doing high-value knowledge work.

See our [Chat AI comparison](/category/chat/) for help choosing.

---

*Source: Tech Insider, State of AI Index 2026 (IEEE Spectrum), Google announcements (March-April 2026)*`,
    category: "updates",
    tags: ["Google", "Gemini", "LLM", "Market Share"],
    image: IMG.phone,
    imageAlt: "Smartphone displaying AI assistant interface",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-04",
    readingTime: 5,
    relatedTools: ["gemini", "chatgpt", "claude"],
  }
];
