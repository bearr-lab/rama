import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Building2, ArrowUpRight, Calendar, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { searchPhotos, getHeroVideo, getHeroImage } from '@/lib/pexels';
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

  // Fetch cinematic hero video and Bento Grid imagery in parallel
  const [heroVideoUrl, pexelsRes] = await Promise.all([
    getHeroVideo('Dubai modern architecture skyscraper drone'),
    searchPhotos('dubai modern architecture luxury building', 5),
  ]);
  const heroImageUrl = heroVideoUrl ? null : await getHeroImage('Dubai skyscraper sunset 8k', '/images/hero/projects.png');
  const pexelsPhotos = pexelsRes?.photos || [];

  // Merge Pexels photos into the mock data
  const projectsWithImages = OFF_PLAN_PROJECTS.map((project, index) => {
    return {
      ...project,
      image: pexelsPhotos[index] ? pexelsPhotos[index].src.large2x : project.image,
    };
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-surface">
      {/* Cinematic Hero */}
      <PageHeader
        title={isArabic ? 'اكتشف مشاريع المستقبل' : 'Discover Future Landmarks'}
        description={
          isArabic
            ? 'تصفح أحدث المشاريع المعمارية وأكثرها تميزاً في دبي قبل اكتمالها. فرص استثمارية استثنائية مع كبار المطورين العقاريين.'
            : 'Browse Dubai\u2019s most exclusive architectural developments before completion. Exceptional investment opportunities with tier-one developers.'
        }
        backgroundVideo={heroVideoUrl || undefined}
        backgroundImage={heroImageUrl || undefined}
        variant="editorial"
        badge={
          <>
            <Building2 className="size-4" />
            <span>{isArabic ? 'مشاريع قيد الإنشاء' : 'Off-Plan Projects'}</span>
          </>
        }
      />

      {/* Bento Grid Showcase */}
      <Section spacing="lg" className="bg-canvas">
        <Container size="xl">
          <div className="grid auto-rows-87.5 grid-cols-1 gap-6 md:grid-cols-3">
            {projectsWithImages.map((project, index) => {
              const delay = 0.2 + index * 0.1;
              return (
                <BlurFade 
                  key={project.id} 
                  delay={delay} 
                  offset={30} 
                  className={cn("size-full", project.spanClass)}
                >
                  <Link href={`/${locale}/projects/${project.id}`} className="block size-full">
                    {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                    <div className="group shadow-subtle hover:shadow-floating relative size-full cursor-pointer overflow-hidden rounded-none border border-border/20 bg-black transition-shadow duration-500">
                      
                      {/* High-Res Unsplash Image */}
                      <Image
                        src={project.image}
                        alt={isArabic ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
                      <div className="absolute inset-0 bg-fjord/20 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Top Badges */}
                      <div className="absolute inset-x-6 top-6 z-20 flex items-start justify-between">
                        <div className={cn(
                          "rounded-none border px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md",
                          project.statusEn === 'Launching Soon' 
                            ? "border-amber-500/30 bg-amber-500/20 text-amber-300" 
                            : project.statusEn === 'Available'
                              ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                              : "border-white/20 bg-white/10 text-white"
                        )}>
                          {isArabic ? project.statusAr : project.statusEn}
                        </div>
                        
                        {/* Hover reveal icon */}
                        <div className="flex size-10 -translate-y-4 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpRight className="size-5" />
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div className="absolute inset-0 z-20 flex translate-y-4 flex-col justify-end p-6 transition-transform duration-500 ease-out group-hover:translate-y-0 md:p-8">
                        
                        {/* Developer & Location */}
                        <div className="mb-3 flex items-center gap-3 text-xs font-semibold tracking-wider text-white/70 uppercase">
                          <span className="font-bold text-fjord">{project.developer}</span>
                          <span className="size-1 rounded-full bg-white/30" />
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {isArabic ? project.locationAr : project.locationEn}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="mb-6 font-display text-2xl leading-tight font-normal text-white md:text-3xl">
                          {isArabic ? project.titleAr : project.titleEn}
                        </h3>
                        
                        {/* Details Row (Fades in on hover) */}
                        <div className="flex items-center justify-between border-t border-white/20 pt-5 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                          <div className="flex items-center gap-6">
                            <div>
                              <p className="mb-1 flex items-center gap-1 text-[10px] tracking-widest text-white/50 uppercase">
                                <Tag className="size-3" />
                                {isArabic ? 'يبدأ من' : 'Starting From'}
                              </p>
                              <p className="font-mono text-sm font-bold text-white">
                                {isArabic ? project.startingPriceAr : project.startingPriceEn}
                              </p>
                            </div>
                            <div>
                              <p className="mb-1 flex items-center gap-1 text-[10px] tracking-widest text-white/50 uppercase">
                                <Calendar className="size-3" />
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
