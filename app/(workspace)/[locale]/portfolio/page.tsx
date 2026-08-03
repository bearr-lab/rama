import { getTranslations } from 'next-intl/server';
import { PortfolioDashboard } from '@/components/portfolio/portfolio-dashboard';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { MetricStrip } from '@/components/ui/metric-strip';
import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Portfolio');
  const isArabic = locale === 'ar';

  return (
    <PageShell>
      <SectionHeader
        breadcrumb={
          isArabic
            ? 'مساحة العمل · إدارة الأصول والمحفظة'
            : 'WORKSPACE · ASSET & PORTFOLIO HUB'
        }
        title={
          isArabic
            ? 'إدارة المحفظة والأصول العقارية'
            : 'Asset & Portfolio Intelligence'
        }
        description={
          isArabic
            ? 'متابعة التقييم الفوري للعقارات، تدفقات الإيجار الشهرية، طلبات الصيانة والتقارير الضريبية وفق معايير دائرة الأراضي والأملاك.'
            : 'Institutional asset management suite. Monitor live DLD valuation gains, lease renewal timelines, service charge ticketing, and UAE corporate tax compliance.'
        }
      />

      {/* Efferd & Magic UI Asset Composition Strip */}
      <MetricStrip
        metrics={[
          {
            id: 'value',
            title: isArabic ? 'إجمالي قيمة المحفظة' : 'Total Asset Value',
            value: 24.85,
            prefix: 'AED',
            suffix: 'M',
            decimalPlaces: 2,
            badgeText: '+14.8% Gain',
            description: isArabic ? '3 عقارات موثقة في DLD' : '3 DLD-verified prime properties'
          },
          {
            id: 'cashflow',
            title: isArabic ? 'التدفق الإيجاري الشهري' : 'Monthly Rental Cashflow',
            value: 144000,
            prefix: 'AED',
            badgeText: '100% Occupied',
            description: isArabic ? 'عقود إيجاري موثقة ومضمونة' : 'Registered Ejari long-term leases'
          },
          {
            id: 'yield',
            title: isArabic ? 'صافي عائد الاستثمار' : 'Weighted Net Yield',
            value: 6.9,
            suffix: '%',
            decimalPlaces: 1,
            badgeText: 'Tax Optimized',
            isShinyBadge: true,
            description: isArabic ? 'بعد خصم رسوم الصيانة والإدارة' : 'Net after service charges & management'
          }
        ]}
      />

      <div className="w-full flex-1">
        <PortfolioDashboard />
      </div>
    </PageShell>
  );
}
