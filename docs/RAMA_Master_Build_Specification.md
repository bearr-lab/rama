# RAMA — Dubai Real Estate Decision Platform
## MVP Build Specification (Version 1.0)
### Nordic Lagom × Supabase × OpenRouter

---

## Table of Contents

1. [Project Scope & Philosophy](#1-project-scope--philosophy)
2. [Tech Stack (MVP)](#2-tech-stack-mvp)
3. [Project Structure](#3-project-structure)
4. [Design System: Nordic Lagom MVP](#4-design-system-nordic-lagom-mvp)
5. [Database Schema (Supabase)](#5-database-schema-supabase)
6. [Authentication Flow](#6-authentication-flow)
7. [Page-by-Page MVP Specification](#7-page-by-page-mvp-specification)
8. [Illustration & Asset Strategy](#8-illustration--asset-strategy)
9. [AI Integration (OpenRouter)](#9-ai-integration-openrouter)
10. [Firebase Integration](#10-firebase-integration)
11. [Component Inventory](#11-component-inventory)
12. [Animation & Motion MVP](#12-animation--motion-mvp)
13. [Build Roadmap](#13-build-roadmap)
14. [Environment Variables](#14-environment-variables)
15. [Master Build Prompt](#15-master-build-prompt)

---

## 1. Project Scope & Philosophy

### 1.1 What is RAMA MVP?

RAMA MVP is a **visually stunning, bilingual (EN/AR) Dubai real estate discovery platform** that prioritizes:

1. **Aesthetic excellence** — Nordic Lagom design with rich illustrations and editorial photography
2. **Smooth authentication** — Supabase Auth with Google Sign In
3. **Property discovery** — Browse, filter, and view Dubai properties with beautiful cards and detail pages
4. **AI advisory** — OpenRouter-powered property advisor chat
5. **Shortlist** — Save favorite properties
6. **Trust signals** — Clean verification badges and evidence indicators

### 1.2 What is NOT in MVP?

| Feature | Status | Reason |
|---------|--------|--------|
| Full Trust Passport with bitemporal claims | Deferred | Complex data model, post-MVP |
| Deterministic cost engine | Deferred | Requires extensive business logic |
| Mortgage calculator | Deferred | Financial complexity |
| Household brief wizard | Deferred | Multi-step form, post-MVP |
| Advisor handoff system | Deferred | Requires case management backend |
| Evidence operations console | Deferred | Staff-facing, not MVP |
| Entity resolution | Deferred | Data pipeline complexity |
| OpenSearch / advanced search | Deferred | Supabase full-text search is sufficient for MVP |
| Multi-currency | Deferred | AED only for MVP |
| Off-plan project chronology | Deferred | Requires milestone tracking backend |
| Document vault / artifact security | Deferred | S3 + ClamAV overkill for MVP |

### 1.3 MVP Success Criteria

- [ ] Landing page is visually breathtaking — visitors say "wow" within 3 seconds
- [ ] Property discovery feels premium — scrolling is addictive
- [ ] Authentication is seamless — Google Sign In works flawlessly
- [ ] AI chat feels magical — contextual property advice
- [ ] Shortlist works instantly — add/remove with optimistic UI
- [ ] Mobile experience is native-quality — 44px touch targets, thumb-friendly
- [ ] Arabic RTL is fully functional — not an afterthought
- [ ] Zero visual clutter — every pixel earns its place

---

## 2. Tech Stack (MVP)

### 2.1 Core Framework

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16.2.6 | App Router, React Server Components |
| **Language** | TypeScript 5 | Strict mode |
| **Runtime** | Node.js ≥ 20 | |
| **React** | 19.2.4 | Concurrent features, Server Components |

### 2.2 Styling & UI

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **CSS Framework** | Tailwind CSS v4 | Utility-first, OKLCH color tokens |
| **PostCSS** | @tailwindcss/postcss | Tailwind v4 integration |
| **Component Base** | @base-ui/react | Unstyled accessible primitives |
| **Component System** | shadcn/ui v4 | Pre-built components via CLI |
| **Animation** | tw-animate-css | Tailwind CSS animations |
| **Variants** | class-variance-authority | Component variant management |
| **Class Merge** | tailwind-merge + clsx | Conditional class composition |
| **Icons** | lucide-react | 1.5px stroke, consistent iconography |
| **Themes** | next-themes | Light/dark (light only for RAMA, but keep for system) |

### 2.3 Backend & Database

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Database** | Supabase (PostgreSQL) | Primary database, auth, real-time |
| **Auth** | Supabase Auth | Google OAuth, email/password, sessions |
| **Storage** | Supabase Storage | Property images, user avatars |
| **Realtime** | Supabase Realtime | Shortlist sync, live updates |
| **Edge Functions** | Supabase Edge Functions | AI proxy, secure API calls |

### 2.4 Additional Services

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **AI** | OpenRouter API | Multi-model AI advisor (Claude, GPT-4o, etc.) |
| **Analytics** | Firebase Analytics | User behavior, funnel tracking |
| **Crash Reporting** | Firebase Crashlytics | Error monitoring |
| **Push Notifications** | Firebase Cloud Messaging | Future: price alerts, new listings |

### 2.5 Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint 9** | Code linting with Next.js config |
| **Prettier 3** | Code formatting with Tailwind plugin |
| **TypeScript** | Type checking with strict mode |

### 2.6 Updated package.json

```json
{
  "name": "rama",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write \"**/*.{ts,tsx}\"",
    "typecheck": "tsc --noEmit",
    "db:types": "supabase gen types typescript --project-id $SUPABASE_PROJECT_ID --schema public > src/lib/database.types.ts"
  },
  "dependencies": {
    "@base-ui/react": "^1.6.0",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.49.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "firebase": "^11.6.0",
    "lucide-react": "^0.511.0",
    "next": "16.2.6",
    "next-intl": "^4.1.0",
    "next-themes": "^0.4.6",
    "openai": "^4.95.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "shadcn": "^4.14.1",
    "tailwind-merge": "^3.6.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^3.25.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "prettier": "^3.8.3",
    "prettier-plugin-tailwindcss": "^0.8.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

**Key package changes from original:**
- `@supabase/server` → `@supabase/supabase-js` + `@supabase/ssr` (correct SSR package)
- Added `firebase` for analytics/crashlytics
- Added `openai` for OpenRouter compatibility (OpenRouter is OpenAI-compatible)
- Added `next-intl` for i18n (bilingual EN/AR)
- Added `zod` for schema validation
- Fixed `lucide-react` version (was incorrectly `^1.26.0`, should be `^0.511.0`)

---

## 3. Project Structure

```
rama/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Unauthenticated routes
│   │   ├── [locale]/
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── homes/
│   │   │   │   └── page.tsx      # Property discovery
│   │   │   ├── homes/[slug]/
│   │   │   │   └── page.tsx      # Property detail
│   │   │   ├── areas/
│   │   │   │   └── page.tsx      # Community exploration
│   │   │   ├── insights/
│   │   │   │   └── page.tsx      # Market insights
│   │   │   └── login/
│   │   │       └── page.tsx      # Auth page
│   │   └── layout.tsx            # Public layout (no auth required)
│   ├── (workspace)/              # Authenticated routes
│   │   ├── [locale]/
│   │   │   ├── shortlist/
│   │   │   │   └── page.tsx      # Saved properties
│   │   │   └── advisor/
│   │   │       └── page.tsx      # AI advisor chat
│   │   └── layout.tsx            # Workspace layout (auth required)
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts      # OAuth callback
│   │   ├── ai/
│   │   │   └── chat/
│   │   │       └── route.ts      # OpenRouter proxy
│   │   └── properties/
│   │       └── route.ts          # Property data API
│   ├── layout.tsx                # Root layout (i18n, providers)
│   └── globals.css               # Global styles + tokens
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── locale-switcher.tsx
│   ├── property/                 # Property-specific
│   │   ├── property-card.tsx
│   │   ├── property-grid.tsx
│   │   ├── property-gallery.tsx
│   │   ├── property-facts.tsx
│   │   ├── trust-badge.tsx
│   │   └── price-tag.tsx
│   ├── search/                   # Search components
│   │   ├── search-bar.tsx
│   │   ├── filter-chips.tsx
│   │   ├── filter-sheet.tsx
│   │   └── sort-dropdown.tsx
│   ├── illustrations/            # SVG illustrations
│   │   ├── hero-illustration.tsx
│   │   ├── trust-shield.tsx
│   │   ├── cost-calculator.tsx
│   │   ├── empty-state.tsx
│   │   └── ...
│   ├── auth/                     # Auth components
│   │   ├── auth-modal.tsx
│   │   ├── user-menu.tsx
│   │   └── protected-route.tsx
│   └── ai/                       # AI components
│       ├── ai-chat.tsx
│       ├── ai-bubble.tsx
│       ├── ai-suggestions.tsx
│       └── typing-indicator.tsx
├── lib/
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── firebase.ts               # Firebase init
│   ├── openrouter.ts             # OpenRouter client
│   ├── i18n/                     # Internationalization
│   │   ├── config.ts
│   │   ├── messages/
│   │   │   ├── en.json
│   │   │   └── ar.json
│   │   └── routing.ts
│   ├── utils.ts                  # cn() helper, utilities
│   └── database.types.ts         # Supabase generated types
├── hooks/
│   ├── use-auth.ts
│   ├── use-shortlist.ts
│   ├── use-properties.ts
│   └── use-ai-chat.ts
├── types/
│   ├── property.ts
│   ├── user.ts
│   └── api.ts
├── public/
│   ├── images/
│   │   ├── properties/           # Property photos
│   │   ├── communities/          # Community photos
│   │   ├── illustrations/        # SVG illustrations
│   │   └── icons/                # Favicon, app icons
│   └── fonts/                    # Inter, Noto Sans Arabic
├── supabase/
│   └── migrations/               # SQL migrations
├── middleware.ts                 # Next.js middleware (i18n + auth)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Design System: Nordic Lagom MVP

### 4.1 Color Tokens (OKLCH)

```css
/* globals.css */
@theme {
  /* Foundation */
  --color-canvas: oklch(0.98 0.01 90);
  --color-surface: oklch(1 0 0);
  --color-surface-subtle: oklch(0.96 0.01 90);
  --color-ink: oklch(0.2 0 0);
  --color-text: oklch(0.4 0 0);
  --color-muted: oklch(0.7 0 0);
  --color-border: oklch(0.92 0.01 90);
  --color-border-strong: oklch(0.85 0.01 90);

  /* Brand — Fjord Blue */
  --color-fjord: oklch(0.4 0.1 240);
  --color-fjord-hover: oklch(0.35 0.1 240);
  --color-fjord-active: oklch(0.3 0.1 240);
  --color-fjord-soft: oklch(0.95 0.05 240);
  --color-fjord-muted: oklch(0.9 0.03 240);

  /* Semantic */
  --color-verified: oklch(0.6 0.1 140);
  --color-verified-soft: oklch(0.95 0.03 140);
  --color-review: oklch(0.7 0.15 60);
  --color-review-soft: oklch(0.97 0.05 60);
  --color-unknown: oklch(0.7 0 0);
  --color-unknown-soft: oklch(0.96 0 0);
  --color-risk: oklch(0.5 0.15 30);
  --color-risk-soft: oklch(0.95 0.05 30);

  /* Elevation */
  --shadow-subtle: 0 4px 16px rgb(60 50 40 / 4%);
  --shadow-floating: 0 8px 32px rgb(60 50 40 / 6%);
  --shadow-lg: 0 16px 48px rgb(60 50 40 / 8%);

  /* Motion */
  --ease-decelerate: cubic-bezier(0.2, 0, 0, 1);
  --duration-fast: 120ms;
  --duration-standard: 180ms;
  --duration-slow: 240ms;

  /* Spacing (Tailwind v4 compatible) */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-32: 128px;
}
```

### 4.2 Layout & Containers

The layout philosophy follows the "Contained Breathing" system — narrow, centered, and padded for a premium editorial feel.

```css
/* Container System */
--container-sm: 640px;       /* Narrow text */
--container-md: 896px;       /* Forms, text-heavy */
--container-lg: 1024px;      /* DEFAULT — most content */
--container-xl: 1152px;      /* Grids, galleries */
--container-2xl: 1280px;     /* Hero only */

/* Horizontal Padding */
--page-padding-xs: 16px;     /* Mobile */
--page-padding-sm: 20px;
--page-padding-md: 24px;     /* Mobile default */
--page-padding-lg: 48px;     /* Desktop default */
--page-padding-xl: 64px;
```

### 4.3 Typography

| Token | Size | Weight | Tracking | Line Height |
|-------|------|--------|----------|-------------|
| `text-caption` | 12px | 400 | 0 | 1.4 |
| `text-small` | 14px | 400 | 0 | 1.5 |
| `text-body` | 16px | 400 | 0 | 1.6 |
| `text-body-lg` | 18px | 400 | -0.01em | 1.5 |
| `text-h4` | 18px | 600 | -0.02em | 1.3 |
| `text-h3` | 20px | 600 | -0.02em | 1.3 |
| `text-h2` | 28px | 600 | -0.02em | 1.2 |
| `text-h1` | 36px | 700 | -0.03em | 1.15 |
| `text-display` | clamp(1.875rem, 3.5vw, 2.75rem) | 700 | -0.03em | 1.1 |
| `text-display-lg` | clamp(2.5rem, 5vw, 4rem) | 700 | -0.03em | 1.05 |

**Fonts:**
- Latin: `Inter` (Google Fonts or local)
- Arabic: `Noto Sans Arabic` (Google Fonts)

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');

:root {
  --font-sans: 'Inter', 'Noto Sans Arabic', system-ui, sans-serif;
}

[dir="rtl"] {
  --font-sans: 'Noto Sans Arabic', 'Inter', system-ui, sans-serif;
}
```

### 4.3 Component Tokens

```css
/* globals.css */
@theme {
  /* Radii */
  --radius-tag: 6px;
  --radius-button: 8px;
  --radius-card: 8px;
  --radius-modal: 12px;
  --radius-full: 9999px;

  /* Touch targets */
  --min-touch: 44px;
}
```

---

## 5. Database Schema (Supabase)

### 5.1 Tables

```sql
-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  price INTEGER NOT NULL,
  price_verified BOOLEAN DEFAULT false,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqft INTEGER,
  community TEXT NOT NULL,
  sub_community TEXT,
  property_type TEXT NOT NULL, -- apartment, villa, townhouse, penthouse
  tenure TEXT NOT NULL, -- ready, off_plan
  developer TEXT,
  completion_date DATE,
  service_charge_aed INTEGER,
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  features TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  verification_status TEXT DEFAULT 'unknown', -- verified, review, unknown
  verification_source TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Shortlists table
CREATE TABLE shortlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- AI Conversations table
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  property_context JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Communities table
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  image TEXT,
  property_count INTEGER DEFAULT 0,
  avg_price INTEGER,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_properties_community ON properties(community);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_tenure ON properties(tenure);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_featured ON properties(is_featured) WHERE is_featured = true;
CREATE INDEX idx_shortlists_user ON shortlists(user_id);
CREATE INDEX idx_ai_conversations_session ON ai_conversations(session_id);

-- Full-text search
ALTER TABLE properties ADD COLUMN search_vector tsvector 
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title_en, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(community, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(sub_community, '')), 'C')
  ) STORED;

CREATE INDEX idx_properties_search ON properties USING gin(search_vector);
```

### 5.2 Row Level Security (RLS)

```sql
-- Properties: readable by everyone
CREATE POLICY "Properties are viewable by everyone" 
  ON properties FOR SELECT USING (is_active = true);

-- Shortlists: users can only see their own
CREATE POLICY "Users can view own shortlist" 
  ON shortlists FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to shortlist" 
  ON shortlists FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from shortlist" 
  ON shortlists FOR DELETE USING (auth.uid() = user_id);

-- AI Conversations: users can only see their own
CREATE POLICY "Users can view own conversations" 
  ON ai_conversations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create conversations" 
  ON ai_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5.3 Seed Data (Sample Properties)

```sql
INSERT INTO properties (slug, title_en, title_ar, price, price_verified, bedrooms, bathrooms, area_sqft, community, property_type, tenure, developer, images, thumbnail, is_featured, verification_status) VALUES
('marina-gate-2-bed', 'Marina Gate - 2 Bedroom', 'مارينا جيت - غرفتان', 2800000, true, 2, 2, 1250, 'Dubai Marina', 'apartment', 'ready', 'Select Group', ARRAY['https://...'], 'https://...', true, 'verified'),
('creek-horizon-3-bed', 'Creek Horizon - 3 Bedroom', 'كريك هورايزون - 3 غرف', 3200000, true, 3, 3, 1800, 'Dubai Creek Harbour', 'apartment', 'ready', 'Emaar', ARRAY['https://...'], 'https://...', true, 'verified'),
('jvc-townhouse-4-bed', 'JVC Townhouse - 4 Bedroom', 'فيلا جيه في سي - 4 غرف', 2100000, false, 4, 4, 2200, 'Jumeirah Village Circle', 'townhouse', 'ready', 'Nakheel', ARRAY['https://...'], 'https://...', false, 'review'),
('burj-crown-2-bed', 'Burj Crown - 2 Bedroom', 'برج كراون - غرفتان', 1900000, true, 2, 2, 1100, 'Downtown Dubai', 'apartment', 'off_plan', 'Emaar', ARRAY['https://...'], 'https://...', true, 'verified'),
('palm-jumeirah-villa', 'Palm Jumeirah Villa', 'فيلا نخلة جميرا', 15000000, true, 5, 6, 6500, 'Palm Jumeirah', 'villa', 'ready', 'Nakheel', ARRAY['https://...'], 'https://...', true, 'verified');
```

---

## 6. Authentication Flow

### 6.1 Supabase Auth Setup

**Providers:**
- Google OAuth (primary)
- Email/Password (secondary)

**Google OAuth Configuration:**
1. Create Google Cloud Project
2. Configure OAuth 2.0 credentials
3. Add redirect URI: `https://your-domain.com/api/auth/callback`
4. Add to Supabase Auth → Providers → Google

### 6.2 Auth Flow Diagram

```
User clicks "Sign In"
    ↓
Show Auth Modal (Google + Email options)
    ↓
[Google] → Redirect to Google OAuth
    ↓
Google redirects to /api/auth/callback
    ↓
Exchange code for session
    ↓
Set cookies (sb-access-token, sb-refresh-token)
    ↓
Redirect to original page or /en/shortlist
    ↓
Middleware validates session on every request
```

### 6.3 Middleware (middleware.ts)

```typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nRouting } from '@/lib/i18n/routing';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // i18n routing
  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale = i18nRouting.removeLocale(pathname);

  // Auth check for protected routes
  const isProtectedRoute = pathnameWithoutLocale.startsWith('/shortlist') ||
                           pathnameWithoutLocale.startsWith('/advisor');

  if (isProtectedRoute) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookies) => {
            cookies.forEach((cookie) => {
              response.cookies.set(cookie.name, cookie.value, cookie.options);
            });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL(`/${i18nRouting.getLocale(request)}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
```

### 6.4 Auth Components

**AuthModal:**
- Triggered by "Sign In" button in navbar
- Two tabs: "Continue with Google" (primary) and "Email" (secondary)
- Google button: prominent, Fjord Blue, Google icon
- Email form: email input + password input + "Sign In" button
- "Don't have an account? Sign Up" link
- Close button (X) in top-right
- Backdrop blur, modal animation (240ms)

**UserMenu:**
- Avatar + name in navbar (when authenticated)
- Dropdown: Shortlist, Advisor, Settings, Sign Out
- Sign Out: clears cookies, refreshes page

---

## 7. Page-by-Page MVP Specification

### 7.1 Landing Page (`/[locale]/`)

**Purpose:** First impression. Must be visually breathtaking.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Navbar (transparent → solid on scroll)     │
├─────────────────────────────────────────────┤
│                                             │
│  HERO (100vh)                               │
│  ┌───────────────────────────────────────┐  │
│  │  "Find your place"                    │  │
│  │  "Verified properties. Real prices."  │  │
│  │                                       │  │
│  │  [Search Bar________________] [Search]│  │
│  │                                       │  │
│  │  [Buy] [Rent] [Off-Plan]              │  │
│  └───────────────────────────────────────┘  │
│  (Background: full-bleed Dubai skyline photo)│
├─────────────────────────────────────────────┤
│  VALUE PILLARS                              │
│  [Verified] [True Costs] [Expert Guidance]  │
├─────────────────────────────────────────────┤
│  FEATURED PROPERTIES                        │
│  [Card] [Card] [Card] [Card]                │
│  (Horizontal scroll mobile / 4-col desktop) │
├─────────────────────────────────────────────┤
│  COMMUNITIES                                │
│  [Dubai Marina] [Downtown] [Palm] [JVC]     │
├─────────────────────────────────────────────┤
│  AI ADVISOR TEASER                          │
│  "Ask RAMA anything about Dubai real estate"│
│  [Try AI Advisor →]                         │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
└─────────────────────────────────────────────┘
```

**Hero Section Details:**
- **Background:** Full-bleed, high-quality Dubai skyline photo (evening golden hour)
- **Overlay:** Bottom 50% gradient from transparent to `rgba(10,10,15,0.7)`
- **Headline:** "Find your place in Dubai" — `text-display-lg`, white, font-weight 700
- **Subhead:** "Verified properties. Real prices. Zero guesswork." — `text-body-lg`, white/80%
- **Search Bar:** 
  - Centered, max-width 720px
  - Background: white, `--shadow-floating`, 12px radius
  - Input: "Search by area, community, or property"
  - Right side: Fjord Blue "Search" button
  - Below input: Segmented control — Buy | Rent | Off-Plan
- **Scroll indicator:** Subtle chevron bounce at bottom center

**Value Pillars:**
- 3-column grid, `space-24` vertical padding
- Each pillar: 64×64px line-art illustration + title + description
- Illustrations: SVG, single-weight stroke, Fjord Blue

**Featured Properties:**
- Section header: "Featured this week" + "View all →" link
- Horizontal scroll on mobile (snap-x)
- 4-column grid on desktop
- PropertyCard component (see 11.1)

**Communities:**
- 4 large cards with community photos
- Overlay with community name
- Hover: slight scale + shadow elevation

**AI Advisor Teaser:**
- Background: `--color-fjord-soft`
- Left: Illustration of chat bubbles
- Right: "Ask RAMA anything" + description + CTA button

### 7.2 Discovery Page (`/[locale]/homes`)

**Purpose:** Browse and filter properties.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Navbar (solid white)                       │
├─────────────────────────────────────────────┤
│  [Search________________] [Filters] [Sort]  │
├─────────────────────────────────────────────┤
│  [All] [Apartment] [Villa] [Townhouse]      │
│  [Ready] [Off-Plan] [Price↓] [Beds] [More]  │
├─────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ Property│ │ Property│ │ Property│       │
│  │ Card    │ │ Card    │ │ Card    │       │
│  └─────────┘ └─────────┘ └─────────┘       │
│  (3-column grid desktop, 1-col mobile)      │
├─────────────────────────────────────────────┤
│  [Load More] or infinite scroll             │
└─────────────────────────────────────────────┘
```

**Filter Bar:**
- Horizontal scroll of pill-shaped chips
- Active state: Fjord Blue background, white text
- Inactive: `--color-surface-subtle` background
- "More filters" opens bottom sheet (mobile) or side panel (desktop)

**Property Cards:**
- 4:3 aspect ratio image
- Top-left: Verification badge (if verified)
- Top-right: Heart icon (add to shortlist)
- Bottom: Price (large), Title, Location, Beds/Baths/Area
- Hover: Image crossfade to secondary photo, slight translateY(-4px)

### 7.3 Property Detail Page (`/[locale]/homes/[slug]`)

**Purpose:** Deep property information.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Navbar (solid white)                       │
├─────────────────────────────────────────────┤
│  GALLERY                                    │
│  ┌─────────────────────┬────────┬────────┐  │
│  │                     │ Thumb  │ Thumb  │  │
│  │    Main Image       │ Thumb  │ Thumb  │  │
│  │                     ├────────┼────────┤  │
│  │                     │ Thumb  │ Thumb  │  │
│  └─────────────────────┴────────┴────────┘  │
├─────────────────────────────────────────────┤
│  DETAILS                                    │
│  Title | Price (large)                      │
│  [Verified badge] Community | Developer     │
│                                             │
│  KEY FACTS (grid)                           │
│  [Beds] [Baths] [Area] [Type] [Tenure]     │
│                                             │
│  DESCRIPTION                                │
│  Full description text...                   │
│                                             │
│  FEATURES & AMENITIES                       │
│  [Pool] [Gym] [Parking] [Security] ...      │
│                                             │
│  LOCATION                                   │
│  [Map embed]                                │
│                                             │
│  SIMILAR PROPERTIES                         │
│  [Card] [Card] [Card]                       │
├─────────────────────────────────────────────┤
│  STICKY CTA BAR (mobile)                    │
│  [💬 Ask AI]          [❤️ Save] [📞 Contact]│
└─────────────────────────────────────────────┘
```

**Gallery:**
- Main image: 60% width, click to open full-screen lightbox
- Thumbnails: 5 smaller images, click swaps main
- Swipeable on mobile

**Key Facts Grid:**
- 5 columns on desktop, 3 on mobile
- Each: icon + label + value
- Icons: Bed, Bath, Maximize (area), Building (type), Calendar (tenure)

**Sticky CTA Bar (mobile only):**
- Fixed at bottom
- "Ask AI" (opens chat modal)
- "Save" (heart, toggles shortlist)
- "Contact" (opens contact form)

### 7.4 Shortlist Page (`/[locale]/shortlist`)

**Purpose:** Saved properties (requires auth).

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
├─────────────────────────────────────────────┤
│  My Shortlist (X properties)                │
│                                             │
│  [Property Card] [Property Card]            │
│  [Property Card] [Property Card]            │
│                                             │
│  Empty State (if no properties):            │
│  [Illustration: empty shelf]                │
│  "You haven't saved any properties yet"     │
│  [Browse Properties →]                      │
└─────────────────────────────────────────────┘
```

**Features:**
- Grid same as discovery
- Each card has "Remove" button
- Optimistic UI: remove instantly, sync in background
- "Compare" button (if 2+ properties selected)

### 7.5 AI Advisor Page (`/[locale]/advisor`)

**Purpose:** AI-powered property consultation.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
├─────────────────────────────────────────────┤
│  AI ADVISOR                                 │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │  🤖 Welcome! I'm RAMA AI.             │  │
│  │     Ask me anything about Dubai       │  │
│  │     real estate.                      │  │
│  │                                       │  │
│  │  👤 What are the best areas for       │  │
│  │     families under AED 3M?          │  │
│  │                                       │  │
│  │  🤖 Based on your budget...           │  │
│  │     [JVC, Dubai Hills, Town Square]   │  │
│  │                                       │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  [Quick Questions:]                         │
│  [Best areas?] [Off-plan vs ready?]         │
│  [Investment tips?] [Mortgage basics?]      │
│                                             │
│  ┌──────────────────────────────────┐ [Send]│
│  │ Type your question...            │       │
│  └──────────────────────────────────┘       │
└─────────────────────────────────────────────┘
```

**Features:**
- Chat interface (WhatsApp/iMessage style)
- AI avatar: simple robot illustration
- User messages: right-aligned, Fjord Blue bubble
- AI messages: left-aligned, white bubble with border
- Quick question chips above input
- Typing indicator: three dots animation
- Property cards can appear inline in AI responses
- "Was this helpful?" 👍 👎 feedback

### 7.6 Login Page (`/[locale]/login`)

**Purpose:** Authentication entry.

**Layout:**
```
┌────────────────────────┬────────────────────┐
│                        │                    │
│  [Illustration]        │   Sign In to RAMA  │
│  Abstract architectural│                    │
│  line art              │   [Continue with   │
│                        │    Google]         │
│                        │                    │
│                        │   ─── or ───       │
│                        │                    │
│                        │   [Email input]    │
│                        │   [Password input] │
│                        │   [Sign In]        │
│                        │                    │
│                        │   Don't have an    │
│                        │   account? Sign Up │
│                        │                    │
└────────────────────────┴────────────────────┘
```

**Left side:** Full-height illustration (abstract Dubai skyline, single-weight lines, Fjord Blue)
**Right side:** Auth form, centered vertically

---

## 8. Illustration & Asset Strategy

### 8.1 Illustration Inventory

| Name | Location | Style | Animation |
|------|----------|-------|-----------|
| `HeroIllustration` | Landing hero (optional overlay) | Abstract Dubai skyline, geometric, 5-6 shapes | Subtle parallax on scroll |
| `VerifiedShield` | Value pillars, property cards | Shield with checkmark, 1.5px stroke | Stroke draw on scroll |
| `CostCalculator` | Value pillars | Calculator with coins, 1.5px stroke | Stroke draw on scroll |
| `CompassGuide` | Value pillars | Compass with needle, 1.5px stroke | Stroke draw on scroll |
| `EmptyShortlist` | Shortlist empty state | Empty shelf with single book | Gentle bounce |
| `EmptySearch` | Search no-results | Open map with small flag | Fade in |
| `ErrorState` | Error pages | Foundation with small crack | Static |
| `AIAvatar` | AI advisor | Robot head, friendly, 1.5px stroke | Subtle float |
| `ChatBubbles` | AI teaser section | Two overlapping speech bubbles | Fade in |
| `LoginArt` | Login page left panel | Abstract architectural forms | Static |
| `DocumentStack` | Property detail (trust) | 3 stacked papers with check | Sequential fade |
| `MapContour` | Communities section | Stylized contour lines | Stroke draw |
| `LoadingDots` | AI typing | 3 dots, pulsing | Infinite pulse |
| `HeartSave` | Shortlist button | Heart outline/filled | Scale bounce on toggle |

### 8.2 SVG Illustration Guidelines

```tsx
// components/illustrations/verified-shield.tsx
export function VerifiedShield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M32 4L8 14v16c0 16 10.2 30.8 24 34 13.8-3.2 24-18 24-34V14L32 4z" />
      <path d="M22 32l8 8 12-16" />
    </svg>
  );
}
```

**Rules:**
- All illustrations: `viewBox="0 0 64 64"` (or appropriate)
- Stroke: `currentColor` (inherits from CSS)
- Stroke width: `1.5`
- No fills (unless soft tint backgrounds)
- `strokeLinecap="round"`, `strokeLinejoin="round"`
- Animated via CSS or Framer Motion

### 8.3 Photography Requirements

**Property Images:**
- Minimum: 1200×900px (4:3 aspect)
- Preferred: 2400×1800px
- Format: WebP with JPEG fallback
- Treatment: Warm color grading, slight desaturation of blues
- Content: Exterior hero shot, interior living, kitchen, bedroom, bathroom, balcony view

**Community Images:**
- Aerial or wide-angle shots
- Golden hour preferred
- 16:9 aspect for cards

**Hero Background:**
- 1920×1080 minimum
- Dubai skyline at dusk/dawn
- Gradient overlay compatible

---

## 9. AI Integration (OpenRouter)

### 9.1 Architecture

```
User types question
    ↓
Frontend sends to /api/ai/chat
    ↓
API route calls OpenRouter API
    ↓
OpenRouter routes to model (Claude 3.5 Sonnet / GPT-4o)
    ↓
Response streamed back to frontend
    ↓
Frontend renders markdown + property cards
```

### 9.2 API Route (`app/api/ai/chat/route.ts`)

```typescript
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL,
    'X-Title': 'RAMA Real Estate',
  },
});

export async function POST(request: Request) {
  const { messages, propertyContext } = await request.json();

  const systemPrompt = `You are RAMA AI, a knowledgeable Dubai real estate advisor. 
You help users find properties, understand neighborhoods, compare areas, and make informed decisions.
Be concise, accurate, and friendly. If you don't know something, say so.
Current property context: ${propertyContext ? JSON.stringify(propertyContext) : 'None'}`;

  const stream = await openrouter.chat.completions.create({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    }
  );
}
```

### 9.3 Frontend AI Chat Hook

```typescript
// hooks/use-ai-chat.ts
import { useState, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  propertyCards?: Property[];
}

export function useAIChat(propertyContext?: Property) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome! I'm RAMA AI. Ask me anything about Dubai real estate — areas, prices, investments, or specific properties.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        propertyContext,
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantContent = '';

    // Add empty assistant message
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantContent += decoder.decode(value, { stream: true });
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: assistantContent },
      ]);
    }

    setIsLoading(false);
  }, [messages, propertyContext]);

  return { messages, isLoading, sendMessage };
}
```

### 9.4 AI Quick Questions

Pre-defined prompts users can tap:
- "What are the best areas for families under AED 3M?"
- "Should I buy off-plan or ready?"
- "What are the best investment areas in 2026?"
- "Explain service charges in Dubai"
- "What documents do I need to buy property?"

### 9.5 AI Response Enhancements

- **Property Cards:** If AI mentions specific properties, render inline PropertyCard components
- **Markdown:** Support bold, lists, links in AI responses
- **Follow-ups:** AI can suggest follow-up questions
- **Feedback:** 👍 👎 buttons on each AI message

---

## 10. Firebase Integration

### 10.1 Setup

```typescript
// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics (client-side only)
export const getFirebaseAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

// Performance monitoring
export const firebasePerformance = typeof window !== 'undefined' 
  ? getPerformance(app) 
  : null;

export { app };
```

### 10.2 Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `page_view` | Route change | page_title, page_location |
| `search` | Search submitted | search_term, filters_used |
| `view_item` | Property detail viewed | item_id, item_name, price |
| `add_to_shortlist` | Heart clicked | item_id, item_name |
| `remove_from_shortlist` | Heart unclicked | item_id |
| `begin_checkout` | Contact agent clicked | item_id, price |
| `ai_chat_started` | First AI message | |
| `ai_chat_message` | Each AI exchange | question_category |
| `login` | Auth completed | method (google/email) |
| `sign_up` | New registration | method |

### 10.3 Crashlytics

Automatic error reporting for uncaught exceptions. Wrap API calls:

```typescript
import { firebasePerformance } from '@/lib/firebase';

async function trackApiCall<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const trace = firebasePerformance?.trace(name);
  trace?.start();
  try {
    const result = await fn();
    trace?.putMetric('success', 1);
    return result;
  } catch (error) {
    trace?.putMetric('error', 1);
    throw error;
  } finally {
    trace?.stop();
  }
}
```

---

## 11. Component Inventory

### 11.1 PropertyCard

```tsx
interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact' | 'featured';
  showSaveButton?: boolean;
  onSaveToggle?: (propertyId: string, saved: boolean) => void;
}

// Features:
// - 4:3 image with hover crossfade
// - Top-left: verification badge (if verified)
// - Top-right: heart save button
// - Price: large, bold
// - Title: 2-line clamp
// - Location: muted text
// - Specs: beds · baths · area
// - Hover: translateY(-4px), shadow elevation
```

### 11.2 SearchBar

```tsx
interface SearchBarProps {
  defaultValue?: string;
  onSearch: (query: string, filters: SearchFilters) => void;
  variant?: 'hero' | 'inline';
}

// Features:
// - Hero: large, centered, floating shadow
// - Inline: compact, navbar-integrated
// - Segmented control: Buy | Rent | Off-Plan
// - Auto-suggestions dropdown
```

### 11.3 FilterSheet

```tsx
interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
}

// Features:
// - Mobile: bottom sheet (swipe to dismiss)
// - Desktop: side panel
// - Price range slider
// - Bedroom count chips
// - Property type checkboxes
// - Community multi-select
// - Tenure toggle
// - "Clear all" + "Show X results" buttons
```

### 11.4 AuthModal

```tsx
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

// Features:
// - Google Sign In (primary, prominent)
// - Email/Password (secondary tab)
// - Sign Up / Sign In toggle
// - Error states
// - Loading states
```

### 11.5 AIChat

```tsx
interface AIChatProps {
  propertyContext?: Property;
  className?: string;
}

// Features:
// - Message list (user right, AI left)
// - Typing indicator
// - Quick question chips
// - Text input with send button
// - Property card inline rendering
// - Scroll to bottom on new messages
```

### 11.6 TrustBadge

```tsx
interface TrustBadgeProps {
  status: 'verified' | 'review' | 'unknown';
  source?: string;
  size?: 'sm' | 'md';
}

// Features:
// - Color-coded: verified (green), review (amber), unknown (gray)
// - Icon: check, clock, or question mark
// - Tooltip on hover: "Verified by DLD" / "Under review" / "Not yet confirmed"
```

### 11.7 EmptyState

```tsx
interface EmptyStateProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; href: string };
}

// Features:
// - Centered illustration (64×64 or larger)
// - Title: text-h3
// - Description: text-body, muted
// - Optional CTA button
```

---

## 12. Animation & Motion MVP

### 12.1 Global Transitions

```css
/* globals.css */
@layer base {
  /* Page transitions */
  .page-enter {
    opacity: 0;
    transform: translateY(8px);
  }
  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 180ms cubic-bezier(0.2, 0, 0, 1),
                transform 180ms cubic-bezier(0.2, 0, 0, 1);
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

### 12.2 Component Animations

| Component | Trigger | Animation | Duration | Easing |
|-----------|---------|-----------|----------|--------|
| **PropertyCard** | Hover | translateY(-4px), shadow elevation | 120ms | decelerate |
| **PropertyCard image** | Hover | Crossfade to secondary | 180ms | standard |
| **Button** | Active | scale(0.98) | 80ms | standard |
| **Modal** | Open | scale(0.95→1), opacity(0→1) | 240ms | decelerate |
| **Modal** | Close | scale(1→0.95), opacity(1→0) | 180ms | accelerate |
| **Toast** | Enter | translateX(100%→0) | 240ms | decelerate |
| **List items** | Mount | Stagger fade + translateY | 60ms/item | decelerate |
| **Skeleton** | Loading | Pulse opacity | 1.5s | standard |
| **Heart save** | Toggle | Scale(1→1.3→1) | 300ms | elastic |
| **AI typing** | Loading | 3 dots pulse | 1s | standard |
| **Illustration** | Scroll | SVG stroke draw | 600ms | decelerate |
| **Navbar** | Scroll | Background blur + shadow | 180ms | standard |

### 12.3 Scroll Behaviors

- **Navbar:** Transparent on top, `backdrop-blur-md bg-canvas/90` + shadow after 50px scroll
- **Hero parallax:** Background image moves at 0.5x scroll speed (subtle)
- **Section reveals:** Fade in + translateY(16px→0) when 20% visible
- **Property cards:** Stagger 60ms on grid load

---

## 13. Build Roadmap

### Phase 1: Foundation (Week 1)

- [ ] Initialize Next.js project with shadcn preset
- [ ] Set up Tailwind v4 with OKLCH tokens
- [ ] Configure TypeScript strict mode
- [ ] Set up ESLint + Prettier
- [ ] Set up Supabase project
- [ ] Create database schema + seed data
- [ ] Configure Google OAuth in Supabase
- [ ] Set up next-intl for EN/AR
- [ ] Create base layout (Navbar, Footer)
- [ ] Implement RTL support

### Phase 2: Design System (Week 1-2)

- [ ] Build all shadcn/ui overrides (Button, Card, Input, Dialog, Badge)
- [ ] Create illustration components (SVG, 1.5px stroke)
- [ ] Implement color tokens in globals.css
- [ ] Implement typography scale
- [ ] Implement spacing system
- [ ] Build animation utilities
- [ ] Create loading skeletons

### Phase 3: Public Pages (Week 2-3)

- [ ] Landing page (hero, search, value pillars, featured, communities)
- [ ] Discovery page (search, filters, property grid)
- [ ] Property detail page (gallery, facts, description, map, similar)
- [ ] Community/Areas page
- [ ] Insights page (basic)
- [ ] Login page

### Phase 4: Auth & Shortlist (Week 3)

- [ ] Auth modal (Google + Email)
- [ ] OAuth callback handler
- [ ] Middleware for protected routes
- [ ] User menu in navbar
- [ ] Shortlist page
- [ ] Heart save button on property cards
- [ ] Optimistic UI for shortlist

### Phase 5: AI Advisor (Week 4)

- [ ] OpenRouter API route
- [ ] AI chat interface
- [ ] Streaming responses
- [ ] Quick question chips
- [ ] Property card inline rendering
- [ ] AI page
- [ ] AI teaser on landing

### Phase 6: Polish & Firebase (Week 4-5)

- [ ] Firebase Analytics integration
- [ ] Firebase Crashlytics
- [ ] Performance monitoring
- [ ] Image optimization (Next.js Image)
- [ ] SEO meta tags
- [ ] Open Graph images
- [ ] Sitemap
- [ ] Final responsive testing
- [ ] Cross-browser testing
- [ ] Arabic RTL testing
- [ ] Accessibility audit

### Phase 7: Launch Prep (Week 5)

- [ ] Production build optimization
- [ ] Vercel deployment
- [ ] Supabase production project
- [ ] Environment variables configured
- [ ] Domain setup
- [ ] SSL certificate
- [ ] Final QA
- [ ] Soft launch

---

## 14. Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-your-key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RAMA

# Optional: Google Maps (for property detail maps)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
```

---

## 15. Master Build Prompt

> **Build RAMA MVP — a visually stunning, bilingual (English/Arabic) Dubai real estate discovery platform.**
>
> **Tech Stack:** Next.js 16.2.6 + React 19 + TypeScript 5 + Tailwind CSS v4 + shadcn/ui + Supabase (Auth + PostgreSQL + Storage) + OpenRouter AI + Firebase Analytics.
>
> **Design Philosophy:** Nordic Lagom — "just the right amount." Warm limestone canvas (`oklch(0.98 0.01 90)`), Fjord Blue brand (`oklch(0.4 0.1 240)`), restrained shadows, 44px touch targets, zero cognitive noise. No dark mode. No neon. No fake urgency. No aggressive popups.
>
> **Initialize with:**
> ```bash
> pnpm dlx shadcn@latest init --preset b2H8Wa6FDE --template next
> ```
>
> **Visual Requirements:**
> - **Hero:** Full-bleed Dubai skyline photo with gradient overlay, dominant search bar (Airbnb-style), "Find your place in Dubai" headline in white display typography.
> - **Illustrations:** Single-weight SVG line art (1.5px stroke) with Fjord Blue color. Abstract architectural forms, geometric Dubai skyline, shield/compass/calculator icons for value pillars. SVG stroke-draw animations on scroll.
> - **Property Cards:** 4:3 photo-first design, hover crossfade to secondary image, translateY(-4px) lift, verification badge top-left, heart save top-right, price prominent, specs in muted text.
> - **Colors:** OKLCH throughout. Canvas, Surface, Ink, Text, Muted, Border. Brand: Fjord Blue with hover/active states. Semantic: Verified green, Review amber, Unknown gray, Risk red.
> - **Typography:** Inter for Latin, Noto Sans Arabic for Arabic. Single font family. Heading tracking: -0.02em to -0.03em. Body: normal tracking, 1.6 line height.
> - **Motion:** `cubic-bezier(0.2, 0, 0, 1)` easing. 120ms micro, 180ms standard, 240ms complex. Respect `prefers-reduced-motion`.
>
> **Pages to Build:**
> 1. **Landing (`/[locale]/`):** Hero with search, value pillars (3 illustrations), featured properties (4-card grid), communities section, AI advisor teaser, footer.
> 2. **Discovery (`/[locale]/homes`):** Search bar, filter chips (pill-shaped, horizontal scroll), property grid (3-col desktop, 1-col mobile), load more/infinite scroll.
> 3. **Property Detail (`/[locale]/homes/[slug]`):** Gallery (main + thumbnails), key facts grid, description, features tags, location map, similar properties carousel, sticky CTA bar on mobile.
> 4. **Shortlist (`/[locale]/shortlist`):** Protected route. Saved property grid, remove button, empty state with illustration.
> 5. **AI Advisor (`/[locale]/advisor`):** Protected route. Chat interface (WhatsApp-style), streaming responses, quick question chips, AI avatar illustration.
> 6. **Login (`/[locale]/login`):** Split layout — illustration left, auth form right. Google Sign In primary, email/password secondary.
>
> **Features:**
> - **Authentication:** Supabase Auth with Google OAuth. Email/password secondary. Protected routes via middleware. Auth modal with Google button prominent.
> - **Property Discovery:** Browse properties from Supabase. Filter by type, tenure, price, beds, community. Full-text search. Sort by price, newest, featured.
> - **Shortlist:** Add/remove properties with heart button. Optimistic UI. Protected page.
> - **AI Advisor:** OpenRouter integration (Claude 3.5 Sonnet). Streaming chat responses. Contextual property advice. Quick question prompts. Inline property cards in responses.
> - **Bilingual:** Full EN/AR support via next-intl. Locale-prefixed routing (`/en/`, `/ar/`). RTL layout for Arabic. Arabic font loading.
> - **Analytics:** Firebase Analytics for page views, searches, property views, shortlist actions, AI chat events.
>
> **Database (Supabase):**
> - `properties`: id, slug, title_en, title_ar, description_en, description_ar, price, price_verified, bedrooms, bathrooms, area_sqft, community, property_type, tenure, developer, images, thumbnail, latitude, longitude, features, amenities, verification_status, is_featured, is_active.
> - `shortlists`: id, user_id, property_id, created_at.
> - `ai_conversations`: id, user_id, session_id, role, content, property_context, created_at.
> - RLS: properties public read, shortlists user-scoped, conversations user-scoped.
> - Full-text search on properties.
>
> **Component Requirements:**
> - PropertyCard (with hover effects, save button, verification badge)
> - SearchBar (hero + inline variants)
> - FilterSheet (mobile bottom sheet, desktop side panel)
> - AuthModal (Google primary, email secondary)
> - AIChat (streaming, quick questions, property cards inline)
> - TrustBadge (verified/review/unknown states)
> - EmptyState (illustration + text + CTA)
> - Navbar (transparent→solid on scroll, locale switcher, auth state)
> - Footer (4-column, language toggle, trust badges)
>
> **Animation Requirements:**
> - Page transitions: fade + translateY(8px), 180ms
> - Property cards: stagger fade-in on load, 60ms between items
> - Card hover: translateY(-4px) + shadow elevation, 120ms
> - Image hover: crossfade 180ms
> - Modal: scale(0.95→1) + fade, 240ms open, 180ms close
> - Heart save: scale bounce 300ms
> - AI typing: 3-dot pulse
> - Illustrations: SVG stroke-draw on scroll, 600ms
> - Navbar: blur + shadow on scroll, 180ms
>
> **Quality Gates:**
> - TypeScript strict mode, zero `any`
> - ESLint clean
> - Production build successful
> - Mobile responsive (390px+)
> - Arabic RTL functional
> - 44px minimum touch targets
> - WCAG 2.1 AA contrast ratios
> - `prefers-reduced-motion` respected
>
> **Deliverable:** A deployable Next.js application on Vercel, connected to Supabase, with Firebase Analytics, OpenRouter AI chat, bilingual EN/AR support, and a visually stunning Nordic Lagom design system that makes Dubai real estate discovery feel calm, confident, and premium.

---

*Document Version: 1.0*  
*Date: 24 July 2026*  
*Classification: MVP Build Specification*  
*Design System: Nordic Lagom*  
*Tech Stack: Next.js 16 + Supabase + OpenRouter + Firebase*
