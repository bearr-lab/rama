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
    <div className="animate-in fade-in fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm duration-200">
      <div className="animate-in slide-in-from-right relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-surface shadow-2xl duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface-subtle p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-h3 font-display font-bold text-ink">
                Trust Passport & Evidence
              </h2>
              <p className="text-caption max-w-sm truncate text-muted">
                {propertyTitle} • DLD Ref #88921-V2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-transparent p-2 text-muted transition-all hover:border-border hover:bg-surface hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-8 p-6">
          {/* Main Stamp Banner */}
          <div className="flex items-start gap-4 rounded-2xl border border-verified/20 bg-verified-soft p-5">
            <div className="mt-0.5 shrink-0 rounded-xl bg-verified p-2.5 font-extrabold text-primary-foreground shadow-sm">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-extrabold tracking-wider text-verified uppercase">
                  Cryptographically Verified
                </span>
                <span className="rounded bg-verified/20 px-2 py-0.5 text-caption font-bold text-verified">
                  Level 3 Trust
                </span>
              </div>
              <p className="text-body-sm mt-1 font-medium text-ink">
                Title Deed and Escrow Account active on Dubai Land Department
                (DLD) REST API registry. Zero legal encumbrances detected.
              </p>
            </div>
          </div>

          {/* 4-Factor Breakdown */}
          <div className="space-y-4">
            <h3 className="text-body flex items-center gap-2 font-display font-bold text-ink">
              <Activity className="h-4 w-4 text-fjord" />
              <span>4-Factor Intelligence Breakdown</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface-subtle p-4">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase">
                    Health Index
                  </span>
                  <span className="text-h3 font-extrabold text-emerald-500">
                    {healthScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface-subtle p-4">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase">
                    Evidence Depth
                  </span>
                  <span className="text-h3 font-extrabold text-sky-500">
                    {evidenceScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${evidenceScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface-subtle p-4">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase">
                    Risk Index (Low is better)
                  </span>
                  <span className="text-h3 font-extrabold text-purple-500">
                    {riskScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface-subtle p-4">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-bold text-muted uppercase">
                    Data Freshness
                  </span>
                  <span className="text-h3 font-extrabold text-emerald-500">
                    {freshnessScore}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${freshnessScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Valuation Confidence Decay Curve */}
          <div className="space-y-3 rounded-2xl border border-border bg-surface-subtle p-5">
            <div className="flex items-center justify-between">
              <h4 className="text-body-sm flex items-center gap-2 font-bold text-ink">
                <Clock className="h-4 w-4 text-sky-500" />
                <span>Valuation Confidence Decay Curve</span>
              </h4>
              <span className="text-caption rounded bg-sky-500/10 px-2 py-0.5 font-extrabold text-sky-500">
                Live Model
              </span>
            </div>
            <p className="text-caption text-muted">
              RAMA applies an algorithmic time-decay curve to pricing comps.
              Without continuous ingestion of DLD transaction records, valuation
              confidence decreases by 15% every 30 days.
            </p>

            {/* Simulated Step Chart */}
            <div className="flex h-24 items-end justify-between gap-2 pt-2 text-center">
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-500">
                  100%
                </span>
                <div className="group relative h-16 w-full rounded-t border border-emerald-500/40 bg-emerald-500/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500" />
                </div>
                <span className="text-[9px] font-semibold text-muted">
                  Day 0 (Now)
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-sky-500">88%</span>
                <div className="group relative h-14 w-full rounded-t border border-sky-500/40 bg-sky-500/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-sky-500" />
                </div>
                <span className="text-[9px] font-semibold text-muted">
                  +30 Days
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-amber-500">
                  72%
                </span>
                <div className="group relative h-11 w-full rounded-t border border-amber-500/40 bg-amber-500/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
                </div>
                <span className="text-[9px] font-semibold text-muted">
                  +60 Days
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-rose-500">55%</span>
                <div className="group relative h-8 w-full rounded-t border border-rose-500/40 bg-rose-500/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-rose-500" />
                </div>
                <span className="text-[9px] font-semibold text-muted">
                  +90 Days
                </span>
              </div>
            </div>
          </div>

          {/* Verified Documents & OCR Audit Log */}
          <div className="space-y-3">
            <h4 className="text-body-sm flex items-center justify-between font-bold text-ink">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-fjord" />
                <span>Verified Legal Evidence Vault</span>
              </span>
              <span className="text-caption font-bold text-emerald-500">
                4 / 4 Validated
              </span>
            </h4>

            <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5">
                <div className="flex items-center gap-2.5 font-medium text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>DLD Electronic Title Deed #88921</span>
                </div>
                <span className="text-caption font-mono text-muted">
                  Verified 2h ago
                </span>
              </div>
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5">
                <div className="flex items-center gap-2.5 font-medium text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>RERA Escrow Account Certificate</span>
                </div>
                <span className="text-caption font-mono text-muted">
                  Verified 1d ago
                </span>
              </div>
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5">
                <div className="flex items-center gap-2.5 font-medium text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Developer Service Charge NOC (2024–2025)</span>
                </div>
                <span className="text-caption font-mono text-muted">
                  Verified 3d ago
                </span>
              </div>
              <div className="text-body-sm flex items-center justify-between bg-surface p-3.5">
                <div className="flex items-center gap-2.5 font-medium text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Physical Inspection AI Survey Report</span>
                </div>
                <span className="text-caption font-mono text-muted">
                  Verified 5d ago
                </span>
              </div>
            </div>
          </div>

          {/* Risk & Unknowns Identifier */}
          <div className="text-body-sm flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <h5 className="font-bold text-ink">
                Known Risk & Unknowns Identifier
              </h5>
              <p className="text-caption mt-1 leading-relaxed text-muted">
                While escrow and title deeds are 100% verified, the community
                master developer (Emaar) is scheduled to review annual service
                charges next quarter. Estimated variance: ±3.2%.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between border-t border-border bg-surface-subtle p-4">
          <div className="text-caption flex items-center gap-2 text-muted">
            <Lock className="h-3.5 w-3.5 text-emerald-500" />
            <span>Cryptographic Proof SHA-256</span>
          </div>
          <button
            onClick={onClose}
            className="text-body-sm rounded-xl bg-fjord px-5 py-2 font-bold text-white shadow-sm transition-colors hover:bg-fjord-hover"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
}
