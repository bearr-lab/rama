'use client';

import * as React from 'react';
import {
  TrendingUp,
  Navigation,
  Sun,
  Building,
  Footprints,
  BarChart3,
} from 'lucide-react';
import { NumberTicker } from '@/components/magicui/number-ticker';

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
    <div className="shadow-resting space-y-8 border border-border bg-surface-subtle p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="shadow-resting flex size-12 items-center justify-center border border-border bg-surface text-ink">
            <Building className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-h2 font-display font-bold text-ink">
                {communityName}
              </h3>
              <span className="border border-border/60 bg-border/50 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-ink uppercase">
                Active Intelligence
              </span>
            </div>
            <p className="text-caption mt-0.5 text-muted-foreground">
              Macro Environmental & Quality of Life Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border border-border bg-surface px-4 py-2.5">
          <div>
            <span className="text-caption block text-muted-foreground">Avg Valuation</span>
            <span className="text-body flex items-baseline font-mono font-extrabold text-ink">
              <span className="mr-1 font-sans text-xs">AED</span>
              <NumberTicker value={finalPriceSqft} />
              <span className="ml-1 font-sans text-xs text-muted-foreground">/ sqft</span>
            </span>
          </div>
          <div className="h-8 w-px bg-border/60" />
          <div>
            <span className="text-caption block text-muted-foreground">5-Yr Growth</span>
            <span className="text-body font-mono font-extrabold text-ink">
              +<NumberTicker value={finalGrowth} decimalPlaces={1} suffix="%" />
            </span>
          </div>
        </div>
      </div>

      {/* Walkability & Lifestyle Scores */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-body flex items-center gap-2 font-display font-bold text-ink">
            <Footprints className="size-4 text-fjord" />
            <span>Walkability & Lifestyle Index</span>
          </h4>
          <span className="text-caption font-semibold text-muted-foreground">
            Powered by OpenStreetMap & DLD Spatial Engine
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 border border-border bg-surface p-5">
            <div className="shadow-resting flex size-14 shrink-0 items-center justify-center border border-border/60 bg-border/50 font-display text-xl font-black text-ink">
              {finalWalk}
            </div>
            <div>
              <span className="text-body-sm block font-bold text-ink">
                Walker&apos;s Paradise
              </span>
              <p className="text-caption mt-0.5 leading-tight text-muted-foreground">
                Daily errands, dining, and cafes do not require a car.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border border-border bg-surface p-5">
            <div className="shadow-resting flex size-14 shrink-0 items-center justify-center border border-border/60 bg-border/50 font-display text-xl font-extrabold text-ink">
              {finalTransit}
            </div>
            <div>
              <span className="text-body-sm block font-bold text-ink">
                Excellent Transit
              </span>
              <p className="text-caption mt-0.5 leading-tight text-muted-foreground">
                Direct pedestrian link to Metro and air-conditioned walkways.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border border-border bg-surface p-5">
            <div className="shadow-resting flex size-14 shrink-0 items-center justify-center border border-border/60 bg-border/50 font-display text-xl font-bold text-ink">
              {finalQuiet}
            </div>
            <div>
              <span className="text-body-sm block font-bold text-ink">
                Acoustic & Privacy
              </span>
              <p className="text-caption mt-0.5 leading-tight text-muted-foreground">
                High double-glazed acoustic dampening; low ambient decibels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Year Macro Investment Trend Chart */}
      <div className="shadow-resting space-y-6 border border-border bg-surface-subtle p-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center border border-border/60 bg-border/50 text-ink">
              <BarChart3 className="size-5" />
            </div>
            <div>
              <h4 className="font-display text-xl font-medium text-ink">
                5-Year Historical Appreciation (2021 – 2025)
              </h4>
              <p className="mt-0.5 text-xs font-light text-muted-foreground">
                Verified DLD transfer deeds · Outperforming Dubai macro average
                by +8.4%
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1 border border-border/60 bg-surface px-3.5 py-1 text-xs font-bold text-ink">
            <TrendingUp className="size-3.5" />+{finalGrowth}% Cumulative
            Gain
          </span>
        </div>

        {/* Sleek Scandinavian Financial Columns */}
        <div className="flex h-44 items-end justify-between gap-4 border-b border-border px-4 pt-6 pb-4">
          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 1,980
            </span>
            <div className="relative h-20 w-full max-w-14 bg-ink transition-all duration-300 group-hover:bg-ink">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-stone-600" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              2021
            </span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 2,150
            </span>
            <div className="relative h-24 w-full max-w-14 bg-ink transition-all duration-300 group-hover:bg-ink">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-stone-600" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              2022
            </span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 2,420
            </span>
            <div className="relative h-28 w-full max-w-14 bg-ink transition-all duration-300 group-hover:bg-ink">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-stone-600" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              2023
            </span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-ink">
              AED 2,680
            </span>
            <div className="relative h-32 w-full max-w-14 bg-ink transition-all duration-300 group-hover:bg-ink">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-stone-600" />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              2024
            </span>
          </div>

          <div className="group flex flex-1 flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="font-display text-sm font-extrabold text-ink">
                AED {finalPriceSqft}
              </span>
            </div>
            <div className="bg-fjord-500 shadow-elevated relative h-36 w-full max-w-16 transition-all duration-300 group-hover:-translate-y-1">
              <div className="bg-fjord-300 absolute inset-x-0 top-0 h-1" />
            </div>
            <span className="font-display text-xs font-bold text-ink">
              2025 (Live)
            </span>
          </div>
        </div>
      </div>

      {/* Infrastructure & Quality of Life */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="shadow-resting space-y-3 border border-border bg-surface-subtle p-5">
          <div className="text-body-sm flex items-center gap-2 font-bold text-ink">
            <Navigation className="size-4 text-ink" />
            <span>Transport & Connectivity</span>
          </div>
          <div className="text-caption space-y-2">
            <div className="flex justify-between border-b border-border py-1.5">
              <span className="text-muted-foreground">Nearest Metro Station</span>
              <span className="text-right font-semibold text-ink">
                {data.metroDist}
              </span>
            </div>
            <div className="flex justify-between border-b border-border py-1.5">
              <span className="text-muted-foreground">Dubai Int&apos;l Airport (DXB)</span>
              <span className="font-semibold text-ink">
                14 mins via Sheikh Zayed Rd
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Top Rated School</span>
              <span className="text-right font-semibold text-ink">
                {data.school}
              </span>
            </div>
          </div>
        </div>

        <div className="shadow-resting space-y-3 border border-border bg-surface-subtle p-5">
          <div className="text-body-sm flex items-center gap-2 font-bold text-ink">
            <Sun className="size-4 text-ink" />
            <span>Micro-climate & Traffic Model</span>
          </div>
          <div className="text-caption space-y-2">
            <div className="border-b border-border py-1.5">
              <span className="mb-0.5 block text-muted-foreground">
                Traffic Bottleneck Analysis
              </span>
              <span className="block leading-tight font-semibold text-ink">
                {data.traffic}
              </span>
            </div>
            <div className="py-1.5">
              <span className="mb-0.5 block text-muted-foreground">
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
