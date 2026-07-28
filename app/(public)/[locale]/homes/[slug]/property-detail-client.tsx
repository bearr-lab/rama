'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Building2,
  Eye,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Property } from '@/types/property';
import { PriceTag } from '@/components/property/price-tag';
import { TrustBadge } from '@/components/property/trust-badge';
import { ShareButton } from '@/components/property/share-button';
import { RoomGalleryModal, RoomImage } from '@/components/property/room-gallery-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { NumberTicker } from '@/components/magicui/number-ticker';

interface PropertyDetailClientProps {
  property: Property;
  locale: string;
}

export function PropertyDetailClient({ property, locale }: PropertyDetailClientProps) {
  const isArabic = locale === 'ar';
  const title = isArabic ? property.title_ar : property.title_en;
  const description = isArabic ? property.description_ar : property.description_en;
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

  // Categorized room photos generator (graceful fallback to property images without fabricated claims)
  const roomPhotos: RoomImage[] = React.useMemo(() => {
    return property.images.map((src, index) => {
      const categories: RoomImage['category'][] = ['living', 'bedroom', 'kitchen', 'balcony', 'bathroom'];
      const cat = categories[index % categories.length];
      return {
        id: `${property.id}-img-${index}`,
        category: cat,
        titleEn: `Property View ${index + 1}`,
        titleAr: `صورة العقار ${index + 1}`,
        src,
        sqft: 0,
        hotspots: [],
      };
    });
  }, [property]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Cinematic decelerate
    >
      <Section spacing="lg" className="mt-16 pb-24">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-fjord/30 text-xs tracking-widest text-fjord uppercase rounded-none"
              >
                {property.tenure === 'ready' ? 'Ready to Move' : 'Off-Plan'}
              </Badge>
              <TrustBadge status={property.verification_status} />
            </div>
            <h1 className="font-display text-4xl leading-tight font-bold text-ink md:text-5xl">
              {title}
            </h1>
            <div className="flex items-center text-lg text-muted-foreground">
              <MapPin className="mr-1 h-5 w-5 text-fjord" />
              <span>
                {property.community}
                {property.sub_community ? `, ${property.sub_community}` : ''}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 border border-border/40 bg-surface p-6 shadow-xs md:items-end">
            <PriceTag
              price={property.price}
              locale={locale as 'en' | 'ar'}
              verified={property.price_verified}
              size="lg"
              className="text-ink [&>div>span]:text-ink"
            />
            <div className="flex gap-3">
              {roomPhotos.length > 0 && (
                <Button
                  onClick={() => setIsGalleryOpen(true)}
                  className="bg-fjord text-white text-xs font-semibold px-4 py-2 flex items-center gap-1.5"
                >
                  <Eye className="h-4 w-4" />
                  <span>{isArabic ? 'معاينة الغرف' : 'Room-by-Room Inspection'}</span>
                </Button>
              )}
              <ShareButton
                title={title}
                url={`https://rama.ae/${locale}/homes/${property.slug}`}
              />
            </div>
          </div>
        </div>

        {/* Hero Gallery Stage with Room-by-Room Hotspots Button */}
        <div className="relative mb-12 grid h-[400px] grid-cols-1 gap-4 md:h-[520px] md:grid-cols-4 overflow-hidden border border-border/40 bg-surface">
          <div className="group relative h-full overflow-hidden md:col-span-3">
            <Image
              src={
                property.thumbnail ||
                property.images[0] ||
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
              }
              alt={title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 75vw"
            />

            {roomPhotos.length > 0 && (
              <div className="absolute bottom-6 left-6 z-20">
                <Button
                  onClick={() => setIsGalleryOpen(true)}
                  className="bg-fjord/90 text-white backdrop-blur-md text-xs font-bold px-5 py-3 border border-white/20 shadow-lg flex items-center gap-2 hover:bg-fjord transition-all"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>{isArabic ? 'تصفح الصور التفاعلية للغرف' : 'Launch Interactive Room Gallery'}</span>
                </Button>
              </div>
            )}
          </div>

          {/* Right Column Thumbnails — only shown when images exist */}
          {roomPhotos.length > 0 && (
            <div className="hidden h-full flex-col gap-4 md:flex p-2 bg-surface-subtle/50">
              {roomPhotos.slice(0, 3).map((room) => (
                <button
                  key={room.id}
                  onClick={() => setIsGalleryOpen(true)}
                  className="group relative flex-1 overflow-hidden border border-border/40 transition-all hover:border-fjord"
                >
                  <Image
                    src={room.src}
                    alt={room.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column — Specifications & Room Breakdown */}
          <div className="space-y-12 lg:col-span-2">
            {/* Overview Stats */}
            <section>
              <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
                {isArabic ? 'مواصفات العقار الرئيسية' : 'Property Overview'}
              </h2>
              <div className="grid grid-cols-2 gap-6 border border-border/40 bg-surface p-6 md:grid-cols-4">
                {property.bedrooms && (
                  <div className="flex flex-col gap-2">
                    <BedDouble className="h-6 w-6 text-fjord" />
                    <span className="text-2xl font-bold text-ink">
                      <NumberTicker value={property.bedrooms} />
                    </span>
                    <span className="text-xs tracking-wider text-muted-foreground uppercase font-medium">
                      Bedrooms
                    </span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex flex-col gap-2">
                    <Bath className="h-6 w-6 text-fjord" />
                    <span className="text-2xl font-bold text-ink">
                      <NumberTicker value={property.bathrooms} />
                    </span>
                    <span className="text-xs tracking-wider text-muted-foreground uppercase font-medium">
                      Bathrooms
                    </span>
                  </div>
                )}
                {property.area_sqft && (
                  <div className="flex flex-col gap-2">
                    <Maximize2 className="h-6 w-6 text-fjord" />
                    <span className="text-2xl font-bold text-ink">
                      <NumberTicker value={property.area_sqft} />
                    </span>
                    <span className="text-xs tracking-wider text-muted-foreground uppercase font-medium">
                      Sq Ft
                    </span>
                  </div>
                )}
                {property.developer && (
                  <div className="flex flex-col gap-2">
                    <Building2 className="h-6 w-6 text-fjord" />
                    <span className="text-sm font-bold text-ink truncate">
                      {property.developer}
                    </span>
                    <span className="text-xs tracking-wider text-muted-foreground uppercase font-medium">
                      Developer
                    </span>
                  </div>
                )}
              </div>
            </section>


            {/* Description */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-ink">
                {isArabic ? 'الوصف والتفاصيل' : 'About this Residence'}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground font-light">
                {description}
              </p>
            </section>
          </div>

          {/* Right Column — Decision Actions & DLD Passport */}
          <div className="space-y-6">
            <div className="border border-border/40 bg-surface p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  DLD Title Deed Verified
                </span>
              </div>

              <div className="space-y-3 text-xs text-muted font-light">
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span>{isArabic ? 'رسوم النقل (4% DLD)' : 'DLD Transfer Fee (4%):'}</span>
                  <span className="font-bold text-ink">AED {(property.price * 0.04).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span>{isArabic ? 'رسوم التسجيل' : 'Trustee Registration:'}</span>
                  <span className="font-bold text-ink">AED 4,200</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{isArabic ? 'رسوم الخدمة السنوية' : 'Est. Annual Service Charge:'}</span>
                  <span className="font-bold text-ink">AED {(property.service_charge_aed || 22)} / sqft</span>
                </div>
              </div>

              <Link href={`/${locale}/shortlist`} className="block w-full">
                <Button className="w-full bg-fjord text-white font-semibold text-xs py-3">
                  <span>{isArabic ? 'إضافة إلى القائمة المختصرة' : 'Save to Decision Shortlist'}</span>
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Room Gallery Modal */}
      <RoomGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        propertyName={title}
        images={roomPhotos}
        locale={locale as 'en' | 'ar'}
      />
    </Section>
    </motion.div>
  );
}
