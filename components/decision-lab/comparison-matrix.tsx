'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  ArrowRightLeft,
  X,
  Check,
  StickyNote,
  Trophy,
  ArrowUpRight,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';

interface ComparisonProperty {
  id: string;
  title: string;
  price: number;
  roi: number;
  trustScore: number;
  sqft: number;
  beds?: number;
  community?: string;
  developer?: string;
  completion?: string;
  imgUrl: string;
}

interface ComparisonMatrixProps {
  properties?: ComparisonProperty[];
  locale?: string;
}

const DEFAULT_COMP_PROPERTIES: ComparisonProperty[] = [
  {
    id: 'prop-1',
    title: 'Sky Collection Penthouse',
    price: 18500000,
    roi: 6.2,
    trustScore: 94,
    sqft: 4200,
    community: 'Downtown Dubai',
    developer: 'Emaar',
    completion: 'Ready',
    imgUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prop-2',
    title: 'Marina Gate Residence',
    price: 3450000,
    roi: 7.4,
    trustScore: 92,
    sqft: 1450,
    community: 'Dubai Marina',
    developer: 'Select Group',
    completion: 'Ready',
    imgUrl:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prop-6',
    title: 'Creek Horizon Tower A',
    price: 2900000,
    roi: 7.8,
    trustScore: 88,
    sqft: 1350,
    community: 'Dubai Creek Harbour',
    developer: 'Emaar',
    completion: '2024',
    imgUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
];

export function ComparisonMatrix({
  properties: initialProperties = DEFAULT_COMP_PROPERTIES,
  locale = 'en',
}: ComparisonMatrixProps) {
  const [properties, setProperties] = React.useState(initialProperties);

  // Trade-off weights (0 to 100)
  const [weightLocation, setWeightLocation] = React.useState<number>(80);
  const [weightPrice, setWeightPrice] = React.useState<number>(45);
  const [weightRoi, setWeightRoi] = React.useState<number>(90);
  const [weightRisk, setWeightRisk] = React.useState<number>(20);

  const handleRemove = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  if (properties.length < 2) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface-subtle p-8 text-center">
        <ArrowRightLeft className="mb-4 size-10 text-muted opacity-40" />
        <p className="font-display text-xl font-bold text-fjord">
          Add properties to compare
        </p>
        <p className="mt-2 max-w-md text-sm text-muted">
          The Decision Lab requires at least two properties to run trade-off
          sensitivity modeling.
        </p>
      </div>
    );
  }

  // Calculate dynamic Decision Score based on user weights
  const maxRoi = Math.max(...properties.map((p) => p.roi));
  const maxTrust = Math.max(...properties.map((p) => p.trustScore));
  const minPrice = Math.min(...properties.map((p) => p.price));

  const scoredProperties = properties.map((p) => {
    // Normalize values between 0 and 1
    const normRoi = p.roi / maxRoi;
    const normTrust = p.trustScore / maxTrust;
    const normPrice = minPrice / p.price; // lower price is better

    // For Location, we'll just use a mock score based on community for demo purposes
    const normLocation = p.community === 'Downtown Dubai' ? 1.0 : 0.8;

    const totalWeight = weightLocation + weightPrice + weightRoi + weightRisk;

    let rawScore = 0;
    if (totalWeight > 0) {
      rawScore =
        (normLocation * weightLocation +
          normPrice * weightPrice +
          normRoi * weightRoi +
          normTrust * weightRisk) /
        totalWeight;
    }

    const decisionScore = (rawScore * 10).toFixed(1);

    return {
      ...p,
      priceSqft: Math.round(p.price / p.sqft),
      decisionScore,
      rawScore,
    };
  });

  // Winner is property with highest decisionScore
  const sortedProperties = [...scoredProperties].sort(
    (a, b) => b.rawScore - a.rawScore,
  );
  const winner = sortedProperties[0];

  return (
    <div className="w-full space-y-12">
      {/* COMPARISON TABLE */}
      <div className="shadow-subtle w-full overflow-x-auto rounded-3xl border border-border/40 bg-surface/80 backdrop-blur-md">
        <table className="w-full min-w-200 border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="w-1/4 min-w-50 border-b border-border/40 p-6 align-bottom">
                <span className="text-xs font-bold tracking-widest text-fjord uppercase">
                  Comparison Criteria
                </span>
              </th>
              {properties.map((p) => (
                <th
                  key={p.id}
                  className="w-1/4 min-w-60 border-b border-l border-border/40 p-6 align-top"
                >
                  <div className="group relative">
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-surface-subtle shadow-xs">
                      <img
                        src={p.imgUrl}
                        alt={p.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={() => handleRemove(p.id)}
                        className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-fjord/80 backdrop-blur-md text-white opacity-0 shadow-sm backdrop-blur-md transition-all group-hover:opacity-100 hover:scale-110 hover:bg-rose-600"
                        title="Remove property"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                    <h3 className="font-display text-xl leading-snug font-bold text-fjord">
                      {p.title}
                    </h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">Asking Valuation</td>
              {properties.map((p) => (
                <td
                  key={p.id}
                  className="border-l border-border/40 p-6 font-display text-base font-bold text-fjord"
                >
                  AED {(p.price / 1000000).toFixed(2)}M
                </td>
              ))}
            </tr>
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">Master Community</td>
              {properties.map((p) => (
                <td
                  key={p.id}
                  className="border-l border-border/40 p-6 font-light text-muted-foreground"
                >
                  {p.community}
                </td>
              ))}
            </tr>
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">Bedrooms</td>
              {properties.map((p) => (
                <td
                  key={p.id}
                  className="border-l border-border/40 p-6 font-medium text-fjord"
                >
                  {p.beds || 4} Beds
                </td>
              ))}
            </tr>
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">Total Area</td>
              {properties.map((p) => (
                <td
                  key={p.id}
                  className="border-l border-border/40 p-6 font-medium text-fjord"
                >
                  {p.sqft.toLocaleString()}{' '}
                  <span className="text-xs font-light text-muted-foreground">
                    sqft
                  </span>
                </td>
              ))}
            </tr>
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">
                DLD &amp; Escrow Verification
              </td>
              {properties.map((p) => (
                <td
                  key={p.id}
                  className={cn(
                    'border-l border-border/40 p-6',
                    p.trustScore >= 90
                      ? 'bg-verified-soft/40'
                      : 'bg-review-soft/40',
                  )}
                >
                  <div
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-2xs',
                      p.trustScore >= 90
                        ? 'border border-verified/30 bg-verified-soft text-verified'
                        : 'border border-review/30 bg-review-soft text-review',
                    )}
                  >
                    {p.trustScore >= 90 ? (
                      <Check className="size-3.5" />
                    ) : (
                      <X className="size-3.5" />
                    )}
                    <span>
                      {p.trustScore >= 90 ? 'DLD Verified' : 'In Review'}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">Developer Partner</td>
              {properties.map((p) => (
                <td
                  key={p.id}
                  className="border-l border-border/40 p-6 font-light text-muted-foreground"
                >
                  {p.developer}
                </td>
              ))}
            </tr>
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">Handover Status</td>
              {properties.map((p) => (
                <td
                  key={p.id}
                  className="border-l border-border/40 p-6 font-medium text-fjord"
                >
                  {p.completion}
                </td>
              ))}
            </tr>
            <tr className="transition-colors hover:bg-surface-subtle/30">
              <td className="p-6 font-semibold text-fjord">
                Net Rental Yield (ROI)
              </td>
              {properties.map((p) => {
                const isBest = p.roi === maxRoi;
                return (
                  <td
                    key={p.id}
                    className={cn(
                      'border-l border-border/40 p-6 font-display text-base font-bold',
                      isBest
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'text-fjord',
                    )}
                  >
                    {p.roi}%
                    {isBest && (
                      <span className="ml-2 inline-flex items-center rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                        Best ROI
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* SCORING PANEL */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sliders */}
        <div className="shadow-subtle rounded-3xl border border-border/40 bg-surface/80 p-8 backdrop-blur-md">
          <h3 className="mb-6 font-display text-2xl font-medium text-fjord">
            Trade-off Weights
          </h3>
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold tracking-widest text-fjord uppercase">
                <span>Location Priority</span>
                <span className="font-display text-sm font-bold text-fjord">
                  {weightLocation}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weightLocation}
                onChange={(e) => setWeightLocation(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold tracking-widest text-fjord uppercase">
                <span>Price Sensitivity</span>
                <span className="font-display text-sm font-bold text-fjord">
                  {weightPrice}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weightPrice}
                onChange={(e) => setWeightPrice(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold tracking-widest text-fjord uppercase">
                <span>ROI Focus</span>
                <span className="font-display text-sm font-bold text-fjord">
                  {weightRoi}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weightRoi}
                onChange={(e) => setWeightRoi(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold tracking-widest text-fjord uppercase">
                <span>Risk Aversion</span>
                <span className="font-display text-sm font-bold text-fjord">
                  {weightRisk}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weightRisk}
                onChange={(e) => setWeightRisk(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Score Chart & Winner */}
        <div className="shadow-subtle flex flex-col justify-between space-y-8 rounded-3xl border border-border/40 bg-surface/80 p-8 backdrop-blur-md lg:col-span-2">
          <div>
            <span className="text-xs font-bold tracking-widest text-fjord uppercase">
              SENSITIVITY MODELING
            </span>
            <h3 className="mt-1 font-display text-2xl font-medium text-fjord">
              Decision Score Analysis
            </h3>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-10">
            {/* Chart */}
            <div className="flex h-55 items-end justify-center gap-10 border-b border-border/40 px-6 pb-8">
              {scoredProperties.map((p) => {
                const isWinner = p.id === winner.id;
                const heightPercent = Math.max(
                  15,
                  Math.round((p.rawScore / winner.rawScore) * 100),
                );

                return (
                  <div
                    key={p.id}
                    className="group flex w-1/3 max-w-35 flex-col items-center gap-3"
                  >
                    <div className="relative flex w-full flex-col items-center">
                      <div className="mb-2 font-display text-base font-bold text-fjord transition-transform group-hover:scale-110">
                        {p.decisionScore}
                      </div>
                      <div
                        className={cn(
                          'relative w-full overflow-hidden rounded-t-xl shadow-sm transition-all duration-700',
                          isWinner
                            ? 'bg-gradient-to-t from-fjord/70 to-fjord shadow-md shadow-fjord/20'
                            : 'bg-gradient-to-t from-surface-subtle/80 to-surface-subtle hover:from-surface-subtle hover:to-border/60',
                        )}
                        style={{ height: `${heightPercent * 1.5}px` }}
                      >
                        {isWinner && (
                          <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-emerald-400" />
                        )}
                      </div>
                    </div>
                    <span className="max-w-full truncate text-center text-xs font-semibold text-fjord/80">
                      {p.title.split(' ')[0]} {p.title.split(' ')[1]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Winner Recommendation (Breathtaking Dark Fjord Luxury Card!) */}
            <div className="shadow-floating flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-fjord to-[#153b52] p-6 text-white sm:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                  <Check className="stroke-2.5 size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">
                      WINNER RECOMMENDATION
                    </span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                      AI RAG Cleared
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-white/90">
                    Based on your trade-off priorities,{' '}
                    <span className="font-display text-base font-bold text-white underline decoration-emerald-400 decoration-2 underline-offset-4">
                      {winner.title}
                    </span>{' '}
                    achieves the highest confidence score.
                  </p>
                </div>
              </div>
              <Link href={`/${locale}/property/${winner.id}`}>
                <Button className="shrink-0 rounded-xl bg-white px-6 py-3 font-semibold text-fjord shadow-sm transition-transform hover:scale-105 hover:bg-white/90">
                  Inspect Trust Passport
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Notes Area */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-fjord">
          <StickyNote className="size-5 text-fjord" />
          Decision Logic & Notes
        </h3>
        <textarea
          className="h-32 w-full resize-none rounded-xl border border-border bg-surface-subtle p-4 text-sm text-fjord focus:border-fjord focus:ring-1 focus:ring-fjord focus:outline-none"
          placeholder="Summarize why a certain property is leading, or note missing data points needed for a final call..."
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-fjord text-[8px] font-bold text-white ring-2 ring-surface">
              AM
            </div>
          </div>
          <p className="text-xs text-muted">Last auto-saved at 14:32 Today</p>
        </div>
      </div>
    </div>
  );
}
