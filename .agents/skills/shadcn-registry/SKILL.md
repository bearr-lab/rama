---
name: shadcn-registry
description: AI Skill for creating and publishing shadcn/ui components to the local registry.
---

# Shadcn Registry Component Creation Skill

**Objective:**
Guide the creation of new shadcn/ui components and index them in the local component registry for distribution.

**Instructions:**
1. **Component Location:** Always create new UI components in `components/ui/` (e.g., `components/ui/card.tsx`).
2. **Implementation:** 
   - Ensure the component is headless, highly composable, and relies on `cva` and Tailwind for styling.
   - Do NOT wrap components with unnecessary logic; leave them "Open Code" so the end user can modify them easily.
   - Use `cn` from `@/lib/utils` to merge class names.
3. **Registry Publication:**
   - After creating or modifying a component in `components/ui/`, you MUST run `node scripts/build-registry.mjs`.
   - This script will automatically scrape `components/ui/` and regenerate `public/registry.json` and `public/registry/<component>.json` files.
4. **Verification:**
   - Verify that the `<component>.json` file was created successfully in `public/registry/` and that the component appears in `public/registry.json`.

**Usage:**
When asked to "create a new component for the registry," follow these steps exactly, ensuring the component is fully built, styled, and the registry script is run at the end.
