'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { getUnsplashAttribution } from '@/lib/unsplash';

const attributionVariants = cva(
  'z-20 flex items-center gap-1.5 font-sans text-[11px] leading-none transition-opacity duration-200',
  {
    variants: {
      variant: {
        overlay:
          'absolute right-3 bottom-3 rounded-none border border-white/15 bg-ink/80 px-2.5 py-1.5 text-white shadow-lg backdrop-blur-md',
        inline: 'text-muted-foreground hover:text-fjord dark:text-muted/50',
      },
    },
    defaultVariants: {
      variant: 'overlay',
    },
  },
);

const linkVariants = cva(
  'font-medium transition-colors',
  {
    variants: {
      variant: {
        overlay: 'underline decoration-white/40 underline-offset-2 hover:text-white/80 hover:decoration-white',
        inline: 'hover:text-fjord hover:underline',
      },
    },
    defaultVariants: {
      variant: 'overlay',
    },
  },
);
interface UnsplashAttributionProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof attributionVariants> {
  photographerName: string;
  photographerUsername: string;
}

export function UnsplashAttribution({
  photographerName,
  photographerUsername,
  className,
  variant = 'overlay',
  ...props
}: UnsplashAttributionProps) {
  const attr = getUnsplashAttribution(photographerName, photographerUsername);

  return (
    <div className={cn(attributionVariants({ variant, className }))} {...props}>
      <span>Photo by</span>
      <a
        href={attr.photographerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkVariants({ variant }))}
        onClick={(e) => e.stopPropagation()}
      >
        {photographerName}
      </a>
      <span>on</span>
      <a
        href={attr.unsplashUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkVariants({ variant }))}
        onClick={(e) => e.stopPropagation()}
      >
        Unsplash
      </a>
    </div>
  );
}
