'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, BedDouble, Bath, Maximize2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CardContent } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Property } from '@/types/property';
import { TrustBadge } from './trust-badge';
import { PriceTag } from './price-tag';

interface PropertyCardProps {
  property: Property;
  variant?: 'vertical' | 'editorial';
  isSaved?: boolean;
  onSave?: (id: string) => void;
  locale?: 'en' | 'ar';
}

export function PropertyCard({
  property,
  variant = 'vertical',
  isSaved = false,
  onSave,
  locale = 'en',
}: PropertyCardProps) {
  const isEditorial = variant === 'editorial';
  const title = locale === 'ar' ? property.title_ar : property.title_en;

  // Formatter for AED
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <MagicCard
      className={cn(
        'group ease-decelerate hover:shadow-floating relative overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1',
        isEditorial
          ? 'flex h-auto flex-col md:h-100 md:flex-row'
          : 'flex h-full flex-col',
      )}
      gradientColor="var(--fjord)"
      gradientOpacity={0.1}
    >
      {/* Image Container */}
      <div
        className={cn(
          'relative overflow-hidden bg-surface-subtle',
          isEditorial
            ? 'h-75 w-full md:h-full md:w-[60%]'
            : 'aspect-[4/3] w-full',
        )}
      >
        <Image
          src={
            property.thumbnail ||
            property.images[0] ||
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
          }
          alt={title}
          fill
          className="group-hover:scale-1.03 object-cover transition-transform duration-500 ease-out"
          sizes={
            isEditorial
              ? '(max-width: 768px) 100vw, 60vw'
              : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
        />

        {/* Top Badges */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {property.is_featured && (
              <Badge className="border border-border/40 bg-surface/90 font-semibold text-ink shadow-2xs backdrop-blur-md hover:bg-surface">
                Featured
              </Badge>
            )}
            <TrustBadge status={property.verification_status} variant="solid" />
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="relative z-20 size-9 rounded-full border border-white/20 bg-black/40 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60"
            onClick={(e) => {
              e.preventDefault();
              if (onSave) onSave(property.id);
            }}
          >
            <Heart
              className={cn(
                'size-4 transition-transform',
                isSaved ? 'scale-110 fill-risk text-risk' : 'text-white',
              )}
            />
          </Button>
        </div>

        {/* Price Tag (Floating) */}
        <div className="absolute bottom-4 left-4">
          <PriceTag
            price={property.price}
            locale={locale}
            verified={property.price_verified}
          />
        </div>
      </div>

      {/* Content */}
      <CardContent
        className={cn(
          'flex flex-col justify-between p-6',
          isEditorial ? 'w-full md:w-[40%]' : 'flex-1',
        )}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="line-clamp-2 font-display text-xl leading-tight font-semibold text-ink">
              <Link
                href={`/${locale}/homes/${property.slug}`}
                className="before:absolute before:inset-0 before:z-10"
              >
                {title}
              </Link>
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 size-3.5" />
              <span>
                {property.community}
                {property.sub_community ? `, ${property.sub_community}` : ''}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-border pt-2 text-sm text-ink/80">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="size-4 text-muted-foreground" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="size-4 text-muted-foreground" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area_sqft && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="size-4 text-muted-foreground" />
                <span>{property.area_sqft.toLocaleString()} sqft</span>
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none relative z-20 mt-auto pt-6">
          <Button className="rounded-button pointer-events-none w-full bg-fjord text-white hover:bg-fjord-hover">
            {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          </Button>
        </div>
      </CardContent>
    </MagicCard>
  );
}
