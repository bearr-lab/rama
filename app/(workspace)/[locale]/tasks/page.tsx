import { getTranslations } from 'next-intl/server';
import { KanbanBoard } from '@/components/tasks/kanban-board';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { MetricStrip } from '@/components/ui/metric-strip';
import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';

export default async function TasksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Tasks');
  const isArabic = locale === 'ar';

  return (
    <PageShell>
      <SectionHeader
        breadcrumb={
          isArabic
            ? 'مساحة العمل · المهام والصفقات'
            : 'WORKSPACE · PIPELINE & DEAL FLOW'
        }
        title={isArabic ? 'مهام وإجراءات الصفقات' : 'Transaction Action Board'}
        description={
          isArabic
            ? 'إدارة مواعيد المعاينة، عروض الأسعار، وتجهيزات نقل الملكية في دائرة الأراضي والأملاك بهدوء ووضوح.'
            : 'End-to-end transaction pipeline. Move tasks across due diligence, physical viewings, MOU negotiations, and DLD registration with complete clarity.'
        }
      />

      {/* Efferd & Magic UI Pipeline Velocity Metric Strip */}
      <MetricStrip
        metrics={[
          {
            id: 'value',
            title: isArabic ? 'إجمالي قيمة صفقات الأنابيب' : 'Active Pipeline Value',
            value: 42.8,
            prefix: 'AED',
            suffix: 'M',
            decimalPlaces: 1,
            badgeText: '5 Active Deals',
            description: isArabic ? '3 في مرحلة النموذج F' : '3 in MOU Form F stage'
          },
          {
            id: 'velocity',
            title: isArabic ? 'سرعة إغلاق الصفقات' : 'Avg Closing Velocity',
            value: 14,
            suffix: ' Days',
            badgeText: '-4 Days Faster',
            description: isArabic ? 'سرعة توثيق DLD القياسية' : 'Standard DLD trustee timeline'
          },
          {
            id: 'trust',
            title: isArabic ? 'نسبة حماية حساب الضمان' : 'Escrow Verification',
            value: 100,
            suffix: '%',
            badgeText: 'Protected',
            isShinyBadge: true,
            description: isArabic ? 'حسابات ريرا مفعلة تحت أمناء الحفظ' : 'Active under RERA licensed trustee banks'
          }
        ]}
      />

      <div className="w-full flex-1">
        <KanbanBoard />
      </div>
    </PageShell>
  );
}
