'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

import { type Insight } from '@/lib/data/insights';

interface InsightsClientProps {
  insights: Insight[];
  locale: string;
}

export function InsightsClient({ insights, locale }: InsightsClientProps) {
  const isArabic = locale === 'ar';
  
  const categories = ['All', ...Array.from(new Set(insights.map((i) => i.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredInsights =
    activeCategory === 'All'
      ? insights
      : insights.filter((i) => i.category === activeCategory);

  return (
    <div className="bg-surface pb-32">
      <Container size="xl" className="pt-16">
        {/* The Grid Group allows us to dim un-hovered cards using group-hover/grid */}
        <motion.div layout className="group/grid grid auto-rows-[minmax(300px,auto)] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {/* Market Snapshot Data Widget */}
            {activeCategory === 'All' && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-none border border-border bg-surface-subtle p-8 shadow-2xs transition-all duration-500 group-hover/grid:opacity-40 hover:opacity-100! hover:shadow-xl md:col-span-2"
              >
                {/* Subtle Radial Glow on Hover */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-emerald-500)_0%,transparent_70%)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10" />
                
                <div className="relative z-10 flex w-full items-start justify-between">
                  <div>
                    <div className="mb-2 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">{isArabic ? 'لمحة سريعة عن السوق' : 'Market Snapshot'}</div>
                    <div className="font-serif text-5xl tracking-tight text-ink lg:text-6xl">+6.4%</div>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-none border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>

                {/* Animated Sparkline */}
                <div className="relative z-10 mt-8 w-full">
                  <svg viewBox="0 0 100 40" className="stroke-[1.5] h-20 w-full overflow-visible fill-none stroke-emerald-500">
                    {/* Background faint line */}
                    <path d="M0,35 L20,30 L40,32 L60,18 L80,22 L100,5" className="stroke-emerald-500/20" />
                    {/* Animated foreground line */}
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
                      d="M0,35 L20,30 L40,32 L60,18 L80,22 L100,5"
                    />
                    <motion.circle 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      cx="100" cy="5" r="3" 
                      className="fill-emerald-500 stroke-surface-subtle stroke-2" 
                    />
                  </svg>
                  <div className="mt-4 flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Q2 2026</span>
                    <span>Q3 2026</span>
                  </div>
                </div>
              </motion.div>
            )}

            {filteredInsights.map((insight) => (
              <motion.div
                layout
                key={insight.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'group relative overflow-hidden rounded-none border border-border bg-surface shadow-2xs transition-all duration-500 group-hover/grid:opacity-40 hover:-translate-y-1 hover:opacity-100! hover:shadow-2xl',
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
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    {/* Cinematic Gradient: Darker at bottom for serif text readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
                  {/* Category Tag */}
                  <div className="mb-auto">
                    <div className={cn(
                      "w-fit rounded-none border px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md transition-colors",
                      insight.image 
                        ? "border-white/20 bg-black/40 text-white" 
                        : "border-fjord/20 bg-fjord/5 text-fjord"
                    )}>
                      {insight.category}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="mt-8 flex flex-col justify-end">
                    <h3 className={cn(
                      "mb-4 font-serif text-2xl tracking-tight transition-colors md:text-3xl lg:text-4xl",
                      insight.image ? "text-white" : "text-ink group-hover:text-fjord"
                    )}>
                      {insight.title}
                    </h3>
                    
                    {(!insight.image || insight.bentoSpan?.includes('row-span-2') || insight.bentoSpan?.includes('col-span-2')) && (
                      <p className={cn(
                        "mb-6 line-clamp-2 text-sm leading-relaxed",
                        insight.image ? "text-white/70" : "text-muted-foreground"
                      )}>
                        {insight.description}
                      </p>
                    )}
                    
                    {/* Magnetic Pull Read Button */}
                    <div className={cn(
                      "flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:gap-4",
                      insight.image ? "text-white/90 group-hover:text-white" : "text-fjord"
                    )}>
                      {isArabic ? 'قراءة المقال' : 'Read Article'} <ArrowRight className="size-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* The Floating Square Dock Navigation */}
      <div className="fixed bottom-8 left-1/2 z-50 w-full -translate-x-1/2 px-4 md:w-auto">
        <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto rounded-none border border-border/50 bg-surface/80 p-1.5 shadow-2xl saturate-200 backdrop-blur-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                'relative shrink-0 rounded-none px-5 py-2.5 text-[10px] font-bold tracking-[0.15em] uppercase outline-hidden transition-colors focus-visible:ring-2 focus-visible:ring-fjord',
                activeCategory === cat ? 'text-white' : 'text-muted-foreground hover:text-ink'
              )}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeDockBackground"
                  className="absolute inset-0 z-0 bg-fjord shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">
                {cat === 'All' ? (isArabic ? 'الكل' : 'All') : cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
