'use client';

import * as React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const logoVariants = cva(
  'group relative inline-flex cursor-pointer flex-col justify-center py-1 select-none',
  {
    variants: {
      isDark: {
        true: 'drop-shadow-lg',
        false: '',
      },
    },
    defaultVariants: {
      isDark: false,
    },
  },
);

const letterVariants = cva(
  'font-display leading-none font-black tracking-[0.32em] uppercase transition-colors duration-300',
  {
    variants: {
      size: {
        sm: 'text-sm sm:text-base',
        md: 'text-base sm:text-lg lg:text-xl',
        lg: 'text-lg sm:text-xl lg:text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const subTextVariants = cva(
  'font-sans font-medium tracking-[0.4em] uppercase transition-colors duration-300',
  {
    variants: {
      size: {
        sm: 'text-[6px] sm:text-[7px]',
        md: 'text-[7px] sm:text-[8px]',
        lg: 'text-[8px] sm:text-[9px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface RamaLogoProps
  extends
    Omit<HTMLMotionProps<'div'>, 'size'>,
    VariantProps<typeof logoVariants> {
  variant?: 'full' | 'monogram' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  isScrolled?: boolean;
}

export function RamaLogo({
  variant = 'auto',
  size = 'md',
  isScrolled = false,
  isDark = false,
  className,
  ...props
}: RamaLogoProps) {
  const isCompact =
    variant === 'monogram' || (variant === 'auto' && isScrolled);

  const letters = ['R', 'A', 'M', 'A'];

  return (
    <motion.div
      className={cn(logoVariants({ isDark, className }))}
      {...props}
      initial="initial"
      whileHover="hover"
      animate="animate"
    >
      {/* Top Typographic Row: R A M A + Minimalist Geometric Accent */}
      <div className="flex items-center gap-2">
        {/* Animated Letter Stagger */}
        <div className="flex items-center">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              className={cn(
                letterVariants({ size }),
                isDark
                  ? 'text-white group-hover:text-white/80'
                  : 'text-stone-900 group-hover:text-stone-900 dark:text-white dark:group-hover:text-white/80',
              )}
              variants={{
                initial: { y: 0, opacity: 0.95 },
                hover: {
                  y: -2.5,
                  scale: 1.05,
                  transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 15,
                    delay: index * 0.04,
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* 0px Nordic Lagom Precision Accent Indicator */}
        <motion.div
          className="relative flex shrink-0 items-center justify-center"
          variants={{
            initial: { rotate: 0, scale: 0.9 },
            hover: { rotate: 180, scale: 1.15 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div
            className={cn(
              'flex size-2 items-center justify-center rounded-none border border-current transition-colors duration-300',
              isDark
                ? 'border-stone-300 bg-stone-200 dark:border-stone-700 dark:bg-stone-800/20'
                : 'border-stone-900 bg-stone-900/10 dark:border-stone-100 dark:bg-stone-100/10',
            )}
          >
            <div
              className={cn(
                'size-0.5 rounded-none',
                isDark
                  ? 'bg-stone-200 dark:bg-stone-800'
                  : 'bg-stone-900 dark:bg-stone-100',
              )}
            />
          </div>
          <span className="absolute -inset-1 rounded-none bg-stone-200 opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100 dark:bg-stone-800/20" />
        </motion.div>
      </div>

      {/* Subtitle: REAL ESTATE (Fades & Collapses on Scroll for Precision Minimalist Header) */}
      <AnimatePresence mode="wait">
        {!isCompact && (
          <motion.div
            key="subtitle"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.65, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="mt-0.5 flex w-full items-center justify-between overflow-hidden"
          >
            <span
              className={cn(
                subTextVariants({ size }),
                isDark
                  ? 'font-bold text-white drop-shadow-md'
                  : 'font-medium text-text dark:text-white/70',
              )}
            >
              REAL ESTATE
            </span>

            {/* Micro Horizontal Progress Beam */}
            <motion.div
              className={cn(
                'ml-2 h-px grow rounded-none transition-colors duration-300',
                isDark
                  ? 'bg-white/20 group-hover:bg-stone-200 dark:bg-stone-800/60'
                  : 'bg-ink/20 group-hover:bg-stone-900/60 dark:bg-white/20',
              )}
              variants={{
                initial: { scaleX: 0.3, originX: 0 },
                hover: { scaleX: 1, originX: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Architectural Underline Beam (0px Nordic Lagom Accent) */}
      <motion.div
        className={cn(
          'pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-none',
          isDark
            ? 'via-fjord-light bg-linear-to-r from-emerald-400 to-transparent'
            : 'bg-linear-to-r from-fjord via-ink to-transparent',
        )}
        variants={{
          initial: { scaleX: 0, opacity: 0, originX: 0 },
          hover: { scaleX: 1, opacity: 1, originX: 0 },
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
