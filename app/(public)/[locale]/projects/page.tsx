import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Building2, ArrowRight, ArrowUpRight, Calendar, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// MOCK DATA: Future Off-Plan Projects
const OFF_PLAN_PROJECTS = [
  {
    id: 'prj-1',
    titleEn: 'Burj Binghatti Jacob & Co Residences',
    titleAr: 'مساكن برج بن غاطي جاكوب آند كو',
    developer: 'Binghatti',
    locationEn: 'Business Bay',
    locationAr: 'الخليج التجاري',
    statusEn: 'Under Construction',
    statusAr: 'قيد الإنشاء',
    handoverEn: 'Q4 2026',
    handoverAr: 'الربع الرابع ٢٠٢٦',
    startingPriceEn: 'AED 8.2M',
    startingPriceAr: '٨.٢ مليون درهم',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80', // Skyscraper/Modern
    spanClass: 'md:col-span-2 md:row-span-2', // Large feature card
  },
  {
    id: 'prj-2',
    titleEn: 'Palm Jebel Ali Villas',
    titleAr: 'فلل نخلة جبل علي',
    developer: 'Nakheel',
    locationEn: 'Palm Jebel Ali',
    locationAr: 'نخلة جبل علي',
    statusEn: 'Launching Soon',
    statusAr: 'إطلاق قريب',
    handoverEn: 'Q1 2027',
    handoverAr: 'الربع الأول ٢٠٢٧',
    startingPriceEn: 'AED 18.5M',
    startingPriceAr: '١٨.٥ مليون درهم',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', // Coastal Villa
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'prj-3',
    titleEn: 'The Oasis Estates',
    titleAr: 'عقارات الواحة',
    developer: 'Emaar',
    locationEn: 'Dubailand',
    locationAr: 'دبي لاند',
    statusEn: 'Available',
    statusAr: 'متاح',
    handoverEn: 'Q2 2028',
    handoverAr: 'الربع الثاني ٢٠٢٨',
    startingPriceEn: 'AED 12.0M',
    startingPriceAr: '١٢.٠ مليون درهم',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', // Luxury Villa
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'prj-4',
    titleEn: 'Keturah Resort',
    titleAr: 'منتجع كيتوراه',
    developer: 'MAG Property',
    locationEn: 'Dubai Creek',
    locationAr: 'خور دبي',
    statusEn: 'Under Construction',
    statusAr: 'قيد الإنشاء',
    handoverEn: 'Q3 2026',
    handoverAr: 'الربع الثالث ٢٠٢٦',
    startingPriceEn: 'AED 5.5M',
    startingPriceAr: '٥.٥ مليون درهم',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', // Resort
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'prj-5',
    titleEn: 'Franck Muller Aeternitas',
    titleAr: 'فرانك مولر إتيرنيتاس',
    developer: 'London Gate',
    locationEn: 'Dubai Marina',
    locationAr: 'دبي مارينا',
    statusEn: 'Under Construction',
    statusAr: 'قيد الإنشاء',
    handoverEn: 'Q2 2027',
    handoverAr: 'الربع الثاني ٢٠٢٧',
    startingPriceEn: 'AED 4.2M',
    startingPriceAr: '٤.٢ مليون درهم',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80', // Modern architecture
    spanClass: 'md:col-span-2 md:row-span-1', // Wide card
  },
];

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-20 border-b border-border/40 overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Skyline"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        
        <Container size="xl" className="relative z-20">
          <BlurFade delay={0.1} offset={20}>
            <div className="max-w-4xl space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase rounded-none backdrop-blur-md">
                <Building2 className="h-4 w-4" />
                <span>{isArabic ? 'مشاريع قيد الإنشاء' : 'Off-Plan Projects'}</span>
              </div>
              
              <h1 className="font-display text-5xl leading-[1.1] font-normal text-white md:text-7xl lg:text-8xl tracking-tight">
                {isArabic
                  ? 'اكتشف مشاريع المستقبل'
                  : 'Discover Future Landmarks'}
              </h1>
              
              <p className="text-lg font-light text-white/80 md:text-xl max-w-2xl leading-relaxed">
                {isArabic
                  ? 'تصفح أحدث المشاريع المعمارية وأكثرها تميزاً في دبي قبل اكتمالها. فرص استثمارية استثنائية مع كبار المطورين العقاريين.'
                  : 'Browse Dubai’s most exclusive architectural developments before completion. Exceptional investment opportunities with tier-one developers.'}
              </p>
            </div>
          </BlurFade>
        </Container>
      </section>

      {/* Bento Grid Showcase */}
      <Section spacing="lg" className="bg-canvas">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[350px] gap-6">
            {OFF_PLAN_PROJECTS.map((project, index) => {
              const delay = 0.2 + index * 0.1;
              return (
                <BlurFade 
                  key={project.id} 
                  delay={delay} 
                  offset={30} 
                  className={cn("w-full h-full", project.spanClass)}
                >
                  <Link href={`/${locale}/projects/${project.id}`} className="block w-full h-full">
                    <div className="relative group w-full h-full overflow-hidden bg-black cursor-pointer border border-border/20 shadow-subtle hover:shadow-floating transition-shadow duration-500 rounded-none">
                      
                      {/* High-Res Unsplash Image */}
                      <Image
                        src={project.image}
                        alt={isArabic ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] opacity-90 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-fjord/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                        <div className={cn(
                          "px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md rounded-none border",
                          project.statusEn === 'Launching Soon' 
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30" 
                            : project.statusEn === 'Available'
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-white/10 text-white border-white/20"
                        )}>
                          {isArabic ? project.statusAr : project.statusEn}
                        </div>
                        
                        {/* Hover reveal icon */}
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Bottom Content Content */}
                      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        
                        {/* Developer & Location */}
                        <div className="flex items-center gap-3 text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                          <span className="text-fjord font-bold">{project.developer}</span>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {isArabic ? project.locationAr : project.locationEn}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-display text-2xl md:text-3xl font-normal text-white leading-tight mb-6">
                          {isArabic ? project.titleAr : project.titleEn}
                        </h3>
                        
                        {/* Details Row (Fades in on hover) */}
                        <div className="flex items-center justify-between pt-5 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <div className="flex items-center gap-6">
                            <div>
                              <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {isArabic ? 'يبدأ من' : 'Starting From'}
                              </p>
                              <p className="font-mono text-sm font-bold text-white">
                                {isArabic ? project.startingPriceAr : project.startingPriceEn}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {isArabic ? 'التسليم' : 'Handover'}
                              </p>
                              <p className="font-mono text-sm font-bold text-white">
                                {isArabic ? project.handoverAr : project.handoverEn}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
