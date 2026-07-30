'use client';

import { useState, useMemo } from 'react';
import {
  calculateInvestmentSimulation,
  getCommunityTwinMetrics,
} from '@/lib/digital-twin/simulator';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BorderBeam } from '@/components/magicui/border-beam';
import { MagicCard } from '@/components/magicui/magic-card';
import { ArrowRight, Calculator, TrendingUp, ShieldCheck, PieChart, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface RoiCalculatorWidgetProps {
  locale?: string;
  isArabic?: boolean;
}

const COMMUNITIES = [
  { id: 'downtown-dubai', label: 'Downtown Dubai' },
  { id: 'palm-jumeirah', label: 'Palm Jumeirah' },
  { id: 'dubai-hills', label: 'Dubai Hills Estate' },
];

export function RoiCalculatorWidget({
  locale = 'en',
  isArabic = false,
}: RoiCalculatorWidgetProps) {
  const [selectedCommunity, setSelectedCommunity] = useState('downtown-dubai');
  const [propertyPrice, setPropertyPrice] = useState(3500000); // 3.5M AED
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [interestRate, setInterestRate] = useState(4.25);

  const communityMetrics = useMemo(
    () => getCommunityTwinMetrics(selectedCommunity),
    [selectedCommunity]
  );

  const simulation = useMemo(
    () =>
      calculateInvestmentSimulation({
        purchasePrice: propertyPrice,
        downPaymentPercentage: downPaymentPct,
        interestRatePercentage: interestRate,
      }),
    [propertyPrice, downPaymentPct, interestRate]
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="w-full rounded-none border border-stone-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-md sm:p-8 dark:border-stone-800 dark:bg-stone-900/90">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200/60 pb-6 sm:flex-row sm:items-center dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
            <Calculator className="size-4" />
            <span>{isArabic ? 'حاسبة العائد على العقار' : 'Property ROI Calculator'}</span>
            <span className="flex items-center gap-1 rounded-none bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Sparkles className="size-3 text-emerald-600" />
              RERA Integrated
            </span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-normal text-stone-900 sm:text-3xl dark:text-stone-100">
            {isArabic ? 'احسب عوائدك الاستثمارية' : 'Calculate Your Returns'}
          </h3>
        </div>

        {/* Community Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {COMMUNITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCommunity(c.id)}
              className={`rounded-none px-3.5 py-1.5 text-xs font-medium transition-all ${
                selectedCommunity === c.id
                  ? 'bg-[#0a4e6e] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Controls, Right Outcomes */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Inputs */}
        <div className="space-y-6 lg:col-span-6">
          {/* Slider 1: Property Price */}
          <div>
            <div className="flex justify-between text-sm font-medium text-stone-700 dark:text-stone-300">
              <span>{isArabic ? 'سعر العقار' : 'Property Value'}</span>
              <span className="font-bold text-[#0a4e6e] dark:text-sky-400">
                {formatCurrency(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={25000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              aria-label={isArabic ? 'سعر العقار' : 'Property Value'}
              className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-none bg-stone-200 accent-[#0a4e6e] dark:bg-stone-700"
            />
            <div className="mt-1 flex justify-between text-[11px] text-stone-400">
              <span>AED 1M</span>
              <span>AED 25M</span>
            </div>
          </div>

          {/* Slider 2: Down Payment */}
          <div>
            <div className="flex justify-between text-sm font-medium text-stone-700 dark:text-stone-300">
              <span>{isArabic ? 'الدفعة الأولى' : 'Down Payment'} ({downPaymentPct}%)</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">
                {formatCurrency((propertyPrice * downPaymentPct) / 100)}
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={50}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              aria-label={isArabic ? 'الدفعة الأولى' : 'Down Payment Percentage'}
              className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-none bg-stone-200 accent-[#0a4e6e] dark:bg-stone-700"
            />
          </div>

          {/* Slider 3: Interest Rate */}
          <div>
            <div className="flex justify-between text-sm font-medium text-stone-700 dark:text-stone-300">
              <span>{isArabic ? 'معدل الفائدة المتوقع' : 'Mortgage Interest Rate'}</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={3.5}
              max={7.0}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              aria-label={isArabic ? 'معدل الفائدة' : 'Interest Rate'}
              className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-none bg-stone-200 accent-[#0a4e6e] dark:bg-stone-700"
            />
          </div>

          {/* Financial Ratio Progress Gauge Bar */}
          <div className="rounded-none border border-stone-200/60 bg-stone-50/60 p-4 dark:border-stone-800 dark:bg-stone-950/40">
            <div className="flex justify-between text-xs font-medium text-stone-500">
              <span>Down Payment ({downPaymentPct}%)</span>
              <span>Mortgage Financed ({100 - downPaymentPct}%)</span>
            </div>
            <div className="mt-2 flex h-2.5 w-full overflow-hidden rounded-none bg-stone-200 dark:bg-stone-700">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${downPaymentPct}%` }}
              />
              <div
                className="h-full bg-[#0a4e6e] transition-all duration-300 dark:bg-sky-500"
                style={{ width: `${100 - downPaymentPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Output Cards with Magic UI Cards & Border Beam */}
        <div className="rounded-none border border-stone-200/60 bg-stone-50/80 p-6 lg:col-span-6 dark:border-stone-800 dark:bg-stone-950/60">
          <div className="grid grid-cols-2 gap-4">
            {/* Net Yield Magic Card */}
            <MagicCard gradientColor="#10b98120">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <TrendingUp className="size-3.5 text-emerald-600" />
                <span>{isArabic ? 'صافي العائد المتوقع' : 'Projected Net Yield'}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                <NumberTicker value={simulation.netYieldPercentage} decimalPlaces={2} suffix="%" />
              </p>
              <p className="mt-0.5 text-[11px] text-stone-400">RERA Benchmarked</p>
            </MagicCard>

            {/* Monthly Mortgage Magic Card */}
            <MagicCard gradientColor="#0a4e6e20">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <PieChart className="size-3.5 text-sky-600" />
                <span>{isArabic ? 'القسط الشهري' : 'Est. Monthly Payment'}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">
                <NumberTicker value={simulation.monthlyMortgagePayment} prefix="AED " />
              </p>
              <p className="mt-0.5 text-[11px] text-stone-400">25-Yr Mortgage</p>
            </MagicCard>

            {/* 5-Year Equity Growth Card with Border Beam */}
            <div className="relative col-span-2 overflow-hidden rounded-none border border-emerald-500/30 bg-emerald-50/40 p-5 dark:bg-emerald-950/20">
              <BorderBeam colorFrom="#10b981" colorTo="#00f2fe" duration={4} borderWidth={2} />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 dark:text-emerald-300">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span>{isArabic ? 'حقوق الملكية المتوقعة بعد 5 سنوات' : '5-Year Equity Projection'}</span>
                  </div>
                  <span className="rounded-none bg-emerald-600/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
                    +{communityMetrics.capitalAppreciationScore}% Score
                  </span>
                </div>
                <p className="mt-2 text-3xl font-extrabold text-emerald-800 dark:text-emerald-300">
                  <NumberTicker value={simulation.fiveYearEquityProjection} prefix="AED " />
                </p>
                <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
                  Includes 5% annual community appreciation in {communityMetrics.communityName}.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-stone-500">
              <span>{isArabic ? 'متوسط السعر/قدم مربعة: ' : 'Avg Price/SqFt: '}</span>
              <strong className="text-stone-900 dark:text-stone-100">
                AED {communityMetrics.avgPricePerSqft}
              </strong>
            </div>

            <Link
              href={`/${locale}/invest`}
              className="inline-flex items-center justify-center rounded-none bg-[#0a4e6e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#083b54] dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              {isArabic ? 'استكشف فرص الاستثمار' : 'View Matching Opportunities'}
              <ArrowRight className="ms-2 size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
