'use client';

import * as React from 'react';
import { Search, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { NotificationCenter } from './notification-center';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileSidebarNav } from './sidebar';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Format pathname into a readable title (e.g. /en/discover -> Discover)
  const getPageTitle = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length <= 1) return 'Dashboard';
    const section = parts[1];
    if (section === 'discover') return 'Discover';
    if (section === 'decision-lab') return 'Decision Lab';
    if (section === 'advisor') return 'Advisor';
    if (section === 'portfolio') return 'Portfolio';
    if (section === 'tasks') return 'Tasks';
    if (section === 'shortlist') return 'Saved Shortlist';
    if (section === 'property') return 'Property workspace';
    if (section === 'settings') return 'Settings';
    return 'Workspace';
  };

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }),
    );
    // Also try ctrlKey fallback for Windows/Linux
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }),
    );
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between border-b border-border/40 bg-surface/95 px-6 backdrop-blur supports-backdrop-filter:bg-surface/80 md:px-10">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="-ml-2 cursor-pointer rounded-none p-2 text-ink transition-colors hover:bg-surface-subtle md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-65 p-0">
            <MobileSidebarNav onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="text-body flex items-center gap-2 font-display font-bold text-fjord">
          <span>{getPageTitle()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Command Palette Trigger */}
        <button
          onClick={handleOpenCommandPalette}
          className="text-body-sm group flex items-center gap-2 rounded-none border border-border/60 bg-surface px-3.5 py-1.5 font-medium text-text shadow-2xs transition-all hover:bg-surface-subtle hover:text-ink"
        >
          <Search className="size-4 text-text/80 transition-colors group-hover:text-fjord" />
          <span className="hidden sm:inline">Search decision engine...</span>
          <kbd className="hidden h-5 items-center gap-1 rounded-none border border-border/60 bg-surface px-1.5 font-mono text-[10px] font-bold text-text/80 sm:inline-flex">
            <span>⌘</span>K
          </kbd>
        </button>

        {/* Theme Toggle */}
        {mounted ? (
          <AnimatedThemeToggler
            variant="square"
            theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            onThemeChange={setTheme}
            className="flex size-9 items-center justify-center text-ink transition-colors hover:bg-surface-subtle"
          />
        ) : (
          <div className="size-9" />
        )}

        {/* Interactive Notification Center */}
        <NotificationCenter />
      </div>
    </header>
  );
}
