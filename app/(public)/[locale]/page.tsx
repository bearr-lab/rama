import type { Metadata } from 'next';
import { use } from 'react';
import { HeroEditorial } from '@/components/landing/hero-editorial';
import { LiveTransactionTicker } from '@/components/landing/live-transaction-ticker';
import { DeveloperLogoCloud } from '@/components/landing/developer-logo-cloud';
import { AboutAsymmetrical } from '@/components/landing/about-asymmetrical';
import { FeaturedSignature } from '@/components/landing/featured-signature';
import { AIAppTeaser } from '@/components/landing/ai-app-teaser';
import { PricingComparator } from '@/components/landing/pricing-comparator';
import { FAQAccordion } from '@/components/landing/faq-accordion';
import { ContactConnect } from '@/components/landing/contact-connect';
import { RoiCalculatorWidget } from '@/components/landing/roi-calculator-widget';
import { Container } from '@/components/layout/container';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return {
    title: isArabic
      ? 'راما | عقارات دبي الفاخرة واستشارات الاستثمار بالذكاء الاصطناعي'
      : 'Rama | Luxury Dubai Real Estate & AI Investment Advisory',
    description: isArabic
      ? 'اكتشف مشاريع حصرية قيد الإنشاء، وقصور جاهزة للانتقال، ورؤى استثمارية مدعومة بالذكاء الاصطناعي في دبي.'
      : 'Discover exclusive off-plan projects, ready-to-move-in mansions, and AI-driven investment insights in Dubai.',
  };
}
export default function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isArabic = locale === 'ar';

  return (
    <div className="flex w-full flex-col">
      <HeroEditorial locale={locale} isArabic={isArabic} />
      <LiveTransactionTicker isArabic={isArabic} />

      {/* Interactive ROI Simulator Section */}
      <section className="mt-12 w-full border-t border-border/60 bg-surface/50 py-12 md:mt-20 md:py-20  ">
        <Container size="lg">
          <RoiCalculatorWidget locale={locale} isArabic={isArabic} />
        </Container>
      </section>

      <DeveloperLogoCloud isArabic={isArabic} />
      <AboutAsymmetrical isArabic={isArabic} />
      <FeaturedSignature locale={locale} isArabic={isArabic} />
      <AIAppTeaser locale={locale} isArabic={isArabic} />
      <PricingComparator locale={locale} isArabic={isArabic} />
      <FAQAccordion locale={locale} isArabic={isArabic} />
      <ContactConnect isArabic={isArabic} />
    </div>
  );
}
