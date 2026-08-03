'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AnimatedList } from '@/components/ui/animated-list';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';
import { Building, LineChart, TrendingUp, Key } from 'lucide-react';

// Lottie-web calls document.createElement at module-eval time — must be client-only
const LottiePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => ({ default: m.Player })),
  { ssr: false, loading: () => <div className="size-full animate-pulse bg-surface-subtle" /> },
);
export function AIIntelligenceHub({ isArabic }: { locale: string; isArabic: boolean }) {
  // We use English fallback if translations are missing, since we're replacing a component
  const title = isArabic ? 'ذكاء اصطناعي يحلل بيانات ريرا' : 'AI-Powered RERA Intelligence';
  const subtitle = isArabic 
    ? 'محرك راما يقوم بمعالجة بيانات دائرة الأراضي والأملاك في دبي واتجاهات السوق في الوقت الفعلي لاكتشاف أعلى عوائد استثمارية.' 
    : 'The Rama Engine processes live DLD data, global market trends, and RERA analytics to uncover hyper-personalized, high-yield opportunities.';



  const notifications = [
    {
      name: isArabic ? 'فرصة جديدة' : 'New Opportunity',
      description: isArabic ? 'فيلا فاخرة في نخلة جميرا' : 'Palm Jumeirah Signature Villa',
      time: isArabic ? 'منذ 15 دقيقة' : '15m ago',
      icon: <Building className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
    {
      name: isArabic ? 'تنبيه عائد استثماري' : 'High Yield Alert',
      description: isArabic ? 'قيد الإنشاء في وسط مدينة دبي: عائد 11.5%' : 'Downtown Dubai Off-Plan: 11.5% ROI',
      time: isArabic ? 'منذ ساعة واحدة' : '1h ago',
      icon: <TrendingUp className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
    {
      name: isArabic ? 'تحديث السوق' : 'Market Signal',
      description: isArabic ? 'ارتفاع الطلب في مرسى دبي' : 'Demand surge in Dubai Marina',
      time: isArabic ? 'منذ ساعتين' : '2h ago',
      icon: <LineChart className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
    {
      name: isArabic ? 'تأشيرة ذهبية' : 'Golden Visa Eligible',
      description: isArabic ? 'شقة في إعمار بيتش فرونت' : 'Emaar Beachfront Apartment',
      time: isArabic ? 'منذ 3 ساعات' : '3h ago',
      icon: <Key className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
  ];

  return (
    <div className={cn("flex w-full flex-col gap-8", isArabic ? "text-right" : "text-left")}>
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-none border border-border bg-surface-subtle px-3 py-1 text-xs font-medium tracking-wide text-fjord">
          <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-fjord-muted hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ {isArabic ? 'محرك الاستثمار المدعوم بالذكاء الاصطناعي' : 'Powered by Rama Engine'}</span>
          </AnimatedShinyText>
        </div>
        <h2 className="text-3xl font-light tracking-tight text-fjord sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="max-w-175 text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      </div>

      <div className="grid h-full min-h-125 grid-cols-1 gap-4 md:grid-cols-3">
        {/* Animated Beam Section (Spans 2 columns on desktop) */}
        <div 
          className="relative col-span-1 flex flex-col items-center justify-center overflow-hidden rounded-none border border-border bg-surface p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:col-span-2"
        >
          <div className="absolute top-4 left-4 text-sm font-medium tracking-wider text-fjord uppercase">
            {isArabic ? 'تدفق البيانات الحي' : 'Live Data Ingestion'}
          </div>
          
          <div className="mt-8 flex size-full flex-col items-center justify-center">
            <LottiePlayer
              autoplay
              loop
              src="/lottie/ai.json"
              style={{ width: '100%', height: '100%' }}
              className="max-h-125 object-contain"
            />
          </div>
        </div>

        {/* Right Side Column */}
        <div className="col-span-1 flex flex-col gap-4">
          
          {/* ROI Progress Indicator */}
          <div className="relative flex h-60 flex-col items-center justify-center border border-border bg-surface p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="absolute top-4 left-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {isArabic ? 'متوسط العائد المتوقع' : 'Avg. Predicted ROI'}
            </div>
            <div className="mt-4">
               <AnimatedCircularProgressBar
                  max={15}
                  min={0}
                  value={11.5}
                  displayValue="11.5%"
                  gaugePrimaryColor="var(--fjord)"
                  gaugeSecondaryColor="var(--surface-subtle)"
                  className="size-32"
                />
            </div>
          </div>

          {/* Animated List of Signals */}
          <div className="relative flex h-75 flex-col overflow-hidden border border-border bg-surface p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="mb-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {isArabic ? 'إشارات حية' : 'Live Signals'}
            </div>
            <AnimatedList delay={2500}>
              {notifications.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "relative mx-auto flex w-full max-w-100 flex-row items-center gap-3 rounded-none p-3",
                    "border border-border/50 bg-surface-subtle transition-all",
                  )}
                >
                  <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-none", item.color)}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="flex flex-row items-center text-sm font-medium whitespace-pre text-fjord">
                      <span>{item.name}</span>
                      <span className="mx-1 text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="truncate text-xs font-normal text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedList>
            
            {/* Fade overlay for the list */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-surface to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}


