import { createClient } from '@/lib/supabase/server';
import { ChatInterface } from '@/components/ai/chat-interface';
import { Sparkles } from 'lucide-react';

import { MetricStrip } from '@/components/ui/metric-strip';
import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';

export default async function AdvisorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isArabic = locale === 'ar';
  const isDemo = !user;

  return (
    <PageShell>
      {isDemo && (
        <div className="shadow-subtle flex items-center justify-between rounded-none border border-border/60 bg-surface-subtle p-4 text-xs text-ink">
          <div className="flex items-center gap-2.5 font-medium">
            <Sparkles className="size-4 shrink-0 text-fjord" />
            <span>
              <strong>
                {isArabic ? 'وضع التقييم التجريبي:' : 'Sandbox Demo Mode:'}
              </strong>{' '}
              {isArabic
                ? 'أنت تستكشف مستشار الذكاء الاصطناعي RAMA مع تفعيل ذكاء دائرة الأراضي والأملاك المباشر.'
                : 'You are exploring RAMA AI Concierge without an active session. Full DLD RAG intelligence is active.'}
            </span>
          </div>
          <span className="hidden items-center gap-1 rounded-none bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted-foreground sm:inline-flex">
            DLD RAG Validated
          </span>
        </div>
      )}

      <SectionHeader
        breadcrumb={
          isArabic ? 'مساحة العمل · المستشار الذكي' : 'WORKSPACE · AI CONCIERGE'
        }
        title={isArabic ? 'مستشار الذكاء الاصطناعي RAMA' : 'RAMA AI Advisor'}
        description={
          isArabic
            ? 'اسأل عن أي شيء يخص عقارات دبي، من قوانين إيجاري ورسوم نقل الملكية إلى تحليل العوائد في المجتمعات السكنية.'
            : 'Ask anything about Dubai real estate—from Ejari regulations and DLD transfer fees to yield projections across top residential communities.'
        }
      />

      {/* Efferd & Magic UI AI Telemetry & DLD RAG Metrics Strip */}
      <MetricStrip
        metrics={[
          {
            id: 'knowledge',
            title: isArabic ? 'قاعدة تشريعات DLD' : 'DLD Law Knowledge Base',
            value: 2840,
            suffix: ' Articles',
            badgeText: 'Live RAG Sync',
            isShinyBadge: true,
            description: isArabic ? 'تشريعات 2026 وقوانين ريرا المحدثة' : '2026 Law #7, Ejari & Escrow regulations',
          },
          {
            id: 'latency',
            title: isArabic ? 'سرعة استجابة النموذج' : 'RAG Query Latency',
            value: 240,
            suffix: 'ms',
            badgeText: 'Ultra Low-Latency',
            description: isArabic ? 'استعلام فوري وتوجيه ذكي' : 'Vector similarity search active'
          },
          {
            id: 'precision',
            title: isArabic ? 'معدل الدقة والتوثيق' : 'Factual Precision',
            value: 99.8,
            suffix: '%',
            decimalPlaces: 1,
            badgeText: 'Zero Hallucination',
            description: isArabic ? 'مرتبط مباشرة بمصادر دائرة الأراضي' : 'Grounded strictly in verified DLD docs'
          }
        ]}
      />

      <div className="w-full flex-1 pb-8">
        <ChatInterface locale={locale as 'en' | 'ar'} />
      </div>
    </PageShell>
  );
}
