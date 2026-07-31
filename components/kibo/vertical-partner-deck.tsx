'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  ArrowUpDown,
  Building2,
  Landmark,
  FileCheck2,
  Zap,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';

export interface Partner {
  id: string;
  name: string;
  category: 'government' | 'developer' | 'bank';
  categoryLabelEn: string;
  categoryLabelAr: string;
  roleEn: string;
  roleAr: string;
  badgeEn: string;
  badgeAr: string;
  lawVerification: string;
  trustScore: number;
}

const PARTNERS: Partner[] = [
  {
    id: 'dld',
    name: 'Dubai Land Department',
    category: 'government',
    categoryLabelEn: 'Government Authority',
    categoryLabelAr: 'جهة حكومية',
    roleEn: 'Official DLD Registry API',
    roleAr: 'السجل العقاري الحكومي المباشر',
    badgeEn: 'Government Direct Sync',
    badgeAr: 'ربط حكومي مباشر',
    lawVerification: 'Law No. 8 of 2007 Compliant',
    trustScore: 100,
  },
  {
    id: 'emaar',
    name: 'Emaar Properties',
    category: 'developer',
    categoryLabelEn: 'Master Developer',
    categoryLabelAr: 'مطور رئيسي',
    roleEn: 'Downtown & Dubai Creek Master Plan',
    roleAr: 'المخطط الرئيسي لوسط دبي وخور دبي',
    badgeEn: 'Tier 1 Escrow Active',
    badgeAr: 'حساب ضمان نشط',
    lawVerification: 'RERA Escrow Account #8891-A',
    trustScore: 99,
  },
  {
    id: 'nakheel',
    name: 'Nakheel Properties',
    category: 'developer',
    categoryLabelEn: 'Waterfront Developer',
    categoryLabelAr: 'مطور الواجهات البحرية',
    roleEn: 'Palm Jumeirah & Palm Jebel Ali Developer',
    roleAr: 'مطور نخلة جميرا ونخلة جبل علي',
    badgeEn: 'Direct RERA Sync',
    badgeAr: 'ربط مباشر مع ريرا',
    lawVerification: 'RERA Escrow Account #9042-B',
    trustScore: 98,
  },
  {
    id: 'dubai-holding',
    name: 'Dubai Holding',
    category: 'developer',
    categoryLabelEn: 'Institutional Developer',
    categoryLabelAr: 'مطور مؤسسي',
    roleEn: 'Madinat Jumeirah Living & City Walk',
    roleAr: 'مدينة جميرا لايفينج وسيتي ووك',
    badgeEn: 'Verified Portfolio',
    badgeAr: 'محفظة معتمدة',
    lawVerification: 'RERA Escrow Account #7712-C',
    trustScore: 97,
  },
  {
    id: 'enbd',
    name: 'Emirates NBD',
    category: 'bank',
    categoryLabelEn: 'Escrow Trustee Bank',
    categoryLabelAr: 'بنك أمين الحفظ',
    roleEn: 'RERA Licensed Trustee & Custody',
    roleAr: 'أمين أمانة وحفظ معتمد من ريرا',
    badgeEn: 'Direct Banking API',
    badgeAr: 'ربط بنكي مباشر',
    lawVerification: 'CBUAE & RERA Licensed',
    trustScore: 100,
  },
  {
    id: 'fab',
    name: 'First Abu Dhabi Bank (FAB)',
    category: 'bank',
    categoryLabelEn: 'Mortgage & Escrow Partner',
    categoryLabelAr: 'شريك التمويل والضمان',
    roleEn: 'Institutional Mortgage & Escrow Trustee',
    roleAr: 'أمناء التمويل العقاري والضمان المؤسسي',
    badgeEn: 'Escrow Partner',
    badgeAr: 'شريك حساب الضمان',
    lawVerification: 'CBUAE Licensed Trustee',
    trustScore: 99,
  },
  {
    id: 'sobha',
    name: 'Sobha Realty',
    category: 'developer',
    categoryLabelEn: 'Luxury Developer',
    categoryLabelAr: 'مطور فاخر',
    roleEn: 'Sobha Hartland & Waterfront Estates',
    roleAr: 'شوبا هارتلاند والعقارات البحرية',
    badgeEn: 'Escrow Active',
    badgeAr: 'حساب ضمان مفعل',
    lawVerification: 'RERA Escrow Account #6641-S',
    trustScore: 96,
  },
  {
    id: 'mashreq',
    name: 'Mashreq Bank',
    category: 'bank',
    categoryLabelEn: 'Institutional Treasury',
    categoryLabelAr: 'الخزينة المؤسسية',
    roleEn: 'Developer Escrow Account Custodian',
    roleAr: 'حارس حسابات ضمان المطورين',
    badgeEn: 'Verified Custodian',
    badgeAr: 'أمين حفظ معتمد',
    lawVerification: 'CBUAE & RERA Trustee',
    trustScore: 98,
  },
];

export function VerticalPartnerDeck({
  isArabic = false,
}: {
  isArabic?: boolean;
}) {
  const [filter, setFilter] = React.useState<
    'all' | 'government' | 'developer' | 'bank'
  >('all');
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const filteredPartners = React.useMemo(() => {
    if (filter === 'all') return PARTNERS;
    return PARTNERS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="shadow-subtle relative overflow-hidden border border-stone-300/40 bg-stone-50/80 p-6 backdrop-blur-md transition-all sm:p-8 dark:border-stone-800/40 dark:bg-stone-950/80">
      {/* Subtle Metallic Ambient Glow Beam */}
      <BorderBeam
        size={300}
        duration={14}
        delay={0}
        colorFrom="#1b4965"
        colorTo="#5fa8d3"
      />

      {/* Header Bar */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-stone-300/30 pb-6 sm:flex-row sm:items-center dark:border-stone-800/30">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 border border-stone-800/20 bg-stone-800/10 px-3 py-1 text-xs font-semibold text-stone-800 dark:text-stone-100">
            <ShieldCheck className="size-4" />
            <AnimatedShinyText className="font-semibold text-stone-800 dark:text-stone-100">
              {isArabic
                ? 'شبكة الضمان وريرة المعتمدة'
                : 'Official RERA Law No. 8 Ecosystem'}
            </AnimatedShinyText>
          </div>
          <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-50">
            {isArabic
              ? 'شركاء التطوير والبنوك أمناء الحفظ'
              : 'Institutional Banking & Developer Network'}
          </h3>
          <p className="mt-1 text-xs font-light text-stone-500 dark:text-stone-400">
            {isArabic
              ? 'مراقبة فورية لحسابات الضمان والسجل العقاري مع دائرة الأراضي والأمناء المعتمدين'
              : 'Direct API cross-referencing with DLD land registry & licensed trustee banks'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              {
                id: 'all',
                icon: null,
                en: `All (${PARTNERS.length})`,
                ar: `الكل (${PARTNERS.length})`,
              },
              { id: 'government', icon: Landmark, en: 'DLD Govt', ar: 'حكومي' },
              {
                id: 'developer',
                icon: Building2,
                en: 'Developers',
                ar: 'مطورون',
              },
              {
                id: 'bank',
                icon: FileCheck2,
                en: 'Trustee Banks',
                ar: 'بنوك الضمان',
              },
            ] as const
          ).map(({ id, icon: Icon, en, ar }) => (
            <button
              key={id}
              onClick={() => setFilter(id as any)}
              aria-pressed={filter === id}
              className={cn(
                'flex items-center gap-1.5 border px-3.5 py-1.5 text-xs font-semibold transition-all',
                filter === id
                  ? 'border-stone-900 bg-stone-900 text-white shadow-xs dark:border-stone-100 dark:bg-stone-100'
                  : 'border-stone-300/40 bg-stone-100 text-stone-500 hover:text-stone-900 dark:border-stone-800/40 dark:bg-stone-900 dark:text-stone-400',
              )}
            >
              {Icon && <Icon className="size-3.5" />}
              <span>{isArabic ? ar : en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Framer Motion Scrollable Grid */}
      <div
        tabIndex={0}
        role="region"
        aria-label={isArabic ? 'قائمة الشركاء' : 'Partner list'}
        className="relative max-h-95 scrollbar-thin scrollbar-thumb-border overflow-y-auto pr-2 hover:scrollbar-thumb-fjord/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
      >
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredId(partner.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  'group hover:shadow-floating relative flex flex-col justify-between border bg-stone-50/90 p-5 transition-all duration-300 hover:bg-stone-50 dark:bg-stone-950/90',
                  hoveredId === partner.id
                    ? '-translate-y-1 border-stone-900/50 dark:border-stone-100/50'
                    : 'border-stone-300/40 dark:border-stone-800/40',
                )}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2 border-b border-stone-300/30 pb-3 dark:border-stone-800/30">
                    <span className="text-[10px] font-bold tracking-widest text-stone-900 uppercase dark:text-stone-100">
                      {isArabic
                        ? partner.categoryLabelAr
                        : partner.categoryLabelEn}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-stone-800/10 px-2 py-0.5 text-[9px] font-bold text-stone-800 dark:text-stone-100">
                      <MapPin className="size-3.5" />
                      {isArabic ? partner.badgeAr : partner.badgeEn}
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <h4 className="font-display text-lg font-bold text-stone-900 transition-colors group-hover:text-stone-900 dark:text-stone-100">
                      {partner.name}
                    </h4>
                    <ArrowUpRight className="size-4 text-stone-900 opacity-50 transition-opacity group-hover:opacity-100 dark:text-stone-100" />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed font-light text-stone-500 dark:text-stone-400">
                    {isArabic ? partner.roleAr : partner.roleEn}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-stone-300/30 pt-3 font-mono text-[11px] text-stone-500 dark:border-stone-800/30 dark:text-stone-400">
                  <span className="truncate">{partner.lawVerification}</span>
                  <FileCheck2 className="ms-1 size-3.5 shrink-0 text-stone-800" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-300/30 pt-4 text-xs font-light text-stone-500 dark:border-stone-800/30 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <Zap className="size-4 shrink-0 text-stone-900 dark:text-stone-100" />
          <span>
            {isArabic
              ? 'جميع حسابات الضمان موثقة بموجب القانون رقم 8 لسنة 2007 الصادر عن حكومة دبي'
              : 'All escrow accounts verified under Dubai Law No. 8 of 2007 for investor capital protection.'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
          <ArrowUpDown className="size-3.5" />
          <span>
            {isArabic ? 'التمرير العمودي للاستكشاف' : 'Scroll to explore'}
          </span>
        </div>
      </div>
    </div>
  );
}
