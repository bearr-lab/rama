'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, TrendingUp, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  intensity: 0 | 1 | 2 | 3 | 4;
  summary?: string;
}

export interface ContributionGraphProps {
  data?: ContributionDay[];
  title?: string;
  subtitle?: string;
  totalLabel?: string;
  className?: string;
}

const intensityColors = {
  0: 'bg-fjord/10 dark:bg-fjord/20',
  1: 'bg-sky-500/30 dark:bg-sky-500/30',
  2: 'bg-sky-500/60 dark:bg-sky-500/60',
  3: 'bg-fjord/90 dark:bg-sky-400',
  4: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const daysOfWeek = ['Mon', 'Wed', 'Fri'];

export const ContributionGraph = ({
  data,
  title = 'AI Decision Engine & Escrow Audit Heatmap',
  subtitle = '365-Day Cryptographic Verification Activity',
  totalLabel = '1,284 Verified Transactions in 2026',
  className,
}: ContributionGraphProps) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Generate 52 weeks of mock data if none provided
  const gridData = useMemo(() => {
    if (data && data.length > 0) return data;
    const days: ContributionDay[] = [];
    const today = new Date('2026-07-26');
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      // Random intensity weighted towards active days
      const rand = Math.random();
      let count = 0;
      let intensity: 0 | 1 | 2 | 3 | 4 = 0;
      if (rand > 0.4) {
        intensity = 1;
        count = Math.floor(Math.random() * 3) + 1;
      }
      if (rand > 0.7) {
        intensity = 2;
        count = Math.floor(Math.random() * 5) + 3;
      }
      if (rand > 0.88) {
        intensity = 3;
        count = Math.floor(Math.random() * 8) + 6;
      }
      if (rand > 0.96) {
        intensity = 4;
        count = Math.floor(Math.random() * 15) + 12;
      }
      days.push({
        date: dateStr,
        count,
        intensity,
        summary:
          count > 0
            ? `${count} DLD escrow verifications & AI valuations`
            : 'No recorded transactions',
      });
    }
    return days;
  }, [data]);

  // Group into columns (weeks) of 7 days
  const weeks = useMemo(() => {
    const w: ContributionDay[][] = [];
    for (let i = 0; i < gridData.length; i += 7) {
      w.push(gridData.slice(i, i + 7));
    }
    return w;
  }, [gridData]);

  return (
    <div
      className={cn(
        'rounded-3xl border border-border/60 bg-surface p-6 shadow-sm',
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border/40 pb-5 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold tracking-widest text-fjord uppercase">
            {subtitle}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-fjord sm:text-2xl">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-subtle px-3.5 py-1.5 text-xs font-bold text-fjord">
            <Sparkles className="size-3.5 text-fjord" />
            <span>{totalLabel}</span>
          </span>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="relative overflow-x-auto pb-4">
        {/* Month Labels */}
        <div className="mb-2 ml-8 flex min-w-[650px] justify-between text-[11px] font-semibold text-muted">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        <div className="flex min-w-[650px] gap-2">
          {/* Day Labels */}
          <div className="flex flex-col justify-around py-1 pr-2 text-[10px] font-bold text-muted">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid Columns */}
          <div className="flex flex-1 items-center justify-between gap-1">
            {weeks.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-1">
                {week.map((day) => (
                  <motion.div
                    key={day.date}
                    whileHover={{ scale: 1.4, zIndex: 20 }}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={cn(
                      'size-3 cursor-pointer rounded-sm transition-colors',
                      intensityColors[day.intensity],
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer & Legend */}
      <div className="mt-4 flex flex-col justify-between gap-4 border-t border-border/40 pt-4 text-xs sm:flex-row sm:items-center">
        <div className="min-h-5 font-medium text-muted">
          {hoveredDay ? (
            <span className="font-bold text-fjord">
              {hoveredDay.date}:{' '}
              <span className="font-normal text-fjord">
                {hoveredDay.summary}
              </span>
            </span>
          ) : (
            <span>Hover over any day to inspect escrow audit logs</span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 font-semibold text-muted">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={cn(
                  'size-3 rounded-sm',
                  intensityColors[i as 0 | 1 | 2 | 3 | 4],
                )}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
