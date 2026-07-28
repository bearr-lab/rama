'use client';

import * as React from 'react';
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
  ChevronDown
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
  estimatedRental: 324000
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
        detailEn: 'Natural 20mm bookmatched Italian marble slabs certified scratch & stain resistant.',
        detailAr: 'ألواح رخام إيطالية طبيعية بسمك 20 مم مقاومة للخدش والبقع.',
        brand: 'Antolini Italy'
      },
      {
        id: 'hs-2',
        x: 75,
        y: 40,
        labelEn: 'Integrated Appliances',
        labelAr: 'أجهزة ميلي المدمجة',
        verified: true,
        detailEn: 'Built-in induction cooktop, double oven, and wine cooler with 5-year warranty.',
        detailAr: 'موقد طهي بالحث وأفران مدمجة من ميلي مع ضمان لمدة 5 سنوات.',
        brand: 'Miele'
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
        brand: 'Kährs'
      }
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
  
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'kitchen' | 'bedroom' | 'living' | 'balcony'>('all');
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

  const currentImage = filteredImages[currentIndex] || filteredImages[0] || images[0];

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
  }, [isOpen]);

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

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredImages.length]);

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
    <div 
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Room Gallery"
      tabIndex={-1}
      className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-black text-white flex flex-col select-none font-sans outline-none"
    >
      {/* Main Stage */}
      <div className="absolute inset-0 z-0">
        {isFloorPlanMode ? (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900">
             {/* Wireframe Placeholder for Floorplan */}
             <div className="relative w-full max-w-3xl aspect-video border-2 border-fjord/40 rounded-xl flex items-center justify-center bg-zinc-950 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute border border-fjord/50 w-1/2 h-2/3 top-1/4 left-10 rounded-sm">
                   <span className="absolute top-2 left-2 text-xs text-fjord font-mono">LIVING</span>
                </div>
                <div className="absolute border border-fjord/50 w-1/3 h-1/2 top-1/4 right-20 rounded-sm">
                   <span className="absolute top-2 left-2 text-xs text-fjord font-mono">BEDROOM</span>
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
      <div className={cn(
        "absolute inset-0 z-10 transition-opacity duration-500 ease-in-out pointer-events-none",
        isChromeVisible || activeHotspot || isMetricsExpanded ? "opacity-100" : "opacity-0"
      )}>
        
        {/* Top Context Bar */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto flex items-start justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="ghost"
              className="h-10 w-10 p-0 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                <MapPin className="h-3 w-3" />
                <span>{propertyName}</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">{isArabic ? currentImage?.titleAr : currentImage?.titleEn}</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <TrendingUp className="h-3 w-3" />
                  {DEFAULT_INVESTMENT_DATA.yield}% Yield
                </span>
                <span className="text-white/50 text-xs">|</span>
                <span className="text-xs text-white/80">{currentImage?.sqft} sqft</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button
                variant="outline"
                onClick={() => setIsFloorPlanMode(!isFloorPlanMode)}
                className="h-10 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10"
             >
                <Map className="h-4 w-4 mr-2" />
                {isFloorPlanMode ? 'View Photo' : 'Floor Plan'}
             </Button>
             
             <div className="flex bg-black/40 backdrop-blur-md rounded-md border border-white/10 p-1">
                <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors" title="Save">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors" title="Share">
                  <Share className="h-4 w-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Spatial Tab Navigation (Bottom Center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl">
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
                     setSelectedCategory(tab.id as any);
                     setCurrentIndex(0);
                     setActiveHotspot(null);
                   }}
                   className={cn(
                     "relative px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-all group",
                     isActive ? "bg-white text-black" : "text-white/70 hover:text-white hover:bg-white/10"
                   )}
                 >
                   {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
                   <span>{tab.labelEn}</span>
                   
                   {/* Thumbnail Hover Strip (Only for non-mobile) */}
                   {!isActive && (
                     <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex gap-2">
                       {images.filter(img => tab.id === 'all' || img.category === tab.id).slice(0,3).map(img => (
                         <div key={img.id} className="relative h-16 w-24 rounded-md border border-white/20 overflow-hidden shadow-xl">
                            <Image src={img.src} alt="" fill className="object-cover" />
                         </div>
                       ))}
                     </div>
                   )}
                 </button>
               )
             })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {filteredImages.length > 1 && (
          <div className="absolute inset-y-0 inset-x-4 pointer-events-none flex items-center justify-between">
            <button
              onClick={prevImage}
              className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/60 text-white backdrop-blur-md transition-all border border-white/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/60 text-white backdrop-blur-md transition-all border border-white/10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Bottom Left Investment Card */}
        <div className="absolute bottom-8 left-8 pointer-events-auto flex flex-col items-start gap-4">
           {/* Smart Compass Tooltip */}
           <div className="group relative">
             <button className="h-10 w-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-colors">
               <Compass className="h-5 w-5" />
             </button>
             <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md text-white text-xs px-3 py-2 rounded-md whitespace-nowrap border border-white/10">
               <p className="font-bold">North-East Facing</p>
               <p className="text-white/60">Panoramic Ocean View</p>
             </div>
           </div>

           {/* Metrics Card */}
           <div className={cn(
             "bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-300 w-72 shadow-2xl",
             isMetricsExpanded ? "max-h-96" : "max-h-24 cursor-pointer hover:bg-black/70"
           )} onClick={() => !isMetricsExpanded && setIsMetricsExpanded(true)}>
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                 <div>
                   <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Asking Price</p>
                   <div className="flex items-baseline gap-1">
                     <span className="text-xl font-bold font-mono">AED 4.5M</span>
                   </div>
                 </div>
                 {isMetricsExpanded ? (
                   <button onClick={(e) => { e.stopPropagation(); setIsMetricsExpanded(false); }} className="p-2 text-white/60 hover:text-white z-10">
                     <ChevronDown className="h-4 w-4" />
                   </button>
                 ) : (
                   <div className="text-right">
                     <p className="text-emerald-400 text-xs font-bold">+7.2% ROI</p>
                   </div>
                 )}
              </div>
              
              <div className={cn("p-4 space-y-4", isMetricsExpanded ? "opacity-100" : "opacity-0 pointer-events-none h-0 p-0")}>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">Price / Sqft</p>
                      <p className="font-mono text-sm font-medium">AED 2,150</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">Cap Rate</p>
                      <p className="font-mono text-sm font-medium">6.8%</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">Est. Rental</p>
                      <p className="font-mono text-sm font-medium">324K/yr</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">Service Chg</p>
                      <p className="font-mono text-sm font-medium">14.5K/yr</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-white/10 flex gap-2">
                    <Button className="w-full bg-white text-black hover:bg-white/90 font-bold h-9 text-xs">
                      <Calendar className="h-3 w-3 mr-1.5" /> Book Viewing
                    </Button>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Hotspots (Rendered outside chrome wrapper so they are always accessible) */}
      {!isFloorPlanMode && currentImage?.hotspots && currentImage.hotspots.length > 0 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {currentImage.hotspots.map((hs) => {
            const isActive = activeHotspot === hs.id;
            return (
              <div 
                key={hs.id} 
                className="absolute pointer-events-auto"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              >
                {/* Hotspot Ring */}
                <button
                  onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                  aria-label={`Inspect ${hs.labelEn}`}
                >
                  <span className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300",
                    isActive ? "scale-110" : "hover:scale-125"
                  )}>
                    <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                    <span className={cn(
                      "relative h-3 w-3 rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300",
                      isActive ? "bg-emerald-500 scale-150 border-emerald-300" : "bg-white group-hover:bg-emerald-400"
                    )} />
                  </span>
                  
                  {/* Hover Tooltip (Only when not active) */}
                  {!isActive && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap border border-white/20 pointer-events-none">
                      {isArabic ? hs.labelAr : hs.labelEn}
                    </div>
                  )}
                </button>

                {/* Floating Mini-Card Details */}
                {isActive && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-64 bg-black/70 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-sm font-bold text-white leading-tight pr-4">
                         {isArabic ? hs.labelAr : hs.labelEn}
                       </h4>
                       <button onClick={() => setActiveHotspot(null)} className="text-white/50 hover:text-white -mr-2 -mt-2 p-2">
                         <X className="h-3 w-3" />
                       </button>
                    </div>
                    {hs.brand && (
                      <span className="inline-block text-[9px] uppercase tracking-wider text-emerald-400 font-bold mb-2">
                        By {hs.brand}
                      </span>
                    )}
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {isArabic ? hs.detailAr : hs.detailEn}
                    </p>
                    {hs.verified && (
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified Specification
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Onboarding Hint */}
      {showHint && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center animate-in fade-in duration-500">
           <div className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-white/90 text-sm font-medium shadow-2xl flex items-center gap-3">
             <Info className="h-4 w-4 text-emerald-400" />
             Use <kbd className="font-mono bg-white/20 px-1.5 rounded text-xs mx-1">←</kbd> <kbd className="font-mono bg-white/20 px-1.5 rounded text-xs mr-1">→</kbd> keys to navigate · Click pulsing rings for material specs
           </div>
        </div>
      )}

    </div>
  );
}
