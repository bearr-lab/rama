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
    'border-border-strong/20 bg-ink/10 text-ink ',
  'in-progress':
    'border-border/60/20  bg-border/50/10  text-muted-foreground dark:text-muted/50 dark:text-muted-foreground dark:text-muted/50',
  upcoming:
    'border-border/60  bg-surface  text-muted-foreground dark:text-muted/50',
  delayed:
    'border-stone-400/20  bg-border/50/10  text-ink dark:text-stone-200  dark:text-stone-200',
};

const progressBarStyles = {
  completed: 'bg-ink shadow-sm',
  'in-progress': 'bg-border/50  ',
  upcoming: 'bg-neutral-300 dark:bg-neutral-700',
  delayed: 'bg-border/50  ',
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
        'border-border/60/60 border bg-surface-subtle p-6 shadow-sm  ',
        className,
      )}
    >
      {/* Header */}
      <div className="border-border/60/40 mb-6 flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center ">
        <div>
          <span className="text-xs font-bold tracking-widest text-ink uppercase ">
            {subtitle}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl ">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-ink/10 px-3 py-1 text-xs font-semibold text-ink ">
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
              className={cn(
                'group border-border/60/60 relative cursor-pointer border bg-surface/50 p-4 transition-all duration-200 hover:border-border/60  ',
                isSelected &&
                  'shadow-elevated border-fjord/60 bg-surface-subtle ring-1 ring-ink  ',
              )}
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_2fr_1fr] lg:items-center">
                {/* Milestone Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center bg-ink text-xs font-bold text-white dark:bg-white ">
                      {index + 1}
                    </span>
                    <h4 className="font-display text-sm font-bold text-ink ">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-muted/50">
                    <Building className="size-3.5 text-ink " />
                    <span>{item.project}</span>
                  </div>
                </div>

                {/* Progress Bar & Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1 text-muted-foreground dark:text-muted/50">
                      <Calendar className="size-3.5" />
                      <span>
                        {item.startDate} — {item.endDate}
                      </span>
                    </span>
                    <span className="text-ink ">
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
                    <p className="text-xs font-bold text-ink ">
                      {item.amount}
                    </p>
                    <p className="text-[11px] font-medium text-muted-foreground dark:text-muted/50">
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
                    className="border-border/60/40 mt-4 border-t pt-4 text-xs text-text "
                  >
                    <div className="grid grid-cols-1 gap-3 bg-surface-subtle p-4 sm:grid-cols-3 ">
                      <div>
                        <p className="font-semibold text-muted-foreground dark:text-muted/50">
                          DLD Audit Certificate
                        </p>
                        <p className="mt-0.5 font-mono font-medium text-ink ">
                          #DLD-ESC-2026-{index + 104}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground dark:text-muted/50">
                          Escrow Account Bank
                        </p>
                        <p className="mt-0.5 font-medium text-ink ">
                          Emirates NBD • Trust Acct #88219
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground dark:text-muted/50">
                          Inspection Verification
                        </p>
                        <p className="mt-0.5 font-medium text-ink ">
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
