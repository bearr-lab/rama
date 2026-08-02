import { InsightsClient } from '@/components/insights/insights-client';
import { PageHeader } from '@/components/layout/page-header';

import { getInsightsData } from '@/lib/data/insights';
import Link from 'next/link';
import { MagneticButton } from '@/components/ui/magnetic-button';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  return {
    title: isArabic
      ? 'الرؤى والتقارير - راما العقارية'
      : 'Market Insights & Reports - RAMA Real Estate',
    description: isArabic
      ? 'أحدث تقارير السوق والتحليلات الخاصة بعقارات دبي من خبرائنا'
      : 'Latest market reports and analysis on Dubai real estate from our experts',
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const heroImage = '/images/hero/insights-hero.jpg';

  const { heroInsight, insights } = getInsightsData(locale);

  return (
    <>
      {/* Server-rendered unified hero */}
      <PageHeader
        title={heroInsight.title}
        description={heroInsight.description}
        backgroundImage={heroImage}
        backgroundVideo="/videos/insights-hero-bg.mp4"
        variant="editorial"
        mediaPosition="object-top"
        badge={
          <>
            <span className="flex size-2 animate-pulse rounded-full bg-emerald-400" />
            <span>{isArabic ? 'تقرير مميز' : 'Featured Report'}</span>
          </>
        }
      >
        <MagneticButton
          render={
            <Link
              href={`/${locale}/insights/${heroInsight.id}`}
              className="inline-flex h-9 items-center justify-center rounded-sm bg-white px-6 text-[11px] font-bold tracking-widest text-black uppercase transition-colors hover:bg-white/90"
            >
              {isArabic ? 'قراءة التقرير الكامل' : 'Read Full Report'}
            </Link>
          }
        />
      </PageHeader>

      {/* Client-rendered interactive grid */}
      <InsightsClient insights={insights} locale={locale} />
    </>
  );
}
