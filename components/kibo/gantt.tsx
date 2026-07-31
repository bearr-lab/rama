'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GanttMilestone {
  id: string;
  title: string;
  project: string;
  startDate: string;
  endDate: string;
  progress: number; // 0 - 100
  paymentPercentage: string; // e.g. "10%"
  amount: string; // e.g. "AED 1,825,000"
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
  dldVerified?: boolean;
}

export interface GanttProps {
  milestones: GanttMilestone[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const statusBadgeStyles = {
  completed:
    'border-stone-800/20 bg-stone-800/10 text-stone-800 dark:text-stone-100',
  'in-progress':
    'border-stone-300/20 dark:border-stone-700/20 bg-stone-200/10 dark:bg-stone-800/10 text-stone-600 dark:text-stone-400 dark:text-stone-600 dark:text-stone-400',
  upcoming:
    'border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400',
  delayed:
    'border-stone-400/20 dark:border-stone-600/20 bg-stone-200/10 dark:bg-stone-800/10 text-stone-800 dark:text-stone-200 dark:text-stone-800 dark:text-stone-200',
};

const progressBarStyles = {
  completed: 'bg-stone-800 shadow-[0_0_12px_rgba(16,185,129,0.3)]',
  'in-progress': 'bg-stone-200 dark:bg-stone-800 ',
  upcoming: 'bg-neutral-300 dark:bg-neutral-700',
  delayed: 'bg-stone-200 dark:bg-stone-800 ',
};

export const Gantt = ({
  milestones = [],
  title = 'Off-Plan Construction & Escrow Payment Schedule',
  subtitle = 'DLD Verified Milestone Audit',
  className,
}: GanttProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(
    null,
  );

  return (
    <div
      className={cn(
        'border border-stone-300/60 bg-stone-50 p-6 shadow-sm dark:border-stone-800/60 dark:bg-stone-950',
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-stone-300/40 pb-5 sm:flex-row sm:items-center dark:border-stone-800/40">
        <div>
          <span className="text-xs font-bold tracking-widest text-stone-900 uppercase dark:text-stone-100">
            {subtitle}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-stone-900 sm:text-2xl dark:text-stone-50">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-stone-800/10 px-3 py-1 text-xs font-semibold text-stone-800 dark:text-stone-100">
            <CheckCircle2 className="size-3.5" />
            <span>RERA Escrow Protected</span>
          </span>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-4">
        {milestones.map((item, index) => {
          const isSelected = selectedMilestone === item.id;
          return (
            <motion.div
              key={item.id}
              onClick={() => setSelectedMilestone(isSelected ? null : item.id)}
              whileHover={{ scale: 1.005 }}
              className={cn(
                'group relative cursor-pointer border border-stone-300/60 bg-stone-100/50 p-4 transition-all duration-200 hover:border-stone-300 hover:shadow-md dark:border-stone-800/60 dark:bg-stone-900/50',
                isSelected &&
                  'border-stone-900/60 bg-stone-50 shadow-md ring-1 ring-fjord/30 dark:border-stone-100/60 dark:bg-stone-950',
              )}
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_2fr_1fr] lg:items-center">
                {/* Milestone Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center bg-ink text-xs font-bold text-white dark:bg-white dark:text-stone-900">
                      {index + 1}
                    </span>
                    <h4 className="font-display text-sm font-bold text-stone-900 dark:text-stone-50">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <Building className="size-3.5 text-stone-900 dark:text-stone-100" />
                    <span>{item.project}</span>
                  </div>
                </div>

                {/* Progress Bar & Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                      <Calendar className="size-3.5" />
                      <span>
                        {item.startDate} — {item.endDate}
                      </span>
                    </span>
                    <span className="text-stone-900 dark:text-stone-50">
                      {item.progress}% Complete
                    </span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden bg-border/40">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                        type: 'spring',
                      }}
                      className={cn(
                        'h-full transition-all',
                        progressBarStyles[item.status],
                      )}
                    />
                  </div>
                </div>

                {/* Payment & Status Badge */}
                <div className="flex items-center justify-between lg:justify-end lg:gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-50">
                      {item.amount}
                    </p>
                    <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                      {item.paymentPercentage} Installment
                    </p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 border px-3 py-1 text-xs font-bold tracking-wider uppercase',
                      statusBadgeStyles[item.status],
                    )}
                  >
                    {item.status === 'completed' && (
                      <CheckCircle2 className="size-3.5" />
                    )}
                    {item.status === 'in-progress' && (
                      <Clock className="size-3.5" />
                    )}
                    {item.status === 'delayed' && (
                      <AlertCircle className="size-3.5" />
                    )}
                    <span>{item.status.replace('-', ' ')}</span>
                  </span>
                </div>
              </div>

              {/* Expandable DLD Cryptographic Proof */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 border-t border-stone-300/40 pt-4 text-xs text-text dark:border-stone-800/40"
                  >
                    <div className="grid grid-cols-1 gap-3 bg-stone-50 p-4 sm:grid-cols-3 dark:bg-stone-950">
                      <div>
                        <p className="font-semibold text-stone-500 dark:text-stone-400">
                          DLD Audit Certificate
                        </p>
                        <p className="mt-0.5 font-mono font-medium text-stone-900 dark:text-stone-50">
                          #DLD-ESC-2026-{index + 104}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-stone-500 dark:text-stone-400">
                          Escrow Account Bank
                        </p>
                        <p className="mt-0.5 font-medium text-stone-900 dark:text-stone-50">
                          Emirates NBD • Trust Acct #88219
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-stone-500 dark:text-stone-400">
                          Inspection Verification
                        </p>
                        <p className="mt-0.5 font-medium text-stone-800 dark:text-stone-100">
                          {item.dldVerified
                            ? 'Verified by RERA Engineer'
                            : 'Scheduled for Audit'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
