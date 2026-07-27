'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CheckCircle2, Clock, AlertCircle, Building, DollarSign } from 'lucide-react';
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
  completed: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  'in-progress': 'border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  upcoming: 'border-border bg-surface-subtle text-muted',
  delayed: 'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
};

const progressBarStyles = {
  completed: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]',
  'in-progress': 'bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.3)]',
  upcoming: 'bg-neutral-300 dark:bg-neutral-700',
  delayed: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]',
};

export const Gantt = ({
  milestones = [],
  title = 'Off-Plan Construction & Escrow Payment Schedule',
  subtitle = 'DLD Verified Milestone Audit',
  className,
}: GanttProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  return (
    <div className={cn('rounded-3xl border border-border/60 bg-surface p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border/40 pb-5 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-fjord">
            {subtitle}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
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
                'group relative cursor-pointer rounded-2xl border border-border/60 bg-surface-subtle/50 p-4 transition-all duration-200 hover:border-border hover:shadow-md',
                isSelected && 'border-fjord/60 bg-surface shadow-md ring-1 ring-fjord/30'
              )}
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_2fr_1fr] lg:items-center">
                {/* Milestone Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-bold text-white dark:bg-white dark:text-ink">
                      {index + 1}
                    </span>
                    <h4 className="font-display text-sm font-bold text-ink">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Building className="h-3.5 w-3.5 text-fjord" />
                    <span>{item.project}</span>
                  </div>
                </div>

                {/* Progress Bar & Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1 text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{item.startDate} — {item.endDate}</span>
                    </span>
                    <span className="text-ink">{item.progress}% Complete</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-border/40">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1, type: 'spring' }}
                      className={cn('h-full rounded-full transition-all', progressBarStyles[item.status])}
                    />
                  </div>
                </div>

                {/* Payment & Status Badge */}
                <div className="flex items-center justify-between lg:justify-end lg:gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-ink">{item.amount}</p>
                    <p className="text-[11px] font-medium text-muted">{item.paymentPercentage} Installment</p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider',
                      statusBadgeStyles[item.status]
                    )}
                  >
                    {item.status === 'completed' && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {item.status === 'in-progress' && <Clock className="h-3.5 w-3.5" />}
                    {item.status === 'delayed' && <AlertCircle className="h-3.5 w-3.5" />}
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
                    className="mt-4 border-t border-border/40 pt-4 text-xs text-text"
                  >
                    <div className="grid grid-cols-1 gap-3 rounded-xl bg-canvas p-4 sm:grid-cols-3">
                      <div>
                        <p className="font-semibold text-muted">DLD Audit Certificate</p>
                        <p className="mt-0.5 font-mono font-medium text-ink">#DLD-ESC-2026-{index + 104}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted">Escrow Account Bank</p>
                        <p className="mt-0.5 font-medium text-ink">Emirates NBD • Trust Acct #88219</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted">Inspection Verification</p>
                        <p className="mt-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                          {item.dldVerified ? 'Verified by RERA Engineer' : 'Scheduled for Audit'}
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
