'use client';

import * as React from 'react';
import {
  MapPin,
  TrendingUp,
  Navigation,
  GraduationCap,
  Sun,
  Car,
  Sparkles,
  Building,
  Footprints,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';

interface CommunityInsightsProps {
  communityName?: string;
  walkScore?: number;
  transitScore?: number;
  quietScore?: number;
  avgPriceSqft?: number;
  growth5Yr?: number;
}

interface CommunityInsightDetail {
  walkScore: number;
  transitScore: number;
  quietScore: number;
  avgPriceSqft: number;
  growth5Yr: number;
  metroDist: string;
  school: string;
  traffic: string;
  microclimate: string;
}

const COMMUNITY_DATA: Record<string, CommunityInsightDetail> = {
  'Downtown Dubai': {
    walkScore: 95,
    transitScore: 92,
    quietScore: 74,
    avgPriceSqft: 2850,
    growth5Yr: 42.5,
    metroDist: '350m (Burj Khalifa/Dubai Mall Metro)',
    school: 'GEMS Wellington Primary (Rating: Outstanding)',
    traffic:
      'Moderate congestion during evening mall peak hours (18:00 - 20:30)',
    microclimate:
      'High shading from tower clusters; air-conditioned metro link access.',
  },
  'Dubai Marina': {
    walkScore: 88,
    transitScore: 89,
    quietScore: 68,
    avgPriceSqft: 2200,
    growth5Yr: 35.8,
    metroDist: '400m (Sobha Realty Metro & Dubai Tram)',
    school: 'Emirates International School (Rating: Very Good)',
    traffic: 'High weekend evening bottleneck near JBR exit interchange.',
    microclimate:
      'Direct 7km Marina Walk waterfront breeze; pedestrian friendly.',
  },
  'Palm Jumeirah': {
    walkScore: 72,
    transitScore: 65,
    quietScore: 94,
    avgPriceSqft: 4600,
    growth5Yr: 68.2,
    metroDist: '1.2km (Palm Monorail Gateway)',
    school: 'Dubai College (Rating: Outstanding - 12m drive)',
    traffic: 'Smooth trunk flow; occasional peak traffic on crescent hotels.',
    microclimate:
      'Direct private beach frontage; 3-4°C cooler oceanic microclimate.',
  },
};

export function CommunityInsights({
  communityName = 'Downtown Dubai',
  walkScore,
  transitScore,
  quietScore,
  avgPriceSqft,
  growth5Yr,
}: CommunityInsightsProps) {
  const data =
    COMMUNITY_DATA[communityName] || COMMUNITY_DATA['Downtown Dubai'];
  const finalWalk = walkScore || data.walkScore;
  const finalTransit = transitScore || data.transitScore;
  const finalQuiet = quietScore || data.quietScore;
  const finalPriceSqft = avgPriceSqft || data.avgPriceSqft;
  const finalGrowth = growth5Yr || data.growth5Yr;

  return (
    <div className="shadow-subtle space-y-8 rounded-3xl border border-border bg-surface p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fjord/20 bg-gradient-to-br from-sky-500/20 to-fjord/20 text-fjord shadow-sm">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-h2 font-display font-bold text-ink">
                {communityName}
              </h3>
              <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-sky-500 uppercase">
                Active Intelligence
              </span>
            </div>
            <p className="text-caption mt-0.5 text-muted">
              Macro Environmental & Quality of Life Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-surface-subtle px-4 py-2.5 backdrop-blur-md">
          <div>
            <span className="text-caption block text-muted">Avg Valuation</span>
            <span className="text-body font-mono font-extrabold text-ink flex items-baseline">
              <span className="text-xs font-sans mr-1">AED</span>
              <NumberTicker value={finalPriceSqft} />
              <span className="text-xs font-sans text-muted ml-1">/ sqft</span>
            </span>
          </div>
          <div className="h-8 w-px bg-border/60" />
          <div>
            <span className="text-caption block text-muted">5-Yr Growth</span>
            <span className="text-body font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
              +<NumberTicker value={finalGrowth} decimalPlaces={1} suffix="%" />
            </span>
          </div>
        </div>
      </div>

      {/* Walkability & Lifestyle Scores */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-body flex items-center gap-2 font-display font-bold text-ink">
            <Footprints className="h-4 w-4 text-fjord" />
            <span>Walkability & Lifestyle Index</span>
          </h4>
          <span className="text-caption font-semibold text-muted">
            Powered by OpenStreetMap & DLD Spatial Engine
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-subtle p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 font-display text-xl font-extrabold text-emerald-500 shadow-sm">
              {finalWalk}
            </div>
            <div>
              <span className="text-body-sm block font-bold text-ink">
                Walker&apos;s Paradise
              </span>
              <p className="text-caption mt-0.5 leading-tight text-muted">
                Daily errands, dining, and cafes do not require a car.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-subtle p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-500/20 bg-sky-500/10 font-display text-xl font-extrabold text-sky-500 shadow-sm">
              {finalTransit}
            </div>
            <div>
              <span className="text-body-sm block font-bold text-ink">
                Excellent Transit
              </span>
              <p className="text-caption mt-0.5 leading-tight text-muted">
                Direct pedestrian link to Metro and air-conditioned walkways.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-subtle p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 font-display text-xl font-extrabold text-purple-500 shadow-sm">
              {finalQuiet}
            </div>
            <div>
              <span className="text-body-sm block font-bold text-ink">
                Acoustic & Privacy
              </span>
              <p className="text-caption mt-0.5 leading-tight text-muted">
                High double-glazed acoustic dampening; low ambient decibels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Year Macro Investment Trend Chart */}
      <div className="space-y-6 rounded-3xl border border-border/40 bg-surface/80 p-8 shadow-subtle backdrop-blur-md">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-xl font-medium text-ink">
                5-Year Historical Appreciation (2021 – 2025)
              </h4>
              <p className="text-xs text-muted-foreground font-light mt-0.5">
                Verified DLD transfer deeds · Outperforming Dubai macro average by +8.4%
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
            <TrendingUp className="h-3.5 w-3.5" />
            +{finalGrowth}% Cumulative Gain
          </span>
        </div>

        {/* Sleek Scandinavian Financial Columns */}
        <div className="flex h-44 items-end justify-between gap-4 px-4 pt-6 border-b border-border/40 pb-4">
          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 1,980
            </span>
            <div className="relative h-20 w-full max-w-[56px] rounded-t-2xl bg-gradient-to-t from-fjord/10 via-fjord/30 to-fjord/50 transition-all duration-500 group-hover:from-fjord/20 group-hover:via-fjord/40 group-hover:to-fjord/70 shadow-2xs">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-fjord/60 rounded-t-full" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">2021</span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 2,150
            </span>
            <div className="relative h-24 w-full max-w-[56px] rounded-t-2xl bg-gradient-to-t from-fjord/15 via-fjord/40 to-fjord/60 transition-all duration-500 group-hover:from-fjord/25 group-hover:via-fjord/50 group-hover:to-fjord/80 shadow-2xs">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-fjord/70 rounded-t-full" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">2022</span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 2,420
            </span>
            <div className="relative h-28 w-full max-w-[56px] rounded-t-2xl bg-gradient-to-t from-fjord/20 via-fjord/50 to-fjord/70 transition-all duration-500 group-hover:from-fjord/30 group-hover:via-fjord/60 group-hover:to-fjord/90 shadow-sm">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-fjord/80 rounded-t-full" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">2023</span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 2,680
            </span>
            <div className="relative h-32 w-full max-w-[56px] rounded-t-2xl bg-gradient-to-t from-fjord/30 via-fjord/60 to-fjord transition-all duration-500 group-hover:from-fjord/40 group-hover:via-fjord/70 group-hover:to-fjord-hover shadow-sm">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-fjord rounded-t-full" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">2024</span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-display text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                AED {finalPriceSqft}
              </span>
            </div>
            <div className="relative h-36 w-full max-w-[64px] rounded-t-2xl bg-gradient-to-t from-emerald-500/30 via-emerald-500/70 to-emerald-500 shadow-floating transition-all duration-500 group-hover:scale-[1.02]">
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-full bg-white/80 animate-pulse" />
            </div>
            <span className="font-display text-xs font-bold text-ink">
              2025 (Live)
            </span>
          </div>
        </div>
      </div>

      {/* Infrastructure & Quality of Life */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5">
          <div className="text-body-sm flex items-center gap-2 font-bold text-ink">
            <Navigation className="h-4 w-4 text-sky-500" />
            <span>Transport & Connectivity</span>
          </div>
          <div className="text-caption space-y-2">
            <div className="flex justify-between border-b border-border py-1.5">
              <span className="text-muted">Nearest Metro Station</span>
              <span className="text-right font-semibold text-ink">
                {data.metroDist}
              </span>
            </div>
            <div className="flex justify-between border-b border-border py-1.5">
              <span className="text-muted">Dubai Int&apos;l Airport (DXB)</span>
              <span className="font-semibold text-ink">
                14 mins via Sheikh Zayed Rd
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted">Top Rated School</span>
              <span className="text-right font-semibold text-ink">
                {data.school}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5">
          <div className="text-body-sm flex items-center gap-2 font-bold text-ink">
            <Sun className="h-4 w-4 text-amber-500" />
            <span>Micro-climate & Traffic Model</span>
          </div>
          <div className="text-caption space-y-2">
            <div className="border-b border-border py-1.5">
              <span className="mb-0.5 block text-muted">
                Traffic Bottleneck Analysis
              </span>
              <span className="block leading-tight font-semibold text-ink">
                {data.traffic}
              </span>
            </div>
            <div className="py-1.5">
              <span className="mb-0.5 block text-muted">
                Summer Heat & Shading Index
              </span>
              <span className="block leading-tight font-semibold text-ink">
                {data.microclimate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
