'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DiscoverProperty } from '@/lib/discover/mock-properties';
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  BedDouble,
  Bath,
  Maximize2,
  Heart,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  property: DiscoverProperty;
  isSelected?: boolean;
  onSelect?: (property: DiscoverProperty) => void;
  locale?: string;
  className?: string;
}

type TrustLevel = 'verified' | 'review' | 'unknown';

function getTrustLevel(score: number): TrustLevel {
  if (score >= 85) return 'verified';
  if (score >= 60) return 'review';
  return 'unknown';
}

const trustConfig: Record<
  TrustLevel,
  { label: string; icon: React.ElementType; badgeClass: string }
> = {
  verified: {
    label: 'Verified',
    icon: CheckCircle2,
    badgeClass:
      'text-stone-900 dark:text-stone-100 border border-stone-900/40 dark:border-stone-100/40 bg-stone-200/90 dark:bg-stone-800/90 backdrop-blur-md shadow-2xs',
  },
  review: {
    label: 'In Review',
    icon: Clock,
    badgeClass:
      'text-review border border-review/40 bg-stone-100 dark:bg-stone-900/90 backdrop-blur-md shadow-2xs',
  },
  unknown: {
    label: 'Unverified',
    icon: HelpCircle,
    badgeClass:
      'text-unknown border border-unknown/40 bg-unknown-soft/90 backdrop-blur-md shadow-2xs',
  },
};

export function ListingCard({
  property,
  isSelected,
  onSelect,
  locale = 'en',
  className,
}: ListingCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const trustLevel = getTrustLevel(property.trustScore);
  const trust = trustConfig[trustLevel];
  const TrustIcon = trust.icon;

  return (
    <div
      className={cn(
        'property-card group flex cursor-pointer flex-col overflow-hidden border bg-stone-50 transition-all duration-300 dark:bg-stone-950',
        isSelected
          ? 'border-stone-900 shadow-lg ring-2 ring-fjord/20 dark:border-stone-100'
          : 'border-stone-300/80 hover:border-stone-900/40 hover:shadow-xl dark:border-stone-800/80',
        className,
      )}
      onClick={() => onSelect?.(property)}
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Status badge — top left */}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-sm',
              trust.badgeClass,
            )}
          >
            <TrustIcon className="size-3" />
            {trust.label}
          </span>
        </div>

        {/* Heart — top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            'absolute top-4 right-4 flex size-9 items-center justify-center border border-white/20 backdrop-blur-md transition-all',
            isWishlisted
              ? 'bg-stone-900 text-white shadow-md dark:bg-stone-100'
              : 'bg-black/40 text-white hover:bg-black/60',
          )}
          title="Save to shortlist"
        >
          <Heart className={cn('size-4', isWishlisted && 'fill-current')} />
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Community / sub-label */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-stone-900 uppercase dark:text-stone-100">
            {property.community}
          </span>
          <span className="size-1 bg-border" />
          <span className="text-[10px] font-medium tracking-widest text-stone-500 uppercase dark:text-stone-400">
            {property.developer}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1 font-display text-xl leading-snug font-bold text-stone-900 transition-colors group-hover:text-stone-900 dark:text-stone-100">
          {property.title}
        </h3>

        {/* Price */}
        <p className="mb-4 text-2xl font-bold text-stone-900 dark:text-stone-50">
          AED {property.price.toLocaleString()}
        </p>

        {/* Specs + yield */}
        <div className="mt-auto flex items-center justify-between border-t border-stone-300/60 pt-4 dark:border-stone-800/60">
          <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-1.5">
              <BedDouble className="size-3.5 text-stone-500 dark:text-stone-400" />
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                {property.beds === 0 ? 'Studio' : property.beds}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="size-3.5 text-stone-500 dark:text-stone-400" />
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                {property.baths}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="size-3.5 text-stone-500 dark:text-stone-400" />
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                {property.sqft.toLocaleString()}{' '}
                <span className="font-light text-stone-500 dark:text-stone-400">
                  sqft
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 border border-stone-900/30 bg-stone-200 px-3 py-1 text-xs font-bold text-stone-900 shadow-2xs dark:border-stone-100/30 dark:bg-stone-800 dark:text-stone-100">
            <TrendingUp className="size-3.5" />
            {property.roi}% Yield
          </div>
        </div>

        {/* Serene Lagom Action Strip on Hover (No Noisy Button Boxes) */}
        <div className="mt-5 flex items-center justify-between border-t border-stone-300/40 pt-3.5 text-xs font-semibold text-stone-900 dark:border-stone-800/40 dark:text-stone-100">
          <Link
            href={`/${locale}/property/${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="dark:text-stone-100-hover flex w-full items-center justify-between transition-colors group-hover:text-stone-900"
          >
            <span>Inspect Property Data &amp; Trust Passport</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
