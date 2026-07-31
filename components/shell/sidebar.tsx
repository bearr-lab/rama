'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Compass,
  Building2,
  FolderOpen,
  CheckSquare,
  Settings,
  Menu,
  ChevronLeft,
  Sparkles,
  Heart,
  MapPin,
  FileText,
  Users,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Discover', href: '/discover', icon: Compass },
      { name: 'Communities', href: '/community', icon: MapPin },
    ],
  },
  {
    title: 'DECISION SUITE',
    items: [
      { name: 'Saved Shortlist', href: '/shortlist', icon: Heart },
      { name: 'Decision Lab', href: '/decision-lab', icon: Building2 },
      { name: 'AI Advisor', href: '/advisor', icon: Sparkles },
    ],
  },
  {
    title: 'ASSETS & DEALS',
    items: [
      { name: 'Leads CRM', href: '/leads', icon: Users },
      { name: 'Tasks & Deal Flow', href: '/tasks', icon: CheckSquare },
      { name: 'Portfolio', href: '/portfolio', icon: FolderOpen },
      { name: 'Document Room', href: '/documents', icon: FileText },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale() || 'en';
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        'sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-e border-stone-300/60 bg-stone-50 transition-all duration-300 md:flex dark:border-stone-800/60 dark:bg-stone-950',
        collapsed ? 'w-19' : 'w-64',
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-stone-300/60 px-5 dark:border-stone-800/60">
        {!collapsed && (
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-stone-900 transition-colors hover:text-stone-900 dark:text-stone-100"
          >
            <span className="flex size-8 items-center justify-center bg-linear-to-r from-sky-400 to-fjord text-sm font-bold text-white shadow-xs">
              R
            </span>
            <span>RAMA</span>
          </Link>
        )}
        {collapsed && (
          <Link
            href={`/${locale}/dashboard`}
            className="mx-auto flex size-8 items-center justify-center bg-linear-to-r from-sky-400 to-fjord font-display text-sm font-bold text-white shadow-xs"
          >
            R
          </Link>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            {!collapsed && (
              <p className="text-caption mb-1.5 px-3 font-bold tracking-wider text-text/90 uppercase">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const fullHref = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(fullHref);

              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={cn(
                    'group text-body-sm flex items-center justify-between px-3 py-2.5 font-medium transition-all',
                    isActive
                      ? 'bg-stone-900/10 font-semibold text-stone-900 shadow-2xs dark:bg-stone-100/10 dark:text-stone-100'
                      : 'text-text hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-50',
                    collapsed && 'justify-center px-0',
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        'size-5 shrink-0 transition-colors',
                        isActive
                          ? 'text-stone-900 dark:text-stone-100'
                          : 'text-text/80 group-hover:text-stone-900 dark:text-stone-50',
                      )}
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-stone-300/60 p-3 dark:border-stone-800/60">
        <Link
          href={`/${locale}/settings`}
          className={cn(
            'group text-body-sm flex items-center gap-3 px-3 py-2.5 font-medium text-text transition-all hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-50',
            pathname.startsWith(`/${locale}/settings`) &&
              'bg-stone-900/10 font-semibold text-stone-900 shadow-2xs dark:bg-stone-100/10 dark:text-stone-100',
            collapsed && 'justify-center px-0',
          )}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings
            className={cn(
              'size-5 shrink-0 transition-colors',
              pathname.startsWith(`/${locale}/settings`)
                ? 'text-stone-900 dark:text-stone-100'
                : 'text-text/80 group-hover:text-stone-900 dark:text-stone-50',
            )}
          />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'group text-body-sm flex w-full items-center gap-3 px-3 py-2.5 font-medium text-text transition-all hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-50',
            collapsed && 'justify-center px-0',
          )}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? (
            <Menu className="size-5 text-text/80 group-hover:text-stone-900 dark:text-stone-50" />
          ) : (
            <ChevronLeft className="size-5 shrink-0 text-text/80 group-hover:text-stone-900 dark:text-stone-50" />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

export function MobileSidebarNav({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const locale = useLocale() || 'en';

  return (
    <div className="flex h-full flex-col bg-stone-50 dark:bg-stone-950">
      <div className="flex h-16 items-center border-b border-stone-300/60 px-5 dark:border-stone-800/60">
        <Link
          href={`/${locale}/dashboard`}
          onClick={onClose}
          className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50"
        >
          <span className="flex size-8 items-center justify-center bg-linear-to-r from-sky-400 to-fjord text-sm font-bold text-white shadow-xs">
            R
          </span>
          <span>RAMA</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <p className="mb-1.5 px-3 text-[11px] font-bold tracking-wider text-text/90 uppercase">
              {section.title}
            </p>
            {section.items.map((item) => {
              const fullHref = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(fullHref);

              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  onClick={onClose}
                  className={cn(
                    'group text-body-sm flex items-center justify-between px-3 py-2.5 font-medium transition-all',
                    isActive
                      ? 'bg-stone-900/10 font-semibold text-stone-900 shadow-2xs dark:bg-stone-100/10 dark:text-stone-100'
                      : 'text-text hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-50',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        'size-5 shrink-0 transition-colors',
                        isActive
                          ? 'text-stone-900 dark:text-stone-100'
                          : 'text-text/80 group-hover:text-stone-900 dark:text-stone-50',
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-stone-300/60 p-3 dark:border-stone-800/60">
        <Link
          href={`/${locale}/settings`}
          onClick={onClose}
          className={cn(
            'group text-body-sm flex items-center gap-3 px-3 py-2.5 font-medium text-text transition-all hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-50',
            pathname.startsWith(`/${locale}/settings`) &&
              'bg-stone-900/10 font-semibold text-stone-900 shadow-2xs dark:bg-stone-100/10 dark:text-stone-100',
          )}
        >
          <Settings
            className={cn(
              'size-5 shrink-0 transition-colors',
              pathname.startsWith(`/${locale}/settings`)
                ? 'text-stone-900 dark:text-stone-100'
                : 'text-text/80 group-hover:text-stone-900 dark:text-stone-50',
            )}
          />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
