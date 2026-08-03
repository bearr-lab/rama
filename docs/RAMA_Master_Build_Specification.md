# RAMA — Dubai Real Estate Decision Platform
## Master Technical Specification (V2 Architecture)
### Nordic Lagom × Supabase × NVIDIA NIM × Next.js

---

## Table of Contents

1. [Project Scope & Philosophy](#1-project-scope--philosophy)
2. [Tech Stack (Current Build)](#2-tech-stack-current-build)
3. [Project Structure](#3-project-structure)
4. [Design System: Nordic Lagom](#4-design-system-nordic-lagom)
5. [Database Schema (Supabase)](#5-database-schema-supabase)
6. [AI Architecture (NVIDIA NIM)](#6-ai-architecture-nvidia-nim)
7. [Authentication & Billing](#7-authentication--billing)
8. [Feature Specification](#8-feature-specification)
9. [Component Inventory](#9-component-inventory)
10. [Environment Variables](#10-environment-variables)

---

## 1. Project Scope & Philosophy

### 1.1 What is RAMA?

RAMA is a **bilingual (EN/AR) Dubai real estate discovery platform** that leverages AI to provide evidence-driven property insights. It serves two distinct personas:
- **B2C (Buyers/Tenants):** Natural language property discovery, AI-powered property advisory, and verified trust signals.
- **B2B (Agents):** AI Lead Scoring, AI Document OCR (Ejari/Title Deed verification), and CRM capabilities via a dedicated dashboard.

### 1.2 Core Philosophies

1. **Aesthetic Excellence** — Nordic Lagom design. Zero border-radius (`rounded-none`). Generous whitespace, calm typography, and minimal color.
2. **AI-First Abstractions** — Search is semantic (vector-based). Verification is visual (OCR). Advisory is contextual (RAG).
3. **Data Integrity** — PostgreSQL with `pgvector`. Strict TypeScript typings across the stack.

---

## 2. Tech Stack (Current Build)

### 2.1 Core Framework

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16.2.6 | App Router, React Server Components |
| **Language** | TypeScript 5 | Strict mode |
| **Runtime** | Node.js ≥ 20 | |
| **React** | 19.2.4 | Concurrent features |

### 2.2 Styling & UI

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **CSS Framework** | Tailwind CSS v4 | Utility-first |
| **Component System** | shadcn/ui v4 | Accessible primitives |
| **Icons** | lucide-react | Consistent iconography |
| **Themes** | next-themes | Light/dark mode support |
| **i18n** | next-intl | Localization (EN/AR) |

### 2.3 Backend, Database & APIs

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Database** | Supabase (PostgreSQL) | Primary data store |
| **Vector DB** | pgvector | Storing and querying AI embeddings |
| **Billing** | Stripe | B2B agent subscriptions |
| **AI (Compute)** | NVIDIA NIM | LLM Inference, Embeddings, Vision OCR |
| **AI (Chat)** | OpenRouter | Free tier fallback models |

---

## 3. Project Structure

```
rama/
├── app/
│   ├── (auth)/                      # Authentication flows
│   ├── (public)/                    # B2C (Landing, Discover, Insights)
│   ├── (workspace)/                 # B2B Agent Dashboard (Leads, Docs, Settings)
│   ├── actions/                     # Next.js Server Actions (AI, Supabase)
│   ├── api/                         # REST APIs (Chat, Webhooks, AI proxies)
│   └── layout.tsx                   # Root layout, providers, fonts
├── components/
│   ├── ui/                          # shadcn/ui base components
│   ├── discover/                    # Semantic search components
│   ├── property/                    # Property cards and details
│   └── chat/                        # AI advisor interfaces
├── lib/
│   ├── ai/                          # NVIDIA NIM wrappers, router fallback logic
│   └── supabase/                    # Client/Server Supabase singletons
├── supabase/
│   └── migrations/                  # Automated SQL migrations (000 to 013)
├── scripts/                         # Seeding and testing tools (CLI)
├── i18n/                            # next-intl configuration
└── docs/                            # Project documentation (this folder)
```

---

## 4. Design System: Nordic Lagom

### 4.1 UI Principles
- **No Curves:** Absolutely no `border-radius`. Everything is structural and sharp.
- **Glassmorphism Avoidance:** Use solid colors and subtle elevation instead of blur effects.
- **Restrained Color:** 90% monochrome layout with 10% Fjord Blue accent.

### 4.2 Typography & Spacing
- **Fonts:** Inter (English) + Noto Sans Arabic (Arabic).
- **Scale:** Standardized 8-point base grid.
- **Containers:** Narrow, centered, and padded for a premium editorial feel.

---

## 5. Database Schema (Supabase)

### Core Entities
1. **Properties (`properties`)**: Base listing data (price, beds, baths, location).
2. **Property Embeddings (`property_embeddings`)**: `vector(4096)` representations of property descriptions, synced with NVIDIA `nv-embed-v1`.
3. **CRM Leads (`leads`)**: Captured user inquiries.
4. **Document Verifications (`document_verifications`)**: OCR results from uploaded Ejari/Title Deeds.
5. **Subscriptions (`agency_subscriptions`)**: Stripe billing state for B2B users.

### Advanced Search
- **RPC `hybrid_property_search`**: Implements Reciprocal Rank Fusion (RRF) by combining pgvector cosine similarity with PostgreSQL full-text search (`ts_rank_cd`).

---

## 6. AI Architecture (NVIDIA NIM)

The platform is heavily integrated with NVIDIA NIM for enterprise-grade AI execution:

1. **Semantic Search (`nv-embed-v1`)**: Converts Arabic/English queries into 4096-dim vectors to retrieve the most semantically relevant properties from pgvector.
2. **Lead Scoring (`llama-3.1-70b-instruct`)**: Analyzes chat transcripts to output a structured JSON analysis (Intent: HOT/WARM/COLD, Budget Match).
3. **Document OCR (`llama-3.2-90b-vision-instruct`)**: Extracts structured JSON (owner, dates, property IDs) directly from uploaded Title Deed and Ejari document images.
4. **AI Advisor Chat (`llama-3.3-70b-instruct` via OpenRouter)**: RAG-augmented chatbot that answers real estate questions and actively collects leads.

> *For deep technical details on the AI setup, see [`NVIDIA_NIM_Integration.md`](./NVIDIA_NIM_Integration.md).*

---

## 7. Authentication & Billing

### Authentication
- Uses Supabase Auth.
- Currently supports email/password and Google OAuth.
- RLS (Row Level Security) ensures agents can only view their own leads and verifications.

### Stripe Billing (B2B)
- Agent Premium features (Lead AI Analysis, Document OCR) are gated behind active Stripe subscriptions.
- Implemented via `/api/stripe/checkout` and `/api/stripe/webhook`.
- Data mapped in `stripe_customers` and `agency_subscriptions` tables.

---

## 8. Feature Specification

### B2C (Public)
- **Hero & Semantic Search Bar**: Accepts conversational input ("Show me cheap studios near metro").
- **Discover Grid**: Displays property cards with verified badges and dynamic pricing.
- **AI Property Advisor**: Chat window with RAG context from the current property view.
- **Bilingual Interface**: Seamless toggle between LTR English and RTL Arabic.

### B2B (Workspace)
- **Agent Dashboard**: Drag-and-drop zone for document verification. Instantly extracts and validates legal documents using AI Vision.
- **Leads Inbox**: Displays collected leads. Allows premium users to run "AI Analysis" to auto-score intent and summarize conversations.
- **Settings**: Subscription management and agent profile configuration.

---

## 9. Component Inventory

### Foundational (`components/ui`)
- Accordion, Badge, Button, Card, Dialog, Input, Label, ScrollArea, Skeleton, Tabs, Textarea.
- All strictly styled with `rounded-none`.

### Functional Modules
- **`discover-client.tsx`**: Client-side state manager for semantic search input and property grid rendering.
- **`chat.tsx`**: AI streaming chat interface utilizing Vercel AI SDK (`useChat`).
- **`contact-form.tsx`**: Server Action-powered form for capturing lead data.

---

## 10. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# NVIDIA NIM
NVIDIA_NIM_API_KEY=nvapi-...

# OpenRouter (Chat Fallback)
OPENROUTER_API_KEY=sk-or-v1-...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
