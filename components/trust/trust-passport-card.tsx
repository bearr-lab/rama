import * as React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TrustPassportCardProps {
  healthScore: number;
  evidenceScore: number;
  riskScore: number;
  freshnessScore: number;
  className?: string;
}

export function TrustPassportCard({
  healthScore,
  evidenceScore,
  riskScore,
  freshnessScore,
  className,
}: TrustPassportCardProps) {
  // Determine overall status
  const isVerified = healthScore >= 80 && evidenceScore >= 70 && riskScore < 30;
  const isAtRisk = riskScore >= 50 || freshnessScore < 40;

  return (
    <div
      className={cn(
        'shadow-subtle overflow-hidden rounded-xl border border-border bg-surface',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-b border-border px-5 py-4',
          isVerified
            ? 'bg-verified-soft/30'
            : isAtRisk
              ? 'bg-risk-soft/30'
              : 'bg-review-soft/30',
        )}
      >
        <div className="flex items-center gap-3">
          {isVerified ? (
            <ShieldCheck className="h-6 w-6 text-verified" />
          ) : isAtRisk ? (
            <ShieldAlert className="h-6 w-6 text-risk" />
          ) : (
            <Shield className="h-6 w-6 text-review" />
          )}
          <div>
            <h3 className="text-body mb-1 leading-none font-semibold text-ink">
              Trust Passport
            </h3>
            <p className="text-caption leading-none text-muted">
              {isVerified
                ? 'High Confidence'
                : isAtRisk
                  ? 'Requires Attention'
                  : 'Verification Pending'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-h3 font-display font-bold text-ink">
            {healthScore}
            <span className="text-body text-muted">/100</span>
          </div>
          <div className="text-caption text-muted">Health Score</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 divide-x divide-border p-5">
        <div className="flex flex-col gap-1 text-center">
          <div className="text-caption font-semibold tracking-wider text-muted uppercase">
            Evidence
          </div>
          <div className="text-body-lg font-bold text-ink">
            {evidenceScore}%
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-fjord"
              style={{ width: `${evidenceScore}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 pl-4 text-center">
          <div className="text-caption font-semibold tracking-wider text-muted uppercase">
            Risk
          </div>
          <div className="text-body-lg font-bold text-ink">{riskScore}%</div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-risk"
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 pl-4 text-center">
          <div className="text-caption flex items-center justify-center gap-1 font-semibold tracking-wider text-muted uppercase">
            <Clock className="h-3 w-3" /> Freshness
          </div>
          <div className="text-body-lg font-bold text-ink">
            {freshnessScore}%
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-review"
              style={{ width: `${freshnessScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
