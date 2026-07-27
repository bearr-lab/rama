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
  Sparkles,
  ExternalLink,
  Lock,
  Layers,
  Zap,
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

export function VerticalPartnerDeck({ isArabic = false }: { isArabic?: boolean }) {
  const [filter, setFilter] = React.useState<'all' | 'government' | 'developer' | 'bank'>('all');
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const filteredPartners = React.useMemo(() => {
    if (filter === 'all') return PARTNERS;
    return PARTNERS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="relative overflow-hidden border border-border/40 bg-surface/80 p-6 sm:p-8 backdrop-blur-md shadow-subtle transition-all">
      {/* Subtle Metallic Ambient Glow Beam */}
      <BorderBeam size={300} duration={14} delay={0} colorFrom="#1b4965" colorTo="#5fa8d3" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/30 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <ShieldCheck className="h-4 w-4" />
            <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
              {isArabic ? 'شبكة الضمان وريرة المعتمدة' : 'Official RERA Law No. 8 Ecosystem'}
            </AnimatedShinyText>
          </div>
          <h3 className="font-display text-2xl font-medium text-ink">
            {isArabic ? 'شركاء التطوير والبنوك أمناء الحفظ' : 'Institutional Banking & Developer Network'}
          </h3>
          <p className="text-xs text-muted-foreground font-light mt-1">
            {isArabic
              ? 'مراقبة فورية لحسابات الضمان والسجل العقاري مع دائرة الأراضي والأمناء المعتمدين'
              : 'Direct API cross-referencing with DLD land registry & licensed trustee banks'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-3.5 py-1.5 text-xs font-semibold transition-all border',
              filter === 'all'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted-foreground hover:text-ink border-border/40'
            )}
          >
            {isArabic ? 'الكل' : 'All'} ({PARTNERS.length})
          </button>
          <button
            onClick={() => setFilter('government')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold transition-all border',
              filter === 'government'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted-foreground hover:text-ink border-border/40'
            )}
          >
            <Landmark className="h-3.5 w-3.5" />
            <span>{isArabic ? 'حكومي' : 'DLD Govt'}</span>
          </button>
          <button
            onClick={() => setFilter('developer')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold transition-all border',
              filter === 'developer'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted-foreground hover:text-ink border-border/40'
            )}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>{isArabic ? 'مطورون' : 'Developers'}</span>
          </button>
          <button
            onClick={() => setFilter('bank')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold transition-all border',
              filter === 'bank'
                ? 'bg-fjord text-white border-fjord shadow-xs'
                : 'bg-surface-subtle text-muted-foreground hover:text-ink border-border/40'
            )}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>{isArabic ? 'بنوك الضمان' : 'Trustee Banks'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Framer Motion Draggable & Scrollable Grid */}
      <div className="relative max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-fjord/40 pr-2 cursor-grab active:cursor-grabbing select-none">
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  'group relative flex flex-col justify-between border p-5 transition-all duration-300 bg-surface/90 hover:bg-surface hover:shadow-floating',
                  hoveredId === partner.id
                    ? 'border-fjord/50 -translate-y-1'
                    : 'border-border/40'
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-border/30 pb-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-fjord">
                      {isArabic ? partner.categoryLabelAr : partner.categoryLabelEn}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {isArabic ? partner.badgeAr : partner.badgeEn}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-ink group-hover:text-fjord transition-colors">
                    {partner.name}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground font-light leading-relaxed">
                    {isArabic ? partner.roleAr : partner.roleEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="truncate">{partner.lawVerification}</span>
                  <FileCheck2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 ms-1" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/30 pt-4 text-xs text-muted-foreground font-light">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-fjord shrink-0" />
          <span>
            {isArabic
              ? 'جميع حسابات الضمان موثقة بموجب القانون رقم 8 لسنة 2007 الصادر عن حكومة دبي'
              : 'All escrow accounts verified under Dubai Law No. 8 of 2007 for investor capital protection.'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-fjord">
          <ArrowUpDown className="h-3.5 w-3.5 animate-bounce" />
          <span>{isArabic ? 'اسحب للتصفح العمودي' : 'Vertical Physics Scroll Active'}</span>
        </div>
      </div>
    </div>
  );
}
