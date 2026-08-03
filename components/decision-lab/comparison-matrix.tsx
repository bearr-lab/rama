'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  ArrowRightLeft,
  X,
  Check,
  StickyNote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
      <div className="flex h-64 w-full flex-col items-center justify-center border-transparent bg-surface-subtle p-12 text-center shadow-none">
        <ArrowRightLeft className="mb-4 size-10 text-muted/30" />
        <p className="font-display text-xl font-bold text-ink">
          Add properties to compare
        </p>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
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
    <div className="w-full space-y-8">
      {/* GLASS PLATE SPLIT-VIEW MATRIX (Lagom Compliant) */}
      <div className="w-full overflow-hidden border-transparent bg-surface-subtle shadow-none">
        <div className="flex flex-col divide-y divide-stone-300 xl:flex-row xl:divide-x xl:divide-y-0">
          
          {/* LEFT PANE: SCORING PANEL & CONTROLS */}
          <div className="w-full shrink-0 bg-surface p-6 xl:w-100 xl:p-8">
            <h3 className="mb-8 font-display text-xl font-bold text-ink">
              Trade-off Weights
            </h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  <span>Location Priority</span>
                  <span className="font-display text-sm font-bold text-ink">
                    {weightLocation}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weightLocation}
                  onChange={(e) => setWeightLocation(Number(e.target.value))}
                  className="bg-border-strong h-1 w-full cursor-pointer appearance-none accent-stone-900"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  <span>Price Sensitivity</span>
                  <span className="font-display text-sm font-bold text-ink">
                    {weightPrice}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weightPrice}
                  onChange={(e) => setWeightPrice(Number(e.target.value))}
                  className="bg-border-strong h-1 w-full cursor-pointer appearance-none accent-stone-900"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  <span>ROI Focus</span>
                  <span className="font-display text-sm font-bold text-ink">
                    {weightRoi}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weightRoi}
                  onChange={(e) => setWeightRoi(Number(e.target.value))}
                  className="bg-border-strong h-1 w-full cursor-pointer appearance-none accent-stone-900"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  <span>Risk Aversion</span>
                  <span className="font-display text-sm font-bold text-ink">
                    {weightRisk}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weightRisk}
                  onChange={(e) => setWeightRisk(Number(e.target.value))}
                  className="bg-border-strong h-1 w-full cursor-pointer appearance-none accent-stone-900"
                />
              </div>
            </div>

            <div className="mt-12 border-t border-border/60 pt-8">
              <h3 className="mb-6 font-display text-xl font-bold text-ink">Decision Analysis</h3>
              
              {/* Winner Recommendation */}
              <div className="flex flex-col gap-5 border border-border/60 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center bg-ink text-white">
                    <Check className="size-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">AI Recommendation</span>
                    <p className="font-display text-lg font-bold text-ink">{winner.title}</p>
                  </div>
                </div>
                <Link href={`/${locale}/property/${winner.id}`}>
                  <Button className="w-full rounded-none bg-ink font-bold text-white hover:bg-ink">
                    Inspect Trust Passport
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT PANE: COMPARISON MATRIX TABLE */}
          <div className="w-full flex-1 overflow-x-auto bg-surface-subtle p-6 xl:p-8">
            <table className="w-full min-w-200 border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="w-1/4 border-b border-border/60 pb-6 align-bottom">
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                      Comparison Criteria
                    </span>
                  </th>
                  {scoredProperties.map((p) => {
                    const isWinner = p.id === winner.id;
                    return (
                      <th
                        key={p.id}
                        className={cn(
                          "w-1/4 border-b border-l border-border/60 px-6 pb-6 align-top",
                          isWinner && "bg-surface"
                        )}
                      >
                        <div className="group relative">
                          <div className="relative mb-4 aspect-video w-full overflow-hidden border border-border/60 bg-border/50 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.imgUrl}
                              alt={p.title}
                              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <button
                              onClick={() => handleRemove(p.id)}
                              className="absolute top-2 right-2 flex size-6 items-center justify-center bg-ink/60 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-rose-600"
                              title="Remove property"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display text-lg leading-snug font-bold text-ink">
                              {p.title}
                            </h3>
                            <div className="flex h-7 items-center border border-border/60 bg-surface px-2 font-display text-sm font-bold text-ink shadow-sm">
                              {p.decisionScore}
                            </div>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="py-5 font-bold text-ink">Asking Valuation</td>
                  {scoredProperties.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "border-l border-border/60 px-6 py-5 font-display text-base font-bold text-ink",
                        p.id === winner.id && "bg-surface"
                      )}
                    >
                      AED {(p.price / 1000000).toFixed(2)}M
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 font-bold text-ink">Master Community</td>
                  {scoredProperties.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "border-l border-border/60 px-6 py-5 font-medium text-muted-foreground",
                        p.id === winner.id && "bg-surface"
                      )}
                    >
                      {p.community}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 font-bold text-ink">Bedrooms</td>
                  {scoredProperties.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "border-l border-border/60 px-6 py-5 font-bold text-ink",
                        p.id === winner.id && "bg-surface"
                      )}
                    >
                      {p.beds || 4} Beds
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 font-bold text-ink">Total Area</td>
                  {scoredProperties.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "border-l border-border/60 px-6 py-5 font-bold text-ink",
                        p.id === winner.id && "bg-surface"
                      )}
                    >
                      {p.sqft.toLocaleString()}{' '}
                      <span className="text-xs font-semibold text-muted-foreground">
                        sqft
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 font-bold text-ink">
                    DLD &amp; Escrow Verification
                  </td>
                  {scoredProperties.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "border-l border-border/60 px-6 py-5",
                        p.id === winner.id && "bg-surface"
                      )}
                    >
                      <div
                        className={cn(
                          'inline-flex items-center gap-1.5 border px-2 py-1 text-[10px] font-bold uppercase',
                          p.trustScore >= 90
                            ? 'border-border-strong bg-border/50 text-ink'
                            : 'border-stone-400 bg-surface-subtle text-muted-foreground',
                        )}
                      >
                        {p.trustScore >= 90 ? (
                          <Check className="size-3" />
                        ) : (
                          <X className="size-3" />
                        )}
                        <span>
                          {p.trustScore >= 90 ? 'DLD Verified' : 'In Review'}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 font-bold text-ink">Developer Partner</td>
                  {scoredProperties.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "border-l border-border/60 px-6 py-5 font-medium text-muted-foreground",
                        p.id === winner.id && "bg-surface"
                      )}
                    >
                      {p.developer}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 font-bold text-ink">Handover Status</td>
                  {scoredProperties.map((p) => (
                    <td
                      key={p.id}
                      className={cn(
                        "border-l border-border/60 px-6 py-5 font-bold text-ink",
                        p.id === winner.id && "bg-surface"
                      )}
                    >
                      {p.completion}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 font-bold text-ink">
                    Net Rental Yield (ROI)
                  </td>
                  {scoredProperties.map((p) => {
                    const isBest = p.roi === maxRoi;
                    return (
                      <td
                        key={p.id}
                        className={cn(
                          'border-l border-border/60 px-6 py-5 font-display text-base font-bold',
                          p.id === winner.id && "bg-surface",
                          isBest ? 'text-ink' : 'text-ink',
                        )}
                      >
                        {p.roi}%
                        {isBest && (
                          <span className="border-border-strong ml-2 inline-flex items-center border bg-ink px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
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
        </div>
      </div>

      {/* Shared Notes Area */}
      <div className="shadow-resting border border-border/60 bg-surface-subtle p-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink">
          <StickyNote className="size-5 text-ink" />
          Decision Logic & Notes
        </h3>
        <textarea
          className="h-32 w-full resize-none border border-border/60 bg-surface p-4 text-sm font-medium text-ink focus:border-fjord focus:ring-1 focus:ring-ink focus:outline-none"
          placeholder="Summarize why a certain property is leading, or note missing data points needed for a final call..."
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            <div className="flex size-6 items-center justify-center rounded-none bg-ink text-[8px] font-bold text-white ring-2 ring-stone-50">
              AM
            </div>
          </div>
          <p className="text-xs font-semibold text-muted-foreground">Last auto-saved at 14:32 Today</p>
        </div>
      </div>
    </div>
  );
}
