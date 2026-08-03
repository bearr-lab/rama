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
  /** Optional Tailwind class for object-position of the background media (default: object-center) */
  mediaPosition?: string;
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
  mediaPosition = 'object-center',
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
            <h1 className="mb-4 flex items-center gap-3 font-display text-4xl font-medium tracking-tight text-fjord md:text-5xl lg:text-6xl">
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

  // ─── Cinematic Hero (clean, minimal — matches landing page) ───
  const isEditorial = variant === 'editorial';

  return (
    <Section
      className={cn(
        'relative mt-0 flex min-h-145 flex-col justify-end overflow-hidden border-none py-0 shadow-none',
        className,
      )}
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo ? (
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className={cn('size-full object-cover', mediaPosition)}
          />
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            sizes="100vw"
            className={cn('object-cover', mediaPosition)}
            priority
          />
        ) : null}

        {/* Gradient overlay — matches landing hero */}
        <div className="absolute inset-0 bg-fjord/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* ── Content Layer — anchored to bottom ── */}
      <Container
        size="xl"
        className={cn(
          'relative z-10 pb-12 md:pb-24',
          isEditorial
            ? 'max-w-4xl'
            : 'mx-auto flex max-w-4xl flex-col items-center text-center',
        )}
      >
        {/* Badge — minimal Nordic label */}
        {badge && (
          <div className="mb-6 inline-flex items-center gap-2 border border-white/30 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/80 uppercase">
            {badge}
          </div>
        )}

        {/* Title */}
        <h1
          className={cn(
            'font-display text-5xl leading-none font-normal tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl',
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
              'mt-6 max-w-2xl text-base leading-relaxed font-medium text-white/90 drop-shadow-md md:text-lg',
              !isEditorial && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}

        {/* Children slot (search bars, filters, CTAs) */}
        {children && (
          <div
            className={cn(
              'mt-8 w-full',
              !isEditorial && 'flex flex-col items-center',
            )}
          >
            {children}
          </div>
        )}
      </Container>
    </Section>
  );
}
