import { ReactNode } from 'react';
import {
  SearchX,
  FolderOpen,
  HeartCrack,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type EmptyStateVariant = 'search' | 'shortlist' | 'error' | 'default';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const getIcon = () => {
    switch (variant) {
      case 'search':
        return <SearchX className="size-10 text-fjord" />;
      case 'shortlist':
        return <HeartCrack className="size-10 text-rose-500" />;
      case 'error':
        return <AlertCircle className="size-10 text-amber-500" />;
      case 'default':
      default:
        return <FolderOpen className="size-10 text-fjord" />;
    }
  };

  return (
    <div
      className={cn(
        'shadow-subtle hover:shadow-floating relative flex flex-col items-center justify-center rounded-none border border-border/40 bg-surface/70 p-10 text-center backdrop-blur-md transition-all duration-500 md:p-16',
        className,
      )}
    >
      <div className="pointer-events-none absolute top-6 right-6 text-fjord/20">
        <Sparkles className="size-8 animate-pulse" />
      </div>

      <div className="mb-6 flex size-20 items-center justify-center rounded-none border border-border/40 bg-gradient-to-br from-surface to-surface-subtle shadow-md">
        {getIcon()}
      </div>

      <h3 className="mb-2 font-display text-2xl font-medium tracking-tight text-fjord sm:text-3xl">
        {title}
      </h3>

      <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed font-light text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
