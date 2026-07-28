'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Insight {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  image?: string;
  bentoSpan?: string;
}

interface InsightsClientProps {
  insights: Insight[];
  locale: string;
}

export function InsightsClient({ insights, locale }: InsightsClientProps) {
  const isArabic = locale === 'ar';
  
  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(insights.map((i) => i.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredInsights =
    activeCategory === 'All'
      ? insights
      : insights.filter((i) => i.category === activeCategory);

  // The hero article is the first insight
  const heroInsight = insights[0];
  const gridInsights = filteredInsights.filter(i => activeCategory === 'All' ? i.id !== heroInsight.id : true);

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* 1. Cinematic Hero Featured Article */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src={heroInsight.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000"}
          alt={heroInsight.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <Container size="xl" className="relative h-full flex flex-col justify-end pb-24 z-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-fjord animate-pulse" />
              {isArabic ? 'تقرير مميز' : 'Featured Report'}
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl mb-6">
              {heroInsight.title}
            </h1>
            <p className="text-lg text-white/80 md:text-xl mb-10 max-w-2xl">
              {heroInsight.description}
            </p>
            <MagneticButton
              render={
                <Link
                  href={`/${locale}/insights/${heroInsight.id}`}
                  className="inline-flex items-center justify-center rounded-none h-9 px-6 bg-white text-ink hover:bg-white/90 font-bold tracking-widest uppercase text-[11px] transition-colors"
                >
                  {isArabic ? 'قراءة التقرير الكامل' : 'Read Full Report'}
                </Link>
              }
            />
          </div>
        </Container>
      </section>

      {/* 2. Interactive Category Filters */}
      <div className="sticky top-16 z-40 w-full border-b border-border bg-surface/80 backdrop-blur-2xl saturate-[1.8]">
        <Container size="xl">
          <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'whitespace-nowrap text-sm font-medium transition-colors hover:text-fjord',
                  activeCategory === cat ? 'text-fjord' : 'text-muted-foreground'
                )}
              >
                {cat === 'All' ? (isArabic ? 'الكل' : 'All') : cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="mt-1 h-0.5 w-full bg-fjord"
                  />
                )}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* 3. Editorial Bento Grid */}
      <Container size="xl" className="pt-16">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {/* Insert a Data Snapshot Card if we are on 'All' */}
            {activeCategory === 'All' && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="col-span-1 md:col-span-2 row-span-1 flex flex-col justify-between overflow-hidden rounded-none bg-fjord p-8 text-white shadow-xl relative"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <TrendingUp className="h-32 w-32" />
                </div>
                <div>
                  <div className="text-white/80 text-sm font-medium mb-2">{isArabic ? 'لمحة سريعة عن السوق' : 'Market Snapshot'}</div>
                  <div className="font-display text-4xl lg:text-5xl font-bold">+6.4% YoY</div>
                </div>
                <p className="text-lg text-white/90">
                  {isArabic 
                    ? 'متوسط العائد على الاستثمار لعقارات دبي الرئيسية في الربع الثالث متجاوزاً التوقعات.'
                    : 'Average ROI for Dubai prime real estate in Q3, outperforming expectations.'}
                </p>
              </motion.div>
            )}

            {gridInsights.map((insight) => (
              <motion.div
                layout
                key={insight.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  'group relative overflow-hidden rounded-none bg-surface-subtle shadow-sm transition-all hover:shadow-xl',
                  insight.bentoSpan || 'col-span-1 row-span-1'
                )}
              >
                <Link href={`/${locale}/insights/${insight.id}`} className="absolute inset-0 z-20">
                  <span className="sr-only">Read {insight.title}</span>
                </Link>
                
                {insight.image && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                  <div className={cn(
                    "mb-3 w-fit rounded-none px-3 py-1 text-xs font-medium backdrop-blur-md",
                    insight.image ? "bg-white/20 text-white" : "bg-fjord/10 text-fjord"
                  )}>
                    {insight.category}
                  </div>
                  <h3 className={cn(
                    "mb-2 font-display font-semibold transition-colors line-clamp-2",
                    insight.image ? "text-white group-hover:text-white/90" : "text-ink group-hover:text-fjord",
                    insight.bentoSpan?.includes('row-span-2') ? "text-2xl md:text-3xl" : "text-xl"
                  )}>
                    {insight.title}
                  </h3>
                  {(!insight.image || insight.bentoSpan?.includes('row-span-2') || insight.bentoSpan?.includes('col-span-2')) && (
                    <p className={cn(
                      "line-clamp-2 text-sm",
                      insight.image ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {insight.description}
                    </p>
                  )}
                  
                  <div className={cn(
                    "mt-4 flex items-center gap-2 text-sm font-medium transition-transform group-hover:translate-x-1",
                    insight.image ? "text-white" : "text-fjord"
                  )}>
                    {isArabic ? 'قراءة' : 'Read'} <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </div>
  );
}
