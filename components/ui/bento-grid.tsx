import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-none',
      'border border-border/50 bg-surface',
      'transform-gpu dark:border-white/10 dark:bg-background',
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    <div className="z-10 mt-auto flex h-full flex-col justify-end p-6">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 transition-all duration-300 lg:group-hover:-translate-y-6">
        <Icon className="size-10 origin-left transform-gpu text-white transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="font-display text-2xl font-semibold text-white drop-shadow-sm">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-white/80 drop-shadow-sm">
          {description}
        </p>
      </div>

      <div
        className={cn(
          'pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden',
        )}
      >
        <Button
          variant="link"
          size="sm"
          className="pointer-events-auto p-0 font-medium text-white hover:text-white/80"
          render={<a href={href} />}
          nativeButton={false}
        >
          {cta}
          <ArrowRightIcon className="ms-2 size-4 rtl:rotate-180" />
        </Button>
      </div>
    </div>

    <div
      className={cn(
        'pointer-events-none absolute bottom-0 z-20 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex',
      )}
    >
      <Button
        variant="link"
        size="sm"
        className="pointer-events-auto p-0 font-bold text-white hover:text-white/80"
        render={<a href={href} />}
        nativeButton={false}
      >
        {cta}
        <ArrowRightIcon className="ms-2 size-4 rtl:rotate-180" />
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/10" />
  </div>
);

export { BentoCard, BentoGrid };
