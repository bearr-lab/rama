/* eslint-disable tailwindcss/classnames-order */
import { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

export interface HeroNordicProps {
  badgeIcon?: ReactNode;
  badgeText?: string;
  title: ReactNode;
  titleClassName?: string;
  subtitle?: ReactNode;
  backgroundVideo?: string;
  backgroundImage?: string;
  bottomConsole?: ReactNode;
  className?: string;
  mediaPosition?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    title: 'text-[clamp(28px,4vw,44px)] leading-[1.08]',
    container: 'max-w-5xl',
  },
  md: {
    title: 'text-[clamp(36px,5vw,60px)] leading-[1.05]',
    container: 'max-w-6xl',
  },
  lg: {
    title: 'text-[clamp(44px,6vw,72px)] leading-[1.05]',
    container: 'max-w-7xl',
  },
};

export function HeroNordic({
  badgeIcon,
  badgeText,
  title,
  titleClassName,
  subtitle,
  backgroundVideo,
  backgroundImage,
  bottomConsole,
  className,
  mediaPosition = 'object-top',
  size = 'md',
}: HeroNordicProps) {
  const { title: titleClass, container: containerClass } = sizeClasses[size];

  return (
    <div
      className={cn(
        'relative z-0 flex min-h-screen w-full flex-col justify-center pt-32 pb-20',
        className,
      )}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
        {backgroundVideo ? (
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className={cn('size-full object-cover opacity-80', mediaPosition)}
          />
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className={cn('object-cover opacity-80', mediaPosition)}
          />
        ) : null}
        {/* Radial gradient + vignette for luxury tech feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />
      </div>

      {/* Foreground Content */}
      <Container
        size="2xl"
        className="relative z-10 flex flex-col items-center justify-center px-[clamp(20px,4vw,48px)] text-center"
      >
        <div className={cn('mb-8 flex flex-col items-center', containerClass)}>
          {(badgeIcon || badgeText) && (
            <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase">
              {badgeIcon && <span>{badgeIcon}</span>}
              {badgeText && <span>{badgeText}</span>}
            </div>
          )}
          <h1
            className={cn(
              'font-display leading-none font-light tracking-tighter text-white drop-shadow-2xl',
              titleClass,
              titleClassName,
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-105 text-base leading-relaxed font-light text-white/65 md:max-w-lg md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Distilled Finder Area / Bottom Console */}
        {bottomConsole && (
          <div className="mt-10 flex w-full flex-col items-center gap-6 md:mt-12">
            {bottomConsole}
          </div>
        )}
      </Container>
    </div>
  );
}
