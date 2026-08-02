'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, Building2 } from 'lucide-react';
import { Container } from '@/components/layout/container';

interface TransactionItem {
  id: string;
  location: string;
  type: string;
  amount: string;
  timeAgo: string;
  verified: boolean;
}

const RECENT_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-1',
    location: 'Palm Jumeirah',
    type: '4BR Signature Villa',
    amount: 'AED 24,500,000',
    timeAgo: '2m ago',
    verified: true,
  },
  {
    id: 'tx-2',
    location: 'Downtown Dubai',
    type: '2BR Boulevard Penthouse',
    amount: 'AED 4,850,000',
    timeAgo: '6m ago',
    verified: true,
  },
  {
    id: 'tx-3',
    location: 'Dubai Hills Estate',
    type: '5BR Golf Mansion',
    amount: 'AED 16,200,000',
    timeAgo: '12m ago',
    verified: true,
  },
  {
    id: 'tx-4',
    location: 'Dubai Creek Harbour',
    type: '3BR Waterfront Apt',
    amount: 'AED 3,650,000',
    timeAgo: '18m ago',
    verified: true,
  },
  {
    id: 'tx-5',
    location: 'Jumeirah Beach Residence',
    type: '1BR Sea View Loft',
    amount: 'AED 2,150,000',
    timeAgo: '24m ago',
    verified: true,
  },
];

export function LiveTransactionTicker({
  isArabic = false,
}: {
  isArabic?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % RECENT_TRANSACTIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentTx = RECENT_TRANSACTIONS[activeIndex];

  return (
    <div className="w-full border-y border-border/60 bg-surface/80 py-2.5 backdrop-blur-sm dark:border-border dark:bg-fjord-hover/60">
      <Container size="lg" className="flex items-center justify-between">
        {/* Left Label */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-none bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-none bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">
            {isArabic ? 'تحديثات دائرة الأراضي المباشرة' : 'Live DLD Feed'}
          </span>
        </div>

        {/* Center Live Ticker Item */}
        <div className="flex items-center gap-3 overflow-hidden text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-medium text-fjord dark:text-muted">
            <Building2 className="size-3.5 text-muted" />
            <span>{currentTx.location}</span>
            <span className="text-muted">•</span>
            <span className="text-muted dark:text-muted">
              {currentTx.type}
            </span>
          </div>

          <span className="font-semibold text-emerald-800 dark:text-emerald-300">
            {currentTx.amount}
          </span>

          <span className="hidden rounded-none bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 md:inline-flex md:items-center md:gap-1 dark:bg-emerald-950/60 dark:text-emerald-300">
            <ShieldCheck className="size-3" />
            {isArabic ? 'مسجل' : 'DLD Verified'}
          </span>

          <span className="text-[11px] text-muted">
            {currentTx.timeAgo}
          </span>
        </div>

        {/* Right Metric */}
        <div className="hidden items-center gap-1.5 text-xs text-muted lg:flex">
          <TrendingUp className="size-3.5 text-emerald-600" />
          <span>
            {isArabic
              ? 'حجم تداول اليوم: 412M AED'
              : "Today's Volume: AED 412M"}
          </span>
        </div>
      </Container>
    </div>
  );
}
