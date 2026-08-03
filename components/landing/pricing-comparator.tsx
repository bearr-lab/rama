'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/layout/container';

interface PricingComparatorProps {
  locale?: string;
  isArabic?: boolean;
}

export function PricingComparator({
  locale = 'en',
  isArabic = false,
}: PricingComparatorProps) {
  const plans = [
    {
      name: isArabic ? 'تصريح المستثمر المجاني' : 'Free Investor Pass',
      price: 'AED 0',
      period: isArabic ? 'مجاناً للأبد' : 'Free Forever',
      description: isArabic
        ? 'للمشترين والمستثمرين الاستكشافيين الراغبين بالتحقق الأساسي.'
        : 'For exploratory buyers and investors seeking basic evidence checks.',
      isPopular: false,
      buttonText: isArabic ? 'بدء الاستكشاف' : 'Explore Platform',
      buttonVariant: 'outline' as const,
      features: [
        isArabic
          ? 'تصفح العقارات الموثقة من الدائرة'
          : 'Browse DLD Verified Listings',
        isArabic
          ? 'التحقق من رقم حساب الضمان'
          : 'RERA Escrow Account Verification',
        isArabic ? 'حفظ حتى 5 عقارات للمقارنة' : 'Save up to 5 properties',
        isArabic
          ? 'تقارير متوسط الأسعار للمناطق'
          : 'Basic Community Price Metrics',
      ],
    },
    {
      name: isArabic ? 'تصريح المستثمر المؤسسي' : 'Institutional Pass',
      price: 'AED 499',
      period: isArabic ? 'شهرياً' : '/ month',
      description: isArabic
        ? 'للمستثمرين والمكاتب العائلية الباحثين عن تحليل العائد والذكاء الاصطناعي.'
        : 'For serious buyers & family offices demanding AI RAG & full title deed OCR audit.',
      isPopular: true,
      buttonText: isArabic ? 'ترقية الحساب الآن' : 'Get Institutional Pass',
      buttonVariant: 'primary' as const,
      features: [
        isArabic
          ? 'وصول كامل لمستشار الذكاء الاصطناعي RAMA AI'
          : 'Unlimited RAMA AI Concierge RAG Access',
        isArabic
          ? 'تدقيق مستندات عقود MOU وتراخيص الملكية'
          : 'Full Title Deed OCR & Form F Contract Audit',
        isArabic
          ? 'توقعات صافي العائد الاستثماري لمشاريع 5 سنوات'
          : '5-Year AI Net Yield & Appreciation Models',
        isArabic
          ? 'تنبيهات الفرص الحصرية قبل طرحها بالسوق'
          : 'Off-Market Deal Alerts & Direct Escrow Sync',
        isArabic
          ? 'دعم أولوية من مستشاري العقود'
          : 'Priority Advisory & Legal Compliance Desk',
      ],
    },
  ];

  return (
    <section className="border-t border-border/40 bg-canvas py-24">
      <Container size="lg">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest text-fjord uppercase">
            <Sparkles className="size-4 text-fjord" />
            {isArabic
              ? 'خطط الذكاء العقاري المؤسسي'
              : 'RAMA Intelligence Plans'}
          </p>
          <h2 className="font-display text-4xl font-medium text-fjord sm:text-5xl">
            {isArabic
              ? 'قارن خيارات الاشتراك واتخذ قرارك بثقة'
              : 'Transparent Plans for Serious Real Estate Investors'}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {isArabic
              ? 'اختر الخطة المناسبة لاحتياجاتك الاستثمارية في دبي بدون أي تكاليف خفية.'
              : 'Choose the evidence level matching your decision needs with zero hidden fees.'}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative flex flex-col justify-between rounded-none p-8 transition-all duration-300 ${
                plan.isPopular
                  ? 'border-2 border-fjord bg-surface shadow-xl'
                  : 'border border-border/80 bg-surface/40 hover:border-border'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 flex items-center gap-1 rounded-none bg-fjord px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
                  <Zap className="size-3.5 fill-current" />
                  {isArabic ? 'الأكثر اختياراً' : 'Most Popular'}
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-semibold text-fjord">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-fjord">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <ul className="mb-8 space-y-3 border-t border-border/60 pt-6">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-3 text-sm text-fjord"
                    >
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-none bg-fjord-soft">
                        <Check className="size-3.5 text-fjord" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.buttonVariant}
                className={`h-9 w-full rounded-none text-[11px] font-bold tracking-widest uppercase transition-colors ${
                  plan.isPopular
                    ? 'bg-fjord text-white hover:bg-fjord-hover'
                    : 'border border-border text-fjord hover:bg-surface-subtle'
                }`}
              >
                <Link href={`/${locale}/login`} className="w-full text-center">
                  {plan.buttonText}
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PricingComparator;
