import { use } from 'react';
import { HeroEditorial } from '@/components/landing/hero-editorial';
import { DeveloperLogoCloud } from '@/components/landing/developer-logo-cloud';
import { AboutAsymmetrical } from '@/components/landing/about-asymmetrical';
import { FeaturedSignature } from '@/components/landing/featured-signature';
import { AIAppTeaser } from '@/components/landing/ai-app-teaser';
import { PricingComparator } from '@/components/landing/pricing-comparator';
import { FAQAccordion } from '@/components/landing/faq-accordion';
import { ContactConnect } from '@/components/landing/contact-connect';

export default function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isArabic = locale === 'ar';

  return (
    <div className="flex flex-col w-full">
      <HeroEditorial locale={locale} isArabic={isArabic} />
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
