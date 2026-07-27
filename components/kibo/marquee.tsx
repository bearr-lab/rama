'use client';

import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

const speedMap = {
  slow: '60s',
  normal: '40s',
  fast: '20s',
};

export const Marquee = ({
  children,
  direction = 'left',
  pauseOnHover = true,
  reverse = false,
  fade = true,
  className,
  speed = 'normal',
}: MarqueeProps) => {
  const isVertical = direction === 'up' || direction === 'down';

  return (
    <div
      className={cn(
        'group flex overflow-hidden select-none gap-[1rem]',
        isVertical ? 'flex-col h-[400px]' : 'flex-row w-full',
        fade && !isVertical && '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        fade && isVertical && '[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]',
        className
      )}
      style={{
        '--duration': speedMap[speed],
      } as React.CSSProperties}
    >
      <div
        className={cn(
          'flex shrink-0 justify-around gap-[1rem] min-w-full',
          isVertical ? 'flex-col animate-marquee-vertical' : 'flex-row animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && 'direction-reverse'
        )}
        style={{
          animationDuration: speedMap[speed],
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          'flex shrink-0 justify-around gap-[1rem] min-w-full',
          isVertical ? 'flex-col animate-marquee-vertical' : 'flex-row animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && 'direction-reverse'
        )}
        style={{
          animationDuration: speedMap[speed],
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export interface PartnerLogoProps {
  name: string;
  category: string;
  badge?: string;
}

export const PartnerCard = ({ name, category, badge }: PartnerLogoProps) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-subtle/50 px-5 py-3 shadow-sm backdrop-blur-sm transition-all hover:border-border hover:bg-surface">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-sm font-extrabold text-white dark:bg-white dark:text-ink">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-display text-sm font-bold text-ink">{name}</h4>
          {badge && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted font-medium">{category}</p>
      </div>
    </div>
  );
};
