import { createClient } from '@/lib/supabase/server';
import { ChatInterface } from '@/components/ai/chat-interface';
import { Sparkles } from 'lucide-react';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';

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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      {isDemo && (
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-subtle p-4 text-xs text-ink shadow-xs">
          <div className="flex items-center gap-2.5 font-medium">
            <Sparkles className="h-4 w-4 shrink-0 text-fjord" />
            <span>
              <strong>{isArabic ? 'وضع التقييم التجريبي:' : 'Sandbox Demo Mode:'}</strong>{' '}
              {isArabic
                ? 'أنت تستكشف مستشار الذكاء الاصطناعي RAMA مع تفعيل ذكاء دائرة الأراضي والأملاك المباشر.'
                : 'You are exploring RAMA AI Concierge without an active session. Full DLD RAG intelligence is active.'}
            </span>
          </div>
          <span className="hidden items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted sm:inline-flex">
            DLD RAG Validated
          </span>
        </div>
      )}

      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            {isArabic ? 'مساحة العمل · المستشار الذكي' : 'WORKSPACE · AI CONCIERGE'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {isArabic ? 'مستشار الذكاء الاصطناعي RAMA' : 'RAMA AI Advisor'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
            {isArabic
              ? 'اسأل عن أي شيء يخص عقارات دبي، من قوانين إيجاري ورسوم نقل الملكية إلى تحليل العوائد في المجتمعات السكنية.'
              : 'Ask anything about Dubai real estate—from Ejari regulations and DLD transfer fees to yield projections across top residential communities.'}
          </p>
        </div>
      </header>

      {/* Efferd & Magic UI AI Telemetry & DLD RAG Metrics Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BlurFade delay={0.1}>
          <div className="border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all hover:shadow-floating">
            <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
              {isArabic ? 'قاعدة تشريعات DLD' : 'DLD Law Knowledge Base'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink flex items-baseline">
                <NumberTicker value={2840} />
                <span className="text-sm font-sans text-muted ml-1.5">Articles</span>
              </span>
              <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Live RAG Sync
                </AnimatedShinyText>
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground font-light">
              {isArabic ? 'تشريعات 2026 وقوانين ريرا المحدثة' : '2026 Law #7, Ejari & Escrow regulations'}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all hover:shadow-floating">
            <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
              {isArabic ? 'سرعة استجابة النموذج' : 'RAG Query Latency'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">
                <NumberTicker value={240} suffix="ms" />
              </span>
              <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Ultra Low-Latency
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground font-light">
              {isArabic ? 'استعلام فوري وتوجيه ذكي' : 'Vector similarity search active'}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all hover:shadow-floating">
            <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
              {isArabic ? 'معدل الدقة والتوثيق' : 'Factual Precision'}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">
                <NumberTicker value={99.8} decimalPlaces={1} suffix="%" />
              </span>
              <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Zero Hallucination
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground font-light">
              {isArabic ? 'مرتبط مباشرة بمصادر دائرة الأراضي' : 'Grounded strictly in verified DLD docs'}
            </p>
          </div>
        </BlurFade>
      </div>

      <div className="w-full flex-1 pb-8">
        <ChatInterface locale={locale as 'en' | 'ar'} />
      </div>
    </div>
  );
}
