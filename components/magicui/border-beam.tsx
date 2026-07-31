'use client';

import { cn } from '@/lib/utils';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  innerClassName?: string;
}

export function BorderBeam({
  className,
  duration = 5,
  borderWidth = 2,
  colorFrom = '#00f2fe',
  colorTo = '#10b981',
  delay = 0,
  innerClassName = 'bg-white dark:bg-[#0b1329]',
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]',
        className,
      )}
    >
      {/* 360deg Rotating High-Contrast Conic Glow */}
      <div
        className="absolute inset-[-150%] animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, ${colorFrom} 80%, ${colorTo} 100%)`,
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      />
      {/* Zero-Mask Inner Cover: leaves exactly borderWidth perimeter glowing seamlessly */}
      <div
        className={cn('absolute rounded-[inherit]', innerClassName)}
        style={{
          top: `${borderWidth}px`,
          bottom: `${borderWidth}px`,
          left: `${borderWidth}px`,
          right: `${borderWidth}px`,
        }}
      />
    </div>
  );
}
