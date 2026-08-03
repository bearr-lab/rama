import { getTranslations } from 'next-intl/server';
import { ComparisonMatrix } from '@/components/decision-lab/comparison-matrix';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';

export default async function DecisionLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <PageShell>
      <SectionHeader
        breadcrumb={
          isArabic
            ? 'مساحة العمل · مختبر القرار'
            : 'WORKSPACE · DECISION LAB'
        }
        title={isArabic ? 'مختبر القرار والمفاضلات' : 'Decision Lab & Trade-offs'}
        description={
          isArabic
            ? 'قارن بين العقارات في القائمة المختصرة جنبًا إلى جنب مع تحليل العوائد والمخاطر.'
            : 'Compare your shortlisted properties side by side with financial trade-off analysis and risk weighting.'
        }
        actions={
          <Link href={`/${locale}/discover`}>
            <Button
              variant="outline"
              className="rounded-none border-border/40 text-sm font-semibold text-ink hover:bg-surface-subtle"
            >
              {isArabic ? 'إضافة عقار للمقارنة' : 'Add Property to Compare'}
            </Button>
          </Link>
        }
      />

      <div className="w-full flex-1">
        <ComparisonMatrix locale={locale} />
      </div>
    </PageShell>
  );
}
