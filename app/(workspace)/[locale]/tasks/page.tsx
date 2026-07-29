import { getTranslations } from 'next-intl/server';
import { KanbanBoard } from '@/components/tasks/kanban-board';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';

export default async function TasksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Tasks');
  const isArabic = locale === 'ar';

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            {isArabic ? 'مساحة العمل · المهام والصفقات' : 'WORKSPACE · PIPELINE & DEAL FLOW'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {isArabic ? 'مهام وإجراءات الصفقات' : 'Transaction Action Board'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            {isArabic
              ? 'إدارة مواعيد المعاينة، عروض الأسعار، وتجهيزات نقل الملكية في دائرة الأراضي والأملاك بهدوء ووضوح.'
              : 'End-to-end transaction pipeline. Move tasks across due diligence, physical viewings, MOU negotiations, and DLD registration with complete clarity.'}
          </p>
        </div>
      </header>

      {/* Efferd & Magic UI Pipeline Velocity Metric Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BlurFade delay={0.1}>
          <div className="hover:shadow-floating rounded-3xl border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'إجمالي قيمة صفقات الأنابيب' : 'Active Pipeline Value'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="flex items-baseline font-display text-3xl font-semibold text-ink">
                <span className="mr-1 font-sans text-xl">AED</span>
                <NumberTicker value={42.8} decimalPlaces={1} suffix="M" />
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                5 Active Deals
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              {isArabic ? '3 في مرحلة النموذج F' : '3 in MOU Form F stage'}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="hover:shadow-floating rounded-3xl border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'سرعة إغلاق الصفقات' : 'Avg Closing Velocity'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">
                <NumberTicker value={14} suffix=" Days" />
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                -4 Days Faster
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              {isArabic ? 'سرعة توثيق DLD القياسية' : 'Standard DLD trustee timeline'}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="hover:shadow-floating rounded-3xl border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'نسبة حماية حساب الضمان' : 'Escrow Verification'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">
                <NumberTicker value={100} suffix="%" />
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Protected
                </AnimatedShinyText>
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              {isArabic ? 'حسابات ريرا مفعلة تحت أمناء الحفظ' : 'Active under RERA licensed trustee banks'}
            </p>
          </div>
        </BlurFade>
      </div>

      <div className="w-full flex-1">
        <KanbanBoard />
      </div>
    </div>
  );
}
