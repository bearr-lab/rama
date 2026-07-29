'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RamaLogoProps {
  variant?: 'full' | 'monogram' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  isScrolled?: boolean;
  isDark?: boolean;
  className?: string;
}

export function RamaLogo({
  variant = 'auto',
  size = 'md',
  isScrolled = false,
  isDark = false,
  className,
}: RamaLogoProps) {
  const isCompact = variant === 'monogram' || (variant === 'auto' && isScrolled);

  const letters = ['R', 'A', 'M', 'A'];

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg lg:text-xl',
    lg: 'text-lg sm:text-xl lg:text-2xl',
  };

  const subTextSizes = {
    sm: 'text-[6px] sm:text-[7px]',
    md: 'text-[7px] sm:text-[8px]',
    lg: 'text-[8px] sm:text-[9px]',
  };

  return (
    <motion.div
      className={cn(
        'relative inline-flex flex-col justify-center select-none cursor-pointer group py-1',
        isDark && 'drop-shadow-lg',
        className,
      )}
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
                'font-display font-black tracking-[0.32em] uppercase leading-none transition-colors duration-300',
                textSizes[size],
                isDark
                  ? 'text-white group-hover:text-fjord-light'
                  : 'text-ink dark:text-white group-hover:text-fjord dark:group-hover:text-fjord-light',
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
          className="relative flex items-center justify-center shrink-0"
          variants={{
            initial: { rotate: 0, scale: 0.9 },
            hover: { rotate: 180, scale: 1.15 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div
            className={cn(
              'size-2 border border-current rounded-none flex items-center justify-center transition-colors duration-300',
              isDark ? 'border-emerald-400 bg-emerald-400/20' : 'border-fjord bg-fjord/10',
            )}
          >
            <div
              className={cn(
                'size-0.5 rounded-none',
                isDark ? 'bg-emerald-300' : 'bg-fjord',
              )}
            />
          </div>
          <span className="absolute -inset-1 rounded-none bg-emerald-400/20 opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100" />
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
            className="overflow-hidden mt-0.5 flex items-center justify-between w-full"
          >
            <span
              className={cn(
                'font-sans tracking-[0.42em] uppercase leading-none transition-colors duration-300',
                subTextSizes[size],
                isDark ? 'text-white font-bold drop-shadow-md' : 'text-text font-medium dark:text-white/70',
              )}
            >
              REAL ESTATE
            </span>

            {/* Micro Horizontal Progress Beam */}
            <motion.div
              className={cn(
                'h-px grow ml-2 rounded-none transition-colors duration-300',
                isDark ? 'bg-white/20 group-hover:bg-emerald-400/60' : 'bg-ink/20 dark:bg-white/20 group-hover:bg-fjord/60',
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
          'absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-none pointer-events-none',
          isDark ? 'bg-gradient-to-r from-emerald-400 via-fjord-light to-transparent' : 'bg-gradient-to-r from-fjord via-ink to-transparent',
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
