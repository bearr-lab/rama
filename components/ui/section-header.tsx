import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  breadcrumb: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function SectionHeader({
  breadcrumb,
  title,
  description,
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <header 
      className={cn("flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end", className)}
      {...props}
    >
      <div>
        <p className="text-xs font-bold tracking-widest text-fjord uppercase">
          {breadcrumb}
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-3">
          {actions}
        </div>
      )}
    </header>
  );
}
