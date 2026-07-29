'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

import { Container } from '@/components/layout/container';
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

  return (
    <div className="bg-surface pb-24">

      {/* 2. Interactive Category Filters */}
      <div className="sticky top-16 z-40 w-full border-b border-border bg-surface/80 saturate-200 backdrop-blur-2xl">
        <Container size="xl">
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <div className="scrollbar-hide flex items-center gap-6 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'text-sm font-medium whitespace-nowrap transition-colors hover:text-fjord',
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
        <motion.div layout className="grid auto-rows-75 grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {/* Insert a Data Snapshot Card if we are on 'All' */}
            {activeCategory === 'All' && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-none bg-fjord p-8 text-white shadow-xl md:col-span-2"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <TrendingUp className="size-32" />
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-white/80">{isArabic ? 'لمحة سريعة عن السوق' : 'Market Snapshot'}</div>
                  <div className="font-display text-4xl font-bold lg:text-5xl">+6.4% YoY</div>
                </div>
                <p className="text-lg text-white/90">
                  {isArabic 
                    ? 'متوسط العائد على الاستثمار لعقارات دبي الرئيسية في الربع الثالث متجاوزاً التوقعات.'
                    : 'Average ROI for Dubai prime real estate in Q3, outperforming expectations.'}
                </p>
              </motion.div>
            )}

            {filteredInsights.map((insight) => (
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
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
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
                    "mb-2 line-clamp-2 font-display font-semibold transition-colors",
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
                    {isArabic ? 'قراءة' : 'Read'} <ArrowRight className="size-4" />
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
