import { use } from 'react';
import { HeroEditorial } from '@/components/landing/hero-editorial';
import { DeveloperLogoCloud } from '@/components/landing/developer-logo-cloud';
import { AboutAsymmetrical } from '@/components/landing/about-asymmetrical';
import { FeaturedSignature } from '@/components/landing/featured-signature';
import { AIAppTeaser } from '@/components/landing/ai-app-teaser';
import { PricingComparator } from '@/components/landing/pricing-comparator';
import { FAQAccordion } from '@/components/landing/faq-accordion';
import { ContactConnect } from '@/components/landing/contact-connect';
import Hero1 from '@/components/mvpblocks/hero-1';

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
      <Hero1 />
      <DeveloperLogoCloud locale={locale} isArabic={isArabic} />
      <AboutAsymmetrical locale={locale} isArabic={isArabic} />
      <FeaturedSignature locale={locale} isArabic={isArabic} />
      <AIAppTeaser locale={locale} isArabic={isArabic} />
      <PricingComparator locale={locale} isArabic={isArabic} />
      <FAQAccordion locale={locale} isArabic={isArabic} />
      <ContactConnect locale={locale} isArabic={isArabic} />
    </div>
  );
}
