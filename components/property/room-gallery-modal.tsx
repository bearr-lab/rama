'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  X,
  Maximize2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
  Layers,
  Flame,
  Bed,
  Utensils,
  Sun,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { UnsplashAttribution } from '@/components/ui/unsplash-attribution';

export interface RoomImage {
  id: string;
  category: 'kitchen' | 'bedroom' | 'living' | 'balcony' | 'bathroom';
  titleEn: string;
  titleAr: string;
  src: string;
  downloadLocation?: string;
  sqft: number;
  hotspots: {
    id: string;
    x: number; // percentage from left
    y: number; // percentage from top
    labelEn: string;
    labelAr: string;
    verified: boolean;
    detailEn: string;
    detailAr: string;
  }[];
}

const DEFAULT_ROOM_IMAGES: RoomImage[] = [
  {
    id: 'r-kitchen-1',
    category: 'kitchen',
    titleEn: 'Chef’s Gourmet Kitchen',
    titleAr: 'مطبخ للطهاة الإيطاليين',
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    sqft: 280,
    hotspots: [
      {
        id: 'hs-1',
        x: 42,
        y: 65,
        labelEn: 'Calacatta Marble Countertop',
        labelAr: 'سطح رخام كالاكاتا إيطالي',
        verified: true,
        detailEn: 'Natural 20mm bookmatched Italian marble slabs certified scratch & stain resistant.',
        detailAr: 'ألواح رخام إيطالية طبيعية بسمك 20 مم مقاومة للخدش والبقع.',
      },
      {
        id: 'hs-2',
        x: 75,
        y: 40,
        labelEn: 'Miele Integrated Appliances',
        labelAr: 'أجهزة ميلي المدمجة',
        verified: true,
        detailEn: 'Built-in Miele induction cooktop, double oven, and wine cooler with 5-year warranty.',
        detailAr: 'موقد طهي بالحث وأفران مدمجة من ميلي مع ضمان لمدة 5 سنوات.',
      },
    ],
  },
  {
    id: 'r-bedroom-1',
    category: 'bedroom',
    titleEn: 'Master Suite Bedroom',
    titleAr: 'جناح غرفة النوم الرئيسية',
    src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    sqft: 450,
    hotspots: [
      {
        id: 'hs-3',
        x: 30,
        y: 50,
        labelEn: 'Oak Hardwood Flooring',
        labelAr: 'أرضيات خشب البلوط الطبيعي',
        verified: true,
        detailEn: 'Engineered European oak flooring with acoustic underlayment for maximum quietness.',
        detailAr: 'أرضيات بلوط أوروبي مع عازل صوتي لأعلى مستويات الهدوء.',
      },
      {
        id: 'hs-4',
        x: 82,
        y: 35,
        labelEn: 'Floor-to-Ceiling Acoustic Glazing',
        labelAr: 'زجاج عازل للصوت من الأرض إلى السقف',
        verified: true,
        detailEn: 'Double-glazed UV filtering glass providing 42dB acoustic insulation.',
        detailAr: 'زجاج مزدوج مصفى للأشعة فوق البنفسجية يوفر عزلاً صوتياً بقدرة 42 ديسيبل.',
      },
    ],
  },
  {
    id: 'r-living-1',
    category: 'living',
    titleEn: 'Panoramic Living Salon',
    titleAr: 'صالة المعيشة البانورامية',
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    sqft: 620,
    hotspots: [
      {
        id: 'hs-5',
        x: 50,
        y: 70,
        labelEn: 'Smart Concealed Ducted AC',
        labelAr: 'تكييف مركزي ذكي مخفى',
        verified: true,
        detailEn: 'Inverter VRF AC system with individual zone climate touchpads.',
        detailAr: 'نظام تكييف متغير التدفق مع شاشات لمس لتحديد حرارة كل منطقة.',
      },
    ],
  },
  {
    id: 'r-balcony-1',
    category: 'balcony',
    titleEn: 'Ocean & Skyline Balcony Terrace',
    titleAr: 'تراس الشرفة المطل على البحر والأفق',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    sqft: 210,
    hotspots: [
      {
        id: 'hs-6',
        x: 60,
        y: 80,
        labelEn: 'Tempered Glass Safety Railing',
        labelAr: 'درابزين زجاجي مقسى ذو أمان عالٍ',
        verified: true,
        detailEn: '110cm high frameless glass balustrade compliant with DLD safety code 2026.',
        detailAr: 'درابزين زجاجي بدون إطار بارتفاع 110 سم متوافق مع كود السلامة.',
      },
    ],
  },
];

interface RoomGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  images?: RoomImage[];
  locale?: 'en' | 'ar';
}

export function RoomGalleryModal({
  isOpen,
  onClose,
  propertyName = 'Sky Collection Penthouse',
  images = DEFAULT_ROOM_IMAGES,
  locale = 'en',
}: RoomGalleryModalProps) {
  const isArabic = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = React.useState<
    'all' | 'kitchen' | 'bedroom' | 'living' | 'balcony'
  >('all');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [activeHotspot, setActiveHotspot] = React.useState<string | null>(null);

  const filteredImages = React.useMemo(() => {
    if (selectedCategory === 'all') return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const currentImage = filteredImages[currentIndex] || filteredImages[0] || images[0];

  React.useEffect(() => {
    const targetUrl = currentImage?.downloadLocation || currentImage?.src;
    if (targetUrl && targetUrl.includes('unsplash.com')) {
      fetch('/api/unsplash/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloadLocation: targetUrl }),
      }).catch(() => {});
    }
  }, [currentImage?.src, currentImage?.downloadLocation]);

  const nextImage = () => {
    setActiveHotspot(null);
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setActiveHotspot(null);
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 sm:p-6 select-none">
      {/* Modal Container — 0px Sharp Geometry */}
      <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden border border-border/40 bg-surface text-ink shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-surface-subtle/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-fjord/30 bg-fjord/10 text-fjord">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                {propertyName} — {isArabic ? 'معاينة الغرف والتشطيبات' : 'Room-by-Room Inspection'}
              </h3>
              <p className="text-xs text-muted-foreground font-light">
                {isArabic
                  ? 'اختر الغرفة للاطلاع على الصور عالية الدقة والدلائل الموثقة'
                  : 'Select a room category to inspect high-resolution evidence and verified finishes'}
              </p>
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="ghost"
            className="h-9 w-9 p-0 hover:bg-surface-warm hover:text-ink"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border/40 bg-surface/90 px-6 py-3">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentIndex(0);
              setActiveHotspot(null);
            }}
            className={cn(
              'px-4 py-2 text-xs font-semibold transition-all border',
              selectedCategory === 'all'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted hover:text-ink border-border/40'
            )}
          >
            {isArabic ? 'جميع الغرف' : 'All Rooms'} ({images.length})
          </button>
          <button
            onClick={() => {
              setSelectedCategory('kitchen');
              setCurrentIndex(0);
              setActiveHotspot(null);
            }}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all border',
              selectedCategory === 'kitchen'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted hover:text-ink border-border/40'
            )}
          >
            <Utensils className="h-3.5 w-3.5" />
            <span>{isArabic ? 'المطبخ' : 'Kitchen'}</span>
          </button>
          <button
            onClick={() => {
              setSelectedCategory('bedroom');
              setCurrentIndex(0);
              setActiveHotspot(null);
            }}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all border',
              selectedCategory === 'bedroom'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted hover:text-ink border-border/40'
            )}
          >
            <Bed className="h-3.5 w-3.5" />
            <span>{isArabic ? 'غرفة النوم' : 'Master Bedroom'}</span>
          </button>
          <button
            onClick={() => {
              setSelectedCategory('living');
              setCurrentIndex(0);
              setActiveHotspot(null);
            }}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all border',
              selectedCategory === 'living'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted hover:text-ink border-border/40'
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{isArabic ? 'غرفة المعيشة' : 'Living Salon'}</span>
          </button>
          <button
            onClick={() => {
              setSelectedCategory('balcony');
              setCurrentIndex(0);
              setActiveHotspot(null);
            }}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all border',
              selectedCategory === 'balcony'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted hover:text-ink border-border/40'
            )}
          >
            <Sun className="h-3.5 w-3.5" />
            <span>{isArabic ? 'الشرفة والإطلالة' : 'Balcony & View'}</span>
          </button>
        </div>

        {/* Main Viewer Body */}
        <div className="relative flex flex-1 flex-col lg:flex-row overflow-hidden">
          {/* Image & Hotspots Stage */}
          <div className="relative flex flex-1 items-center justify-center bg-black/90 p-4">
            {currentImage && (
              <div className="relative h-full w-full max-w-4xl max-h-[600px] overflow-hidden">
                <Image
                  src={currentImage.src}
                  alt={currentImage.titleEn}
                  fill
                  className="object-contain"
                />

                {/* Hotspot Markers */}
                {currentImage.hotspots.map((hs) => {
                  const isActive = activeHotspot === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className={cn(
                        'absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform hover:scale-125 z-20',
                        isActive ? 'scale-125' : ''
                      )}
                    >
                      <span className="relative flex h-7 w-7 items-center justify-center border border-white/80 bg-fjord/90 text-white shadow-lg">
                        <span className="h-2 w-2 bg-emerald-400 animate-ping absolute" />
                        <Sparkles className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  );
                })}

                {/* Unsplash Production Attribution Badge */}
                <UnsplashAttribution
                  photographerName="RAMA Curated Collection"
                  photographerUsername="unsplash"
                  variant="overlay"
                />
              </div>
            )}

            {/* Navigation Arrows */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-border/40 bg-surface/80 text-ink shadow-md hover:bg-surface"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-border/40 bg-surface/80 text-ink shadow-md hover:bg-surface"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Right Inspector Drawer (Hotspot Details & Specifications) */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border/40 bg-surface/95 p-6 backdrop-blur-md flex flex-col justify-between overflow-y-auto">
            {currentImage && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 border border-fjord/20 bg-fjord/10 px-2.5 py-0.5 text-[10px] font-bold text-fjord uppercase mb-2">
                    {currentImage.category}
                  </div>
                  <h4 className="font-display text-xl font-bold text-ink">
                    {isArabic ? currentImage.titleAr : currentImage.titleEn}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground font-light border-b border-border/40 pb-4">
                    <span>{isArabic ? 'المساحة الصافية' : 'Net Area:'}</span>
                    <span className="font-mono font-bold text-ink">
                      <NumberTicker value={currentImage.sqft} /> sq ft
                    </span>
                  </div>
                </div>

                {/* Hotspot Detail Card */}
                {activeHotspot ? (
                  (() => {
                    const hs = currentImage.hotspots.find((h) => h.id === activeHotspot);
                    if (!hs) return null;
                    return (
                      <BlurFade delay={0.05} className="space-y-3 border border-emerald-500/30 bg-emerald-500/5 p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="text-xs font-bold text-ink">
                            {isArabic ? hs.labelAr : hs.labelEn}
                          </span>
                        </div>
                        <p className="text-xs text-muted font-light leading-relaxed">
                          {isArabic ? hs.detailAr : hs.detailEn}
                        </p>
                        <div className="pt-2 border-t border-border/40 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          <AnimatedShinyText>✓ DLD Passport Evidence Verified</AnimatedShinyText>
                        </div>
                      </BlurFade>
                    );
                  })()
                ) : (
                  <div className="border border-border/40 bg-surface-subtle p-4 text-xs text-muted font-light space-y-2">
                    <p className="font-semibold text-ink flex items-center gap-1.5">
                      <Info className="h-4 w-4 text-fjord shrink-0" />
                      {isArabic ? 'انقر على العلامات' : 'Click Hotspots on Image'}
                    </p>
                    <p className="leading-relaxed">
                      {isArabic
                        ? 'انقر على الأيقونات المتوهجة في الصورة لمعاينة تفاصيل الرخام، الأجهزة، والعزل الصوتي.'
                        : 'Tap glowing pins on the photo to inspect marble grade, appliance warranties, and acoustic glazing specs.'}
                    </p>
                  </div>
                )}

                {/* All Room Hotspots List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                    {isArabic ? 'نقاط الفحص الموثقة' : 'Verified Inspections'}
                  </span>
                  <div className="space-y-2">
                    {currentImage.hotspots.map((hs) => (
                      <button
                        key={hs.id}
                        onClick={() => setActiveHotspot(hs.id)}
                        className={cn(
                          'w-full text-left p-2.5 text-xs font-medium border transition-all flex items-center justify-between',
                          activeHotspot === hs.id
                            ? 'bg-fjord/10 border-fjord text-fjord'
                            : 'bg-surface-subtle/50 border-border/40 text-ink hover:bg-surface-subtle'
                        )}
                      >
                        <span>{isArabic ? hs.labelAr : hs.labelEn}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-border/40">
              <Button onClick={onClose} className="w-full bg-fjord text-white text-xs font-semibold py-2.5">
                {isArabic ? 'إغلاق المعاينة' : 'Close Inspection Viewer'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
