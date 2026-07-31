'use client';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { motion } from 'framer-motion';
import { TrendingUp, Percent, Key, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WhyInvestOffPlanProps {
  isArabic?: boolean;
}

export function WhyInvestOffPlan({ isArabic }: WhyInvestOffPlanProps) {
  const features = [
    {
      icon: TrendingUp,
      title: isArabic ? 'نمو رأس المال' : 'Capital Appreciation',
      description: isArabic
        ? 'استفد من زيادة الأسعار من مرحلة الإطلاق حتى التسليم.'
        : 'Benefit from significant price appreciation from launch phase through to final handover.',
    },
    {
      icon: Percent,
      title: isArabic ? 'خطط دفع مرنة' : 'Favorable Payment Plans',
      description: isArabic
        ? 'استثمر برأس مال أولي منخفض وادفع على أقساط مريحة.'
        : 'Invest with low initial capital outlay and spread payments across construction milestones.',
    },
    {
      icon: Key,
      title: isArabic ? 'أصول جديدة كلياً' : 'Brand New Assets',
      description: isArabic
        ? 'استلم عقاراً جديداً بضمانات المطور وأحدث التشطيبات.'
        : 'Take possession of a pristine, zero-defect asset backed by comprehensive developer warranties.',
    },
  ];

  return (
    <Section
      spacing="lg"
      className="border-t border-stone-300/40 bg-stone-50 dark:border-stone-800/40 dark:bg-stone-950"
    >
      <Container size="lg">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Left: Editorial Header */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl leading-tight font-bold text-stone-900 md:text-4xl dark:text-stone-50">
              {isArabic ? 'لماذا تستثمر قيد الإنشاء؟' : 'Why Invest Off-Plan?'}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              {isArabic
                ? 'يوفر الاستثمار في عقارات دبي قيد الإنشاء عوائد لا مثيل لها وميزات حصرية للمستثمرين المبكرين.'
                : 'Off-plan investments in Dubai offer unparalleled returns and exclusive advantages for early-stage investors.'}
            </p>
            <Link
              href="/invest"
              className="mt-8 inline-flex items-center text-xs font-bold tracking-widest text-stone-900 uppercase hover:underline dark:text-stone-100"
            >
              {isArabic ? 'اقرأ التقرير' : 'Read Report'}{' '}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>

          {/* Right: Feature Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:col-span-3 lg:pl-12">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col"
                >
                  <div className="mb-6 flex size-12 items-center justify-center border border-stone-300 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
                    <Icon className="size-5 text-stone-900 dark:text-stone-100" />
                  </div>
                  <h3 className="mb-3 font-display text-lg font-bold text-stone-900 dark:text-stone-50">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
