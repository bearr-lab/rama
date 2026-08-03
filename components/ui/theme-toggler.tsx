'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const themeTogglerVariants = cva(
  'relative flex h-8 w-14 items-center rounded-none border border-border bg-surface-subtle px-1 transition-colors hover:border-fjord-muted hover:bg-surface-warm focus-visible:ring-2 focus-visible:ring-fjord-muted focus-visible:ring-offset-2 focus-visible:outline-none',
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface ThemeTogglerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themeTogglerVariants> {}

export function ThemeToggler({ className, onClick, ...props }: ThemeTogglerProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("h-8 w-14 shrink-0 rounded-none bg-surface-subtle", className)} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      {...props}
      type="button"
      onClick={(e) => {
        setTheme(isDark ? 'light' : 'dark');
        onClick?.(e);
      }}
      className={cn(themeTogglerVariants({ className }))}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
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
