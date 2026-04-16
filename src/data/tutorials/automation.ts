import { Tutorial } from "@/lib/content-types";
import { IMG } from "../news/images";

export const automation: Tutorial[] = [
  {
    slug: "sarvam-hindi-banking-voice-automation",
    title: "Sarvam AI Se Hindi Voice Banking Bot Kaise Banayein",
    subtitle: "22 Indian bhashayon ka voice AI — IVR, customer support, aur regional outreach ke liye",
    excerpt: "Sarvam AI API se Hindi/regional language voice agent build karne ka complete guide. Banking use case walkthrough with code snippets and cost analysis.",
    body: `Sarvam AI India ka sabse credible foundational AI hai 22 Indian bhashayon ke liye. OpenAI / Anthropic pure Hindi mein acha hai, but Sarvam actually trained for Indic languages — voice quality, accent handling, code-switching (Hindi mein English words) sab native feel deta hai.

## Why Sarvam Over OpenAI For Regional

Quick comparison on Hindi voice:

| Task | OpenAI Voice | Sarvam Voice |
|------|-------------|--------------|
| Hindi pronunciation | Good but American accent leak | Native Indian |
| Code-switching | Okay | Excellent |
| Regional (Tamil, Telugu) | Weak | Native |
| Latency from India | 400-600ms | 150-300ms |
| Pricing | $0.03/min | ~Rs 1.50/min |

For Indian consumer-facing use cases, Sarvam wins on authenticity.

## Setup — API Access

1. [sarvam.ai](https://sarvam.ai) pe signup karo
2. Dashboard → API Keys → generate
3. Free tier: 1,000 minutes/month
4. Paid: ~Rs 1.50/min (voice)

Environment var:

\`\`\`bash
export SARVAM_API_KEY="sk-sarvam-..."
\`\`\`

## Use Case: Banking Balance Inquiry Voice Bot

Indian customer calls → Hindi bolta hai → wants balance.

### Architecture

\`\`\`
[Phone (Exotel/Twilio)]
         ↓
  [Your webhook (FastAPI)]
         ↓
  [Sarvam STT: audio → Hindi text]
         ↓
  [Intent classifier (Sarvam-30B)]
         ↓
  [Banking API (mock)]
         ↓
  [Sarvam TTS: response text → Hindi audio]
         ↓
  [Response to phone]
\`\`\`

### Step 1 — STT (Speech-to-Text)

\`\`\`python
import requests

def hindi_stt(audio_file_path: str) -> str:
    with open(audio_file_path, "rb") as f:
        files = {"file": f}
        response = requests.post(
            "https://api.sarvam.ai/speech-to-text",
            headers={"API-Subscription-Key": SARVAM_KEY},
            files=files,
            data={"language_code": "hi-IN", "model": "saarika:v2"}
        )
    return response.json()["transcript"]

# Example:
# Input audio: "Mera balance kya hai?"
# Output text: "मेरा balance क्या है?"
\`\`\`

Note: Sarvam code-switching (Hindi + English mix) automatically handle karta hai.

### Step 2 — Intent Classification

\`\`\`python
def classify_intent(text: str) -> dict:
    response = requests.post(
        "https://api.sarvam.ai/chat/completions",
        headers={"Authorization": f"Bearer {SARVAM_KEY}"},
        json={
            "model": "sarvam-30b",
            "messages": [
                {"role": "system", "content": "You are a banking assistant. Classify user queries into intents: balance, transfer, statement, help."},
                {"role": "user", "content": text}
            ],
            "response_format": {"type": "json_object"}
        }
    )
    return response.json()
\`\`\`

### Step 3 — Banking Action (Mock)

\`\`\`python
def get_balance(user_id: str) -> dict:
    # In production: call actual banking API
    return {"balance": 12500, "currency": "INR", "account": "XXXX1234"}
\`\`\`

### Step 4 — Response Generation

\`\`\`python
def generate_response(intent: dict, banking_data: dict) -> str:
    response = requests.post(
        "https://api.sarvam.ai/chat/completions",
        headers={"Authorization": f"Bearer {SARVAM_KEY}"},
        json={
            "model": "sarvam-30b",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a polite Hindi banking assistant. Respond in 2-3 sentences. Use formal 'aap' form. Amounts in rupees with 'rupay' word."
                },
                {
                    "role": "user",
                    "content": f"User asked: {intent}. Banking data: {banking_data}. Respond in Hindi."
                }
            ]
        }
    )
    return response.json()["choices"][0]["message"]["content"]
\`\`\`

### Step 5 — TTS (Text-to-Speech)

\`\`\`python
def hindi_tts(text: str) -> bytes:
    response = requests.post(
        "https://api.sarvam.ai/text-to-speech",
        headers={"API-Subscription-Key": SARVAM_KEY},
        json={
            "text": text,
            "target_language_code": "hi-IN",
            "speaker": "meera",  # Indian female voice
            "pitch": 0,
            "pace": 1.0,
            "loudness": 1.5,
            "speech_sample_rate": 22050,
            "enable_preprocessing": True,
            "model": "bulbul:v2"
        }
    )
    return response.json()["audios"][0]  # base64 audio
\`\`\`

### Full Pipeline

\`\`\`python
def handle_call(audio_input_path: str) -> bytes:
    user_text = hindi_stt(audio_input_path)
    intent = classify_intent(user_text)
    if intent["type"] == "balance":
        data = get_balance(user_id="USER_001")
    # ... handle other intents
    response_text = generate_response(intent, data)
    audio_response = hindi_tts(response_text)
    return audio_response
\`\`\`

## Phone Integration (Exotel)

Exotel Indian telephony leader hai. Webhook connect kar sakte ho:

\`\`\`yaml
# Exotel flow
- Record user audio (up to 30 sec)
- POST to your webhook with audio URL
- Your webhook downloads audio, calls handle_call()
- Returns audio response URL
- Exotel plays response to caller
\`\`\`

Total round trip: 3-5 seconds typical. Acceptable for banking use case.

## Cost Analysis (1000 calls/day)

- Average call: 2 minutes
- STT: 2 min × 1000 = 2000 min × Rs 0.50/min = Rs 1000
- TTS: 1 min × 1000 = 1000 min × Rs 1.00/min = Rs 1000
- LLM: 2 API calls × 1000 = 2000 × Rs 0.10 = Rs 200
- Exotel: Rs 0.50/call × 1000 = Rs 500

**Total: Rs 2,700/day (~Rs 81,000/month for 30k calls)**

Vs human call center: Rs 15-20/call = Rs 15,000-20,000/day. AI is **6-7x cheaper**.

## Regional Languages

Same code works for:
- Tamil: \`language_code: "ta-IN"\`
- Telugu: \`te-IN\`
- Bengali: \`bn-IN\`
- Marathi: \`mr-IN\`
- Gujarati: \`gu-IN\`
- Kannada: \`kn-IN\`
- Malayalam: \`ml-IN\`
- Punjabi: \`pa-IN\`
- Odia: \`or-IN\`

22 scheduled languages fully supported.

## Common Pitfalls

1. **Numbers spoken vs written**: "12,500" written but spoken as "bara hazar paanch sau" — Sarvam TTS handles preprocessing if \`enable_preprocessing: true\`
2. **Long text latency**: Break responses into <200 chars for faster TTS
3. **Accent drift**: Test with real users — some regional speakers may still have recognition errors
4. **Silence detection**: Include VAD in your phone integration

## Beyond Banking

- Government helplines (PMKVY, Ayushman Bharat)
- Telco customer support (Jio, Airtel)
- Agri-tech advisory (crop prices in regional languages)
- Healthcare triage

Sarvam ecosystem growing fast. [Recent $350M funding](/news/sarvam-ai-350m-funding-1-5b-valuation/) should mean more capabilities soon.`,
    category: "automation",
    level: "advanced",
    tags: ["Sarvam AI", "Voice AI", "Hindi", "Banking", "API"],
    image: IMG.phone,
    imageAlt: "Phone with voice AI interface",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-13",
    readingTime: 10,
    toolsUsed: ["sarvam-ai"],
    featured: true,
  },
  {
    slug: "deepseek-v32-cheap-api-automation",
    title: "DeepSeek V3.2 Se 98% Paise Bachao — Production Automation Setup",
    subtitle: "GPT-5.4 ka 90% performance 1/50th price mein — migration guide aur failover patterns",
    excerpt: "DeepSeek V3.2 ke disruptive pricing ka advantage uthao. Production setup, failover to Claude/GPT, cost comparison with real numbers. OpenRouter setup included.",
    body: `DeepSeek V3.2 ka release global AI pricing shake kar raha hai. 90% of GPT-5.4 performance at 1/50th price means agar tum production mein LLM calls kar rahe ho, maybe Rs 50,000/month Rs 1,000/month ho sakta hai. Ye tutorial real migration guide hai.

## Pricing Reality (as of April 2026)

| Model | Input (per 1M tokens) | Output (per 1M) | Indian INR approximate |
|-------|----------------------|-----------------|------------------------|
| GPT-5.4 | $5.00 | $20.00 | Rs 415 in / Rs 1,660 out |
| Claude Opus 4.6 | $15.00 | $75.00 | Rs 1,245 / Rs 6,225 |
| Claude Sonnet 4.5 | $3.00 | $15.00 | Rs 249 / Rs 1,245 |
| **DeepSeek V3.2** | **$0.14** | **$0.28** | **Rs 12 / Rs 23** |

Yes, **50x cheaper than GPT, 250x cheaper than Opus**.

## When DeepSeek Wins

- High-volume batch classification
- RAG (retrieval-augmented generation)
- Simple code completion
- Translation (including Indic)
- Sentiment analysis
- Structured extraction (JSON output)

## When It Doesn't Win

- Complex multi-step reasoning (Claude Opus still better)
- Tool use / agentic workflows (GPT-5.4 / Claude more reliable)
- Creative writing at frontier quality
- Adversarial safety (edge cases behavior)

## Setup — Two Paths

### Path 1 — Direct API

\`\`\`bash
# Signup at platform.deepseek.com
# Get API key
export DEEPSEEK_API_KEY="sk-..."
\`\`\`

Uses OpenAI-compatible format:

\`\`\`python
from openai import OpenAI

client = OpenAI(
    api_key=DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com/v1"
)

response = client.chat.completions.create(
    model="deepseek-v3.2",
    messages=[{"role": "user", "content": "Hello"}]
)
\`\`\`

### Path 2 — OpenRouter (Recommended)

OpenRouter one-key access to all models, easy failover:

\`\`\`python
client = OpenAI(
    api_key=OPENROUTER_KEY,
    base_url="https://openrouter.ai/api/v1"
)

response = client.chat.completions.create(
    model="deepseek/deepseek-chat-v3.2",
    messages=[...]
)
\`\`\`

Advantage: switch models via string, no re-wire code.

## Failover Pattern

Don't single-model in production. Sensible pattern:

\`\`\`python
MODEL_TIERS = [
    "deepseek/deepseek-chat-v3.2",  # Cheap, try first
    "anthropic/claude-sonnet-4.5",   # Mid, fallback
    "openai/gpt-5.4",                # Premium, last resort
]

def call_with_failover(messages, max_attempts=3):
    for model in MODEL_TIERS[:max_attempts]:
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                timeout=30
            )
            return response
        except Exception as e:
            log.warning(f"{model} failed: {e}")
    raise Exception("All models failed")
\`\`\`

## Cost Optimization Patterns

### 1. Task Router

\`\`\`python
def route_model(task_type: str) -> str:
    if task_type in ["classify", "extract", "translate"]:
        return "deepseek/deepseek-chat-v3.2"
    elif task_type in ["reason", "plan"]:
        return "anthropic/claude-sonnet-4.5"
    elif task_type == "creative":
        return "anthropic/claude-opus-4.6"
    return "deepseek/deepseek-chat-v3.2"
\`\`\`

Simple tasks → cheap model. Complex → expensive. Saves 80-95% typical.

### 2. Prompt Compression

DeepSeek 1M token context support karta hai but har token paid hai. Compress system prompts:

\`\`\`python
# BEFORE: 500 tokens system prompt
SYSTEM = """You are a customer service agent. You should be polite and helpful. You should..."""

# AFTER: 50 tokens
SYSTEM = "Customer service agent. Polite, concise, factual."
\`\`\`

### 3. Caching

DeepSeek prompt caching bhi support karta hai:

\`\`\`python
# Cache the system prompt; subsequent calls hit cache
response = client.chat.completions.create(
    model="deepseek-v3.2",
    messages=[
        {"role": "system", "content": LONG_SYSTEM, "cache_control": {"type": "ephemeral"}},
        {"role": "user", "content": user_query}
    ]
)
\`\`\`

75% discount on cached portion. Long system prompts + many queries = huge savings.

## Real Migration Case Study

A Bangalore SaaS startup was spending $2,000/month ($24,000/year) on GPT-5 for their customer ticket classification system.

**Before**: 100% GPT-5, average Rs 2 per ticket × 80,000 tickets/month = Rs 1.6 lakh/month.

**After migration to DeepSeek V3.2 for classification + GPT-5 for complex escalations**:
- 85% of tickets routed to DeepSeek: 68,000 × Rs 0.04 = Rs 2,720
- 15% complex escalations to GPT-5: 12,000 × Rs 2 = Rs 24,000

**Total: Rs 26,720/month. 83% reduction.**

## Safety / Quality Gates

Switching to cheaper model may drop quality. Setup monitoring:

\`\`\`python
# A/B test: 10% traffic on old model, compare outputs
if random.random() < 0.1:
    model = "openai/gpt-5.4"  # baseline
else:
    model = "deepseek/deepseek-chat-v3.2"

# Log to observability system for later comparison
log.info({"model": model, "input": input, "output": output, "latency": latency})
\`\`\`

After 1 week, analyze:
- Accuracy parity?
- Latency difference?
- User complaints increase?

If yes to complaints, route back complex queries to premium.

## Indian Language Quality

DeepSeek V3.2 surprising good in Hindi/Indic. For nuanced tasks still [Sarvam AI](/news/sarvam-ai-350m-funding-1-5b-valuation/) better. But for volume translation / classification in Hindi, DeepSeek cost advantage wins.

## Bottom Line

Production mein AI bills high ho rahe hain? DeepSeek + router pattern deploy karo. Quality maintain kar sakte ho with targeted failover. For most Indian startups, this is the single biggest cost optimization available in 2026.`,
    category: "automation",
    level: "advanced",
    tags: ["DeepSeek", "Cost Optimization", "Production", "API", "OpenRouter"],
    image: IMG.money,
    imageAlt: "Money and savings",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-05",
    readingTime: 9,
    toolsUsed: ["deepseek", "openrouter"],
  },
  {
    slug: "gemma-4-ollama-local-setup-india",
    title: "Gemma 4 Ko Apne Laptop Pe Chalao — Ollama Setup India",
    subtitle: "Google ke 31B open-source model ko Macbook/PC pe locally run karo — free aur private",
    excerpt: "Gemma 4 local inference setup with Ollama on Mac, Windows, Linux. Hardware requirements, performance benchmarks, use cases where local beats cloud.",
    body: `Gemma 4 (Google ka 31B open-source model) ne open-source leaderboards pe #3 spot liya hai. Aur sabse bada jhatka — ye apne laptop pe locally chal sakta hai, API cost zero, data private, unlimited usage.

## Hardware Requirements

Model size vs minimum RAM:

| Gemma 4 variant | Parameters | VRAM / RAM needed | Who can run |
|----------------|-----------|-------------------|-------------|
| Gemma 4 2B | 2B | 4 GB | Any laptop (CPU or entry GPU) |
| Gemma 4 9B | 9B | 12 GB | M1 Pro, RTX 3060+ |
| Gemma 4 31B | 31B | 24-48 GB | M2 Max, RTX 4090, workstation |

Indian market reality:
- Macbook Air M2 (16GB): 2B comfortably, 9B with tricks
- Macbook Pro M2/M3 (32GB+): 9B smooth, 31B possible (quantized)
- Gaming PC (RTX 4070+): 9B smooth, 31B with quantization

Agar tum 31B chahte ho cheap mein, Runpod/Vast.ai pe Rs 50-100/hr kiraye pe GPU mil jata hai.

## Install Ollama (One-liner)

### Mac:
\`\`\`bash
brew install ollama
\`\`\`

### Linux:
\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

### Windows:
Download from [ollama.com](https://ollama.com/download/windows)

Verify:
\`\`\`bash
ollama --version
\`\`\`

## Download Gemma 4

\`\`\`bash
# Start with 2B (smallest, fastest)
ollama pull gemma4:2b

# Or 9B (better quality, needs 12GB RAM)
ollama pull gemma4:9b

# Or 31B (full power, needs 24GB+)
ollama pull gemma4:31b

# Quantized versions (smaller, slightly lower quality)
ollama pull gemma4:9b-q4  # 4-bit, ~5GB RAM
ollama pull gemma4:31b-q4  # 4-bit, ~17GB RAM
\`\`\`

## First Run

\`\`\`bash
ollama run gemma4:9b

# Prompt:
> Explain in Hindi: what is cryptocurrency?
\`\`\`

Gemma 4 Hindi surprisingly decent handle karta hai — native fluency nahi Sarvam jaisi, but understandable.

## API Mode (For Integration)

Ollama local HTTP server bhi hai, OpenAI-compatible:

\`\`\`bash
# Serve in background
ollama serve
\`\`\`

Python client:

\`\`\`python
from openai import OpenAI

client = OpenAI(
    api_key="ollama",  # dummy key
    base_url="http://localhost:11434/v1"
)

response = client.chat.completions.create(
    model="gemma4:9b",
    messages=[{"role": "user", "content": "Hello"}]
)
\`\`\`

Your existing OpenAI/Claude SDK code just needs base_url swap. Zero code change.

## Where Local Beats Cloud

### 1. Data Privacy
- Legal documents, medical records, client PII → never leave your laptop
- India DPDP Act compliance easier for sensitive data

### 2. Unlimited Volume
- Roz 10,000 classifications chahiye? Cloud bill huge. Local: free.
- Agar tum content factory chala rahe ho — blog generation, product description, bulk tasks

### 3. Offline / Low-Connectivity
- Tier-3 cities patchy internet, local model zero dependency
- Train journeys, flights

### 4. Cost Predictability
- Monthly bill: Rs 0 (just electricity ~Rs 200/mo heavy use)
- No surprise charges

## Where Cloud Still Wins

- Complex reasoning chains (Gemma 4 9B << Claude Opus 4.6)
- Long context (Gemma 4 has 128k; Opus 1M)
- Tool use / agents
- Frontier quality writing

## Performance Benchmarks (My M2 Macbook Pro 32GB)

| Model | Tokens/sec | First token latency |
|-------|-----------|---------------------|
| Gemma 4 2B | 120 tok/s | ~150ms |
| Gemma 4 9B | 38 tok/s | ~400ms |
| Gemma 4 9B-q4 | 55 tok/s | ~300ms |

9B is the sweet spot — quality closer to Claude Sonnet, speed usable.

## Use Case — Local RAG System

Privacy-sensitive knowledge base pe RAG:

\`\`\`python
# Install local deps
# pip install chromadb langchain langchain-ollama

from langchain_ollama import ChatOllama
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings

embeddings = OllamaEmbeddings(model="nomic-embed-text")
vectorstore = Chroma(persist_directory="./chroma", embedding_function=embeddings)

# Ingest documents (run once)
# for pdf in pdfs: vectorstore.add_documents(chunks)

# Query
llm = ChatOllama(model="gemma4:9b", temperature=0)
relevant = vectorstore.similarity_search(query, k=3)
context = "\\n\\n".join([d.page_content for d in relevant])

response = llm.invoke(f"Context:\\n{context}\\n\\nQuestion: {query}")
\`\`\`

100% local, zero API calls. Perfect for legal firms, doctors, CAs with client data.

## Fine-Tuning Locally

Gemma 4 fine-tunable hai but needs more RAM. LoRA approach (10x less memory):

\`\`\`bash
# Install Unsloth (makes Gemma training 2x faster)
pip install unsloth

# Fine-tune script (simplified):
from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained("unsloth/gemma-4-9b-it")

# ... standard LoRA training with your data
\`\`\`

~4-6 hours on a single 4090 for domain-specific fine-tune.

## Privacy + Compliance Notes

- Gemma 4 license: Google's custom (commercial OK, some restrictions — read license)
- Your data stays local — no telemetry by default
- GDPR / DPDP friendly for Indian enterprises

## Alternative Models Worth Trying

Via \`ollama pull\`:
- \`llama3.3:70b\` — Meta's latest
- \`qwen2.5:72b\` — Chinese lab Alibaba, strong Hindi
- \`deepseek-r1:8b\` — reasoning specialist
- \`mistral-large:123b\` — European option

Switch karna 1 command hai.

## Bottom Line

2026 mein local AI practical ho gaya hai for real use cases. Privacy matters, bills huge hain, ya bulk work karna hai — Gemma 4 on Ollama ek 30-minute setup hai jo aage ke kai thousand rupees bachata hai.

[Gemma 4 launch news](/news/gemma-4-open-source-launch-google/) read karo broader context ke liye.`,
    category: "automation",
    level: "advanced",
    tags: ["Gemma", "Ollama", "Local AI", "Open Source", "Privacy"],
    image: IMG.aiChip,
    imageAlt: "AI chip hardware",
    author: "AutoKaam Editorial",
    publishedAt: "2026-04-04",
    readingTime: 8,
    toolsUsed: ["gemma"],
  },
];
