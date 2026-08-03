'use client';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { motion } from 'framer-motion';
import {
  BarChart3,
  ShieldCheck,
  Crown,
  ArrowRight,
  Download,
} from 'lucide-react';
import Link from 'next/link';

interface InvestEditorialProps {
  isArabic?: boolean;
}

export function InvestEditorial({ isArabic }: InvestEditorialProps) {
  const pillars = [
    {
      icon: BarChart3,
      title: isArabic ? 'تحليلات العوائد' : 'Yield Analytics',
      description: isArabic
        ? 'تتبع العوائد الإيجارية التاريخية والمستقبلية بدقة متناهية.'
        : 'Track historical and predictive rental yields with granular precision.',
      href: '/homes',
      cta: isArabic ? 'عرض العقارات' : 'View Properties',
    },
    {
      icon: ShieldCheck,
      title: isArabic ? 'أمان التشفير' : 'Crypto Security',
      description: isArabic
        ? 'مدفوعات آمنة مدعومة بالبلوك تشين وعقود ذكية للمستثمرين العالميين.'
        : 'Secure blockchain-verified payments and smart contracts for global investors.',
      comingSoon: true,
    },
    {
      icon: Crown,
      title: isArabic ? 'التسجيل لـ VIP' : 'VIP Access',
      description: isArabic
        ? 'احصل على أولوية الوصول إلى المشاريع قيد الإنشاء قبل طرحها للعامة.'
        : 'Gain priority access to off-plan inventory before public launch.',
      href: '/login',
      cta: isArabic ? 'سجل الآن' : 'Register Now',
      dark: true,
    },
  ];

  return (
    <>
      {/* Expanded Pillars */}
      <Section spacing="lg" className="bg-surface-subtle ">
        <Container size="lg">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              {isArabic ? 'منصة الاستثمار' : 'Investment Platform'}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl ">
              {isArabic
                ? 'بنية تحتية للمستثمرين'
                : 'Institutional Infrastructure'}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col border p-8 transition-colors ${
                  pillar.dark
                    ? 'border-border-strong/40 bg-ink-bg text-white'
                    : 'border-border/60/40 bg-white hover:border-fjord   dark:hover:border-border/60'
                }`}
              >
                {pillar.dark ? (
                  <div className="mb-6 size-8 animate-pulse rounded-none bg-border/50 " />
                ) : (
                  <pillar.icon className="mb-6 size-8 text-ink " />
                )}

                <h3
                  className={`mb-4 font-display text-2xl font-bold ${pillar.dark ? 'text-white' : 'text-ink '}`}
                >
                  {pillar.title}
                </h3>
                <p
                  className={`mb-8 text-sm leading-relaxed ${pillar.dark ? 'text-white/70' : 'text-muted-foreground dark:text-muted/50'}`}
                >
                  {pillar.description}
                </p>

                {pillar.comingSoon ? (
                  <span className="inline-flex items-center text-sm font-bold tracking-widest text-muted-foreground uppercase dark:text-muted/50">
                    {isArabic ? 'قريباً' : 'Coming Soon'}
                  </span>
                ) : (
                  <Link
                    href={pillar.href || '#'}
                    className={`inline-flex items-center text-sm font-semibold hover:underline ${pillar.dark ? 'text-white' : 'text-ink '}`}
                  >
                    {pillar.cta} <ArrowRight className="ml-1 size-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* UAE Golden Visa Banner */}
      <Section className="border-border-strong border-y bg-ink py-24 text-white">
        <Container size="lg">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                {isArabic ? 'إقامة لمدة 10 سنوات' : '10-Year Residency'}
              </div>
              <h2 className="font-display text-4xl leading-tight font-bold md:text-5xl">
                {isArabic ? 'تأشيرة دبي الذهبية' : 'The UAE Golden Visa'}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted/50">
                {isArabic
                  ? 'استثمر بقيمة 2 مليون درهم إماراتي أو أكثر في العقارات واحصل على تأشيرة الإقامة الذهبية لك ولعائلتك. تمتع بملكية أعمال بنسبة 100% وإعفاء كامل من ضريبة الدخل الشخصي.'
                  : 'Invest AED 2M or more in real estate and secure a 10-year Golden Visa for you and your family. Enjoy 100% business ownership and zero personal income tax.'}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/homes?priceMin=2000000"
                  className="inline-flex h-12 items-center justify-center bg-white px-8 text-xs font-bold tracking-widest text-fjord uppercase transition-colors hover:bg-border/50"
                >
                  {isArabic ? 'عقارات مؤهلة' : 'Qualifying Properties'}
                </Link>
                <button className="inline-flex h-12 items-center justify-center border border-white/20 bg-transparent px-8 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-white/10">
                  <Download className="mr-2 size-4" />
                  {isArabic ? 'دليل التأشيرة' : 'Download Guide'}
                </button>
              </div>
            </div>

            <div className="border-border-strong relative h-100 w-full border bg-fjord">
              {/* Decorative graphic for Golden Visa */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute size-125 rotate-45 border border-amber-500/20 opacity-50" />
                <div className="absolute size-75 rotate-45 border border-amber-500/40 opacity-50" />
                <Crown className="size-24 text-amber-500/60" strokeWidth={1} />
                <div className="absolute inset-0 bg-linear-to-tr from-black via-transparent to-black" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
