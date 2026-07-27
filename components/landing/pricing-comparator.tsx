'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';
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
        isArabic ? 'تصفح العقارات الموثقة من الدائرة' : 'Browse DLD Verified Listings',
        isArabic ? 'التحقق من رقم حساب الضمان' : 'RERA Escrow Account Verification',
        isArabic ? 'حفظ حتى 5 عقارات للمقارنة' : 'Save up to 5 properties',
        isArabic ? 'تقارير متوسط الأسعار للمناطق' : 'Basic Community Price Metrics',
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
      buttonVariant: 'default' as const,
      features: [
        isArabic ? 'وصول كامل لمستشار الذكاء الاصطناعي RAMA AI' : 'Unlimited RAMA AI Concierge RAG Access',
        isArabic ? 'تدقيق مستندات عقود MOU وتراخيص الملكية' : 'Full Title Deed OCR & Form F Contract Audit',
        isArabic ? 'توقعات صافي العائد الاستثماري لمشاريع 5 سنوات' : '5-Year AI Net Yield & Appreciation Models',
        isArabic ? 'تنبيهات الفرص الحصرية قبل طرحها بالسوق' : 'Off-Market Deal Alerts & Direct Escrow Sync',
        isArabic ? 'دعم أولوية من مستشاري العقود' : 'Priority Advisory & Legal Compliance Desk',
      ],
    },
  ];

  return (
    <section className="bg-canvas py-24 border-t border-border/40">
      <Container size="xl" className="px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-widest text-fjord uppercase mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-fjord" />
            {isArabic ? 'خطط الذكاء العقاري المؤسسي' : 'RAMA Intelligence Plans'}
          </p>
          <h2 className="font-display text-4xl font-medium text-ink sm:text-5xl">
            {isArabic
              ? 'قارن خيارات الاشتراك واتخذ قرارك بثقة'
              : 'Transparent Plans for Serious Real Estate Investors'}
          </h2>
          <p className="text-muted-foreground mt-4 text-base">
            {isArabic
              ? 'اختر الخطة المناسبة لاحتياجاتك الاستثمارية في دبي بدون أي تكاليف خفية.'
              : 'Choose the evidence level matching your decision needs with zero hidden fees.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                plan.isPopular
                  ? 'border-2 border-fjord bg-surface shadow-xl ring-1 ring-fjord/20'
                  : 'border border-border/80 bg-surface/40 hover:border-border'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 bg-fjord text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  {isArabic ? 'الأكثر اختياراً' : 'Most Popular'}
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-ink">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 border-t border-border/60 pt-6 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-ink">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fjord-soft">
                        <Check className="h-3.5 w-3.5 text-fjord" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.buttonVariant}
                className={`w-full py-3.5 rounded-xl font-medium transition-all ${
                  plan.isPopular
                    ? 'bg-fjord text-white hover:bg-fjord-hover shadow-md shadow-fjord/20'
                    : 'border-border text-ink hover:bg-surface-subtle'
                }`}
              >
                <Link href={`/${locale}/login`} className="w-full text-center">{plan.buttonText}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PricingComparator;
