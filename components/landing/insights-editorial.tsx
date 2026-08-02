'use client';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Mail, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface InsightsEditorialProps {
  isArabic?: boolean;
}

export function InsightsEditorial({ isArabic }: InsightsEditorialProps) {
  const trendingTopics = [
    {
      title: isArabic
        ? 'تقرير السوق للربع الثالث ٢٠٢٦'
        : 'Q3 2026 Market Report',
      category: isArabic ? 'تحليل' : 'Analysis',
    },
    {
      title: isArabic
        ? 'عقارات قيد الإنشاء مقابل الجاهزة'
        : 'Off-Plan vs Ready Properties',
      category: isArabic ? 'دليل استثماري' : 'Investment Guide',
    },
    {
      title: isArabic
        ? 'تأثير التأشيرة الذهبية على الإيجارات'
        : 'Golden Visa Impact on Rentals',
      category: isArabic ? 'اقتصاد' : 'Economy',
    },
  ];

  return (
    <>
      {/* Trending Topics (Minimalist Grid) */}
      <Section className="border-t border-border/40 bg-surface py-12 dark:border-border/40 dark:bg-fjord-hover">
        <Container size="lg">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-fjord dark:text-white">
              <TrendingUp className="size-5" />
              {isArabic ? 'المواضيع الشائعة' : 'Trending Topics'}
            </h2>
            <Link
              href="#"
              className="text-xs font-bold tracking-widest text-muted uppercase hover:text-fjord dark:hover:text-muted"
            >
              {isArabic ? 'عرض الكل' : 'View All'}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {trendingTopics.map((topic, idx) => (
              <Link
                key={idx}
                href="#"
                className="group flex flex-col border border-border/40 bg-white p-6 transition-colors hover:border-border dark:border-border/40 dark:bg-fjord-hover dark:hover:border-border"
              >
                <span className="mb-3 text-[10px] font-bold tracking-widest text-muted uppercase">
                  {topic.category}
                </span>
                <h3 className="font-display text-base leading-tight font-bold text-fjord transition-colors group-hover:text-muted dark:text-muted dark:group-hover:text-muted">
                  {topic.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Brutalist Newsletter Capture */}
      <Section className="border-t border-border bg-fjord py-24 text-white">
        <Container size="md">
          <div className="flex flex-col items-center text-center">
            <Mail className="mb-6 size-12 text-muted" strokeWidth={1} />
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              {isArabic ? 'ذكاء السوق' : 'Market Intelligence'}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              {isArabic
                ? 'انضم إلى أكثر من 10,000 مستثمر يتلقون تقاريرنا الحصرية حول السوق العقاري في دبي مباشرة في صندوق الوارد.'
                : 'Join over 10,000 global investors receiving institutional-grade market analysis directly in their inbox every week.'}
            </p>

            <form className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder={
                  isArabic ? 'عنوان البريد الإلكتروني' : 'Email Address'
                }
                className="h-12 w-full rounded-none border border-border bg-fjord-hover px-4 text-sm text-white placeholder:text-muted focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
                required
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center bg-white px-8 text-xs font-bold tracking-widest text-fjord uppercase transition-colors hover:bg-surface-subtle"
              >
                {isArabic ? 'اشتراك' : 'Subscribe'}
              </button>
            </form>
            <p className="mt-4 text-[10px] tracking-widest text-muted uppercase">
              {isArabic
                ? 'لن نرسل لك رسائل مزعجة.'
                : 'No spam. Unsubscribe anytime.'}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
