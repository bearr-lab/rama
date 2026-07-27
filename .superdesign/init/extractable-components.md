# RAMA Extractable Components

---

## Layout Components (appear on most pages)

### AppShell
- Source: `components/shell/app-shell.tsx`
- Category: layout
- Description: Root flex layout wrapping Sidebar + Header + main content
- Extractable props: *(none — renders full shell)*
- Hardcoded: `bg-canvas`, `font-sans`, `min-h-screen`

---

### Sidebar
- Source: `components/shell/sidebar.tsx`
- Category: layout
- Description: Collapsible left navigation sidebar with logo, nav items, settings
- Extractable props:
  - `activeItem` (string, default: current route) — active nav item
  - `collapsed` (boolean, default: false) — collapsed state
- Hardcoded: NAV_ITEMS list, RAMA logo "R", gradient `from-sky-400 to-fjord`, icon set (Lucide)

---

### Header
- Source: `components/shell/header.tsx`
- Category: layout
- Description: Sticky top bar with page title, search trigger, notifications, avatar
- Extractable props:
  - `pageTitle` (string) — displayed title text
  - `showNotification` (boolean, default: false) — notification badge visibility
- Hardcoded: search label "Search OS...", `⌘K` keyboard shortcut, user avatar icon

---

## Basic Components (used across pages)

### Button
- Source: `components/ui/button.tsx`
- Category: basic
- Description: Multi-variant action button
- Extractable props:
  - `variant` ('default'|'outline'|'secondary'|'ghost'|'destructive'|'link')
  - `size` ('default'|'sm'|'lg'|'icon'|'icon-sm')
  - `children` (ReactNode)
- Hardcoded: radius via `--radius-button`, transition durations

---

### Card
- Source: `components/ui/card.tsx`
- Category: basic
- Description: Content container with structured sub-components
- Extractable props:
  - `size` ('default'|'sm') — controls internal spacing
- Hardcoded: `bg-card`, `ring-foreground/10`, `rounded-lg`

---

### Input
- Source: `components/ui/input.tsx`
- Category: basic
- Description: Text input field
- Extractable props:
  - `type` (string)
  - `placeholder` (string)
  - `disabled` (boolean)
- Hardcoded: `h-9`, border, ring styles

---

### Badge
- Source: `components/ui/badge.tsx`
- Category: basic
- Description: Status chip/tag
- Extractable props:
  - `variant` ('default'|'secondary'|'destructive'|'outline')
- Hardcoded: `--radius-tag`, text sizing

---

### PropertyCard (Discover)
- Source: `components/discover/` (property listing cards)
- Category: basic
- Description: Property listing card with image, price, beds/baths, status badge
- Extractable props:
  - `title` (string)
  - `price` (number)
  - `community` (string)
  - `beds` (number)
  - `baths` (number)
  - `area` (number)
  - `status` ('verified'|'review'|'unknown')
  - `imageUrl` (string)
- Hardcoded: currency format (AED), status badge colors, card layout

---

### ChatBubble (Advisor)
- Source: `components/ai/chat-interface.tsx`
- Category: basic
- Description: Chat message bubble (user + assistant variants)
- Extractable props:
  - `role` ('user'|'assistant')
  - `content` (string)
  - `timestamp` (string)
- Hardcoded: Sparkles icon for AI, bubble color by role

---

### NotificationCenter
- Source: `components/shell/notification-center.tsx`
- Category: basic
- Description: Bell icon with dropdown notification list
- Extractable props:
  - `count` (number, default: 0) — unread count badge
- Hardcoded: bell icon, notification panel layout
