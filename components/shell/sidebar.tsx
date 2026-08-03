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
  Sparkles,
  Heart,
  MapPin,
  FileText,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { UserMenu } from '@/components/auth/user-menu';
import { RamaLogo } from '@/components/ui/rama-logo';

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

function NavItem({
  item,
  isActive,
  collapsed,
  onClick,
}: {
  item: { name: string; href: string; icon: React.ElementType };
  isActive: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'group flex items-center gap-4 px-4 py-3 text-sm font-medium transition-all duration-150',
        isActive
          ? 'bg-fjord-soft text-fjord'
          : 'text-muted-foreground hover:bg-surface-subtle hover:text-ink',
        collapsed && 'justify-center px-0',
      )}
      title={collapsed ? item.name : undefined}
    >
      <item.icon
        className={cn(
          'size-4 shrink-0 transition-colors',
          isActive
            ? 'text-fjord'
            : 'text-muted-foreground group-hover:text-ink',
        )}
      />
      {!collapsed && <span>{item.name}</span>}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale() || 'en';
  const [collapsed, setCollapsed] = React.useState(false);

  const settingsActive = pathname.startsWith(`/${locale}/settings`);

  return (
    <aside
      className={cn(
        'sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-e border-border bg-surface transition-all duration-300 md:flex',
        collapsed ? 'w-14' : 'w-60',
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex h-14 items-center border-b border-border',
          collapsed ? 'justify-center px-0' : 'justify-between px-4',
        )}
      >
        {!collapsed && (
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center"
          >
            <RamaLogo size="sm" />
          </Link>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-ink"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 py-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-0.5">
            {!collapsed && (
              <p className="mb-1 px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const fullHref = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(fullHref);
              return (
                <NavItem
                  key={item.href}
                  item={{ ...item, href: fullHref }}
                  isActive={isActive}
                  collapsed={collapsed}
                />
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t border-border px-2 py-3">
        <div className="flex flex-col gap-0.5">
          <Link
            href={`/${locale}/settings`}
            className={cn(
              'group flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-150',
              settingsActive
                ? 'bg-fjord-soft text-fjord'
                : 'text-muted-foreground hover:bg-surface-subtle hover:text-ink',
              collapsed && 'justify-center px-0',
            )}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings
              className={cn(
                'size-4 shrink-0 transition-colors',
                settingsActive
                  ? 'text-fjord'
                  : 'text-muted-foreground group-hover:text-ink',
              )}
            />
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>

        {/* Profile Component inside Sidebar Footer */}
        <div
          className={cn(
            'flex items-center',
            collapsed ? 'justify-center' : 'justify-between px-3',
          )}
        >
          <UserMenu locale={locale as 'en' | 'ar'} />
          {!collapsed && (
             <span className="text-xs text-muted-foreground">Profile</span>
          )}
        </div>
      </div>
    </aside>
  );
}

export function MobileSidebarNav({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const locale = useLocale() || 'en';

  const settingsActive = pathname.startsWith(`/${locale}/settings`);

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link
          href={`/${locale}/dashboard`}
          onClick={onClose}
          className="flex items-center"
        >
          <RamaLogo size="sm" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 py-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-0.5">
            <p className="mb-1 px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              {section.title}
            </p>
            {section.items.map((item) => {
              const fullHref = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(fullHref);
              return (
                <NavItem
                  key={item.href}
                  item={{ ...item, href: fullHref }}
                  isActive={isActive}
                  collapsed={false}
                  onClick={onClose}
                />
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-2 py-3">
        <Link
          href={`/${locale}/settings`}
          onClick={onClose}
          className={cn(
            'group flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-150',
            settingsActive
              ? 'bg-fjord-soft text-fjord'
              : 'text-muted-foreground hover:bg-surface-subtle hover:text-ink',
          )}
        >
          <Settings
            className={cn(
              'size-4 shrink-0 transition-colors',
              settingsActive
                ? 'text-fjord'
                : 'text-muted-foreground group-hover:text-ink',
            )}
          />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
