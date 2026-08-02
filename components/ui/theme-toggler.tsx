'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggler({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("h-8 w-14 shrink-0 rounded-none bg-surface-subtle", className)} />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative flex h-8 w-14 items-center rounded-none border border-border bg-surface-subtle px-1 transition-colors hover:border-fjord-muted hover:bg-surface-warm focus:outline-none focus:ring-2 focus:ring-fjord-muted focus:ring-offset-2',
        className
      )}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Background Pill */}
      <div className="absolute inset-x-1 flex justify-between px-0.5">
        <Moon className="size-3.5 text-muted/50" />
        <Sun className="size-3.5 text-muted/50" />
      </div>

      {/* Animated Handle */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        animate={{
          x: isDark ? 0 : 24,
        }}
        className="z-10 flex size-6 items-center justify-center rounded-none border border-border bg-surface shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
      >
        {isDark ? (
          <Moon className="size-3 text-fjord" />
        ) : (
          <Sun className="size-3 text-fjord" />
        )}
      </motion.div>
    </button>
  );
}
