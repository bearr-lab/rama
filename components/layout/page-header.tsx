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
}

export function PageHeader({
  title,
  description,
  icon,
  children,
  className,
  backgroundImage,
}: PageHeaderProps) {
  const isImage = !!backgroundImage;

  return (
    <Section
      background={isImage ? undefined : 'surface-subtle'}
      className={cn(
        isImage
          ? 'mt-0 flex min-h-[580px] flex-col justify-center border-none py-28 shadow-none md:py-36'
          : 'mt-16 border-b border-border pt-24 pb-12 md:pt-32 md:pb-16',
        'relative overflow-hidden',
        className,
      )}
    >
      {isImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover scale-105 transition-transform duration-1000"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85 backdrop-blur-[1px]" />
        </>
      )}

      <Container size="2xl" className={cn('relative z-10 space-y-6', isImage && 'text-center max-w-4xl mx-auto')}>
        <div className={cn(isImage && 'flex flex-col items-center text-center')}>
          <h1 className={cn(
            "mb-4 flex items-center justify-center gap-3 font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl",
            isImage ? "text-white drop-shadow-sm" : "text-ink"
          )}>
            {icon && <span className={isImage ? "text-white/80" : "text-fjord"}>{icon}</span>}
            {title}
          </h1>
          {description && (
            <p className={cn(
              "max-w-xl text-lg md:text-xl font-light leading-relaxed",
              isImage ? "text-white/85 mx-auto" : "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
        </div>

        {children && <div className="pt-2 w-full">{children}</div>}
      </Container>
    </Section>
  );
}
