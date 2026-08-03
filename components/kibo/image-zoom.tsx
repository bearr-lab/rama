'use client';

import React, {
  useState,
  useRef,
  useCallback,
  type HTMLAttributes,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageZoomProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  zoomScale?: number;
  caption?: string;
  badge?: string;
}

export const ImageZoom = ({
  src,
  alt,
  zoomScale = 2.5,
  caption,
  badge = 'DLD Verified Master Plan',
  className,
  ...props
}: ImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !isZoomed) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    },
    [isZoomed],
  );

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'group relative w-full cursor-zoom-in overflow-hidden rounded-none border border-border/60 bg-card select-none',
          isZoomed && 'cursor-zoom-out',
          className,
        )}
        onClick={toggleZoom}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
        {...props}
      >
        <motion.div
          className="size-full"
          animate={{
            scale: isZoomed ? zoomScale : 1,
            originX: `${mousePos.x}%`,
            originY: `${mousePos.y}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <img
            src={src || '/placeholder.svg'}
            alt={alt}
            className="size-full object-cover transition-opacity duration-300"
            draggable={false}
          />
        </motion.div>

        {/* Overlay Controls & Badges */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center justify-between">
            {badge && (
              <span className="rounded-none bg-ink-bg/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {badge}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="pointer-events-auto flex size-8 items-center justify-center rounded-none bg-ink-bg/80 text-white backdrop-blur-md transition-transform hover:scale-110"
              title="Fullscreen Inspect"
            >
              <Maximize2 className="size-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            {caption && (
              <p className="rounded-none bg-ink-bg/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                {caption}
              </p>
            )}
            <div className="ml-auto flex items-center gap-1.5 rounded-none bg-ink-bg/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {isZoomed ? (
                <ZoomOut className="size-3.5" />
              ) : (
                <ZoomIn className="size-3.5" />
              )}
              <span>{isZoomed ? 'Click to Reset' : 'Click to Zoom'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal Viewer */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-ink-bg/95 p-4 backdrop-blur-xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 flex size-10 items-center justify-center rounded-none bg-white/10 text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={src || '/placeholder.svg'}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-none object-contain shadow-2xl"
            />
            {caption && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-none bg-fjord/60 px-6 py-2 text-sm font-medium text-white backdrop-blur-md">
                {caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
