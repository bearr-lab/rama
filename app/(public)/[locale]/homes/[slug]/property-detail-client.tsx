'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  Building2,
  Eye,
  CheckCircle2,
  Sparkles,
  Utensils,
  Bed,
  Layers,
  Sun,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Property } from '@/types/property';
import { PriceTag } from '@/components/property/price-tag';
import { TrustBadge } from '@/components/property/trust-badge';
import { ShareButton } from '@/components/property/share-button';
import { RoomGalleryModal, RoomImage } from '@/components/property/room-gallery-modal';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { BlurFade } from '@/components/magicui/blur-fade';
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
  const [selectedCategory, setSelectedCategory] = React.useState<
    'all' | 'kitchen' | 'bedroom' | 'living' | 'balcony'
  >('all');

  // Categorized room photos generator
  const roomPhotos: RoomImage[] = React.useMemo(() => {
    return [
      {
        id: `${property.id}-kitchen`,
        category: 'kitchen',
        titleEn: 'Italian Gourmet Kitchen',
        titleAr: 'مطبخ إيطالي فاخر',
        src: property.images[0] || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80',
        sqft: 320,
        hotspots: [
          {
            id: 'h-kit-1',
            x: 45,
            y: 60,
            labelEn: 'Calacatta Marble Island',
            labelAr: 'جزيرة رخام كالاكاتا',
            verified: true,
            detailEn: 'Bookmatched 20mm Italian marble island with waterfall edges.',
            detailAr: 'جزيرة رخام إيطالي طبيعي بسمك 20 مم.',
          },
          {
            id: 'h-kit-2',
            x: 75,
            y: 40,
            labelEn: 'Integrated Miele Suite',
            labelAr: 'أجهزة ميلي المدمجة',
            verified: true,
            detailEn: 'Built-in induction cooktop, double oven, and wine cellar.',
            detailAr: 'موقد حث مدمج وأفران وحافظة نبيذ.',
          },
        ],
      },
      {
        id: `${property.id}-bedroom`,
        category: 'bedroom',
        titleEn: 'Master Suite Bedroom',
        titleAr: 'جناح غرفة النوم الرئيسية',
        src: property.images[1] || 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
        sqft: 480,
        hotspots: [
          {
            id: 'h-bed-1',
            x: 35,
            y: 55,
            labelEn: 'European Oak Parquet',
            labelAr: 'باركيه خشب البلوط الأوروبي',
            verified: true,
            detailEn: 'Herringbone European oak flooring with sound dampening layer.',
            detailAr: 'أرضيات خشب بلوط أوروبي مع طبقة عزل صوتي.',
          },
        ],
      },
      {
        id: `${property.id}-living`,
        category: 'living',
        titleEn: 'Panoramic Living Salon',
        titleAr: 'صالة المعيشة البانورامية',
        src: property.images[2] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
        sqft: 650,
        hotspots: [
          {
            id: 'h-liv-1',
            x: 50,
            y: 50,
            labelEn: 'Concealed VRF Climate Control',
            labelAr: 'تكييف مركزي ذكي مخفى',
            verified: true,
            detailEn: 'Multi-zone VRF AC system connected to smart home automation.',
            detailAr: 'نظام تكييف ذكي متعدد المناطق متصل بالنظام المنزلي.',
          },
        ],
      },
      {
        id: `${property.id}-balcony`,
        category: 'balcony',
        titleEn: 'Ocean & Skyline Terrace',
        titleAr: 'تراس بتصاميم بانورامية',
        src: property.images[3] || property.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
        sqft: 240,
        hotspots: [
          {
            id: 'h-bal-1',
            x: 60,
            y: 75,
            labelEn: 'Frameless Glass Balustrade',
            labelAr: 'درابزين زجاجي بدون إطار',
            verified: true,
            detailEn: 'Safety-certified 110cm toughened glass railing compliant with DLD code.',
            detailAr: 'درابزين زجاجي مقسى متوافق مع كود السلامة.',
          },
        ],
      },
    ];
  }, [property]);

  return (
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
              <Button
                onClick={() => setIsGalleryOpen(true)}
                className="bg-fjord text-white text-xs font-semibold px-4 py-2 flex items-center gap-1.5"
              >
                <Eye className="h-4 w-4" />
                <span>{isArabic ? 'معاينة الغرف' : 'Room-by-Room Inspection'}</span>
              </Button>
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

            <div className="absolute bottom-6 left-6 z-20">
              <Button
                onClick={() => setIsGalleryOpen(true)}
                className="bg-fjord/90 text-white backdrop-blur-md text-xs font-bold px-5 py-3 border border-white/20 shadow-lg flex items-center gap-2 hover:bg-fjord transition-all"
              >
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>{isArabic ? 'تصفح الصور التفاعلية للغرف' : 'Launch Interactive Room Gallery'}</span>
              </Button>
            </div>
          </div>

          {/* Right Column Thumbnails */}
          <div className="hidden h-full flex-col gap-4 md:flex p-2 bg-surface-subtle/50">
            {roomPhotos.slice(0, 3).map((room, idx) => (
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
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/60 px-3 py-1 border border-white/30">
                    {room.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
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

            {/* Room-by-Room Photo Categories Breakdown */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {isArabic ? 'معاينة ألبوم الصور حسب الغرفة' : 'Room Photo Categories'}
                </h3>
                <span className="text-xs text-fjord font-bold uppercase tracking-wider">
                  4 Verified Rooms
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="p-4 border border-border/40 bg-surface/70 hover:border-fjord hover:bg-surface transition-all text-left space-y-2 group"
                >
                  <Utensils className="h-5 w-5 text-fjord group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-ink">{isArabic ? 'المطبخ الإيطالي' : 'Gourmet Kitchen'}</p>
                  <p className="text-[11px] text-muted-foreground font-light">Calacatta Marble & Miele</p>
                </button>

                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="p-4 border border-border/40 bg-surface/70 hover:border-fjord hover:bg-surface transition-all text-left space-y-2 group"
                >
                  <Bed className="h-5 w-5 text-fjord group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-ink">{isArabic ? 'غرفة النوم الرئيسية' : 'Master Suite'}</p>
                  <p className="text-[11px] text-muted-foreground font-light">European Oak & Glazing</p>
                </button>

                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="p-4 border border-border/40 bg-surface/70 hover:border-fjord hover:bg-surface transition-all text-left space-y-2 group"
                >
                  <Layers className="h-5 w-5 text-fjord group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-ink">{isArabic ? 'صالة المعيشة' : 'Living Salon'}</p>
                  <p className="text-[11px] text-muted-foreground font-light">VRF Climate & High Ceiling</p>
                </button>

                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="p-4 border border-border/40 bg-surface/70 hover:border-fjord hover:bg-surface transition-all text-left space-y-2 group"
                >
                  <Sun className="h-5 w-5 text-fjord group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-ink">{isArabic ? 'الشرفة والتراس' : 'Skyline Terrace'}</p>
                  <p className="text-[11px] text-muted-foreground font-light">DLD Safety Balustrade</p>
                </button>
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
  );
}
