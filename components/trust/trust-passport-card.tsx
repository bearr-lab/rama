import * as React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Clock, Activity, AlertTriangle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TrustPassportCardProps {
  healthScore: number;
  evidenceScore: number;
  riskScore: number;
  freshnessScore: number;
  isLoading?: boolean;
  className?: string;
}

export function TrustPassportCard({
  healthScore,
  evidenceScore,
  riskScore,
  freshnessScore,
  isLoading = false,
  className,
}: TrustPassportCardProps) {
  // Determine overall status
  const isVerified = healthScore >= 80 && evidenceScore >= 70 && riskScore < 30;
  const isAtRisk = riskScore >= 50 || freshnessScore < 40;

  if (isLoading) {
    return (
      <div className={cn('overflow-hidden rounded-none border border-border bg-surface-subtle shadow-resting', className)}>
        {/* Skeleton Top Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="size-6 animate-pulse bg-border/50" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse bg-border/50" />
              <div className="h-3 w-24 animate-pulse bg-border/50" />
            </div>
          </div>
          <div className="h-8 w-16 animate-pulse bg-border/50" />
        </div>
        {/* 4-Quadrant Grid Skeleton */}
        <div className="grid grid-cols-2 divide-x divide-y divide-stone-200">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 p-5 text-center">
              <div className="mx-auto h-3 w-16 animate-pulse bg-border/50" />
              <div className="mx-auto h-6 w-12 animate-pulse bg-border/50" />
              <div className="mx-auto h-1 w-full animate-pulse bg-border/50" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-none border border-border bg-surface-subtle shadow-resting',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-b border-border px-5 py-4',
          isVerified
            ? 'bg-surface'
            : isAtRisk
              ? 'bg-border/50'
              : 'bg-surface-subtle',
        )}
      >
        <div className="flex items-center gap-3">
          {isVerified ? (
            <ShieldCheck className="size-6 text-fjord" />
          ) : isAtRisk ? (
            <ShieldAlert className="size-6 text-fjord" />
          ) : (
            <Shield className="size-6 text-muted-foreground" />
          )}
          <div>
            <h3 className="mb-1 text-sm leading-none font-bold tracking-widest text-fjord uppercase">
              Trust Passport
            </h3>
            <p className="text-xs leading-none font-semibold text-muted-foreground">
              {isVerified
                ? 'High Confidence'
                : isAtRisk
                  ? 'Requires Attention'
                  : 'Verification Pending'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={cn("inline-flex items-center border px-2 py-1 text-[10px] font-bold uppercase", isVerified ? 'bg-border/50/50 border-stone-800 text-fjord' : 'border-border/60 text-muted-foreground')}>
            {isVerified ? 'DLD Validated' : 'Unverified'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-stone-200">
        <div className="flex flex-col gap-1 p-5 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            <Activity className="size-3" /> Health
          </div>
          <div className="font-display text-2xl font-bold text-fjord">
            {healthScore}
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden bg-border/50">
            <div
              className="h-full bg-fjord"
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 p-5 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            <FileText className="size-3" /> Evidence
          </div>
          <div className="font-display text-2xl font-bold text-fjord">
            {evidenceScore}%
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden bg-border/50">
            <div
              className="h-full bg-stone-600"
              style={{ width: `${evidenceScore}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t-0 p-5 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            <AlertTriangle className="size-3" /> Risk
          </div>
          <div className="font-display text-2xl font-bold text-fjord">{riskScore}%</div>
          <div className="mt-1 h-1 w-full overflow-hidden bg-border/50">
            <div
              className="h-full bg-stone-700"
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t-0 p-5 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            <Clock className="size-3" /> Freshness
          </div>
          <div className="font-display text-2xl font-bold text-fjord">
            {freshnessScore}%
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden bg-border/50">
            <div
              className="bg-surface-subtle0 h-full"
              style={{ width: `${freshnessScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

