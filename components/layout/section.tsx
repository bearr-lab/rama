import { HTMLAttributes, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  background?:
    'transparent' | 'canvas' | 'surface' | 'surface-subtle' | 'ink' | 'ink-bg';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({
  children,
  as: Component = 'section',
  background = 'transparent',
  spacing = 'lg',
  className,
  ...props
}: SectionProps) {
  const bgClasses = {
    transparent: 'bg-transparent',
    canvas: 'bg-canvas',
    surface: 'bg-surface',
    'surface-subtle': 'bg-surface-subtle',
    ink: 'bg-ink-bg text-white',
    'ink-bg': 'bg-ink-bg text-white',
  };

  const spacingClasses = {
    none: 'py-0',
    sm: 'py-8',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24', // Standard 96px on desktop
    xl: 'py-24 md:py-32',
  };

  return (
    <Component
      className={cn(
        'relative w-full',
        bgClasses[background],
        spacingClasses[spacing],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
