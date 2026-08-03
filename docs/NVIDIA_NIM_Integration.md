# NVIDIA NIM Integration — Technical Reference

**Project**: RAMA · Dubai Real Estate Decision Platform
**Version**: 1.0 (August 2026)
**Architecture Layer**: AI & Data Processing Pipeline

---

## Table of Contents

1. [Overview](#1-overview)
2. [Environment Configuration](#2-environment-configuration)
3. [Core Wrapper — `nvidia-nim.ts`](#3-core-wrapper--nvidia-nimts)
4. [Pipeline 1 — Semantic Search (Vector Embeddings)](#4-pipeline-1--semantic-search-vector-embeddings)
5. [Pipeline 2 — AI Lead Scoring (LLM Structured Output)](#5-pipeline-2--ai-lead-scoring-llm-structured-output)
6. [Pipeline 3 — Document OCR & Verification (Multimodal Vision)](#6-pipeline-3--document-ocr--verification-multimodal-vision)
7. [Pipeline 4 — RAG-Augmented Chat (Embedding + OpenRouter)](#7-pipeline-4--rag-augmented-chat-embedding--openrouter)
8. [Database Schema (Supabase + pgvector)](#8-database-schema-supabase--pgvector)
9. [Test & Seed Scripts](#9-test--seed-scripts)
10. [Resilience & Error Handling](#10-resilience--error-handling)
11. [Production Deployment Checklist](#11-production-deployment-checklist)
12. [Cost & Rate Limit Analysis](#12-cost--rate-limit-analysis)
13. [Architecture Diagram](#13-architecture-diagram)
14. [Future Roadmap](#14-future-roadmap)

---

## 1. Overview

RAMA integrates **NVIDIA NIM (NVIDIA Inference Microservices)** as its primary AI backbone, powering four distinct pipelines:

| Pipeline | Model | Endpoint | Purpose |
|----------|-------|----------|---------|
| Semantic Search | `nvidia/nv-embed-v1` | `/v1/embeddings` | Convert property text → 4096-dim vectors for pgvector similarity search |
| Lead Scoring | `meta/llama-3.1-70b-instruct` | `/v1/chat/completions` | Analyze chat transcripts → HOT/WARM/COLD lead classification |
| Document OCR | `meta/llama-3.2-90b-vision-instruct` | `/v1/chat/completions` | Extract structured data from Ejari/Title Deed images |
| RAG Chat | `nvidia/nv-embed-v1` (embed) + OpenRouter (generate) | `/v1/embeddings` | Embed user queries → retrieve matching properties → augment LLM context |

**Why NVIDIA NIM over OpenAI/Anthropic?**

- **Enterprise-grade SLAs** with deterministic latency on NVIDIA infrastructure.
- **Open-weight models** (LLaMA 3.x) — no vendor lock-in, portable to self-hosted A100/H100 clusters.
- **Cross-lingual embedding** — `nv-embed-v1` natively handles Arabic + English without separate models.
- **Vision + Language** — A single NIM endpoint handles both OCR and chat completion.

---

## 2. Environment Configuration

All NVIDIA NIM keys live in `.env.local`. The `.env.example` must be updated to include these:

```bash
# NVIDIA NIM API Configuration
NVIDIA_NIM_API_KEY="nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Stripe (for B2B Agent subscription gating)
STRIPE_SECRET_KEY="sk_test_xxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
```

**Key Rotation**: NVIDIA NIM API keys are scoped per-project in the [NVIDIA Build Console](https://build.nvidia.com). Rotate keys quarterly. The key must have **Embeddings** and **Chat Completions** endpoint permissions enabled.

---

## 3. Core Wrapper — `nvidia-nim.ts`

**File**: [`lib/ai/nvidia-nim.ts`](file:///c:/dubai/rama/lib/ai/nvidia-nim.ts)

This is the single point of entry for all NVIDIA embedding operations. It exports a singleton `nvidiaNim` object.

### Key Features

| Feature | Implementation |
|---------|---------------|
| **Automatic Batching** | Splits large input arrays into chunks of `MAX_BATCH_SIZE` (100) to respect API limits |
| **Exponential Backoff** | `fetchWithRetry()` retries up to 3 times with `BASE_DELAY_MS * 2^attempt + jitter` |
| **Retryable Status Codes** | `429 Too Many Requests` and `5xx` server errors trigger retry; `4xx` client errors fail fast |
| **Index Preservation** | Response embeddings are sorted by `index` to guarantee input↔output alignment after batching |
| **Structured Logging** | Uses the project's `logger` utility for warnings on retry attempts |

### TypeScript API

```typescript
// Import
import { nvidiaNim } from '@/lib/ai/nvidia-nim';

// Single embedding
const [embedding] = await nvidiaNim.getEmbeddings(['Luxury penthouse in Palm Jumeirah']);
// embedding: number[] (length 4096)

// Batch embeddings (auto-batched)
const embeddings = await nvidiaNim.getEmbeddings(arrayOf500Descriptions);
// embeddings: number[][] (500 × 4096)
```

### Request/Response Types

```typescript
interface EmbeddingRequest {
  input: string | string[];
  model?: string;                    // default: 'nvidia/nv-embed-v1'
  encoding_format?: 'float' | 'base64';  // default: 'float'
}

interface EmbeddingResponse {
  object: string;
  data: { object: string; index: number; embedding: number[] }[];
  model: string;
  usage: { prompt_tokens: number; total_tokens: number };
}
```

---

## 4. Pipeline 1 — Semantic Search (Vector Embeddings)

### Flow

```
User types query → Server Action → nvidiaNim.getEmbeddings() → Supabase RPC → pgvector cosine similarity + full-text → Ranked results
```

### Files Involved

| File | Role |
|------|------|
| [`app/actions/search-properties.ts`](file:///c:/dubai/rama/app/actions/search-properties.ts) | Server Action entry point |
| [`lib/ai/nvidia-nim.ts`](file:///c:/dubai/rama/lib/ai/nvidia-nim.ts) | Embedding generation |
| [`supabase/migrations/008_property_embeddings.sql`](file:///c:/dubai/rama/supabase/migrations/008_property_embeddings.sql) | Table schema (4096-dim `vector` column) |
| [`supabase/migrations/011_hybrid_search.sql`](file:///c:/dubai/rama/supabase/migrations/011_hybrid_search.sql) | `hybrid_property_search` RPC function |
| [`components/discover/discover-client.tsx`](file:///c:/dubai/rama/components/discover/discover-client.tsx) | Client-side UI |

### Hybrid Search Algorithm (Reciprocal Rank Fusion)

The `hybrid_property_search` PostgreSQL function combines two ranking signals:

1. **Vector similarity** — Cosine distance via pgvector's `<=>` operator.
2. **Full-text search** — PostgreSQL `ts_rank_cd` with `plainto_tsquery`.

Scores are fused using **Reciprocal Rank Fusion (RRF)** with a constant `k=60`:

```
combined_score = 1/(vector_rank + 60) + 1/(fts_rank + 60)
```

This ensures that a result ranking highly in both signals gets a disproportionate boost, while a result strong in only one signal still surfaces.

### Cross-Lingual Capability

The `nvidia/nv-embed-v1` model was validated during the seeding phase (`seed-dubai-properties.ts`) with Arabic queries mapping correctly to English listings:

```
Query: "شقة في وسط المدينة قريبة من برج خليفة" (apartment in downtown near Burj Khalifa)
Result: Correctly returns English Downtown Dubai listings with high similarity scores.
```

### Indexing Limitation

pgvector HNSW indexes are limited to **2000 dimensions**. Since `nv-embed-v1` produces **4096-dimensional** vectors, we rely on **exact sequential scan** for the MVP. This is performant up to ~100k rows. Beyond that, consider:
- Dimensionality reduction (PCA to 2048).
- Switching to `nvidia/nv-embed-v2` if it offers lower-dimensional output.
- Deploying a dedicated vector database (Pinecone, Qdrant).

---

## 5. Pipeline 2 — AI Lead Scoring (LLM Structured Output)

### Flow

```
Agent clicks "Score Lead" → Server Action → NVIDIA /v1/chat/completions → JSON parsed → UI badge rendered
```

### Files Involved

| File | Role |
|------|------|
| [`app/actions/lead-scoring.ts`](file:///c:/dubai/rama/app/actions/lead-scoring.ts) | Server Action |
| [`app/(workspace)/agent/leads/page.tsx`](file:///c:/dubai/rama/app/%28workspace%29/agent/leads/page.tsx) | Agent Leads Dashboard UI |

### Prompt Engineering

The system prompt constrains LLaMA-3.1-70B to act as a **Dubai Real Estate Lead Qualifier**:

```
You are an expert Real Estate Lead Qualifier in Dubai.
You will be given a chat transcript between a user and an AI, and context about the property they are viewing.
Your job is to analyze the buyer's intent, budget match, and timeline.
Output exactly a JSON object (no markdown, no backticks) with:
- score: 'HOT', 'WARM', or 'COLD'
- budget_match: boolean
- estimated_timeline: string (e.g. 'Immediate', '1-3 months', 'Unknown')
- summary: A 2-sentence summary of what the buyer wants.
```

### Output Type

```typescript
interface LeadAnalysis {
  score: 'HOT' | 'WARM' | 'COLD';
  summary: string;
  estimated_timeline: string;
  budget_match: boolean;
}
```

### Determinism Controls

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| `temperature` | `0.1` | Near-deterministic output for consistent classification |
| `max_tokens` | `500` | Hard cap to prevent runaway generation |
| JSON cleaning | `content.replace(/```json\n?\|\n?```/g, '')` | Strip markdown fences if model wraps output |

### Gating

Lead scoring is a **premium feature** gated behind a Stripe subscription. The `hasPremium` state in the Leads Dashboard controls whether the "Run AI Analysis" button is visible or replaced by an upgrade CTA.

---

## 6. Pipeline 3 — Document OCR & Verification (Multimodal Vision)

### Flow

```
Agent uploads Ejari/Title Deed → base64 encode → NVIDIA Vision API → JSON extraction → Supabase insert → Verification badge
```

### Files Involved

| File | Role |
|------|------|
| [`app/actions/document-verification.ts`](file:///c:/dubai/rama/app/actions/document-verification.ts) | Server Action |
| [`app/(workspace)/agent/dashboard/page.tsx`](file:///c:/dubai/rama/app/%28workspace%29/agent/dashboard/page.tsx) | Agent Dashboard UI (drag-and-drop zone) |
| [`supabase/migrations/012_document_verifications.sql`](file:///c:/dubai/rama/supabase/migrations/012_document_verifications.sql) | Table schema |
| [`scripts/test-nemotron-ocr.ts`](file:///c:/dubai/rama/scripts/test-nemotron-ocr.ts) | Spike/test script |

### Model Selection

| Model | Use Case |
|-------|----------|
| `meta/llama-3.2-90b-vision-instruct` | **Production** — Standard NIM multimodal vision model for robustness |
| `nvidia/nemotron-ocr-v2` | **Spike** — Tested in `test-nemotron-ocr.ts`, pending NIM availability |

### Document Types Supported

| Document | Key Fields Extracted |
|----------|---------------------|
| **Ejari Contract** | `property_id`, `owner_name`, `start_date`, `end_date` |
| **Title Deed** | `property_id`, `owner_name`, `start_date`, `end_date` |

### Graceful Degradation

If the Vision model returns malformed JSON (no valid `{}` structure), the action falls back:

```typescript
try {
  extractedData = JSON.parse(jsonStr);
} catch {
  extractedData = { raw_text: jsonStr };
}
```

This ensures the verification record is always created — agents can manually review `raw_text` if automated parsing fails.

### Database Record

```sql
-- document_verifications table
id              uuid (PK)
property_id     uuid (FK → properties)
agent_id        uuid
document_url    text           -- 'processed-in-memory-base64' (no file storage)
document_type   text           -- 'EJARI' | 'TITLE_DEED'
extracted_data  jsonb          -- structured or raw_text fallback
confidence_score float         -- 0.92 (currently static, future: model confidence)
status          text           -- 'PENDING' | 'VERIFIED'
created_at      timestamptz
updated_at      timestamptz
```

---

## 7. Pipeline 4 — RAG-Augmented Chat (Embedding + OpenRouter)

### Flow

```
User sends message → embed query via NVIDIA NIM → Supabase hybrid_property_search → inject top 3 matches into system prompt → OpenRouter LLM generates response → stream to client
```

### Files Involved

| File | Role |
|------|------|
| [`app/api/chat/route.ts`](file:///c:/dubai/rama/app/api/chat/route.ts) | API route (streaming) |
| [`lib/ai/nvidia-nim.ts`](file:///c:/dubai/rama/lib/ai/nvidia-nim.ts) | Query embedding |
| [`lib/ai/router.ts`](file:///c:/dubai/rama/lib/ai/router.ts) | AI routing with 3-tier fallback (separate from chat) |

### Architecture

The chat route uses **Retrieval-Augmented Generation (RAG)**:

1. **Embed** — The user's latest message is embedded via `nvidiaNim.getEmbeddings()`.
2. **Retrieve** — The embedding is passed to `hybrid_property_search` RPC to find the top 3 matching properties.
3. **Augment** — Property matches are injected into the system prompt as grounding context.
4. **Generate** — OpenRouter streams a response using `meta-llama/llama-3.3-70b-instruct:free` (primary) with fallback to `mistralai/mistral-7b-instruct:free`.

### Anti-Hallucination Guardrails

The system prompt enforces strict grounding:

```
- Answer directly based ONLY on the retrieved properties and the DLD rules above when applicable.
- Do NOT hallucinate property details. If no retrieved properties match, say so.
```

### Tool Calling

The chat route exposes a `collect_lead_info` tool via Vercel AI SDK:

```typescript
collect_lead_info: tool({
  description: 'Call this tool when the user is a qualified lead...',
  parameters: z.object({
    reason: z.string().describe('The reason for collecting the lead'),
  }),
});
```

When triggered, the client renders an inline contact form within the chat thread.

### Resilience

- **Message cap**: Last 20 messages are sent (prevents token explosion).
- **Embedding fallback**: If NVIDIA NIM embedding fails, the chat continues without RAG context.
- **Model fallback**: Primary model → Backup model → Error response (3-layer cascade).

---

## 8. Database Schema (Supabase + pgvector)

### Migrations Related to NVIDIA NIM

| Migration | File | Purpose |
|-----------|------|---------|
| `008` | [`008_property_embeddings.sql`](file:///c:/dubai/rama/supabase/migrations/008_property_embeddings.sql) | Creates `property_embeddings` table with `vector(4096)` column |
| `009` | [`009_property_embeddings_rls.sql`](file:///c:/dubai/rama/supabase/migrations/009_property_embeddings_rls.sql) | RLS policies for embeddings |
| `010` | [`010_match_property_embeddings.sql`](file:///c:/dubai/rama/supabase/migrations/010_match_property_embeddings.sql) | `match_property_embeddings` RPC (pure vector search) |
| `011` | [`011_hybrid_search.sql`](file:///c:/dubai/rama/supabase/migrations/011_hybrid_search.sql) | `hybrid_property_search` RPC (RRF: vector + FTS) |
| `012` | [`012_document_verifications.sql`](file:///c:/dubai/rama/supabase/migrations/012_document_verifications.sql) | Document verification results table |
| `013` | [`013_subscriptions.sql`](file:///c:/dubai/rama/supabase/migrations/013_subscriptions.sql) | Stripe customer/subscription mapping |

### Entity Relationships

```
properties (1) ──→ (N) property_embeddings
properties (1) ──→ (N) document_verifications
auth.users  (1) ──→ (1) stripe_customers
stripe_customers (1) ──→ (N) agency_subscriptions
```

---

## 9. Test & Seed Scripts

All scripts are in [`scripts/`](file:///c:/dubai/rama/scripts/) and can be executed via `npx tsx scripts/<name>.ts`.

| Script | Purpose |
|--------|---------|
| [`seed-dubai-properties.ts`](file:///c:/dubai/rama/scripts/seed-dubai-properties.ts) | Seeds 10 sample Dubai properties with embeddings (EN + AR). Validates cross-lingual retrieval. |
| [`test-nim-embeddings.ts`](file:///c:/dubai/rama/scripts/test-nim-embeddings.ts) | Smoke test: generates a single embedding and logs the vector dimension. |
| [`test-semantic-search.ts`](file:///c:/dubai/rama/scripts/test-semantic-search.ts) | Tests pure vector similarity search via `match_property_embeddings` RPC. |
| [`test-hybrid-search.ts`](file:///c:/dubai/rama/scripts/test-hybrid-search.ts) | Tests hybrid (vector + FTS) search via `hybrid_property_search` RPC. |
| [`test-nemotron-ocr.ts`](file:///c:/dubai/rama/scripts/test-nemotron-ocr.ts) | Spike: demonstrates Nemotron OCR v2 payload for Ejari document extraction. |

---

## 10. Resilience & Error Handling

### Retry Strategy (Embedding Pipeline)

```
Attempt 1: fetch → fail (429)
  → wait 1000ms + jitter → retry
Attempt 2: fetch → fail (502)
  → wait 2000ms + jitter → retry
Attempt 3: fetch → succeed ✓
```

### Fallback Cascade (Chat Pipeline)

```
Layer 1: NVIDIA NIM Embedding (for RAG)
  → fail? → continue without property context

Layer 2: OpenRouter Primary Model (llama-3.3-70b)
  → fail? → OpenRouter Backup Model (mistral-7b)
    → fail? → 500 error to client

Layer 3 (standalone): AI Router (lib/ai/router.ts)
  → Primary → Backup → Tertiary → Local Domain Simulation Engine
```

### Type Safety

All `catch` blocks use `unknown` typing with `instanceof Error` guards:

```typescript
} catch (err: unknown) {
  return { error: err instanceof Error ? err.message : String(err) };
}
```

---

## 11. Production Deployment Checklist

| Step | Action | Status |
|------|--------|--------|
| 1 | Set `NVIDIA_NIM_API_KEY` in Vercel Environment Variables | ⬜ Pending |
| 2 | Set `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | ⬜ Pending |
| 3 | Verify NVIDIA API key has Embeddings + Chat Completions permissions | ⬜ Pending |
| 4 | Run `seed-dubai-properties.ts` against production Supabase | ⬜ Pending |
| 5 | Register Stripe webhook URL: `https://<domain>/api/stripe/webhook` | ⬜ Pending |
| 6 | Test hybrid search returns results on production | ⬜ Pending |
| 7 | Validate OCR pipeline with a real Ejari scan | ⬜ Pending |
| 8 | Monitor NVIDIA NIM usage in Build Console for rate limit headroom | ⬜ Pending |

---

## 12. Cost & Rate Limit Analysis

### NVIDIA NIM (Free Tier / Enterprise)

| Endpoint | Rate Limit (Free) | Cost (Enterprise) |
|----------|--------------------|--------------------|
| `/v1/embeddings` | ~1000 req/day | Usage-based per token |
| `/v1/chat/completions` | ~1000 req/day | Usage-based per token |

### Token Budget Estimates

| Operation | Avg Tokens | Calls/Day (Est.) | Daily Token Budget |
|-----------|-----------|-------------------|--------------------|
| Embed search query | ~50 input | 500 | 25,000 |
| Score 1 lead | ~800 in + 200 out | 50 | 50,000 |
| OCR 1 document | ~1000 in + 300 out | 20 | 26,000 |
| **Total** | | | **~101,000/day** |

---

## 13. Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                          CLIENT (Next.js)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐ │
│  │ Discover UI │  │ Agent Leads │  │ Agent Dashboard (OCR)    │ │
│  │ (B2C)       │  │ (B2B)       │  │ (B2B)                    │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬──────────────┘ │
│         │                │                      │                │
│    Server Action    Server Action          Server Action         │
└─────────┼────────────────┼──────────────────────┼────────────────┘
          │                │                      │
          ▼                ▼                      ▼
┌──────────────────────────────────────────────────────────────────┐
│                    NVIDIA NIM MICROSERVICES                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐ │
│  │ nv-embed-v1    │  │ llama-3.1-70b  │  │ llama-3.2-90b     │ │
│  │ (Embeddings)   │  │ (Lead Scoring) │  │ (Vision OCR)      │ │
│  └───────┬────────┘  └───────┬────────┘  └─────────┬──────────┘ │
└──────────┼───────────────────┼──────────────────────┼────────────┘
           │                   │                      │
           ▼                   ▼                      ▼
┌──────────────────────────────────────────────────────────────────┐
│                     SUPABASE (PostgreSQL)                        │
│  ┌──────────────────┐  ┌────────────────┐  ┌──────────────────┐ │
│  │ property_        │  │ leads          │  │ document_        │ │
│  │ embeddings       │  │ (CRM)          │  │ verifications    │ │
│  │ + pgvector       │  │                │  │                  │ │
│  └──────────────────┘  └────────────────┘  └──────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 14. Future Roadmap

| Priority | Enhancement | Impact |
|----------|-------------|--------|
| **P0** | Redis cache for repeated semantic queries | 70% reduction in embedding API calls |
| **P0** | Streaming lead analysis via WebSocket | Real-time UI updates during LLM inference |
| **P1** | Confidence score from model logprobs | Replace static 0.92 with actual model certainty |
| **P1** | Batch OCR for multi-page documents | Handle 50+ page title deed packages |
| **P2** | Self-hosted NIM on A100 cluster | Eliminate rate limits, reduce per-token cost to zero |
| **P2** | Fine-tune embedding model on Dubai RE corpus | Improve retrieval precision for domain-specific queries |
| **P3** | Arabic-specific OCR fine-tuning | Better extraction accuracy on Arabic government docs |
