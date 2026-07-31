'use client';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, ChefHat, PlaneTakeoff } from 'lucide-react';

interface CommunitiesEditorialProps {
  isArabic?: boolean;
}

export function CommunitiesEditorial({ isArabic }: CommunitiesEditorialProps) {
  const lifestyleFeatures = [
    {
      icon: Globe,
      title: isArabic ? 'مجتمع عالمي' : 'Global Hub',
      description: isArabic
        ? 'اكتشف بيئة متعددة الثقافات تحتضن أكثر من 200 جنسية في تسامح ووئام.'
        : 'Experience a truly cosmopolitan environment home to over 200 nationalities living in harmony.',
    },
    {
      icon: GraduationCap,
      title: isArabic ? 'تعليم عالمي المستوى' : 'World-Class Education',
      description: isArabic
        ? 'وصول حصري لأفضل المدارس الدولية والجامعات المرموقة لضمان مستقبل أبنائك.'
        : 'Premium access to top-tier international schools and world-renowned university campuses.',
    },
    {
      icon: ChefHat,
      title: isArabic ? 'مطاعم ميشلان' : 'Michelin Gastronomy',
      description: isArabic
        ? 'تلذذ بتجارب طعام استثنائية من توقيع أشهر الطهاة العالميين على بعد خطوات من منزلك.'
        : 'Indulge in exceptional culinary experiences from celebrity chefs just moments from your doorstep.',
    },
    {
      icon: PlaneTakeoff,
      title: isArabic ? 'ربط عالمي لا مثيل له' : 'Unrivaled Connectivity',
      description: isArabic
        ? 'موقع استراتيجي يتيح لك الوصول إلى ثلثي سكان العالم في رحلة طيران مدتها 8 ساعات.'
        : 'Strategic geographic location offering flights to two-thirds of the global population within 8 hours.',
    },
  ];

  const marketStats = [
    {
      label: isArabic ? 'متوسط العائد الإيجاري' : 'Avg. Rental Yield',
      value: '7.8%',
      trend: '+1.2%',
    },
    {
      label: isArabic ? 'نمو رأس المال (سنوياً)' : 'Capital Growth (YoY)',
      value: '14.5%',
      trend: '+2.4%',
    },
    {
      label: isArabic ? 'متوسط سعر القدم المربع' : 'Avg. Price per Sq.Ft',
      value: 'AED 1,850',
      trend: '+4.1%',
    },
  ];

  return (
    <>
      {/* Dubai Lifestyle */}
      <Section className="border-t border-stone-800 bg-black py-24 text-white">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                {isArabic ? 'أسلوب الحياة في دبي' : 'The Dubai Lifestyle'}
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight font-bold md:text-5xl">
                {isArabic ? 'أكثر من مجرد عقار' : 'Beyond the Property'}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-stone-400">
                {isArabic
                  ? 'اختيار مجمعك السكني في دبي لا يقتصر على العقار فحسب، بل هو اختيار لأسلوب حياة متكامل. من المدارس المتميزة إلى البنية التحتية المتطورة، كل منطقة توفر لك تجربة فريدة لا تضاهى.'
                  : 'Choosing your community in Dubai is about selecting a holistic lifestyle. From premium education networks to unparalleled infrastructure, every district offers a distinctly curated living experience.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {lifestyleFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col border border-stone-800 bg-stone-950/50 p-6 backdrop-blur-md"
                >
                  <feature.icon className="mb-4 size-6 text-white" />
                  <h3 className="mb-2 font-display text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Market Performance */}
      <Section className="bg-stone-50 py-16 dark:bg-stone-900">
        <Container size="lg">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-50">
              {isArabic ? 'أداء السوق' : 'Market Performance'}
            </h2>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              {isArabic
                ? 'مؤشرات قوية عبر جميع المجمعات السكنية'
                : 'Strong indicators across all premium communities'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-stone-200 md:grid-cols-3 dark:bg-stone-800">
            {marketStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center bg-stone-50 py-10 dark:bg-stone-900"
              >
                <p className="text-xs font-semibold tracking-widest text-stone-500 uppercase dark:text-stone-400">
                  {stat.label}
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-4xl font-bold text-stone-900 dark:text-stone-50">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-500">
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
