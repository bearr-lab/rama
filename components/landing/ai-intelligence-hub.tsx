'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { AnimatedList } from '@/components/ui/animated-list';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';
import { Database, Building, LineChart, User, BrainCircuit, TrendingUp, Key, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AIIntelligenceHub({ locale, isArabic }: { locale: string; isArabic: boolean }) {
  const t = useTranslations('landing.aiHub');

  // We use English fallback if translations are missing, since we're replacing a component
  const title = isArabic ? 'ذكاء اصطناعي يحلل بيانات ريرا' : 'AI-Powered RERA Intelligence';
  const subtitle = isArabic 
    ? 'محرك راما يقوم بمعالجة بيانات دائرة الأراضي والأملاك في دبي واتجاهات السوق في الوقت الفعلي لاكتشاف أعلى عوائد استثمارية.' 
    : 'The Rama Engine processes live DLD data, global market trends, and RERA analytics to uncover hyper-personalized, high-yield opportunities.';

  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      name: isArabic ? 'فرصة جديدة' : 'New Opportunity',
      description: 'Palm Jumeirah Signature Villa',
      time: '15m ago',
      icon: <Building className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
    {
      name: isArabic ? 'تنبيه عائد استثماري' : 'High Yield Alert',
      description: 'Downtown Dubai Off-Plan: 11.5% ROI',
      time: '1h ago',
      icon: <TrendingUp className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
    {
      name: isArabic ? 'تحديث السوق' : 'Market Signal',
      description: 'Demand surge in Dubai Marina',
      time: '2h ago',
      icon: <LineChart className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
    {
      name: isArabic ? 'تأشيرة ذهبية' : 'Golden Visa Eligible',
      description: 'Emaar Beachfront Apartment',
      time: '3h ago',
      icon: <Key className="size-4 text-fjord" />,
      color: 'bg-surface-warm',
    },
  ];

  return (
    <div className={cn("flex w-full flex-col gap-8", isArabic ? "text-right" : "text-left")}>
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 rounded-none border border-border bg-surface-subtle px-3 py-1 text-xs font-medium tracking-wide text-fjord w-fit">
          <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-fjord-muted hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ {isArabic ? 'محرك الاستثمار المدعوم بالذكاء الاصطناعي' : 'Powered by Rama Engine'}</span>
          </AnimatedShinyText>
        </div>
        <h2 className="text-3xl font-light tracking-tight text-fjord sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="max-w-[700px] text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full min-h-[500px]">
        {/* Animated Beam Section (Spans 2 columns on desktop) */}
        <div 
          className="relative col-span-1 md:col-span-2 flex flex-col items-center justify-center overflow-hidden rounded-none border border-border bg-surface p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          ref={containerRef}
        >
          <div className="absolute top-4 left-4 text-sm font-medium text-fjord tracking-wider uppercase">
            {isArabic ? 'تدفق البيانات الحي' : 'Live Data Ingestion'}
          </div>
          
          <div className="flex h-full w-full flex-col items-stretch justify-between gap-10 mt-8">
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div1Ref} className="size-16">
                <Database className="size-6 text-muted-foreground" />
              </Circle>
              <Circle ref={div5Ref} className="size-16">
                <LineChart className="size-6 text-muted-foreground" />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div2Ref} className="size-16">
                <Building2 className="size-6 text-muted-foreground" />
              </Circle>
              <Circle ref={div4Ref} className="size-24 border-2 border-fjord bg-surface-subtle">
                <BrainCircuit className="size-10 text-fjord" />
              </Circle>
              <Circle ref={div6Ref} className="size-16">
                <TrendingUp className="size-6 text-muted-foreground" />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div3Ref} className="size-16">
                <User className="size-6 text-muted-foreground" />
              </Circle>
              <Circle ref={div7Ref} className="size-16">
                <Key className="size-6 text-muted-foreground" />
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
            pathColor="hsl(var(--border))"
            gradientStartColor="hsl(var(--fjord))"
            gradientStopColor="hsl(var(--fjord-muted))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div4Ref}
            pathColor="hsl(var(--border))"
            gradientStartColor="hsl(var(--fjord))"
            gradientStopColor="hsl(var(--fjord-muted))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            curvature={75}
            endYOffset={10}
            pathColor="hsl(var(--border))"
            gradientStartColor="hsl(var(--fjord))"
            gradientStopColor="hsl(var(--fjord-muted))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
            reverse
            pathColor="hsl(var(--border))"
            gradientStartColor="hsl(var(--fjord))"
            gradientStopColor="hsl(var(--fjord-muted))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div4Ref}
            reverse
            pathColor="hsl(var(--border))"
            gradientStartColor="hsl(var(--fjord))"
            gradientStopColor="hsl(var(--fjord-muted))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div7Ref}
            toRef={div4Ref}
            curvature={75}
            endYOffset={10}
            reverse
            pathColor="hsl(var(--border))"
            gradientStartColor="hsl(var(--fjord))"
            gradientStopColor="hsl(var(--fjord-muted))"
          />
        </div>

        {/* Right Side Column */}
        <div className="col-span-1 flex flex-col gap-4">
          
          {/* ROI Progress Indicator */}
          <div className="flex flex-col items-center justify-center p-6 border border-border bg-surface h-[240px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative">
            <div className="absolute top-4 left-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {isArabic ? 'متوسط العائد المتوقع' : 'Avg. Predicted ROI'}
            </div>
            <div className="mt-4">
               <AnimatedCircularProgressBar
                  max={15}
                  min={0}
                  value={11.5}
                  gaugePrimaryColor="hsl(var(--fjord))"
                  gaugeSecondaryColor="hsl(var(--surface-subtle))"
                  className="size-32"
                />
            </div>
          </div>

          {/* Animated List of Signals */}
          <div className="relative flex flex-col overflow-hidden border border-border bg-surface p-4 h-[300px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="mb-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {isArabic ? 'إشارات حية' : 'Live Signals'}
            </div>
            <AnimatedList delay={2500}>
              {notifications.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "relative mx-auto flex w-full max-w-[400px] flex-row items-center gap-3 rounded-none p-3",
                    "border border-border/50 bg-surface-subtle transition-all",
                  )}
                >
                  <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-none", item.color)}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="flex flex-row items-center whitespace-pre text-sm font-medium text-fjord">
                      <span>{item.name}</span>
                      <span className="mx-1 text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedList>
            
            {/* Fade overlay for the list */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border border-border bg-surface shadow-[0_2px_10px_rgba(0,0,0,0.02)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";
