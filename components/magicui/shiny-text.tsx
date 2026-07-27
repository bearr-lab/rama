'use client';

import { cn } from '@/lib/utils';

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}) {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        'mx-auto text-ink/70 dark:text-white/70',
        'animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]',
        'bg-gradient-to-r from-transparent via-fjord/80 via-50% to-transparent dark:via-sky-400/80',
        'transition-all duration-300 ease-in-out',
        className,
      )}
    >
      {children}
    </span>
  );
}
