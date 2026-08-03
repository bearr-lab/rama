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
    badgeClass: 'text-ink dark:text-stone-200 border border-stone-900/30  bg-surface ',
  },
  review: {
    label: 'In Review',
    icon: Clock,
    badgeClass: 'text-amber-700 dark:text-amber-400 border border-amber-400/40 bg-amber-50 dark:bg-amber-950/40',
  },
  unknown: {
    label: 'Unverified',
    icon: HelpCircle,
    badgeClass: 'text-stone-500 dark:text-stone-400 border border-stone-400/30 bg-surface ',
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
        'property-card group flex cursor-pointer flex-col overflow-hidden border bg-surface transition-all duration-300 ',
        isSelected
          ? 'border-stone-900 shadow-lg ring-2 ring-fjord/20 '
          : 'border-border hover:border-stone-900/50 hover:shadow-xl  dark:hover:border-stone-600',
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

        {/* Trust badge — top left overlay */}
        <div className={cn(
          'absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold backdrop-blur-md',
          trust.badgeClass,
        )}>
          <TrustIcon className="size-3.5 shrink-0" />
          <span>{trust.label}</span>
          <span className="ml-0.5 font-bold opacity-70">{property.trustScore}</span>
        </div>

        {/* Heart — top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            'absolute top-3 right-3 flex size-8 items-center justify-center border border-white/20 backdrop-blur-md transition-all',
            isWishlisted
              ? 'bg-ink text-white shadow-md dark:bg-surface '
              : 'bg-black/40 text-white hover:bg-black/60',
          )}
          title="Save to shortlist"
        >
          <Heart className={cn('size-3.5', isWishlisted && 'fill-current')} />
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Community · Developer */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-ink uppercase dark:text-stone-100">
            {property.community}
          </span>
          <span className="size-1 shrink-0 bg-stone-400 " />
          <span className="truncate text-xs font-medium text-stone-500 uppercase dark:text-stone-400">
            {property.developer}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1 font-display text-lg leading-snug font-bold text-ink transition-colors group-hover:text-ink dark:text-stone-50">
          {property.title}
        </h3>

        {/* Price */}
        <p className="mb-4 text-xl font-bold text-ink dark:text-stone-100">
          AED {property.price?.toLocaleString() ?? '-'}
        </p>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-3.5 shrink-0" />
            <span className="font-semibold text-ink dark:text-stone-200">
              {property.beds === 0 ? 'Studio' : property.beds}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-3.5 shrink-0" />
            <span className="font-semibold text-ink dark:text-stone-200">
              {property.baths}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="size-3.5 shrink-0" />
            <span className="font-semibold text-ink dark:text-stone-200">
              {property.sqft?.toLocaleString() ?? '-'}{' '}
              <span className="font-normal text-stone-500 dark:text-stone-400">sqft</span>
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-border " />

        {/* Yield + Action */}
        <div className="mt-auto flex items-center justify-between">
          {/* Yield badge */}
          <div className="flex items-center gap-1.5 border border-stone-900/20 bg-stone-100 px-3 py-1.5 text-xs font-bold text-ink   dark:text-stone-100">
            <TrendingUp className="size-3.5 text-fjord" />
            <span>{property.roi}% Yield</span>
          </div>

          {/* Action link */}
          <Link
            href={`/${locale}/property/${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 transition-all hover:text-ink dark:text-stone-400 dark:hover:text-stone-100"
          >
            <span>Trust Passport</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
