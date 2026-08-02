'use client';

import * as React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  FileText,
  CheckCircle2,
  Clock,
  Activity,
  Lock,
  X,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  healthScore: number;
  evidenceScore: number;
  riskScore: number;
  freshnessScore: number;
}

export function EvidenceDrawer({
  isOpen,
  onClose,
  propertyTitle,
  healthScore,
  evidenceScore,
  riskScore,
  freshnessScore,
}: EvidenceDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex justify-end bg-fjord/80 backdrop-blur-md backdrop-blur-sm duration-200">
      <div className="animate-in slide-in-from-right relative flex size-full max-w-xl flex-col overflow-y-auto border-l border-border bg-surface shadow-2xl duration-300 dark:border-border dark:bg-fjord-hover">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface-subtle p-6 dark:border-border dark:bg-fjord-hover">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center border border-border/20 bg-surface-subtle/10 text-fjord shadow-sm">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h2 className="text-h3 font-display font-bold text-fjord dark:text-white">
                Trust Passport & Evidence
              </h2>
              <p className="text-caption max-w-sm truncate text-muted dark:text-muted">
                {propertyTitle} • DLD Ref #88921-V2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="border border-transparent p-2 text-muted transition-all hover:border-border hover:bg-surface hover:text-fjord dark:border-border dark:bg-fjord-hover dark:text-muted"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-8 p-6">
          {/* Main Stamp Banner */}
          <div className="flex items-start gap-4 border border-border/20 bg-surface-subtle p-5 dark:border-border/20 dark:bg-surface-subtle">
            <div className="mt-0.5 shrink-0 bg-verified p-2.5 font-extrabold text-primary-foreground shadow-sm">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-extrabold tracking-wider text-fjord uppercase dark:text-muted">
                  Cryptographically Verified
                </span>
                <span className="text-caption bg-verified/20 px-2 py-0.5 font-bold text-fjord dark:text-muted">
                  Level 3 Trust
                </span>
              </div>
              <p className="text-body-sm mt-1 font-medium text-fjord dark:text-white">
                Title Deed and Escrow Account active on Dubai Land Department
                (DLD) REST API registry. Zero legal encumbrances detected.
              </p>
            </div>
          </div>

          {/* 4-Factor Breakdown */}
          <div className="space-y-4">
            <h3 className="text-body flex items-center gap-2 font-display font-bold text-fjord dark:text-white">
              <Activity className="size-4 text-fjord dark:text-muted" />
              <span>4-Factor Intelligence Breakdown</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col justify-between border border-border bg-surface-subtle p-4 dark:border-border dark:bg-fjord-hover">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase dark:text-muted">
                    Health Index
                  </span>
                  <span className="text-h3 font-extrabold text-fjord">
                    {healthScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden bg-border">
                  <div
                    className="h-full bg-surface-subtle"
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between border border-border bg-surface-subtle p-4 dark:border-border dark:bg-fjord-hover">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase dark:text-muted">
                    Evidence Depth
                  </span>
                  <span className="text-h3 font-extrabold text-muted dark:text-muted">
                    {evidenceScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden bg-border">
                  <div
                    className="h-full bg-surface-subtle dark:bg-surface-subtle"
                    style={{ width: `${evidenceScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between border border-border bg-surface-subtle p-4 dark:border-border dark:bg-fjord-hover">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase dark:text-muted">
                    Risk Index (Low is better)
                  </span>
                  <span className="text-h3 font-extrabold text-fjord">
                    {riskScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden bg-border">
                  <div
                    className="h-full bg-surface-subtle"
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between border border-border bg-surface-subtle p-4 dark:border-border dark:bg-fjord-hover">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase dark:text-muted">
                    Data Freshness
                  </span>
                  <span className="text-h3 font-extrabold text-fjord">
                    {freshnessScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden bg-border">
                  <div
                    className="h-full bg-surface-subtle"
                    style={{ width: `${freshnessScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Valuation Confidence Decay Curve */}
          <div className="space-y-3 border border-border bg-surface-subtle p-5 dark:border-border dark:bg-fjord-hover">
            <div className="flex items-center justify-between">
              <h4 className="text-body-sm flex items-center gap-2 font-bold text-fjord dark:text-white">
                <Clock className="size-4 text-muted dark:text-muted" />
                <span>Valuation Confidence Decay Curve</span>
              </h4>
              <span className="text-caption bg-surface-subtle/10 px-2 py-0.5 font-extrabold text-muted dark:bg-surface-subtle/10 dark:text-muted">
                Live Model
              </span>
            </div>
            <p className="text-caption text-muted dark:text-muted">
              RAMA applies an algorithmic time-decay curve to pricing comps.
              Without continuous ingestion of DLD transaction records, valuation
              confidence decreases by 15% every 30 days.
            </p>

            {/* Simulated Step Chart */}
            <div className="flex h-24 items-end justify-between gap-2 pt-2 text-center">
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-fjord">
                  100%
                </span>
                <div className="group relative h-16 w-full border border-border/40 bg-surface-subtle/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-surface-subtle" />
                </div>
                <span className="text-[9px] font-semibold text-muted dark:text-muted">
                  Day 0 (Now)
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-muted dark:text-muted">
                  88%
                </span>
                <div className="group relative h-14 w-full border border-border/40 bg-surface-subtle/20 dark:border-stone-700/40 dark:bg-surface-subtle/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-surface-subtle dark:bg-surface-subtle" />
                </div>
                <span className="text-[9px] font-semibold text-muted dark:text-muted">
                  +30 Days
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-muted dark:text-muted">
                  72%
                </span>
                <div className="group relative h-11 w-full border border-stone-400/40 bg-surface-subtle/20 dark:border-stone-600/40 dark:bg-surface-subtle/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-surface-subtle dark:bg-stone-300" />
                </div>
                <span className="text-[9px] font-semibold text-muted dark:text-muted">
                  +60 Days
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-fjord dark:text-muted">
                  55%
                </span>
                <div className="group relative h-8 w-full border border-stone-400/40 bg-surface-subtle/20 dark:border-stone-600/40 dark:bg-surface-subtle/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-surface-subtle dark:bg-surface-subtle" />
                </div>
                <span className="text-[9px] font-semibold text-muted dark:text-muted">
                  +90 Days
                </span>
              </div>
            </div>
          </div>

          {/* Verified Documents & OCR Audit Log */}
          <div className="space-y-3">
            <h4 className="text-body-sm flex items-center justify-between font-bold text-fjord dark:text-white">
              <span className="flex items-center gap-2">
                <FileText className="size-4 text-fjord dark:text-muted" />
                <span>Verified Legal Evidence Vault</span>
              </span>
              <span className="text-caption font-bold text-fjord">
                4 / 4 Validated
              </span>
            </h4>

            <div className="divide-y divide-stone-300 overflow-hidden border border-border dark:divide-stone-800 dark:border-border">
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5 dark:bg-fjord-hover">
                <div className="flex items-center gap-2.5 font-medium text-fjord dark:text-white">
                  <CheckCircle2 className="size-4 shrink-0 text-fjord" />
                  <span>DLD Electronic Title Deed #88921</span>
                </div>
                <span className="text-caption font-mono text-muted dark:text-muted">
                  Verified 2h ago
                </span>
              </div>
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5 dark:bg-fjord-hover">
                <div className="flex items-center gap-2.5 font-medium text-fjord dark:text-white">
                  <CheckCircle2 className="size-4 shrink-0 text-fjord" />
                  <span>RERA Escrow Account Certificate</span>
                </div>
                <span className="text-caption font-mono text-muted dark:text-muted">
                  Verified 1d ago
                </span>
              </div>
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5 dark:bg-fjord-hover">
                <div className="flex items-center gap-2.5 font-medium text-fjord dark:text-white">
                  <CheckCircle2 className="size-4 shrink-0 text-fjord" />
                  <span>Developer Service Charge NOC (2024–2025)</span>
                </div>
                <span className="text-caption font-mono text-muted dark:text-muted">
                  Verified 3d ago
                </span>
              </div>
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5 dark:bg-fjord-hover">
                <div className="flex items-center gap-2.5 font-medium text-fjord dark:text-white">
                  <CheckCircle2 className="size-4 shrink-0 text-fjord" />
                  <span>Physical Inspection AI Survey Report</span>
                </div>
                <span className="text-caption font-mono text-muted dark:text-muted">
                  Verified 5d ago
                </span>
              </div>
            </div>
          </div>

          {/* Risk & Unknowns Identifier */}
          <div className="text-body-sm flex items-start gap-3 border border-stone-400/30 bg-surface-subtle/5 p-4 dark:border-stone-600/30 dark:bg-surface-subtle/5">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-muted dark:text-muted" />
            <div>
              <h5 className="font-bold text-fjord dark:text-white">
                Known Risk & Unknowns Identifier
              </h5>
              <p className="text-caption mt-1 leading-relaxed text-muted dark:text-muted">
                While escrow and title deeds are 100% verified, the community
                master developer (Emaar) is scheduled to review annual service
                charges next quarter. Estimated variance: ±3.2%.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between border-t border-border bg-surface-subtle p-4 dark:border-border dark:bg-fjord-hover">
          <div className="text-caption flex items-center gap-2 text-muted dark:text-muted">
            <Lock className="size-3.5 text-fjord" />
            <span>Cryptographic Proof SHA-256</span>
          </div>
          <button
            onClick={onClose}
            className="text-body-sm bg-fjord-hover px-5 py-2 font-bold text-white shadow-sm transition-colors hover:bg-surface-subtle dark:bg-surface-subtle dark:bg-surface-subtle"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
}
