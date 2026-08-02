import * as React from 'react';
import { cn } from '@/lib/utils';

export function PageShell({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto flex w-full max-w-7xl flex-col gap-12 p-8 md:p-12 lg:p-16", className)} {...props}>
      {children}
    </div>
  );
}
