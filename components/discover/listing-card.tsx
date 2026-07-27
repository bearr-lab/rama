'use client';

import * as React from 'react';
import Link from 'next/link';
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
      'text-verified border border-verified/40 bg-verified-soft/90 backdrop-blur-md shadow-2xs',
  },
  review: {
    label: 'In Review',
    icon: Clock,
    badgeClass:
      'text-review border border-review/40 bg-review-soft/90 backdrop-blur-md shadow-2xs',
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
        'property-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-300',
        isSelected
          ? 'border-fjord ring-2 ring-fjord/20 shadow-lg'
          : 'border-border/80 hover:border-fjord/40 hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
      onClick={() => onSelect?.(property)}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Status badge — top left */}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm',
              trust.badgeClass,
            )}
          >
            <TrustIcon className="h-3 w-3" />
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
            'absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-all',
            isWishlisted
              ? 'bg-fjord text-white shadow-md'
              : 'bg-black/40 text-white hover:scale-105 hover:bg-black/60',
          )}
          title="Save to shortlist"
        >
          <Heart
            className={cn('h-4 w-4', isWishlisted && 'fill-current')}
          />
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Community / sub-label */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-fjord">
            {property.community}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted">
            {property.developer}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-fjord">
          {property.title}
        </h3>

        {/* Price */}
        <p className="mb-4 text-2xl font-bold text-ink">
          AED {property.price.toLocaleString()}
        </p>

        {/* Specs + yield */}
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-muted" />
              <span className="font-semibold text-ink">
                {property.beds === 0 ? 'Studio' : property.beds}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5 text-muted" />
              <span className="font-semibold text-ink">{property.baths}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-muted" />
              <span className="font-semibold text-ink">
                {property.sqft.toLocaleString()}{' '}
                <span className="font-light text-muted-foreground">sqft</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-verified/30 bg-verified-soft px-3 py-1 text-xs font-bold text-verified shadow-2xs">
            <TrendingUp className="h-3.5 w-3.5" />
            {property.roi}% Yield
          </div>
        </div>

        {/* Serene Lagom Action Strip on Hover (No Noisy Button Boxes) */}
        <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-3.5 text-xs font-semibold text-fjord">
          <Link
            href={`/${locale}/property/${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full items-center justify-between transition-colors group-hover:text-fjord-hover"
          >
            <span>Inspect Property Data &amp; Trust Passport</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
