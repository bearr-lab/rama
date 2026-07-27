# RAMA Routes

Routing: Next.js 15 App Router with `[locale]` segment (en | ar) and route groups.

---

## Route Groups

| Group | Path | Layout |
|-------|------|--------|
| `(public)` | No auth required | Minimal layout |
| `(workspace)` | Auth-protected | `AppShell` (Sidebar + Header) |

---

## Public Routes

| URL | File | Description |
|-----|------|-------------|
| `/[locale]` | `app/(public)/[locale]/page.tsx` | Root landing redirect |
| `/[locale]/landing` | `app/(public)/[locale]/landing/page.tsx` | Marketing landing page |
| `/[locale]/login` | `app/(public)/[locale]/login/page.tsx` | Auth login page |
| `/[locale]/homes` | `app/(public)/[locale]/homes/page.tsx` | Public property listings |
| `/[locale]/homes/[slug]` | `app/(public)/[locale]/homes/[slug]/page.tsx` | Public property detail |
| `/[locale]/areas` | `app/(public)/[locale]/areas/page.tsx` | Dubai areas overview |
| `/[locale]/insights` | `app/(public)/[locale]/insights/page.tsx` | Market insights |

---

## Workspace Routes (AppShell — Sidebar + Header)

| URL | File | Description |
|-----|------|-------------|
| `/[locale]/dashboard` | `app/(workspace)/[locale]/dashboard/page.tsx` | Home dashboard — brief summary, quick actions |
| `/[locale]/discover` | `app/(workspace)/[locale]/discover/page.tsx` | Property discovery with search/filter/map |
| `/[locale]/community` | `app/(workspace)/[locale]/community/page.tsx` | Dubai communities explorer |
| `/[locale]/decision-lab` | `app/(workspace)/[locale]/decision-lab/page.tsx` | Comparison + scoring tool |
| `/[locale]/advisor` | `app/(workspace)/[locale]/advisor/page.tsx` | AI chat concierge (RAG over DLD data) |
| `/[locale]/documents` | `app/(workspace)/[locale]/documents/page.tsx` | Document room — evidence organiser |
| `/[locale]/portfolio` | `app/(workspace)/[locale]/portfolio/page.tsx` | Investment portfolio tracker |
| `/[locale]/property/[id]` | `app/(workspace)/[locale]/property/[id]/page.tsx` | Authenticated property workspace |
| `/[locale]/tasks` | `app/(workspace)/[locale]/tasks/page.tsx` | Tasks & deal flow tracker |
| `/[locale]/shortlist` | `app/(workspace)/[locale]/shortlist/page.tsx` | Saved properties comparison shortlist |
| `/[locale]/settings` | `app/(workspace)/[locale]/settings/page.tsx` | User profile & preferences |

---

## API Routes

| Path | Description |
|------|-------------|
| `app/api/*` | Server API endpoints (Supabase auth callbacks, AI chat, etc.) |

---

## Locale Support

- Supported locales: `en` (English LTR), `ar` (Arabic RTL)
- RTL handled via `dir="rtl"` on `<html>`, custom fonts via CSS vars
- i18n messages in `/messages/en.json` and `/messages/ar.json`
