# Design System: Rama

## Theme & Vibe
Premium, tech-forward, and highly polished. The design leverages modern web capabilities with fluid animations and a clean, sophisticated aesthetic.

## Typography
- Use modern sans-serif fonts (e.g., Inter, Geist, or system fonts) with strict hierarchical scaling.
- Text must have high contrast and avoid "gray on colored background" anti-patterns.

## Components (shadcn/ui & Radix)
- Core components are built with shadcn/ui.
- Avoid overused patterns like deeply nested cards or unnecessary borders.
- Utilize subtle depth, glassmorphism, and intentional whitespace.

## Motion & Animation
- Purposeful motion powered by Framer Motion and GSAP.
- Avoid bouncy or elastic easing. Use spring physics for natural, grounded movement.
- Micro-interactions on hover and active states should feel responsive and alive.

## Implementation Details
- Styling: Tailwind CSS v4.
- Icons: Lucide React and Radix UI Icons.
- Avoid generic colors; use Tailwind's tailored color palettes.
