'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BedDouble,
  Bath,
  Maximize2,
  Building2,
  Eye,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronDown,
  Share2,
  Heart,
  Compass,
  CalendarDays,
} from 'lucide-react';
import { Property } from '@/types/property';
import { ShareButton } from '@/components/property/share-button';
import { RoomGalleryModal, RoomImage } from '@/components/property/room-gallery-modal';
import { BookViewingModal } from '@/components/property/book-viewing-modal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { Container } from '@/components/layout/container';

interface PropertyDetailClientProps {
  property: Property;
  locale: string;
}

const CATEGORY_META: Record<string, { en: string; ar: string; icon: React.ReactNode }> = {
  all: {
    en: 'All',
    ar: 'الكل',
    icon: (
      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  kitchen: {
    en: 'Kitchen',
    ar: 'مطبخ',
    icon: <span className="size-3 rounded-full border border-current opacity-70" />,
  },
  bedroom: {
    en: 'Bedroom',
    ar: 'غرفة نوم',
    icon: <BedDouble className="size-3.5 opacity-70" />,
  },
  living: {
    en: 'Living',
    ar: 'معيشة',
    icon: <span className="size-1.5 rounded-full bg-current opacity-70" />,
  },
  balcony: {
    en: 'Balcony',
    ar: 'شرفة',
    icon: <span className="size-1.5 rounded-full bg-current opacity-70" />,
  },
  bathroom: {
    en: 'Bathroom',
    ar: 'حمام',
    icon: <Bath className="size-3.5 opacity-70" />,
  },
};

export function PropertyDetailClient({ property, locale }: PropertyDetailClientProps) {
  const isArabic = locale === 'ar';
  const router = useRouter();
  const title = isArabic ? property.title_ar : property.title_en;
  const description = isArabic ? property.description_ar : property.description_en;
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeRoomCategory, setActiveRoomCategory] = React.useState<RoomImage['category'] | 'all'>('all');

  const localeStr = isArabic ? 'ar-AE' : 'en-US';
  const formatPrice = React.useCallback((price: number) => {
    return new Intl.NumberFormat(localeStr).format(price);
  }, [localeStr]);

  const FALLBACK_HERO = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85';

  // Track scroll to show/hide the sticky top bar
  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Categorized room photos generator
  const roomPhotos: RoomImage[] = React.useMemo(() => {
    return property.images.map((src) => {
      // Find category from image metadata if available, else default to 'living'
      // Note: In a real app this metadata would be in property.images objects.
      // We will assign a random category from the valid options just to simulate metadata for now.
      const categories: RoomImage['category'][] = ['kitchen', 'bedroom', 'living', 'balcony', 'bathroom'];
      const hash = src.length;
      const cat = categories[hash % categories.length];
      return {
        id: src,
        src,
        category: cat,
        titleEn: `${cat} area view`,
        titleAr: `صورة ${cat}`,
        sqft: 0,
        hotspots: [],
      };
    });
  }, [property]);

  // Determine current hero image based on category selection
  const heroSrc = React.useMemo(() => {
    if (activeRoomCategory === 'all') {
      return property.thumbnail || property.images?.[0] || FALLBACK_HERO;
    }
    const catImage = roomPhotos.find((p) => p.category === activeRoomCategory);
    return catImage ? catImage.src : (property.thumbnail || property.images?.[0] || FALLBACK_HERO);
  }, [activeRoomCategory, property, roomPhotos]);

  // Derived financial metrics
  const pricePerSqft = property.area_sqft ? property.price / property.area_sqft : 0;
  const serviceChargeAnnual = (property.service_charge_aed || 0) * (property.area_sqft || 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Sticky back bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border/40 bg-background/90 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-ink"
              >
                <ChevronLeft className="size-4" />
                {isArabic ? 'العقارات' : 'All Homes'}
              </button>
              <span className="line-clamp-1 max-w-xs font-display text-sm font-semibold text-ink">
                {title}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-fjord">
                  AED {new Intl.NumberFormat('en-US').format(property.price)}
                </span>
                <ShareButton title={title} url={`https://rama.ae/${locale}/homes/${property.slug}`} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FULL-BLEED CINEMATIC HERO ─── */}
      <div className="relative h-[calc(100vh-64px)] min-h-125 w-full overflow-hidden bg-black">
        {/* Hero image with crossfade key */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSrc}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={heroSrc}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

        {/* Top-right: action cluster */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={() => toast.add({ title: isArabic ? 'أضيف للمفضلة' : 'Saved to favorites', type: 'success' })}
            aria-label={isArabic ? 'حفظ في المفضلة' : 'Save to favourites'}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all hover:bg-black/60"
          >
            <Heart className="size-4 text-white" />
          </button>
          <ShareButton 
            title={title || ''} 
            text={description || undefined} 
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all hover:bg-black/60"
          />
        </div>

        {/* ─── Left Side: Financial Metrics Card ─── */}
        <div className="absolute bottom-6 left-6 z-20 w-85 space-y-4">
          {/* Compass Floating Button */}
          <button 
            aria-label={isArabic ? 'استكشف المنطقة' : 'Explore Neighborhood'}
            onClick={() => setIsGalleryOpen(true)}
            className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md transition-transform hover:scale-105"
          >
            <Compass className="size-5 text-white" />
          </button>

          {/* Financial Card */}
          <div className="rounded-xl border border-white/10 bg-[#161616]/95 p-5 shadow-2xl backdrop-blur-xl">
            {/* Header / Price */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
                  {isArabic ? 'سعر الطلب' : 'ASKING PRICE'}
                </p>
                <p className="font-display text-3xl leading-none font-bold text-white">
                  AED {property.price >= 1_000_000
                    ? `${formatPrice(property.price / 1_000_000)}M`
                    : formatPrice(property.price)}
                </p>
              </div>
              <ChevronDown className="size-5 text-white/50" />
            </div>

            {/* Metrics Grid */}
            <div className="mb-6 grid grid-cols-2 gap-y-6">
              <div>
                <p className="mb-1 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                  {isArabic ? 'السعر / قدم²' : 'PRICE / SQFT'}
                </p>
                <p className="text-sm font-bold text-white">
                  AED {new Intl.NumberFormat(localeStr, { maximumFractionDigits: 0 }).format(pricePerSqft)}
                </p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                  {isArabic ? 'العائد الاستثماري' : 'CAP RATE'}
                </p>
                <p className="text-sm font-bold text-white">
                  {property.cap_rate_percentage ?? '—'}{property.cap_rate_percentage ? '%' : ''}
                </p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                  {isArabic ? 'الإيجار التقديري' : 'EST. RENTAL'}
                </p>
                <p className="text-sm font-bold text-white">
                  {property.est_annual_rental != null ? `${Math.round(property.est_annual_rental / 1000)}K/yr` : '—'}
                </p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                  {isArabic ? 'رسوم الخدمة' : 'SERVICE CHG'}
                </p>
                <p className="text-sm font-bold text-white">
                  {serviceChargeAnnual != null && serviceChargeAnnual > 0 ? `${(serviceChargeAnnual / 1000).toFixed(1)}K/yr` : '—'}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => setIsBookModalOpen(true)}
              className="hover:scale-1.02 w-full rounded-md bg-white py-6 text-sm font-bold text-black transition-transform"
            >
              <CalendarDays className="mr-2 size-4" />
              {isArabic ? 'حجز معاينة' : 'Book Viewing'}
            </Button>
          </div>
        </div>

        {/* ─── Bottom Center: Room Navigation Pill ─── */}
        <div className="absolute bottom-10 left-1/2 z-20 flex w-max max-w-[90vw] -translate-x-1/2 [scrollbar-width:none] items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl [&::-webkit-scrollbar]:hidden">
          {Array.from(new Set(['all', ...roomPhotos.map(p => p.category)])).map((category) => {
            const isActive = activeRoomCategory === category;
            const meta = CATEGORY_META[category] || { en: category, ar: category, icon: null };
            return (
              <button
                key={category}
                aria-pressed={isActive}
                onClick={() => setActiveRoomCategory(category as RoomImage['category'] | 'all')}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold whitespace-nowrap capitalize transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {meta.icon}
                {isArabic ? meta.ar : meta.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── BELOW-THE-FOLD CONTENT ─── */}
      <div className="bg-background">
        <Container size="lg" padding="lg" className="py-16">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href={`/${locale}`} className="transition-colors hover:text-ink">
              {isArabic ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/homes`} className="transition-colors hover:text-ink">
              {isArabic ? 'العقارات' : 'Homes'}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 max-w-50 font-medium text-ink">{title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* LEFT: specs + description */}
            <div className="space-y-12 lg:col-span-2">
              <div className="space-y-3">
                <h1 className="font-display text-4xl leading-tight font-bold text-ink md:text-5xl">
                  {title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {property.community}
                  {property.sub_community ? `, ${property.sub_community}` : ''}
                  {property.developer ? ` · ${isArabic ? 'المطور' : 'by'} ${property.developer}` : ''}
                </p>
              </div>

              <section>
                <h2 className="mb-5 text-[11px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                  {isArabic ? 'المواصفات الرئيسية' : 'Property Overview'}
                </h2>
                <div className="grid grid-cols-2 gap-px border border-border/40 bg-border/40 md:grid-cols-4">
                  {property.bedrooms != null && (
                    <div className="flex flex-col gap-2 bg-surface p-5">
                      <BedDouble className="size-5 text-fjord" />
                      <span className="text-2xl font-bold text-ink">
                        <NumberTicker value={property.bedrooms} />
                      </span>
                      <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {isArabic ? 'غرف' : 'Bedrooms'}
                      </span>
                    </div>
                  )}
                  {property.bathrooms != null && (
                    <div className="flex flex-col gap-2 bg-surface p-5">
                      <Bath className="size-5 text-fjord" />
                      <span className="text-2xl font-bold text-ink">
                        <NumberTicker value={property.bathrooms} />
                      </span>
                      <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {isArabic ? 'حمامات' : 'Bathrooms'}
                      </span>
                    </div>
                  )}
                  {property.area_sqft != null && (
                    <div className="flex flex-col gap-2 bg-surface p-5">
                      <Maximize2 className="size-5 text-fjord" />
                      <span className="text-2xl font-bold text-ink">
                        <NumberTicker value={property.area_sqft} />
                      </span>
                      <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {isArabic ? 'قدم مربع' : 'Sq Ft'}
                      </span>
                    </div>
                  )}
                  {property.developer && (
                    <div className="flex flex-col gap-2 bg-surface p-5">
                      <Building2 className="size-5 text-fjord" />
                      <span className="truncate text-sm font-bold text-ink">{property.developer}</span>
                      <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {isArabic ? 'المطور' : 'Developer'}
                      </span>
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-4 border-t border-border/40 pt-10">
                <h3 className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                  {isArabic ? 'عن هذه الوحدة' : 'About this Residence'}
                </h3>
                <p className="text-base leading-relaxed font-light text-muted-foreground">
                  {description}
                </p>
              </section>

              {(property.features?.length > 0 || property.amenities?.length > 0) && (
                <section className="space-y-4 border-t border-border/40 pt-10">
                  <h3 className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                    {isArabic ? 'المميزات والمرافق' : 'Features & Amenities'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[...(property.features || []), ...(property.amenities || [])].map((f, i) => (
                      <span
                        key={`${f}-${i}`}
                        className="border border-border/50 bg-surface px-3 py-1.5 text-xs font-medium text-ink"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT: Decision panel (DLD Passport + Gallery Launcher) */}
            <div className="space-y-4">
              <div className="space-y-4 border border-border/40 bg-surface p-6">
                {property.verification_status === 'verified' && (
                  <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                    <ShieldCheck className="size-5 text-emerald-500" />
                    <span className="text-[10px] font-bold tracking-wider text-ink uppercase">
                      {isArabic ? 'موثق من دائرة الأراضي' : 'DLD Title Deed Verified'}
                    </span>
                  </div>
                )}

                <div className="space-y-3 text-xs font-light text-muted-foreground">
                  <div className="flex justify-between border-b border-border/40 py-1">
                    <span>{isArabic ? 'رسوم النقل (4% DLD)' : 'DLD Transfer Fee (4%):'}</span>
                    <span className="font-bold text-ink">
                      AED {new Intl.NumberFormat('en-US').format(property.price * 0.04)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/40 py-1">
                    <span>{isArabic ? 'رسوم التسجيل' : 'Trustee Registration:'}</span>
                    <span className="font-bold text-ink">AED 4,200</span>
                  </div>
                  {property.service_charge_aed && (
                    <div className="flex justify-between border-b border-border/40 py-1">
                      <span>{isArabic ? 'رسوم الخدمة / قدم²' : 'Service Charge / sqft:'}</span>
                      <span className="font-bold text-ink">AED {property.service_charge_aed}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1">
                    <span>{isArabic ? 'العائد الاستثماري المتوقع' : 'Projected Cap Rate:'}</span>
                    <span className="font-bold text-emerald-600">{property.cap_rate_percentage || '6.8'}%</span>
                  </div>
                </div>

                <Button
                  onClick={() => setIsGalleryOpen(true)}
                  variant="outline"
                  className="w-full border-fjord py-3 text-xs font-bold tracking-widest text-fjord uppercase transition-colors hover:bg-fjord hover:text-white"
                >
                  <Eye className="mr-2 size-4" />
                  {isArabic ? 'معاينة جميع الغرف' : 'View Room Gallery'}
                </Button>

                <Link href={`/${locale}/shortlist`} className="block w-full">
                  <Button className="w-full bg-fjord py-3 text-xs font-bold tracking-widest text-white uppercase">
                    {isArabic ? 'أضف إلى القائمة المختصرة' : 'Save to Decision Shortlist'}
                    <ArrowRight className="ms-2 size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Modals */}
      <RoomGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        propertyName={title}
        images={roomPhotos}
        locale={locale as 'en' | 'ar'}
      />
      <BookViewingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        propertyName={title}
        locale={locale as 'en' | 'ar'}
      />
    </motion.div>
  );
}
