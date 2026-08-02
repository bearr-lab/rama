'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 250,
  gradientColor = '#0a4e6e25',
  gradientOpacity = 0.8,
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative flex size-full overflow-hidden rounded-xl border border-border/80 bg-white p-4 transition-all duration-300 dark:border-border dark:bg-fjord-hover',
        className,
      )}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 80%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
