# RAMA Pages — Dependency Trees

---

## /[locale]/dashboard (Dashboard)
Entry: `app/(workspace)/[locale]/dashboard/page.tsx`
Dependencies:
- `components/ui/button.tsx` (buttonVariants)
- `lib/utils.ts`
- Layout: `components/shell/app-shell.tsx`
  - `components/shell/sidebar.tsx`
  - `components/shell/header.tsx`
    - `components/shell/notification-center.tsx`
    - `components/ui/sheet.tsx`
  - `components/shell/command-palette.tsx`

---

## /[locale]/discover (Discover)
Entry: `app/(workspace)/[locale]/discover/page.tsx`
Dependencies:
- `components/discover/discover-client.tsx`
  - (property search UI, filter panel, 3-column grid, map toggle)
- Layout: AppShell (see above)

---

## /[locale]/advisor (AI Advisor)
Entry: `app/(workspace)/[locale]/advisor/page.tsx`
Dependencies:
- `components/ai/chat-interface.tsx`
  - (streaming chat UI, message bubbles, input bar)
- `lib/supabase/server.ts`
- Layout: AppShell

---

## /[locale]/decision-lab (Decision Lab)
Entry: `app/(workspace)/[locale]/decision-lab/page.tsx`
Dependencies:
- Decision comparison UI components
- Layout: AppShell

---

## /[locale]/community (Communities)
Entry: `app/(workspace)/[locale]/community/page.tsx`
Dependencies:
- Community explorer UI
- Layout: AppShell

---

## /[locale]/documents (Document Room)
Entry: `app/(workspace)/[locale]/documents/page.tsx`
Dependencies:
- Document upload/organise UI
- Layout: AppShell

---

## /[locale]/portfolio (Portfolio)
Entry: `app/(workspace)/[locale]/portfolio/page.tsx`
Dependencies:
- Portfolio metrics/tracking UI
- Layout: AppShell

---

## /[locale]/shortlist (Saved Shortlist)
Entry: `app/(workspace)/[locale]/shortlist/page.tsx`
Dependencies:
- Shortlist comparison table/cards
- Layout: AppShell

---

## /[locale]/tasks (Tasks & Deal Flow)
Entry: `app/(workspace)/[locale]/tasks/page.tsx`
Dependencies:
- Task board / deal flow tracker
- Layout: AppShell

---

## /[locale]/settings (Settings)
Entry: `app/(workspace)/[locale]/settings/page.tsx`
Dependencies:
- Profile / preferences form
- Layout: AppShell

---

## /[locale]/property/[id] (Property Workspace)
Entry: `app/(workspace)/[locale]/property/[id]/page.tsx`
Dependencies:
- Property detail components
- Evidence/notes organiser
- Layout: AppShell
