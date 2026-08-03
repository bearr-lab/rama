'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { CommunityInsights } from '@/components/community/community-insights';
import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

const COMMUNITIES = [
  {
    id: 'Downtown Dubai',
    name: 'Downtown Dubai',
    tag: 'Executives & Luxury',
    price: 'AED 2,850 / sqft',
    growth: '+42.5%',
    score: 95,
  },
  {
    id: 'Dubai Marina',
    name: 'Dubai Marina',
    tag: 'Expat Professionals',
    price: 'AED 2,200 / sqft',
    growth: '+35.8%',
    score: 88,
  },
  {
    id: 'Palm Jumeirah',
    name: 'Palm Jumeirah',
    tag: 'UHNW & Beachfront',
    price: 'AED 4,600 / sqft',
    growth: '+68.2%',
    score: 72,
  },
];

export default function CommunityWorkspacePage() {
  const locale = useLocale() || 'en';
  const [selectedCommunity, setSelectedCommunity] =
    React.useState('Downtown Dubai');

  return (
    <PageShell>
      <SectionHeader
        breadcrumb="WORKSPACE · COMMUNITY INTELLIGENCE"
        title="Community & Geospatial Intelligence"
        description="Institutional sub-market analysis across top Dubai master developments. Live service charges, price-per-sqft trajectories, and tenant yield demographics."
      />

      {/* Community Selector Pills */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {COMMUNITIES.map((c) => {
          const isSelected = selectedCommunity === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCommunity(c.id)}
              className={cn(
                'group relative flex flex-col justify-between gap-5 overflow-hidden border p-6 text-left transition-all duration-300',
                isSelected
                  ? 'border-ink bg-surface-subtle ring-1 ring-ink'
                  : 'border-border bg-transparent hover:bg-surface-subtle',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={cn(
                      'mb-2 block w-fit border px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase',
                      isSelected
                        ? 'border-ink bg-ink text-surface'
                        : 'border-border bg-surface text-muted-foreground',
                    )}
                  >
                    {c.tag}
                  </span>
                  <h3
                    className={cn(
                      'font-display text-2xl font-semibold tracking-tight',
                      isSelected
                        ? 'text-ink'
                        : 'text-ink transition-colors',
                    )}
                  >
                    {c.name}
                  </h3>
                </div>
                <div
                  className={cn(
                    'shadow-resting flex size-12 shrink-0 items-center justify-center border font-display text-lg font-extrabold',
                    isSelected
                      ? 'border-ink bg-ink font-black text-surface'
                      : 'border-border bg-surface-subtle text-ink group-hover:border-ink group-hover:text-ink',
                  )}
                >
                  {c.score}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-4 text-xs">
                <span
                  className={cn(
                    'font-medium',
                    isSelected ? 'text-ink' : 'text-muted-foreground',
                  )}
                >
                  {c.price}
                </span>
                <span className="flex items-center gap-1 border border-border bg-surface px-2.5 py-0.5 font-bold text-ink">
                  <TrendingUp className="size-3.5" />
                  {c.growth}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Insights Panel */}
      <div className="transition-all duration-300">
        <CommunityInsights communityName={selectedCommunity} />
      </div>

      {/* Featured Properties in Community Banner */}
      <div className="shadow-elevated flex flex-col items-center justify-between gap-6 border-t border-border bg-surface p-6 sm:flex-row md:p-8">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 border border-border/60 bg-border/50 px-3 py-1 text-xs font-bold text-ink">
            <ShieldCheck className="size-3.5" />
            <span>Verified Escrow Inventories</span>
          </div>
          <h3 className="text-h2 font-display font-bold text-ink">
            Ready to inspect verified units in {selectedCommunity}?
          </h3>
          <p className="text-body-sm text-muted-foreground">
            All listed properties feature a 4-factor Trust Passport with
            verified DLD Title Deeds and 0 outstanding service charge disputes.
          </p>
        </div>
        <Link
          href={`/${locale}/discover?community=${encodeURIComponent(selectedCommunity)}`}
          className="text-body flex shrink-0 items-center gap-2 bg-ink px-8 py-4 font-bold text-surface transition-all hover:bg-ink"
        >
          <span>View {selectedCommunity} Units</span>
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </PageShell>
  );
}
