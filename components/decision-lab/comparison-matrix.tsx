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
    imgUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
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
    imgUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
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
    imgUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
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
        <ArrowRightLeft className="mb-4 h-10 w-10 text-muted opacity-40" />
        <p className="font-display text-xl font-bold text-ink">
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
      rawScore = (
        (normLocation * weightLocation) +
        (normPrice * weightPrice) +
        (normRoi * weightRoi) +
        (normTrust * weightRisk)
      ) / totalWeight;
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
      <div className="w-full overflow-x-auto rounded-3xl border border-border/40 bg-surface/80 shadow-subtle backdrop-blur-md">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="w-1/4 min-w-[200px] border-b border-border/40 p-6 align-bottom">
                <span className="text-xs font-bold uppercase tracking-widest text-fjord">
                  Comparison Criteria
                </span>
              </th>
              {properties.map((p) => (
                <th key={p.id} className="w-1/4 min-w-[240px] border-b border-l border-border/40 p-6 align-top">
                  <div className="relative group">
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-2xl bg-surface-subtle shadow-xs border border-border/40">
                      <img src={p.imgUrl} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <button 
                        onClick={() => handleRemove(p.id)}
                        className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-rose-600 hover:scale-110 shadow-sm"
                        title="Remove property"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink leading-snug">{p.title}</h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">Asking Valuation</td>
              {properties.map((p) => (
                <td key={p.id} className="border-l border-border/40 p-6 font-display text-base font-bold text-ink">
                  AED {(p.price / 1000000).toFixed(2)}M
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">Master Community</td>
              {properties.map((p) => (
                <td key={p.id} className="border-l border-border/40 p-6 text-muted-foreground font-light">
                  {p.community}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">Bedrooms</td>
              {properties.map((p) => (
                <td key={p.id} className="border-l border-border/40 p-6 text-ink font-medium">
                  {p.beds || 4} Beds
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">Total Area</td>
              {properties.map((p) => (
                <td key={p.id} className="border-l border-border/40 p-6 text-ink font-medium">
                  {p.sqft.toLocaleString()} <span className="text-muted-foreground font-light text-xs">sqft</span>
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">DLD &amp; Escrow Verification</td>
              {properties.map((p) => (
                <td key={p.id} className={cn("border-l border-border/40 p-6", p.trustScore >= 90 ? "bg-verified-soft/40" : "bg-review-soft/40")}>
                  <div className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-2xs", p.trustScore >= 90 ? "bg-verified-soft text-verified border border-verified/30" : "bg-review-soft text-review border border-review/30")}>
                    {p.trustScore >= 90 ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    <span>{p.trustScore >= 90 ? 'DLD Verified' : 'In Review'}</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">Developer Partner</td>
              {properties.map((p) => (
                <td key={p.id} className="border-l border-border/40 p-6 text-muted-foreground font-light">
                  {p.developer}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">Handover Status</td>
              {properties.map((p) => (
                <td key={p.id} className="border-l border-border/40 p-6 text-ink font-medium">
                  {p.completion}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-subtle/30 transition-colors">
              <td className="p-6 font-semibold text-ink">Net Rental Yield (ROI)</td>
              {properties.map((p) => {
                const isBest = p.roi === maxRoi;
                return (
                  <td key={p.id} className={cn("border-l border-border/40 p-6 font-display font-bold text-base", isBest ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "text-ink")}>
                    {p.roi}%
                    {isBest && <span className="ml-2 inline-flex items-center rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">Best ROI</span>}
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
        <div className="rounded-3xl border border-border/40 bg-surface/80 p-8 shadow-subtle backdrop-blur-md">
          <h3 className="mb-6 font-display text-2xl font-medium text-ink">Trade-off Weights</h3>
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-fjord">
                <span>Location Priority</span>
                <span className="font-display text-sm font-bold text-ink">{weightLocation}%</span>
              </div>
              <input
                type="range"
                min={0} max={100}
                value={weightLocation}
                onChange={(e) => setWeightLocation(Number(e.target.value))}
                className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-fjord">
                <span>Price Sensitivity</span>
                <span className="font-display text-sm font-bold text-ink">{weightPrice}%</span>
              </div>
              <input
                type="range"
                min={0} max={100}
                value={weightPrice}
                onChange={(e) => setWeightPrice(Number(e.target.value))}
                className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-fjord">
                <span>ROI Focus</span>
                <span className="font-display text-sm font-bold text-ink">{weightRoi}%</span>
              </div>
              <input
                type="range"
                min={0} max={100}
                value={weightRoi}
                onChange={(e) => setWeightRoi(Number(e.target.value))}
                className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-fjord">
                <span>Risk Aversion</span>
                <span className="font-display text-sm font-bold text-ink">{weightRisk}%</span>
              </div>
              <input
                type="range"
                min={0} max={100}
                value={weightRisk}
                onChange={(e) => setWeightRisk(Number(e.target.value))}
                className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-surface-subtle accent-fjord focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Score Chart & Winner */}
        <div className="flex flex-col justify-between rounded-3xl border border-border/40 bg-surface/80 p-8 shadow-subtle backdrop-blur-md lg:col-span-2 space-y-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-fjord uppercase">SENSITIVITY MODELING</span>
            <h3 className="mt-1 font-display text-2xl font-medium text-ink">Decision Score Analysis</h3>
          </div>
          
          <div className="flex flex-1 flex-col justify-between gap-10">
            {/* Chart */}
            <div className="flex h-[220px] items-end justify-center gap-10 border-b border-border/40 pb-8 px-6">
              {scoredProperties.map((p) => {
                const isWinner = p.id === winner.id;
                const heightPercent = Math.max(15, Math.round((p.rawScore / winner.rawScore) * 100));
                
                return (
                  <div key={p.id} className="group flex flex-col items-center gap-3 w-1/3 max-w-[140px]">
                    <div className="relative w-full flex flex-col items-center">
                      <div className="mb-2 font-display text-base font-bold text-ink group-hover:scale-110 transition-transform">
                        {p.decisionScore}
                      </div>
                      <div 
                        className={cn(
                          "w-full rounded-t-xl transition-all duration-700 relative overflow-hidden shadow-sm", 
                          isWinner ? "bg-gradient-to-t from-fjord/70 to-fjord shadow-md shadow-fjord/20" : "bg-gradient-to-t from-surface-subtle/80 to-surface-subtle hover:from-surface-subtle hover:to-border/60"
                        )}
                        style={{ height: `${heightPercent * 1.5}px` }} 
                      >
                        {isWinner && <div className="absolute inset-x-0 top-0 h-1 bg-emerald-400 animate-pulse" />}
                      </div>
                    </div>
                    <span className="truncate text-center text-xs font-semibold text-ink/80 max-w-full">
                      {p.title.split(' ')[0]} {p.title.split(' ')[1]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Winner Recommendation (Breathtaking Dark Fjord Luxury Card!) */}
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-fjord to-[#153b52] p-6 text-white shadow-floating sm:flex-row border border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                  <Check className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">WINNER RECOMMENDATION</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white uppercase">AI RAG Cleared</span>
                  </div>
                  <p className="mt-1 text-sm text-white/90 leading-relaxed">
                    Based on your trade-off priorities, <span className="font-display font-bold text-white text-base underline decoration-emerald-400 decoration-2 underline-offset-4">{winner.title}</span> achieves the highest confidence score.
                  </p>
                </div>
              </div>
              <Link href={`/${locale}/property/${winner.id}`}>
                <Button className="shrink-0 rounded-xl bg-white px-6 py-3 font-semibold text-fjord hover:bg-white/90 shadow-sm transition-transform hover:scale-105">
                  Inspect Trust Passport
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Notes Area */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink">
          <StickyNote className="h-5 w-5 text-fjord" />
          Decision Logic & Notes
        </h3>
        <textarea 
          className="h-32 w-full resize-none rounded-xl border border-border bg-surface-subtle p-4 text-sm text-ink focus:border-fjord focus:outline-none focus:ring-1 focus:ring-fjord"
          placeholder="Summarize why a certain property is leading, or note missing data points needed for a final call..."
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
             <div className="flex h-6 w-6 items-center justify-center rounded-full bg-fjord text-[8px] font-bold text-white ring-2 ring-surface">AM</div>
          </div>
          <p className="text-xs text-muted">Last auto-saved at 14:32 Today</p>
        </div>
      </div>
    </div>
  );
}
