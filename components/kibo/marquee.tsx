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
        'group flex gap-4 overflow-hidden select-none',
        isVertical ? 'h-100 flex-col' : 'w-full flex-row',
        fade &&
          !isVertical &&
          '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        fade &&
          isVertical &&
          '[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
      style={{ '--duration': speedMap[speed] } as React.CSSProperties}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 justify-around gap-4',
          isVertical
            ? 'animate-marquee-vertical flex-col'
            : 'animate-marquee flex-row',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && 'direction-reverse',
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
          'flex min-w-full shrink-0 justify-around gap-4',
          isVertical
            ? 'animate-marquee-vertical flex-col'
            : 'animate-marquee flex-row',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && 'direction-reverse',
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
    <div className="border-border/60/60 flex items-center gap-3 border bg-surface/50 px-5 py-3 shadow-sm backdrop-blur-sm transition-all hover:border-border/60 hover:bg-surface-subtle   ">
      <div className="flex size-10 shrink-0 items-center justify-center bg-ink text-sm font-extrabold text-white dark:bg-white ">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-display text-sm font-bold text-ink ">
            {name}
          </h4>
          {badge && (
            <span className="bg-ink/10 px-2 py-0.5 text-[9px] font-bold text-ink ">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs font-medium text-muted-foreground dark:text-stone-400">
          {category}
        </p>
      </div>
    </div>
  );
};
