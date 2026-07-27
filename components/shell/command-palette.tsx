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
      <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted" />
          <input
            autoFocus
            type="text"
            placeholder="Search properties, communities, or commands..."
            className="text-body flex-1 border-none bg-transparent px-4 py-4 text-ink outline-none placeholder:text-muted focus:ring-0"
          />
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-muted transition-colors hover:bg-surface-subtle hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <div className="px-2 py-1.5 text-xs font-semibold tracking-wider text-muted uppercase">
            Suggestions
          </div>
          <button className="text-body-sm w-full rounded-md px-3 py-2.5 text-left font-medium text-ink transition-colors hover:bg-surface-subtle">
            Go to Dashboard
          </button>
          <button className="text-body-sm w-full rounded-md px-3 py-2.5 text-left font-medium text-ink transition-colors hover:bg-surface-subtle">
            Discover Properties
          </button>
          <button className="text-body-sm w-full rounded-md px-3 py-2.5 text-left font-medium text-ink transition-colors hover:bg-surface-subtle">
            Compare in Decision Lab
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-surface-subtle p-3 text-xs text-muted">
          <span>
            <kbd className="rounded bg-border/50 px-1 font-mono">↑</kbd>{' '}
            <kbd className="rounded bg-border/50 px-1 font-mono">↓</kbd> to
            navigate
          </span>
          <span>
            <kbd className="rounded bg-border/50 px-1 font-mono">↵</kbd> to
            select
          </span>
          <span>
            <kbd className="rounded bg-border/50 px-1 font-mono">esc</kbd> to
            close
          </span>
        </div>
      </div>
    </div>
  );
}
