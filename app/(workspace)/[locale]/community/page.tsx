'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  MapPin,
  Building2,
  TrendingUp,
  Sparkles,
  Footprints,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { CommunityInsights } from '@/components/community/community-insights';
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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            WORKSPACE · COMMUNITY INTELLIGENCE
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Community & Geospatial Intelligence
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            Institutional sub-market analysis across top Dubai master
            developments. Live service charges, price-per-sqft trajectories, and
            tenant yield demographics.
          </p>
        </div>
      </header>

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
                'group relative flex flex-col justify-between gap-5 overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500 hover:-translate-y-1',
                isSelected
                  ? 'shadow-floating border-fjord bg-gradient-to-br from-fjord to-[#153b52] text-white'
                  : 'hover:shadow-subtle border-border/40 bg-surface/80 backdrop-blur-md hover:border-fjord/30 hover:bg-surface',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={cn(
                      'mb-2 block w-fit rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase',
                      isSelected
                        ? 'border border-white/20 bg-white/10 text-emerald-300'
                        : 'border border-border/40 bg-surface-subtle text-muted-foreground',
                    )}
                  >
                    {c.tag}
                  </span>
                  <h3
                    className={cn(
                      'font-display text-2xl font-semibold tracking-tight',
                      isSelected
                        ? 'text-white'
                        : 'text-ink transition-colors group-hover:text-fjord',
                    )}
                  >
                    {c.name}
                  </h3>
                </div>
                <div
                  className={cn(
                    'flex size-12 shrink-0 items-center justify-center rounded-2xl border font-display text-lg font-extrabold shadow-sm',
                    isSelected
                      ? 'border-white/20 bg-white font-black text-fjord shadow-md'
                      : 'border-border/40 bg-surface-subtle text-ink group-hover:border-fjord/30 group-hover:text-fjord',
                  )}
                >
                  {c.score}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-4 text-xs">
                <span
                  className={cn(
                    'font-medium',
                    isSelected ? 'text-white/80' : 'text-muted-foreground',
                  )}
                >
                  {c.price}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-500">
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
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border/80 bg-gradient-to-r from-ink-bg to-fjord p-6 text-white shadow-lg sm:flex-row md:p-8">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
            <ShieldCheck className="size-3.5" />
            <span>Verified Escrow Inventories</span>
          </div>
          <h3 className="text-h2 font-display font-bold">
            Ready to inspect verified units in {selectedCommunity}?
          </h3>
          <p className="text-body-sm text-white/80">
            All listed properties feature a 4-factor Trust Passport with
            verified DLD Title Deeds and 0 outstanding service charge disputes.
          </p>
        </div>
        <Link
          href={`/${locale}/discover?community=${encodeURIComponent(selectedCommunity)}`}
          className="text-body flex shrink-0 items-center gap-2 rounded-2xl bg-fjord px-8 py-4 font-bold text-white shadow-lg shadow-fjord/20 transition-all hover:bg-fjord-hover"
        >
          <span>View {selectedCommunity} Units</span>
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}
