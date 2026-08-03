import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { cn } from '@/lib/utils';

export interface MetricItem {
  id: string;
  title: string;
  value: number | string | React.ReactNode;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  description: React.ReactNode;
  badgeText?: React.ReactNode;
  isShinyBadge?: boolean;
  href?: string;
}

export interface MetricStripProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: MetricItem[];
}

export function MetricStrip({ metrics, className, ...props }: MetricStripProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-8 sm:grid-cols-2", className)} {...props}>
      {metrics.map((metric, index) => {
        const content = (
          <>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
                {metric.title}
              </span>
              {metric.href && (
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:text-fjord" />
              )}
            </div>
            
            <div className="mt-3 flex h-full flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="flex items-baseline font-display text-3xl font-semibold text-ink">
                    {metric.prefix && <span className="mr-1 font-sans text-xl">{metric.prefix}</span>}
                    {typeof metric.value === 'number' ? (
                      <NumberTicker value={metric.value} decimalPlaces={metric.decimalPlaces} suffix={metric.suffix} />
                    ) : (
                      <span>{metric.value}</span>
                    )}
                  </span>
                  {metric.badgeText && (
                    <span className="inline-flex items-center rounded-none bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {metric.isShinyBadge ? (
                        <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
                          {metric.badgeText}
                        </AnimatedShinyText>
                      ) : (
                        metric.badgeText
                      )}
                    </span>
                  )}
                </div>
                {typeof metric.description === 'string' ? (
                  <p className="mt-1 text-xs font-light text-muted-foreground">
                    {metric.description}
                  </p>
                ) : (
                  metric.description
                )}
              </div>
            </div>
          </>
        );

        const cardClasses = cn(
          "group relative flex h-full flex-col justify-between rounded-none border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all duration-300",
          metric.href ? "hover:shadow-floating hover:border-fjord/30 hover:bg-surface" : "hover:shadow-floating"
        );

        return (
          <BlurFade key={metric.id} delay={0.1 * (index + 1)}>
            {metric.href ? (
              <Link href={metric.href} className={cardClasses}>
                {content}
              </Link>
            ) : (
              <div className={cardClasses}>
                {content}
              </div>
            )}
          </BlurFade>
        );
      })}
    </div>
  );
}
