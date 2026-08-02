'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, Sliders, Bell, Shield, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsSidebar({ locale = 'en' }: { locale?: string }) {
  const pathname = usePathname();
  
  const navItems = [
    { href: `/${locale}/settings/appearance`, label: 'Appearance', icon: Palette },
    { href: `/${locale}/settings/ai`, label: 'AI Concierge', icon: Sliders },
    { href: `/${locale}/settings/notifications`, label: 'Notifications', icon: Bell },
    { href: `/${locale}/settings/security`, label: 'Security', icon: Shield },
    { href: `/${locale}/settings/developer`, label: 'Developer API', icon: Terminal },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map(item => {
        const isActive = pathname.includes(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-subtle',
              isActive
                ? 'bg-fjord text-white shadow-resting'
                : 'text-muted-foreground hover:text-ink',
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
