import { ReactNode } from 'react';
import { SearchX, FolderOpen, HeartCrack, AlertCircle, Sparkles } from 'lucide-react';
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
        return <SearchX className="h-10 w-10 text-fjord" />;
      case 'shortlist':
        return <HeartCrack className="h-10 w-10 text-rose-500" />;
      case 'error':
        return <AlertCircle className="h-10 w-10 text-amber-500" />;
      case 'default':
      default:
        return <FolderOpen className="h-10 w-10 text-fjord" />;
    }
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-3xl border border-border/40 bg-surface/70 p-10 text-center shadow-subtle backdrop-blur-md md:p-16 transition-all duration-500 hover:shadow-floating',
        className,
      )}
    >
      <div className="absolute top-6 right-6 text-fjord/20 pointer-events-none">
        <Sparkles className="h-8 w-8 animate-pulse" />
      </div>

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-surface to-surface-subtle shadow-md border border-border/40">
        {getIcon()}
      </div>

      <h3 className="mb-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        {title}
      </h3>

      <p className="mx-auto mb-8 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
