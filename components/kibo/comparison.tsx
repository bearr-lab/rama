'use client';

import React, {
  useState,
  useRef,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion } from 'motion/react';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ComparisonProps extends HTMLAttributes<HTMLDivElement> {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent?: ReactNode;
  afterContent?: ReactNode;
  defaultPosition?: number;
  mode?: 'hover' | 'drag';
}

export const Comparison = ({
  beforeImage,
  afterImage,
  beforeLabel = '3D Master Plan',
  afterLabel = 'Real Construction',
  beforeContent,
  afterContent,
  defaultPosition = 50,
  mode = 'drag',
  className,
  ...props
}: ComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (mode === 'drag') setIsDragging(true);
  }, [mode]);

  const handleMouseUp = useCallback(() => {
    if (mode === 'drag') setIsDragging(false);
  }, [mode]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (mode === 'hover' || isDragging) {
        handleMove(e.clientX);
      }
    },
    [mode, isDragging, handleMove],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (mode === 'hover' || isDragging) {
        handleMove(e.touches[0].clientX);
      }
    },
    [mode, isDragging, handleMove],
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative w-full overflow-hidden border border-stone-300/60 bg-card select-none dark:border-stone-800/60',
        mode === 'drag' ? 'cursor-ew-resize' : 'cursor-pointer',
        className,
      )}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      {...props}
    >
      {/* After / Bottom Layer */}
      <div className="absolute inset-0 size-full">
        {afterContent ? (
          afterContent
        ) : (
          <img
            src={afterImage || '/placeholder.svg'}
            alt={afterLabel}
            className="size-full object-cover"
            draggable={false}
          />
        )}
        <div className="absolute right-4 bottom-4 z-10 bg-ink-bg/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {afterLabel}
        </div>
      </div>

      {/* Before / Top Layer (Clipped) */}
      <div
        className="absolute inset-0 size-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="absolute inset-0 size-full">
          {beforeContent ? (
            beforeContent
          ) : (
            <img
              src={beforeImage || '/placeholder.svg'}
              alt={beforeLabel}
              className="size-full object-cover"
              draggable={false}
            />
          )}
          <div className="absolute bottom-4 left-4 z-10 bg-ink-bg/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {beforeLabel}
          </div>
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <motion.div
        className="absolute inset-y-0 z-20 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%` }}
        animate={{ scaleX: isDragging ? 1.5 : 1 }}
      >
        <div className="group- absolute top-1/2 -left-3 flex h-8 w-7 -translate-y-1/2 items-center justify-center border border-stone-300/80 bg-white text-stone-900 shadow-md transition-transform dark:border-stone-800/80 dark:bg-ink-bg dark:text-white">
          <GripVertical className="size-4" />
        </div>
      </motion.div>
    </div>
  );
};
