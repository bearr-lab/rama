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
      <section className="mt-12 w-full border-t border-stone-200/60 bg-stone-100/50 py-12 md:mt-20 md:py-20 dark:border-stone-800 dark:bg-stone-950/40">
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
