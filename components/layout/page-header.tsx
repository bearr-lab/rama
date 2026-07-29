import { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  /** Optional badge/chip rendered above the title */
  badge?: ReactNode;
  /** Layout variant: "center" for centered text, "editorial" for left-aligned cinematic */
  variant?: 'center' | 'editorial';
}

export function PageHeader({
  title,
  description,
  icon,
  children,
  className,
  backgroundImage,
  backgroundVideo,
  badge,
  variant = 'center',
}: PageHeaderProps) {
  const isCinematic = !!(backgroundImage || backgroundVideo);

  // Non-image hero (simple page header)
  if (!isCinematic) {
    return (
      <Section
        background="surface-subtle"
        className={cn(
          'relative mt-16 overflow-hidden border-b border-border pt-24 pb-12 md:pt-32 md:pb-16',
          className,
        )}
      >
        <Container size="2xl" className="relative z-10 space-y-6">
          <div>
            <h1 className="mb-4 flex items-center gap-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-6xl">
              {icon && <span className="text-fjord">{icon}</span>}
              {title}
            </h1>
            {description && (
              <p className="max-w-xl text-lg leading-relaxed font-light text-muted-foreground md:text-xl">
                {description}
              </p>
            )}
          </div>
          {children && <div className="w-full pt-2">{children}</div>}
        </Container>
      </Section>
    );
  }

  // ─── Cinematic Hero (image or video background) ───
  const isEditorial = variant === 'editorial';

  return (
    <Section
      className={cn(
        'relative mt-0 flex min-h-145 flex-col overflow-hidden border-none py-28 shadow-none md:py-36',
        isEditorial ? 'justify-end' : 'justify-center',
        className,
      )}
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0 bg-black">
        {backgroundVideo ? (
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover object-center opacity-50"
          />
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-50 transition-transform duration-1000"
            unoptimized
            priority
          />
        ) : null}

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-surface" />
        {/* Side vignette for depth */}
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* ── Content Layer ── */}
      <Container
        size="xl"
        className={cn(
          'relative z-10',
          !isEditorial && 'mx-auto flex max-w-4xl flex-col items-center',
        )}
      >
        {/* Glassmorphic Card */}
        <div
          className={cn(
            // Premium glassmorphism: frosted, luminous edge, depth
            'rounded-2xl border border-white/15 bg-white/8 p-8 shadow-2xl shadow-black/20 backdrop-blur-2xl backdrop-saturate-150 md:p-12',
            isEditorial ? 'max-w-3xl space-y-6' : 'flex w-full flex-col items-center space-y-4 text-center',
          )}
        >
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-white/90 uppercase backdrop-blur-md">
              {badge}
            </div>
          )}

          {/* Title */}
          <h1
            className={cn(
              'font-display text-4xl leading-tight font-normal tracking-tight text-white drop-shadow-md md:text-5xl lg:text-6xl',
              !isEditorial && 'justify-center',
            )}
          >
            {icon && <span className="mr-3 text-white/80">{icon}</span>}
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={cn(
                'max-w-2xl text-base leading-relaxed font-light text-white/85 md:text-lg',
                !isEditorial && 'mx-auto',
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Children slot (search bars, filters, CTAs) */}
        {children && (
          <div className={cn('w-full pt-6', !isEditorial && 'flex flex-col items-center')}>
            {children}
          </div>
        )}
      </Container>
    </Section>
  );
}
