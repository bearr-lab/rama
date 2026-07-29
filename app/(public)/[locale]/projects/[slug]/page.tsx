import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Building2, Calendar, MapPin, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

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
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
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
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
  },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isArabic = locale === 'ar';

  const project = OFF_PLAN_PROJECTS.find((p) => p.id === slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-surface">
      {/* Sticky back bar */}
      <div className="fixed inset-x-0 top-16 z-40 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-3">
          <Link
            href={`/${locale}/projects`}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-ink"
          >
            <ChevronLeft className="size-4" />
            {isArabic ? 'المشاريع' : 'All Projects'}
          </Link>
        </div>
      </div>

      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={isArabic ? project.titleAr : project.titleEn}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
        
        <Container size="xl" className="relative z-20">
          <div className="mt-10 max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase backdrop-blur-md">
              <Building2 className="size-4" />
              <span>{isArabic ? project.statusAr : project.statusEn}</span>
            </div>
            
            <h1 className="leading-1.1 font-display text-5xl font-normal tracking-tight text-white md:text-7xl lg:text-8xl">
              {isArabic ? project.titleAr : project.titleEn}
            </h1>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/20 pt-8 text-white/80">
              <span className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase">
                <Building2 className="size-4 text-fjord" />
                {project.developer}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase">
                <MapPin className="size-4 text-emerald-400" />
                {isArabic ? project.locationAr : project.locationEn}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase">
                <Tag className="size-4 text-amber-400" />
                {isArabic ? project.startingPriceAr : project.startingPriceEn}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase">
                <Calendar className="size-4 text-sky-400" />
                {isArabic ? project.handoverAr : project.handoverEn}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-24">
        <Container size="md" className="space-y-6 text-center">
          <div className="mb-4 inline-block rounded-full bg-surface-subtle p-4">
            <Building2 className="size-8 text-fjord" />
          </div>
          <h2 className="font-display text-3xl font-bold text-ink">
            {isArabic ? 'تفاصيل المشروع قريباً' : 'Project Details Coming Soon'}
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed font-light text-muted-foreground">
            {isArabic 
              ? 'نحن نعمل على إعداد كافة التفاصيل والمخططات والصور الخاصة بهذا المشروع الاستثنائي. يرجى التحقق مرة أخرى قريباً لاستكشاف المزيد.' 
              : 'We are preparing all the details, floor plans, and exclusive gallery for this exceptional off-plan project. Please check back soon.'}
          </p>
        </Container>
      </section>
    </div>
  );
}
