# RAMA Design Theme

Design system name: **Nordic Lagom** — a calm, evidence-first aesthetic for Dubai real estate decision-making.

---

## Part 1 — Compact Token Summary

### Color Palette (`:root`)

| Token | Value | Description |
|-------|-------|-------------|
| `--canvas` | `oklch(0.97 0.012 85)` | Page background (warm off-white) |
| `--surface` | `oklch(1 0 0)` | Card/panel background (pure white) |
| `--surface-subtle` | `oklch(0.96 0.01 90)` | Subtle hover/layer |
| `--surface-warm` | `oklch(0.96 0.015 85)` | Warm tinted surface |
| `--ink` | `oklch(0.15 0 0)` | Primary text (near black) |
| `--text` | `oklch(0.38 0 0)` | Body text (dark grey) |
| `--muted` | `oklch(0.7 0 0)` | Secondary/placeholder text |
| `--border` | `oklch(0.92 0.01 90)` | Default border |
| `--border-strong` | `oklch(0.85 0.01 90)` | Stronger border |
| `--fjord` | `oklch(0.4 0.1 240)` | **Brand blue** (active/primary) |
| `--fjord-hover` | `oklch(0.35 0.1 240)` | Fjord hover |
| `--fjord-soft` | `oklch(0.95 0.05 240)` | Fjord tint (active nav bg) |
| `--fjord-muted` | `oklch(0.9 0.03 240)` | Very faint fjord (ring) |
| `--verified` | `oklch(0.6 0.1 140)` | Green — verified status |
| `--review` | `oklch(0.7 0.15 60)` | Amber — needs review |
| `--risk` | `oklch(0.5 0.15 30)` | Red-orange — risk signal |
| `--ink-bg` | `oklch(0.18 0.02 260)` | Dark section background |
| `--ink-surface` | `oklch(0.22 0.02 260)` | Dark card surface |

### Typography

| Token | Value |
|-------|-------|
| `--font-display` | `'Playfair Display', serif` (serif, editorial) |
| `--font-sans` | `'Inter', 'Noto Sans Arabic', system-ui, sans-serif` |
| RTL override | `--font-display: 'Noto Naskh Arabic'` · `--font-sans: 'Noto Sans Arabic'` |

**Type Scale:**
- `text-display-lg`: clamp(2.5rem, 5vw, 4rem) / 700 / -0.03em
- `text-display`: clamp(1.875rem, 3.5vw, 2.75rem) / 700 / -0.03em
- `text-h1`: 2.25rem / 700 / -0.03em
- `text-h2`: 1.75rem / 600 / -0.02em
- `text-h3`: 1.25rem / 600 / -0.02em
- `text-h4`: 1.125rem / 600 / -0.02em
- `text-body-lg`: 1.125rem / 400
- `text-body`: 1rem / 400
- `text-small`: 0.875rem / 400
- `text-caption`: 0.75rem / 400

### Border Radius

| Token | Value |
|-------|-------|
| `--radius` | `0.5rem` (base) |
| `--radius-tag` | `6px` |
| `--radius-button` | `8px` |
| `--radius-card` | `8px` |
| `--radius-modal` | `12px` |
| `--radius-full` | `9999px` |

### Elevation / Shadows

| Token | Value |
|-------|-------|
| `--shadow-subtle` | `0 4px 16px rgb(60 50 40 / 4%)` |
| `--shadow-floating` | `0 8px 32px rgb(60 50 40 / 6%)` |
| `--shadow-lg` | `0 16px 48px rgb(60 50 40 / 8%)` |

### Motion

| Token | Value |
|-------|-------|
| `--ease-decelerate` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--duration-fast` | `120ms` |
| `--duration-standard` | `180ms` |
| `--duration-slow` | `240ms` |

### Breakpoints / Containers

| Token | Value |
|-------|-------|
| `--container-sm` | `640px` |
| `--container-md` | `896px` |
| `--container-lg` | `1024px` |
| `--container-xl` | `1152px` |
| `--container-2xl` | `1280px` |

### shadcn Token Mappings

| shadcn token | Maps to |
|---|---|
| `--background` | `--canvas` |
| `--foreground` | `--ink` |
| `--card` | `--surface` |
| `--primary` | `--fjord` |
| `--secondary` | `--surface-subtle` |
| `--muted-color` | `--surface-subtle` |
| `--accent` | `--surface-subtle` |
| `--destructive` | `--risk` |
| `--input` | `--border` |
| `--ring` | `--fjord-muted` |

---

## Part 2 — Raw Source Dumps

### globals.css (full)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --canvas: oklch(0.97 0.012 85);
  --surface: oklch(1 0 0);
  --surface-subtle: oklch(0.96 0.01 90);
  --surface-warm: oklch(0.96 0.015 85);
  --ink: oklch(0.15 0 0);
  --text: oklch(0.38 0 0);
  --muted: oklch(0.7 0 0);
  --border: oklch(0.92 0.01 90);
  --border-strong: oklch(0.85 0.01 90);

  --fjord: oklch(0.4 0.1 240);
  --fjord-hover: oklch(0.35 0.1 240);
  --fjord-active: oklch(0.3 0.1 240);
  --fjord-soft: oklch(0.95 0.05 240);
  --fjord-muted: oklch(0.9 0.03 240);

  --verified: oklch(0.6 0.1 140);
  --verified-soft: oklch(0.95 0.03 140);
  --review: oklch(0.7 0.15 60);
  --review-soft: oklch(0.97 0.05 60);
  --unknown: oklch(0.7 0 0);
  --unknown-soft: oklch(0.96 0 0);
  --risk: oklch(0.5 0.15 30);
  --risk-soft: oklch(0.95 0.05 30);

  --ink-bg: oklch(0.18 0.02 260);
  --ink-surface: oklch(0.22 0.02 260);

  --background: var(--canvas);
  --foreground: var(--ink);
  --card: var(--surface);
  --card-foreground: var(--ink);
  --popover: var(--surface);
  --popover-foreground: var(--ink);
  --primary: var(--fjord);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: var(--surface-subtle);
  --secondary-foreground: var(--ink);
  --muted-color: var(--surface-subtle);
  --muted-foreground: var(--muted);
  --accent: var(--surface-subtle);
  --accent-foreground: var(--ink);
  --destructive: var(--risk);
  --input: var(--border);
  --ring: var(--fjord-muted);

  --radius: 0.5rem;
  --radius-tag: 6px;
  --radius-button: 8px;
  --radius-card: 8px;
  --radius-modal: 12px;
  --radius-full: 9999px;

  --min-touch: 44px;

  --shadow-subtle: 0 4px 16px rgb(60 50 40 / 4%);
  --shadow-floating: 0 8px 32px rgb(60 50 40 / 6%);
  --shadow-lg: 0 16px 48px rgb(60 50 40 / 8%);

  --ease-decelerate: cubic-bezier(0.2, 0, 0, 1);
  --duration-fast: 120ms;
  --duration-standard: 180ms;
  --duration-slow: 240ms;

  --font-display: 'Playfair Display', serif;
  --font-sans: 'Inter', 'Noto Sans Arabic', system-ui, sans-serif;
}

[dir="rtl"] {
  --font-display: 'Noto Naskh Arabic', serif;
  --font-sans: 'Noto Sans Arabic', 'Inter', system-ui, sans-serif;
}
```
