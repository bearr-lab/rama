'use client';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Gem, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HomesEditorialProps {
  isArabic?: boolean;
  locale?: string;
}

export function HomesEditorial({ isArabic, locale = 'en' }: HomesEditorialProps) {
  const standards = [
    {
      icon: Gem,
      title: isArabic ? 'مجموعة منتقاة' : 'Curated Selection',
      description: isArabic
        ? 'نقوم بفحص كل عقار للتأكد من جودة البناء، الموقع المميز، وإمكانيات نمو رأس المال.'
        : 'Every property is rigorously vetted for build quality, prime location, and capital appreciation potential.',
    },
    {
      icon: ShieldCheck,
      title: isArabic ? 'معاملات آمنة' : 'Secure Transactions',
      description: isArabic
        ? 'فريقنا القانوني يضمن انتقال الملكية بسلاسة وحماية كاملة لأموالك.'
        : 'Our in-house legal team ensures seamless title transfers and complete escrow protection.',
    },
    {
      icon: Clock,
      title: isArabic ? 'تسليم فوري' : 'Immediate Handover',
      description: isArabic
        ? 'انتقل إلى منزلك الجديد أو ابدأ في جني العوائد الإيجارية منذ اليوم الأول.'
        : 'Move into your new home or begin generating rental yields from day one.',
    },
  ];

  const collections = [
    {
      title: isArabic ? 'فلل سكاي ووترفرونت' : 'Waterfront Villas',
      image: '/images/properties/property-villa.jpg',
      tag: isArabic ? 'موصى به' : 'Featured',
    },
    {
      title: isArabic ? 'بنتهاوس فاخر' : 'Luxury Penthouses',
      image: '/images/properties/property-penthouse.jpg',
      tag: isArabic ? 'عائد مرتفع' : 'High Yield',
    },
  ];

  return (
    <>
      {/* Curated Collections */}
      <Section className="bg-stone-100 py-16 dark:bg-stone-900">
        <Container size="lg">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-50">
              {isArabic ? 'مجموعات حصرية' : 'Exclusive Collections'}
            </h2>
            <p className="mt-4 max-w-2xl text-stone-500 dark:text-stone-400">
              {isArabic
                ? 'استكشف أسلوب الحياة الذي يناسبك من خلال مجموعاتنا المصممة خصيصاً لأصحاب الذوق الرفيع.'
                : 'Explore lifestyles tailored to your exact specifications through our hand-picked property portfolios.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {collections.map((col, idx) => (
              <Link
                key={idx}
                href={`/${locale}/homes`}
                className="group relative h-96 overflow-hidden bg-stone-900"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-6 top-6 flex justify-end">
                  <span className="border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                    {col.tag}
                  </span>
                </div>
                <div className="absolute inset-x-6 bottom-8">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {col.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-white/70 uppercase transition-colors group-hover:text-white">
                    {isArabic ? 'استكشف المجموعة' : 'Explore Collection'}
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* The Rama Standard */}
      <Section className="bg-stone-50 py-24 dark:bg-stone-950">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <span className="text-[10px] font-bold tracking-widest text-stone-500 uppercase">
                {isArabic ? 'وعد راما' : 'The Rama Promise'}
              </span>
              <h2 className="mt-3 font-display text-3xl leading-tight font-bold text-stone-900 dark:text-stone-50">
                {isArabic ? 'معيار راما' : 'The Rama Standard'}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                {isArabic
                  ? 'لا نكتفي بإدراج العقارات، بل نختار الأفضل في دبي حصرياً، لنضمن لك استثماراً يفوق التوقعات.'
                  : 'We do not simply list properties. We exclusively curate the top 1% of Dubai’s real estate market, ensuring your investment exceeds expectations.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:col-span-2">
              {standards.map((std, idx) => (
                <div key={idx} className="flex flex-col">
                  <std.icon className="mb-4 size-6 text-stone-900 dark:text-stone-100" />
                  <h3 className="mb-2 font-display text-lg font-bold text-stone-900 dark:text-stone-50">
                    {std.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {std.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
