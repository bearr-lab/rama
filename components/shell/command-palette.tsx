'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[10vh] backdrop-blur-sm">
      <div className="flex w-full max-w-2xl flex-col overflow-hidden border border-border/60 bg-surface-subtle shadow-lg  ">
        <div className="flex items-center border-b border-border/60 px-4 ">
          <Search className="size-5 shrink-0 text-muted-foreground dark:text-stone-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search properties, communities, or commands..."
            className="text-body flex-1 border-none bg-transparent p-4 text-ink outline-none placeholder:text-muted-foreground focus:ring-0 dark:text-stone-400"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-muted-foreground transition-colors hover:bg-surface hover:text-ink  dark:text-stone-400"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <div className="px-2 py-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-stone-400">
            Suggestions
          </div>
          <button className="text-body-sm w-full px-3 py-2.5 text-left font-medium text-ink transition-colors hover:bg-surface  ">
            Go to Dashboard
          </button>
          <button className="text-body-sm w-full px-3 py-2.5 text-left font-medium text-ink transition-colors hover:bg-surface  ">
            Discover Properties
          </button>
          <button className="text-body-sm w-full px-3 py-2.5 text-left font-medium text-ink transition-colors hover:bg-surface  ">
            Compare in Decision Lab
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border/60 bg-surface p-3 text-xs text-muted-foreground   dark:text-stone-400">
          <span>
            <kbd className="bg-border/50 px-1 font-mono">↑</kbd>{' '}
            <kbd className="bg-border/50 px-1 font-mono">↓</kbd> to navigate
          </span>
          <span>
            <kbd className="bg-border/50 px-1 font-mono">↵</kbd> to select
          </span>
          <span>
            <kbd className="bg-border/50 px-1 font-mono">esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
