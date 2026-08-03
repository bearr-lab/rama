# RAMA — Project Documentation

**Version**: 2.0 (August 2026)
**Status**: Local QA — Pre-Production

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Architecture Summary](#2-architecture-summary)
3. [Technology Stack (Actual)](#3-technology-stack-actual)
4. [Project Structure (Current)](#4-project-structure-current)
5. [Feature Inventory & Status](#5-feature-inventory--status)
6. [AI Integration Layer](#6-ai-integration-layer)
7. [Stripe Billing Integration](#7-stripe-billing-integration)
8. [Database Schema](#8-database-schema)
9. [Server Actions](#9-server-actions)
10. [API Routes](#10-api-routes)
11. [Component Architecture](#11-component-architecture)
12. [Design System](#12-design-system)
13. [Internationalization](#13-internationalization)
14. [DevOps & Tooling](#14-devops--tooling)
15. [Environment Variables](#15-environment-variables)
16. [Audit: Blueprint vs. Actual Implementation](#16-audit-blueprint-vs-actual-implementation)
17. [Known Limitations](#17-known-limitations)
18. [Development Roadmap](#18-development-roadmap)

---

## 1. Product Overview

RAMA is a **Dubai real estate decision platform** with two distinct user personas:

### B2C — Property Buyers

- **Natural language property discovery** — type "4 bed penthouse in Marina under 15M with sea view" instead of dropdown filters.
- **AI-powered property advisor** — conversational chat grounded in real property data and DLD/RERA regulations.
- **Trust signals** — verification badges and evidence indicators on properties.
- **Bilingual** — English and Arabic (RTL) with next-intl.

### B2B — Real Estate Agents

- **AI Document Verification** — drag-and-drop Ejari/Title Deed scanning via NVIDIA Vision models.
- **AI Lead Scoring** — classify buyer intent as HOT/WARM/COLD from chat transcripts using LLaMA-3.1-70B.
- **Subscription Gating** — premium features locked behind Stripe recurring billing.
- **Leads Dashboard** — view AI-analyzed leads with budget match, timeline, and summary.

### Product Philosophy

RAMA differentiates from Property Finder / Bayut by competing on **confidence**, not listings. The original blueprint envisions an "Evidence-driven Decision Operating System" — the current build implements the foundational AI and data layers needed to reach that vision.

---

## 2. Architecture Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                       NEXT.JS 16.2.6 (App Router)                  │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐ │
│  │ (public)      │  │ (workspace)  │  │ (auth)                    │ │
│  │ Landing       │  │ Agent Dash   │  │ Login/Callback            │ │
│  │ Discover      │  │ Agent Leads  │  │                           │ │
│  │ Areas         │  │ Settings     │  │                           │ │
│  │ Insights      │  │ Documents    │  │                           │ │
│  └──────────────┘  └──────────────┘  └───────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    API ROUTES                                │   │
│  │  /api/chat         → RAG-augmented streaming chat            │   │
│  │  /api/stripe/*     → Checkout session + Webhook handler      │   │
│  │  /api/health       → Health check                            │   │
│  │  /api/leads        → Lead management                         │   │
│  │  /api/ai           → AI routing                              │   │
│  │  /api/unsplash     → Image proxy                             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                   SERVER ACTIONS                              │   │
│  │  search-properties  → NVIDIA NIM embed + Supabase hybrid RPC │   │
│  │  lead-scoring       → NVIDIA NIM LLaMA → HOT/WARM/COLD      │   │
│  │  document-verify    → NVIDIA Vision → OCR → Supabase         │   │
│  │  contact            → Lead form → Supabase CRM               │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
   ┌──────────┐       ┌──────────────┐      ┌──────────────┐
   │ NVIDIA   │       │ OpenRouter   │      │ Stripe       │
   │ NIM API  │       │ (Free Tier)  │      │ (Test Mode)  │
   └──────────┘       └──────────────┘      └──────────────┘
          │                    │
          ▼                    ▼
   ┌────────────────────────────────────┐
   │        SUPABASE (PostgreSQL)       │
   │  Auth · pgvector · RLS · Realtime  │
   └────────────────────────────────────┘
```

---

## 3. Technology Stack (Actual)

### Core

| Layer | Package | Version | Purpose |
|-------|---------|---------|---------|
| **Framework** | Next.js | 16.2.6 | App Router, React Server Components |
| **Language** | TypeScript | ^5 | Strict mode |
| **React** | React | 19.2.4 | Concurrent features, Server Components |

### UI & Styling

| Package | Version | Purpose |
|---------|---------|---------|
| Tailwind CSS | v4 | Utility-first CSS via `@tailwindcss/postcss` |
| shadcn/ui | ^4.14.1 | Pre-built accessible components |
| `@base-ui/react` | ^1.6.0 | Unstyled accessible primitives |
| `class-variance-authority` | ^0.7.1 | Component variant management |
| `tailwind-merge` + `clsx` | ^3.6.0 | Conditional class composition |
| `lucide-react` | ^0.511.0 | Iconography |
| `framer-motion` / `gsap` | ^12.42.2 / ^3.15.0 | Animation |
| `recharts` | 3.8.0 | Data visualization |
| `next-themes` | ^0.4.6 | Light/dark mode |

### AI & Data

| Package | Version | Purpose |
|---------|---------|---------|
| `@ai-sdk/openai` + `ai` | ^0.0.66 / ^3.4.31 | Vercel AI SDK for streaming chat |
| `openai` | ^4.95.0 | OpenRouter compatibility layer |
| NVIDIA NIM API | REST | Embeddings, LLM inference, Vision OCR |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| `@supabase/supabase-js` | ^2.49.0 | Database, Auth, Storage |
| `@supabase/ssr` | ^0.6.1 | Server-side rendering utilities |
| `stripe` | ^22.4.0 | Payment processing (`apiVersion: '2026-07-29.dahlia'`) |
| `zod` | ^3.25.0 | Schema validation |

### i18n

| Package | Version | Purpose |
|---------|---------|---------|
| `next-intl` | ^4.1.0 | Internationalization (EN/AR) |

### DevOps

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint | ^9 | Linting with Next.js config |
| Prettier | ^3.8.3 | Code formatting with Tailwind plugin |
| Stylelint | ^17.14.1 | CSS linting |
| Husky | ^9.1.7 | Git hooks |
| Storybook | ^8.6.0 | Component documentation |
| Chromatic | ^18.1.0 | Visual regression testing |
| Docker | Dockerfile + compose | Containerized deployment |

---

## 4. Project Structure (Current)

```
rama/
├── app/
│   ├── (auth)/                      # Authentication routes
│   ├── (public)/                    # Unauthenticated routes (landing, discover)
│   ├── (workspace)/                 # Authenticated application
│   │   ├── [locale]/                # Locale-prefixed workspace routes
│   │   └── agent/                   # Agent B2B workspace
│   │       ├── dashboard/page.tsx   # OCR verification hub
│   │       └── leads/page.tsx       # AI lead scoring dashboard
│   ├── actions/                     # Server Actions
│   │   ├── contact.ts               # Lead form submission
│   │   ├── document-verification.ts # NVIDIA Vision OCR
│   │   ├── lead-scoring.ts          # NVIDIA LLM lead scoring
│   │   └── search-properties.ts     # NVIDIA embedding + hybrid search
│   ├── api/                         # API Routes
│   │   ├── ai/                      # AI proxy endpoints
│   │   ├── auth/                    # OAuth callback
│   │   ├── chat/route.ts            # RAG-augmented streaming chat
│   │   ├── health/                  # Health check
│   │   ├── leads/                   # Lead management
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts    # Stripe Checkout session creation
│   │   │   └── webhook/route.ts     # Stripe webhook handler
│   │   └── unsplash/                # Image proxy
│   ├── layout.tsx                   # Root layout (i18n, providers, fonts)
│   └── globals.css                  # Global styles + design tokens
├── components/
│   ├── ai/                          # AI chat components
│   ├── auth/                        # Auth components
│   ├── chat/                        # Chat interface components
│   ├── community/                   # Community/area components
│   ├── dashboard/                   # Dashboard widgets
│   ├── decision-lab/                # Decision comparison components
│   ├── discover/                    # Property discovery UI
│   │   └── discover-client.tsx      # Main semantic search interface
│   ├── landing/                     # Landing page sections
│   ├── layout/                      # Layout (navbar, sidebar)
│   ├── property/                    # Property cards, gallery, details
│   ├── search/                      # Search bar, filters
│   ├── trust/                       # Trust badges, verification
│   ├── ui/                          # shadcn/ui primitives
│   └── ...                          # Various utility components
├── lib/
│   ├── ai/
│   │   ├── nvidia-nim.ts            # NVIDIA NIM wrapper (embeddings)
│   │   └── router.ts               # AI Router (3-tier OpenRouter + local)
│   ├── supabase/                    # Supabase client/server/middleware
│   ├── logger.ts                    # Structured logging utility
│   ├── mock-properties.ts           # Mock property data for development
│   └── utils.ts                     # cn() helper
├── supabase/
│   └── migrations/                  # 15 SQL migrations (000–013 + timestamp)
├── scripts/
│   ├── seed-dubai-properties.ts     # Seed property embeddings
│   ├── test-nim-embeddings.ts       # Test NVIDIA embedding
│   ├── test-semantic-search.ts      # Test vector search
│   ├── test-hybrid-search.ts        # Test hybrid RRF search
│   └── test-nemotron-ocr.ts         # Test OCR pipeline
├── design-system/                   # Design tokens and specs
├── types/                           # TypeScript type definitions
├── hooks/                           # React hooks
├── i18n/                            # Internationalization config
├── messages/                        # Translation files (EN/AR)
├── public/                          # Static assets
└── docs/                            # This documentation
    ├── RAMA_Master_Build_Specification.md  # Original blueprint
    ├── documentaion.md                     # Product audit & vision
    └── NVIDIA_NIM_Integration.md           # AI pipeline reference
```

---

## 5. Feature Inventory & Status

### B2C Features

| Feature | Status | File(s) |
|---------|--------|---------|
| Landing page | ✅ Complete | `app/(public)/` |
| Property discovery grid | ✅ Complete | `components/discover/discover-client.tsx` |
| AI semantic search | ✅ Complete | `app/actions/search-properties.ts` |
| AI chat advisor (RAG) | ✅ Complete | `app/api/chat/route.ts` |
| Property detail pages | ✅ Complete | `app/(public)/[locale]/homes/` |
| Community exploration | ✅ Complete | `components/community/` |
| Shortlist / saved properties | ✅ Complete | `hooks/` |
| Contact form (lead capture) | ✅ Complete | `app/actions/contact.ts` |
| Bilingual EN/AR | ✅ Complete | `i18n/`, `messages/` |
| Trust badges | ✅ Complete | `components/trust/` |
| Dark mode | ✅ Complete | `next-themes` |

### B2B Agent Features

| Feature | Status | File(s) |
|---------|--------|---------|
| Agent Dashboard | ✅ Complete | `app/(workspace)/agent/dashboard/page.tsx` |
| Document verification (OCR) | ✅ Complete | `app/actions/document-verification.ts` |
| AI Lead Scoring | ✅ Complete | `app/actions/lead-scoring.ts` |
| Stripe subscription checkout | ✅ Complete | `app/api/stripe/checkout/route.ts` |
| Stripe webhook handler | ✅ Complete | `app/api/stripe/webhook/route.ts` |
| Leads dashboard | ✅ Complete | `app/(workspace)/agent/leads/page.tsx` |

### Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| Supabase pgvector | ✅ Complete | 15 migrations applied |
| NVIDIA NIM integration | ✅ Complete | 3 pipelines operational |
| Stripe Test Mode | ✅ Complete | Real test keys configured |
| Docker support | ✅ Complete | `Dockerfile` + `docker-compose.yml` |
| Storybook | ✅ Complete | Component documentation |
| ESLint + Prettier + Stylelint | ✅ Complete | Zero errors on production build |
| Husky + lint-staged | ✅ Complete | Pre-commit hooks |

### Not Yet Implemented (From Blueprint)

| Feature | Blueprint Section | Priority |
|---------|-------------------|----------|
| Trust Passport (bitemporal claims) | Product moat | P1 |
| Decision Lab (A vs B comparison) | Flagship feature | P1 |
| Cost waterfall / mortgage calculator | Financial intelligence | P2 |
| Household brief wizard | Life-fit matching | P2 |
| Advisor handoff system | Case management | P2 |
| Off-plan project chronology | Developer intelligence | P3 |
| Document vault / artifact security | S3 + ClamAV | P3 |
| Post-purchase ownership workflows | Lifecycle platform | P3 |

---

## 6. AI Integration Layer

RAMA uses a **multi-provider AI architecture**:

### Provider 1: NVIDIA NIM

> Full technical documentation: [`docs/NVIDIA_NIM_Integration.md`](file:///c:/dubai/rama/docs/NVIDIA_NIM_Integration.md)

| Pipeline | Model | Use |
|----------|-------|-----|
| Embeddings | `nvidia/nv-embed-v1` | Semantic search, RAG retrieval |
| Lead Scoring | `meta/llama-3.1-70b-instruct` | Chat transcript → HOT/WARM/COLD |
| Document OCR | `meta/llama-3.2-90b-vision-instruct` | Ejari/Title Deed extraction |

### Provider 2: OpenRouter (Free Tier)

| Model | Tier | Use |
|-------|------|-----|
| `google/gemini-2.0-pro-exp:free` | Primary (Smart) | General AI advisory |
| `meta-llama/llama-3.3-70b-instruct:free` | Backup | Chat fallback |
| `mistralai/mistral-7b-instruct:free` | Tertiary (Fast) | Last resort |

### Provider 3: Local Domain Simulation

When all external APIs fail, `lib/ai/router.ts` returns domain-specific pre-computed responses covering ROI, trust verification, and document extraction — ensuring **100% uptime** for the AI layer.

---

## 7. Stripe Billing Integration

### Architecture

| Component | File | Purpose |
|-----------|------|---------|
| Checkout Session | [`app/api/stripe/checkout/route.ts`](file:///c:/dubai/rama/app/api/stripe/checkout/route.ts) | Create Stripe Hosted Checkout |
| Webhook Handler | [`app/api/stripe/webhook/route.ts`](file:///c:/dubai/rama/app/api/stripe/webhook/route.ts) | Sync subscription state to Supabase |
| UI Gating | [`app/(workspace)/agent/leads/page.tsx`](file:///c:/dubai/rama/app/%28workspace%29/agent/leads/page.tsx) | Show/hide premium features |

### Stripe SDK Version

- **Package**: `stripe` v22.4.0
- **API Version**: `2026-07-29.dahlia` (latest)

### Webhook Events Handled

| Event | Action |
|-------|--------|
| `customer.subscription.created` | Upsert subscription record in `agency_subscriptions` |
| `customer.subscription.updated` | Upsert subscription record |
| `customer.subscription.deleted` | Set status to `canceled` |

### Database Tables

| Table | Purpose |
|-------|---------|
| `stripe_customers` | Maps `agent_id` ↔ `stripe_customer_id` |
| `agency_subscriptions` | Tracks subscription status, price, period end |

---

## 8. Database Schema

### Full Migration History

| # | File | Purpose |
|---|------|---------|
| 000 | `0000_v2_domain_foundation.sql` | Domain foundation tables |
| 001 | `001_initial_schema.sql` | Core tables (properties, users, etc.) |
| 002 | `002_rls_policies.sql` | Row Level Security policies |
| 003 | `003_seed_data.sql` | Initial seed data |
| 004 | `004_v2_live_state_migration.sql` | V2 live state tables |
| 005 | `005_secure_workspace_rls.sql` | Workspace RLS policies |
| 006 | `006_enterprise_crm_leads.sql` | CRM leads table |
| 007 | `007_property_financials.sql` | Property financial data |
| 008 | `008_property_embeddings.sql` | pgvector embeddings table (4096-dim) |
| 009 | `009_property_embeddings_rls.sql` | Embeddings RLS |
| 010 | `010_match_property_embeddings.sql` | Pure vector search RPC |
| 011 | `011_hybrid_search.sql` | Hybrid search RPC (RRF) |
| 012 | `012_document_verifications.sql` | OCR verification results |
| 013 | `013_subscriptions.sql` | Stripe customer/subscription mapping |

---

## 9. Server Actions

| Action | File | Input | Output | AI Provider |
|--------|------|-------|--------|-------------|
| `searchProperties` | [`search-properties.ts`](file:///c:/dubai/rama/app/actions/search-properties.ts) | `query: string` | `{ success, data: DiscoverProperty[] }` | NVIDIA NIM (embed) |
| `scoreLead` | [`lead-scoring.ts`](file:///c:/dubai/rama/app/actions/lead-scoring.ts) | `chatTranscript, propertyContext` | `{ success, data: LeadAnalysis }` | NVIDIA NIM (LLM) |
| `verifyDocument` | [`document-verification.ts`](file:///c:/dubai/rama/app/actions/document-verification.ts) | `FormData (file, propertyId, documentType)` | `{ success, verification }` | NVIDIA NIM (Vision) |
| `submitContactForm` | [`contact.ts`](file:///c:/dubai/rama/app/actions/contact.ts) | `FormData (name, email, subject, message)` | `{ success }` or `{ error }` | None |

---

## 10. API Routes

| Route | Method | Purpose | Auth Required |
|-------|--------|---------|---------------|
| `/api/chat` | POST | RAG-augmented streaming chat | No |
| `/api/stripe/checkout` | POST | Create Stripe Checkout session | No (agent ID in body) |
| `/api/stripe/webhook` | POST | Stripe webhook receiver | Signature verification |
| `/api/health` | GET | Health check | No |
| `/api/leads` | GET/POST | Lead management | Yes |
| `/api/ai` | POST | AI routing proxy | Yes |
| `/api/unsplash` | GET | Image proxy | No |

---

## 11. Component Architecture

### Key Component Directories

| Directory | Components | Purpose |
|-----------|------------|---------|
| `components/ui/` | Button, Card, Dialog, Input, Badge, etc. | shadcn/ui primitives |
| `components/discover/` | `discover-client.tsx` | Main search + results grid |
| `components/chat/` | Chat interface components | AI advisor chat UI |
| `components/property/` | PropertyCard, Gallery, Facts, TrustBadge | Property display |
| `components/landing/` | Hero, Features, CTA sections | Landing page |
| `components/trust/` | Trust badges, verification indicators | Trust signals |
| `components/layout/` | Navbar, Sidebar, Footer | App shell |
| `components/dashboard/` | Analytics widgets | Dashboard components |

### Design Constraints

- **Zero border-radius**: All components use `rounded-none` (sharp 90° edges).
- **Nordic Lagom aesthetic**: Restrained color palette, generous whitespace, calm typography.
- **Tailwind v4**: All styles use Tailwind v4 syntax — no v3 `@apply` patterns.

---

## 12. Design System

### Tokens

Design tokens are defined in `app/globals.css` and `design-system/rama/MASTER.md`:

- **Colors**: OKLCH-based color system with Fjord Blue brand accent.
- **Typography**: Inter (Latin) + Noto Sans Arabic (AR).
- **Spacing**: 8-point grid system.
- **Motion**: 120–180ms duration, decelerate easing, no bounce.
- **Elevation**: Subtle shadows only (4px–16px blur, 4–8% opacity).

### Aesthetic Rules

1. 90% neutral, 10% accent color.
2. Maximum 3 hierarchy levels per viewport.
3. Cards only when grouping information.
4. Monochrome first — color only for meaning.
5. No glassmorphism, no neon, no decorative blobs.
6. Zero border-radius (project-wide rule).

---

## 13. Internationalization

- **Framework**: `next-intl` v4.1.0.
- **Locales**: English (`en`), Arabic (`ar`).
- **Config**: `i18n/request.ts` loaded via `createNextIntlPlugin`.
- **Messages**: `messages/en.json`, `messages/ar.json`.
- **RTL**: Full Arabic RTL support via layout direction switching.

---

## 14. DevOps & Tooling

### Build Configuration

```typescript
// next.config.ts
{
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [supabase, unsplash, pexels]
  }
}
```

### Docker

- **Web**: `Dockerfile` (standalone Next.js build)
- **Storybook**: `Dockerfile.storybook`
- **Compose**: `docker-compose.yml` (web + storybook + reverse proxy)
- **Dev**: `docker-compose.dev.yml` (hot reload)

### Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "lint": "eslint",
  "lint:css": "stylelint",
  "format": "prettier --write",
  "typecheck": "tsc --noEmit",
  "storybook": "storybook dev -p 6006",
  "docker:build": "docker build -t rama-web .",
  "docker:prod": "docker compose up -d"
}
```

---

## 15. Environment Variables

### Required

| Variable | Provider | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Database URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | Public API key |
| `NVIDIA_NIM_API_KEY` | NVIDIA | Embeddings + LLM + Vision |
| `OPENROUTER_API_KEY` | OpenRouter | Chat LLM (free tier) |
| `STRIPE_SECRET_KEY` | Stripe | Server-side billing |
| `STRIPE_PUBLISHABLE_KEY` | Stripe | Client-side checkout |
| `STRIPE_WEBHOOK_SECRET` | Stripe | Webhook signature verification |

### Optional

| Variable | Default | Purpose |
|----------|---------|---------|
| `OPENROUTER_PRIMARY_MODEL` | `google/gemini-2.0-pro-exp-02-05:free` | Primary chat model |
| `OPENROUTER_BACKUP_MODEL` | `meta-llama/llama-3.3-70b-instruct:free` | Backup chat model |
| `OPENROUTER_TERTIARY_MODEL` | `mistralai/mistral-7b-instruct:free` | Tertiary fallback |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Stripe redirect URLs |
| `NEXT_PUBLIC_ENABLE_V2` | `true` | Feature flag for V2 architecture |
| `UNSPLASH_ACCESS_KEY` | — | Image API |
| `SUPABASE_SERVICE_ROLE_KEY` | — | Admin-level DB access |

---

## 16. Audit: Blueprint vs. Actual Implementation

### Alignment Score

| Area | Blueprint Target | Actual | Gap |
|------|------------------|--------|-----|
| UI Design | 10/10 | 9/10 | Minor: Decision Lab UI not built |
| Property Discovery | 10/10 | 9/10 | Semantic search works, needs map view |
| Search | 10/10 | 9/10 | Hybrid search operational, needs saved searches |
| Authentication | 9/10 | 9/10 | ✅ Fully aligned |
| AI | 10/10 | 8/10 | RAG + Lead Scoring + OCR done; streaming lead analysis pending |
| Trust | 10/10 | 5/10 | Basic badges done; full Trust Passport pending |
| Data Intelligence | 10/10 | 5/10 | Embeddings + hybrid search done; evidence layer pending |
| Decision Workflow | 10/10 | 2/10 | Not started |
| Advisor Experience | 10/10 | 7/10 | Chat with tool calling done; inline forms done |
| Billing / Monetization | 10/10 | 8/10 | Stripe checkout + webhook done; dashboard analytics pending |

### Key Architectural Deviations from Blueprint

1. **AI Provider**: Blueprint specified OpenRouter only → actual uses **NVIDIA NIM** for embeddings, lead scoring, and OCR, with OpenRouter as the chat generation layer.
2. **Search**: Blueprint specified Supabase full-text only → actual implements **pgvector hybrid search with Reciprocal Rank Fusion**.
3. **Project Structure**: Blueprint showed `(public)/[locale]/` and `(workspace)/[locale]/` → actual has `(workspace)/agent/` without locale prefix for B2B routes.
4. **Billing**: Not in original blueprint → **Stripe integration** was added post-MVP for B2B monetization.

---

## 17. Known Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| pgvector HNSW limited to 2000 dims; `nv-embed-v1` produces 4096 | Sequential scan only (no ANN index) | Fine for < 100k rows; PCA or model swap at scale |
| Stripe in test mode | No real payments | Switch keys for production |
| OCR confidence score is static (0.92) | Not truly model-derived | Future: extract from logprobs |
| RLS policies are permissive (`true` checks) | Not production-secure | Tighten to `auth.uid()` checks before launch |
| ESLint warnings suppressed during build | Masked issues | Clean lint enforced via pre-commit hooks |
| No end-to-end tests | Manual QA only | Add Playwright tests before production |

---

## 18. Development Roadmap

### Phase 1 — Production Launch (Current)

- [x] NVIDIA NIM integration (3 pipelines)
- [x] Stripe billing integration
- [x] Hybrid semantic search
- [x] AI lead scoring
- [x] Document OCR verification
- [x] Zero TypeScript/ESLint errors
- [ ] Production environment variables on Vercel
- [ ] Stripe webhook registration for production URL
- [ ] Tighten RLS policies

### Phase 2 — Trust & Intelligence

- [ ] Trust Passport (bitemporal claims model)
- [ ] Evidence provenance layer
- [ ] Property health scoring (0–100)
- [ ] Streaming lead analysis (WebSocket)
- [ ] Redis cache for repeated semantic queries
- [ ] Saved searches with notifications

### Phase 3 — Decision Platform

- [ ] Decision Lab (A vs B comparison)
- [ ] Cost waterfall calculator
- [ ] Investment projection charts
- [ ] Life-fit matching wizard
- [ ] Property workspace (tabbed project view)

### Phase 4 — Lifecycle Platform

- [ ] Document vault (S3 + ClamAV)
- [ ] Task management
- [ ] Offer tracking
- [ ] Handover workflows
- [ ] Ownership dashboard
- [ ] Resale workflows