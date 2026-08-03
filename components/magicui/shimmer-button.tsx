'use client';

import React, { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '0px',
      background = 'var(--fjord)',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as CSSProperties
        }
        className={cn(
          'group hover:shadow-floating relative z-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-(--radius) px-6 py-3 whitespace-nowrap text-white transition-all duration-300 [background:var(--bg)] active:scale-95',
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            '-z-30 blur-[2px]',
            '@container-size absolute inset-0 overflow-visible',
          )}
        >
          {/* spark */}
          <div className="animate-shimmer-slide absolute inset-0 aspect-square h-[100cqh] rounded-none [mask:none]">
            {/* spark before */}
            <div className="absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            'insert-0 absolute size-full',

            'rounded-none p-px font-medium shadow-xs',
            'transition-all duration-300 ease-in-out',
            'group-hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.3)]',
          )}
        />

        <div
          className={cn(
            'absolute inset-0 -z-20 rounded-(--radius) [background:var(--bg)]',
          )}
        />
      </button>
    );
  },
);

ShimmerButton.displayName = 'ShimmerButton';
