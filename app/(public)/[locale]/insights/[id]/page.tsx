
import { getInsightsData } from '@/lib/data/insights';
import { PageHeader } from '@/components/layout/page-header';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const { heroInsight, insights } = getInsightsData(locale);
  const insightId = parseInt(id, 10);
  const insight =
    heroInsight.id === insightId ? heroInsight : insights.find((i) => i.id === insightId);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.description,
    openGraph: { title: insight.title, description: insight.description },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const isArabic = locale === 'ar';
  
  const { heroInsight, insights } = getInsightsData(locale);
  
  const insightId = parseInt(id, 10);
  
  const insight = heroInsight.id === insightId ? heroInsight : insights.find(i => i.id === insightId);
  
  if (!insight) {
    notFound();
  }

  const fallbackImage = '/images/hero/projects-hero.jpg';

  return (
    <article className="pb-24">
      <PageHeader
        title={insight.title}
        description={insight.description}
        backgroundImage={insight.image || fallbackImage}
        variant="editorial"
        mediaPosition="object-top"
        badge={
          <>
            <span className="flex size-2 animate-pulse rounded-full bg-emerald-400" />
            <span>{insight.category}</span>
          </>
        }
      >
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-white/70">
           {insight.author && (
             <div className="flex items-center gap-2 rounded-none border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
               <User className="size-3.5 text-emerald-400" />
               <span>{insight.author}</span>
             </div>
           )}
           {insight.readTime && (
             <div className="flex items-center gap-2 rounded-none border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
               <Clock className="size-3.5 text-emerald-400" />
               <span>{insight.readTime}</span>
             </div>
           )}
           {insight.date && (
             <div className="flex items-center gap-2 rounded-none border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
               <span>{insight.date}</span>
             </div>
           )}
        </div>
      </PageHeader>

      <div className="container mx-auto mt-16 max-w-3xl px-4">
        <Link 
          href={`/${locale}/insights`} 
          className="group mb-12 inline-flex items-center gap-2 text-sm font-bold tracking-wider text-muted-foreground uppercase transition-colors hover:text-ink"
        >
          {isArabic ? (
            <>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              العودة إلى الرؤى
            </>
          ) : (
            <>
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </>
          )}
        </Link>
        
        <div className="prose prose-lg dark:prose-invert prose-stone mx-auto w-full">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            {insight.title}
          </h2>
          <p className="lead mb-8 font-serif text-xl text-muted-foreground italic">
            {insight.description}
          </p>
          
          <div className="my-8 h-px w-full bg-border" />
          
          <p className="text-lg leading-relaxed whitespace-pre-wrap text-ink/90">
            {insight.content}
          </p>
          
          {/* Mock Editorial Continued */}
          <div className="mt-12 rounded-none border border-border bg-surface-subtle p-8">
            <h3 className="mb-4 text-xl font-bold">{isArabic ? 'النقاط الرئيسية' : 'Key Takeaways'}</h3>
            <ul className="space-y-3 marker:text-emerald-500">
              <li>{isArabic ? 'استمرار الطلب المرتفع على العقارات الجاهزة في المجتمعات الفاخرة.' : 'Continued high demand for ready properties in prime communities.'}</li>
              <li>{isArabic ? 'عوائد الإيجار تظل من بين الأعلى عالمياً بمتوسط 6-8%.' : 'Rental yields remain among the highest globally, averaging 6-8%.'}</li>
              <li>{isArabic ? 'إطلاق مشاريع جديدة بميزات صديقة للبيئة لجذب المستثمرين.' : 'New project launches focus on eco-friendly features to attract modern investors.'}</li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
