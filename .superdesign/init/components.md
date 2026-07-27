# RAMA UI Components

Framework: Next.js 15 (App Router) · React 19 · Base UI (Radix-like primitives) · Tailwind CSS v4 · CVA · TypeScript

---

## Button
- File: `components/ui/button.tsx`
- Description: Primary action component — 6 variants × 5 sizes, Base UI primitive

```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button text-body-sm inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button)] font-medium shadow-xs ring-offset-background transition-all duration-150 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'text-destructive-foreground bg-destructive hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-14 rounded-md px-8 text-base',
        icon: 'h-11 w-11',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

---

## Card
- File: `components/ui/card.tsx`
- Description: Content container with header/title/description/action/content/footer sub-components

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, size = 'default', ...props }: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-lg bg-card py-(--card-spacing) text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('text-sm font-medium', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-xs/relaxed text-muted-foreground', className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center rounded-b-lg px-(--card-spacing) [.border-t]:pt-(--card-spacing)', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
```

---

## Input
- File: `components/ui/input.tsx`
- Description: Text input wrapping Base UI Input primitive, h-9

```tsx
import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border border-input bg-input/20 px-3 py-1 text-sm transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
```

---

## Badge
- File: `components/ui/badge.tsx`
- Description: Status label chip — default/secondary/destructive/outline variants

---

## Dialog
- File: `components/ui/dialog.tsx`
- Description: Modal dialog using Base UI Dialog primitive, backdrop + close button

---

## DropdownMenu
- File: `components/ui/dropdown-menu.tsx`
- Description: Context/action menu using Base UI Menu, supports groups/items/separators/radio/checkbox

---

## Table
- File: `components/ui/table.tsx`
- Description: Responsive table with Header/Body/Footer/Row/Head/Cell/Caption sub-components

---

## Tabs
- File: `components/ui/tabs.tsx`
- Description: Tabbed content using Base UI Tabs primitive

---

## Sheet
- File: `components/ui/sheet.tsx`
- Description: Slide-in panel from any edge (left/right/top/bottom), used for mobile sidebar

---

## Select
- File: `components/ui/select.tsx`
- Description: Native-enhanced select dropdown using Base UI Select primitive

---

## Skeleton
- File: `components/ui/skeleton.tsx`
- Description: Loading placeholder with pulse animation

---

## Avatar
- File: `components/ui/avatar.tsx`
- Description: User avatar with fallback initials

---

## Tooltip
- File: `components/ui/tooltip.tsx`
- Description: Hover tooltip via Base UI Tooltip

---

## EmptyState
- File: `components/ui/empty-state.tsx`
- Description: Empty list placeholder with icon + title + description

---

## ProfileCard
- File: `components/ui/profile-card.tsx`
- Description: User/agent profile card widget

---

## MagicCard
- File: `components/ui/magic-card.tsx`
- Description: Premium card with gradient hover spotlight effect
