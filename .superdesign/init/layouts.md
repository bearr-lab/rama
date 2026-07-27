# RAMA Layout Components

---

## AppShell
- File: `components/shell/app-shell.tsx`
- Description: Root workspace layout — Sidebar + Header + main content area + CommandPalette

```tsx
'use client';
import * as React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommandPalette } from './command-palette';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas font-sans">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="relative flex-1 outline-none" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
```

---

## Sidebar
- File: `components/shell/sidebar.tsx`
- Description: Collapsible left sidebar (248px expanded, 72px collapsed) with nav items, sticky, hidden on mobile

```tsx
'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Compass, Building2, FolderOpen,
  CheckSquare, Settings, Menu, ChevronLeft,
  Sparkles, Heart, MapPin, FileText,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard',       href: '/dashboard',    icon: LayoutDashboard },
  { name: 'Discover',        href: '/discover',     icon: Compass },
  { name: 'Communities',     href: '/community',    icon: MapPin },
  { name: 'Decision Lab',    href: '/decision-lab', icon: Building2 },
  { name: 'AI Advisor ✨',   href: '/advisor',      icon: Sparkles },
  { name: 'Document Room',   href: '/documents',    icon: FileText },
  { name: 'Portfolio',       href: '/portfolio',    icon: FolderOpen },
  { name: 'Tasks & Deal Flow', href: '/tasks',      icon: CheckSquare },
  { name: 'Saved Shortlist', href: '/shortlist',    icon: Heart },
];

export function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale() || 'en';
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside className={cn(
      'sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-border bg-surface transition-all duration-300 md:flex',
      collapsed ? 'w-[72px]' : 'w-[248px]',
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href={`/${locale}/dashboard`}
            className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-ink transition-colors hover:text-fjord">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-fjord text-sm font-bold text-white shadow-sm">R</span>
            <span>RAMA</span>
          </Link>
        )}
        {collapsed && (
          <Link href={`/${locale}/dashboard`}
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-fjord font-display text-sm font-bold text-white shadow-sm">
            R
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const fullHref = `/${locale}${item.href}`;
          const isActive = pathname.startsWith(fullHref);
          return (
            <Link key={item.href} href={fullHref}
              className={cn(
                'text-body-sm flex items-center justify-between rounded-lg px-3 py-2.5 font-medium transition-colors',
                isActive ? 'bg-fjord-soft font-semibold text-fjord' : 'text-muted hover:bg-surface-subtle hover:text-ink',
                collapsed && 'justify-center px-0',
              )}>
              <div className="flex items-center gap-3">
                <item.icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-fjord' : 'text-muted')} />
                {!collapsed && <span>{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-1 border-t border-border p-3">
        <Link href={`/${locale}/settings`}
          className={cn('text-body-sm flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-muted transition-colors hover:bg-surface-subtle hover:text-ink',
            pathname.startsWith(`/${locale}/settings`) && 'bg-fjord-soft font-semibold text-fjord',
            collapsed && 'justify-center px-0')}>
          <Settings className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)}
          className={cn('text-body-sm flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-muted transition-colors hover:bg-surface-subtle hover:text-ink',
            collapsed && 'justify-center px-0')}>
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5 shrink-0" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
```

---

## Header
- File: `components/shell/header.tsx`
- Description: Sticky top bar — page title, search/command palette trigger, notifications, user avatar

```tsx
'use client';
import * as React from 'react';
import { Search, User, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { NotificationCenter } from './notification-center';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileSidebarNav } from './sidebar';

export function Header() {
  const pathname = usePathname();
  const locale = useLocale() || 'en';
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/80 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="-ml-2 cursor-pointer rounded-lg p-2 text-ink transition-colors hover:bg-surface-subtle md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[260px] p-0">
            <MobileSidebarNav onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="text-body flex items-center gap-2 font-display font-bold text-ink">
          <span>Page Title</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="text-body-sm group flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface-subtle">
          <Search className="h-4 w-4 text-muted transition-colors group-hover:text-ink" />
          <span className="hidden sm:inline">Search OS...</span>
          <kbd className="hidden h-5 items-center gap-1 rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-bold text-muted sm:inline-flex">⌘K</kbd>
        </button>
        <NotificationCenter />
        <Link href={`/${locale}/settings`}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-ink text-white transition-colors hover:bg-ink-bg">
          <User className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
```

---

## WorkspaceLayout
- File: `app/(workspace)/layout.tsx`
- Description: Wraps all workspace pages with AppShell

```tsx
import { AppShell } from '@/components/shell/app-shell';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
```
