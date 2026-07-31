'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Bed,
  Utensils,
  Sun,
  Map,
  Compass,
  Heart,
  Share,
  Calendar,
  TrendingUp,
  MapPin,
  Info,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
    x: number;
    y: number;
    labelEn: string;
    labelAr: string;
    verified: boolean;
    detailEn: string;
    detailAr: string;
    brand?: string;
  }[];
}

const DEFAULT_INVESTMENT_DATA = {
  price: 4500000,
  yield: 7.2,
  pricePerSqft: 2150,
  capRate: 6.8,
  serviceCharges: 14500,
  estimatedRental: 324000,
};

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
        detailEn:
          'Natural 20mm bookmatched Italian marble slabs certified scratch & stain resistant.',
        detailAr: 'ألواح رخام إيطالية طبيعية بسمك 20 مم مقاومة للخدش والبقع.',
        brand: 'Antolini Italy',
      },
      {
        id: 'hs-2',
        x: 75,
        y: 40,
        labelEn: 'Integrated Appliances',
        labelAr: 'أجهزة ميلي المدمجة',
        verified: true,
        detailEn:
          'Built-in induction cooktop, double oven, and wine cooler with 5-year warranty.',
        detailAr: 'موقد طهي بالحث وأفران مدمجة من ميلي مع ضمان لمدة 5 سنوات.',
        brand: 'Miele',
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
        detailEn:
          'Engineered European oak flooring with acoustic underlayment for maximum quietness.',
        detailAr: 'أرضيات بلوط أوروبي مع عازل صوتي لأعلى مستويات الهدوء.',
        brand: 'Kährs',
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

  const [isChromeVisible, setIsChromeVisible] = React.useState(true);
  const [isMetricsExpanded, setIsMetricsExpanded] = React.useState(false);
  const [isFloorPlanMode, setIsFloorPlanMode] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const filteredImages = React.useMemo(() => {
    if (selectedCategory === 'all') return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const currentImage =
    filteredImages[currentIndex] || filteredImages[0] || images[0];

  React.useEffect(() => {
    if (!isOpen) return;
    const hasSeen = localStorage.getItem('rama_gallery_hint');
    if (!hasSeen) {
      setShowHint(true);
      const t = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('rama_gallery_hint', 'true');
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const previousFocus = document.activeElement as HTMLElement;

    if (containerRef.current) {
      containerRef.current.focus();
    }

    return () => {
      document.body.style.overflow = '';
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [isOpen, mounted]);

  React.useEffect(() => {
    if (!isOpen) return;
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setIsChromeVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!activeHotspot && !isMetricsExpanded) {
          setIsChromeVisible(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    handleMouseMove();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isOpen, activeHotspot, isMetricsExpanded]);

  const nextImage = React.useCallback(() => {
    setActiveHotspot(null);
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = React.useCallback(() => {
    setActiveHotspot(null);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length,
    );
  }, [filteredImages.length]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextImage, prevImage, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Room Gallery"
      tabIndex={-1}
      className="fixed inset-0 z-100 flex h-dvh w-screen flex-col overflow-hidden bg-black font-sans text-white outline-none select-none"
    >
      {/* Main Stage */}
      <div className="absolute inset-0 z-0">
        {isFloorPlanMode ? (
          <div className="flex size-full items-center justify-center bg-zinc-900">
            {/* Wireframe Placeholder for Floorplan */}
            <div className="relative flex aspect-video w-full max-w-3xl items-center justify-center overflow-hidden rounded-xl border-2 border-fjord/40 bg-zinc-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[24px_24px]"></div>
              <div className="absolute top-1/4 left-10 h-2/3 w-1/2 rounded-sm border border-fjord/50">
                <span className="absolute top-2 left-2 font-mono text-xs text-fjord">
                  LIVING
                </span>
              </div>
              <div className="absolute top-1/4 right-20 h-1/2 w-1/3 rounded-sm border border-fjord/50">
                <span className="absolute top-2 left-2 font-mono text-xs text-fjord">
                  BEDROOM
                </span>
              </div>
            </div>
          </div>
        ) : (
          currentImage && (
            <Image
              src={currentImage.src}
              alt={currentImage.titleEn}
              fill
              priority
              className="object-cover"
            />
          )
        )}
      </div>

      {/* Auto-Hiding UI Chrome wrapper */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ease-in-out',
          isChromeVisible || activeHotspot || isMetricsExpanded
            ? 'opacity-100'
            : 'opacity-0',
        )}
      >
        {/* Top Context Bar */}
        <div className="pointer-events-auto absolute inset-x-0 top-0 flex h-32 items-start justify-between bg-linear-to-b from-black/80 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                <MapPin className="size-3" />
                <span>{propertyName}</span>
                <ChevronRight className="size-3" />
                <span className="text-white">
                  {isArabic ? currentImage?.titleAr : currentImage?.titleEn}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
                  <TrendingUp className="size-3" />
                  {DEFAULT_INVESTMENT_DATA.yield}% Yield
                </span>
                <span className="text-xs text-white/50">|</span>
                <span className="text-xs text-white/80">
                  {currentImage?.sqft} sqft
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsFloorPlanMode(!isFloorPlanMode)}
              className="h-10 border border-white/10 bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
            >
              <Map className="mr-2 size-4" />
              {isFloorPlanMode ? 'View Photo' : 'Floor Plan'}
            </Button>

            <div className="flex rounded-md border border-white/10 bg-black/40 p-1 backdrop-blur-md">
              <button
                className="rounded p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                title="Save"
              >
                <Heart className="size-4" />
              </button>
              <button
                className="rounded p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                title="Share"
              >
                <Share className="size-4" />
              </button>
            </div>

            {/* Permanent Close Button moved inside the top bar flex row */}
            <Button
              onClick={onClose}
              variant="ghost"
              className="ml-4 size-12 rounded-full border border-white/20 bg-black/50 p-0 text-white shadow-2xl backdrop-blur-xl transition-transform hover:scale-105 hover:bg-black/80"
            >
              <X className="size-6" />
            </Button>
          </div>
        </div>

        {/* Spatial Tab Navigation (Bottom Center) */}
        <div className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 p-1.5 shadow-2xl backdrop-blur-xl">
            {[
              { id: 'all', labelEn: 'All', icon: Layers },
              { id: 'kitchen', labelEn: 'Kitchen', icon: Utensils },
              { id: 'bedroom', labelEn: 'Bedroom', icon: Bed },
              { id: 'living', labelEn: 'Living', icon: null },
              { id: 'balcony', labelEn: 'Balcony', icon: Sun },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(
                      tab.id as
                        'all' | 'kitchen' | 'bedroom' | 'living' | 'balcony',
                    );
                    setCurrentIndex(0);
                    setActiveHotspot(null);
                  }}
                  className={cn(
                    'group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all',
                    isActive
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {tab.icon && <tab.icon className="size-3.5" />}
                  <span>{tab.labelEn}</span>

                  {/* Thumbnail Hover Strip (Only for non-mobile) */}
                  {!isActive && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-4 flex -translate-x-1/2 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      {images
                        .filter(
                          (img) => tab.id === 'all' || img.category === tab.id,
                        )
                        .slice(0, 3)
                        .map((img) => (
                          <div
                            key={img.id}
                            className="relative h-16 w-24 overflow-hidden rounded-md border border-white/20 shadow-xl"
                          >
                            <Image
                              src={img.src}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {filteredImages.length > 1 && (
          <div className="pointer-events-none absolute inset-x-4 inset-y-0 flex items-center justify-between">
            <button
              onClick={prevImage}
              className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/60"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/60"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        )}

        {/* Bottom Left Investment Card */}
        <div className="pointer-events-auto absolute bottom-8 left-8 flex flex-col items-start gap-4">
          {/* Smart Compass Tooltip */}
          <div className="group relative">
            <button className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition-colors hover:text-white">
              <Compass className="size-5" />
            </button>
            <div className="absolute bottom-full left-0 mb-3 rounded-md border border-white/10 bg-black/80 px-3 py-2 text-xs whitespace-nowrap text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
              <p className="font-bold">North-East Facing</p>
              <p className="text-white/60">Panoramic Ocean View</p>
            </div>
          </div>

          {/* Metrics Card */}
          <div
            className={cn(
              'w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#161616]/70 shadow-2xl backdrop-blur-2xl transition-all duration-300',
              isMetricsExpanded
                ? 'max-h-96'
                : 'max-h-24 cursor-pointer hover:bg-[#161616]/90',
            )}
            onClick={() => !isMetricsExpanded && setIsMetricsExpanded(true)}
          >
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <div>
                <p className="mb-1 text-[10px] font-bold tracking-wider text-white/60 uppercase">
                  Asking Price
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-bold">AED 4.5M</span>
                </div>
              </div>
              {isMetricsExpanded ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMetricsExpanded(false);
                  }}
                  className="z-10 p-2 text-white/60 hover:text-white"
                >
                  <ChevronDown className="size-4" />
                </button>
              ) : (
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400">
                    +7.2% ROI
                  </p>
                </div>
              )}
            </div>

            <div
              className={cn(
                'space-y-4 p-4',
                isMetricsExpanded
                  ? 'opacity-100'
                  : 'pointer-events-none h-0 p-0 opacity-0',
              )}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] tracking-wider text-white/50 uppercase">
                    Price / Sqft
                  </p>
                  <p className="font-mono text-sm font-medium">AED 2,150</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-white/50 uppercase">
                    Cap Rate
                  </p>
                  <p className="font-mono text-sm font-medium">6.8%</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-white/50 uppercase">
                    Est. Rental
                  </p>
                  <p className="font-mono text-sm font-medium">324K/yr</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-white/50 uppercase">
                    Service Chg
                  </p>
                  <p className="font-mono text-sm font-medium">14.5K/yr</p>
                </div>
              </div>
              <div className="flex gap-2 border-t border-white/10 pt-4">
                <Button className="h-9 w-full bg-white text-xs font-bold text-black hover:bg-white/90">
                  <Calendar className="mr-1.5 size-3" /> Book Viewing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspots (Rendered outside chrome wrapper so they are always accessible) */}
      {!isFloorPlanMode &&
        currentImage?.hotspots &&
        currentImage.hotspots.length > 0 && (
          <div className="pointer-events-none absolute inset-0 z-20">
            {currentImage.hotspots.map((hs) => {
              const isActive = activeHotspot === hs.id;
              return (
                <div
                  key={hs.id}
                  className="pointer-events-auto absolute"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                >
                  {/* Hotspot Ring */}
                  <button
                    onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                    className="group absolute z-20 -translate-1/2 focus:outline-none"
                    aria-label={`Inspect ${hs.labelEn}`}
                  >
                    <span
                      className={cn(
                        'relative flex size-8 items-center justify-center rounded-full transition-transform duration-300',
                        isActive ? 'scale-110' : 'hover:scale-125',
                      )}
                    >
                      <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                      <span
                        className={cn(
                          'relative size-3 rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300',
                          isActive
                            ? 'scale-150 border-emerald-300 bg-emerald-500'
                            : 'bg-white group-hover:bg-emerald-400',
                        )}
                      />
                    </span>

                    {/* Hover Tooltip (Only when not active) */}
                    {!isActive && (
                      <div className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded border border-white/20 bg-black/80 px-2 py-1 text-[10px] font-bold whitespace-nowrap text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100">
                        {isArabic ? hs.labelAr : hs.labelEn}
                      </div>
                    )}
                  </button>

                  {/* Floating Mini-Card Details */}
                  {isActive && (
                    <div
                      className={cn(
                        'animate-in fade-in zoom-in-95 absolute z-30 w-64 rounded-xl border border-white/20 bg-black/70 p-4 shadow-2xl backdrop-blur-xl duration-200',
                        hs.y > 50 ? 'bottom-6' : 'top-6',
                        hs.x > 50 ? 'right-6' : 'left-6',
                      )}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <h4 className="pr-4 text-sm leading-tight font-bold text-white">
                          {isArabic ? hs.labelAr : hs.labelEn}
                        </h4>
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="-mt-2 -mr-2 p-2 text-white/50 hover:text-white"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                      {hs.brand && (
                        <span className="mb-2 inline-block text-[9px] font-bold tracking-wider text-emerald-400 uppercase">
                          By {hs.brand}
                        </span>
                      )}
                      <p className="text-xs leading-relaxed font-light text-white/70">
                        {isArabic ? hs.detailAr : hs.detailEn}
                      </p>
                      {hs.verified && (
                        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="size-3" />
                          Verified Specification
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      {/* Onboarding Hint */}
      {showHint && (
        <div className="animate-in fade-in pointer-events-none absolute inset-0 z-50 flex items-center justify-center duration-500">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-6 py-3 text-sm font-medium text-white/90 shadow-2xl backdrop-blur-md">
            <Info className="size-4 text-emerald-400" />
            Use{' '}
            <kbd className="mx-1 rounded bg-white/20 px-1.5 font-mono text-xs">
              ←
            </kbd>{' '}
            <kbd className="mr-1 rounded bg-white/20 px-1.5 font-mono text-xs">
              →
            </kbd>{' '}
            keys to navigate · Click pulsing rings for material specs
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}
