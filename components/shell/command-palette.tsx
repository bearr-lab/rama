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
      <div className="flex w-full max-w-2xl flex-col overflow-hidden border border-stone-300 bg-stone-50 shadow-lg dark:border-stone-800 dark:bg-stone-950">
        <div className="flex items-center border-b border-stone-300 px-4 dark:border-stone-800">
          <Search className="size-5 shrink-0 text-stone-500 dark:text-stone-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search properties, communities, or commands..."
            className="text-body flex-1 border-none bg-transparent p-4 text-stone-900 outline-none placeholder:text-stone-500 focus:ring-0 dark:text-stone-400"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-400"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <div className="px-2 py-1.5 text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
            Suggestions
          </div>
          <button className="text-body-sm w-full px-3 py-2.5 text-left font-medium text-stone-900 transition-colors hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-50">
            Go to Dashboard
          </button>
          <button className="text-body-sm w-full px-3 py-2.5 text-left font-medium text-stone-900 transition-colors hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-50">
            Discover Properties
          </button>
          <button className="text-body-sm w-full px-3 py-2.5 text-left font-medium text-stone-900 transition-colors hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-50">
            Compare in Decision Lab
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-stone-300 bg-stone-100 p-3 text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
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
