import { getTranslations } from 'next-intl/server';
import { PortfolioDashboard } from '@/components/portfolio/portfolio-dashboard';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Portfolio');
  const isArabic = locale === 'ar';

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            {isArabic ? 'مساحة العمل · إدارة الأصول والمحفظة' : 'WORKSPACE · ASSET & PORTFOLIO HUB'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {isArabic ? 'إدارة المحفظة والأصول العقارية' : 'Asset & Portfolio Intelligence'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            {isArabic
              ? 'متابعة التقييم الفوري للعقارات، تدفقات الإيجار الشهرية، طلبات الصيانة والتقارير الضريبية وفق معايير دائرة الأراضي والأملاك.'
              : 'Institutional asset management suite. Monitor live DLD valuation gains, lease renewal timelines, service charge ticketing, and UAE corporate tax compliance.'}
          </p>
        </div>
      </header>

      {/* Efferd & Magic UI Asset Composition Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BlurFade delay={0.1}>
          <div className="hover:shadow-floating rounded-3xl border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'إجمالي قيمة المحفظة' : 'Total Asset Value'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="flex items-baseline font-display text-3xl font-semibold text-ink">
                <span className="mr-1 font-sans text-xl">AED</span>
                <NumberTicker value={24.85} decimalPlaces={2} suffix="M" />
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                +14.8% Gain
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              {isArabic ? '3 عقارات موثقة في DLD' : '3 DLD-verified prime properties'}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="hover:shadow-floating rounded-3xl border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'التدفق الإيجاري الشهري' : 'Monthly Rental Cashflow'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="flex items-baseline font-display text-3xl font-semibold text-ink">
                <span className="mr-1 font-sans text-xl">AED</span>
                <NumberTicker value={144000} />
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                100% Occupied
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              {isArabic ? 'عقود إيجاري موثقة ومضمونة' : 'Registered Ejari long-term leases'}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="hover:shadow-floating rounded-3xl border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'صافي عائد الاستثمار' : 'Weighted Net Yield'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">
                <NumberTicker value={6.9} decimalPlaces={1} suffix="%" />
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Tax Optimized
                </AnimatedShinyText>
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              {isArabic ? 'بعد خصم رسوم الصيانة والإدارة' : 'Net after service charges & management'}
            </p>
          </div>
        </BlurFade>
      </div>

      <div className="w-full flex-1">
        <PortfolioDashboard />
      </div>
    </div>
  );
}
