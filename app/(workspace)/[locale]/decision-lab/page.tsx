import { getTranslations } from 'next-intl/server';
import { ComparisonMatrix } from '@/components/decision-lab/comparison-matrix';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DecisionLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('DecisionLab');
  const isArabic = locale === 'ar';

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            {isArabic ? 'مساحة العمل · مختبر القرار' : 'WORKSPACE · DECISION LAB'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {isArabic ? 'مختبر القرار والمفاضلات' : 'Decision Lab & Trade-offs'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            {isArabic
              ? 'قارن بين العقارات في القائمة المختصرة جنبًا إلى جنب مع تحليل العوائد والمخاطر.'
              : 'Compare your shortlisted properties side by side with financial trade-off analysis and risk weighting.'}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link href={`/${locale}/discover`}>
            <Button variant="outline" className="rounded-xl border-border/60 text-sm font-semibold text-ink hover:bg-surface-subtle">
              {isArabic ? 'إضافة عقار للمقارنة' : 'Add Property to Compare'}
            </Button>
          </Link>
        </div>
      </header>

      <div className="w-full flex-1">
        <ComparisonMatrix locale={locale} />
      </div>
    </div>
  );
}
