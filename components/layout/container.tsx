import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Container({
  children,
  size = 'lg',
  padding = 'lg',
  className,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-container-sm',
    md: 'max-w-container-md',
    lg: 'max-w-container-lg',
    xl: 'max-w-container-xl',
    '2xl': 'max-w-container-2xl',
    full: 'max-w-none',
  };

  const paddingClasses = {
    none: 'px-0',
    xs: 'px-10',
    sm: 'px-10 sm:px-12',
    md: 'px-10 sm:px-14 md:px-16',
    lg: 'px-12 sm:px-16 lg:px-20',
    xl: 'px-12 sm:px-16 lg:px-20',
    '2xl': 'px-12 sm:px-18 lg:px-24',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizeClasses[size],
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
