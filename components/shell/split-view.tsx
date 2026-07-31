'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SplitViewProps extends React.HTMLAttributes<HTMLDivElement> {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  defaultRatio?: number; // 0 to 1
  minLeftWidth?: number;
  minRightWidth?: number;
}

export function SplitView({
  leftPane,
  rightPane,
  defaultRatio = 0.5,
  minLeftWidth = 300,
  minRightWidth = 300,
  className,
  ...props
}: SplitViewProps) {
  const [ratio, setRatio] = React.useState(defaultRatio);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleDragStart = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragEnd = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrag = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newRatio = (e.clientX - rect.left) / rect.width;

      // Enforce min widths
      const leftWidth = newRatio * rect.width;
      const rightWidth = (1 - newRatio) * rect.width;

      if (leftWidth >= minLeftWidth && rightWidth >= minRightWidth) {
        setRatio(newRatio);
      }
    },
    [isDragging, minLeftWidth, minRightWidth],
  );

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  return (
    <div
      ref={containerRef}
      className={cn('flex size-full overflow-hidden', className)}
      {...props}
    >
      <div
        className="h-full overflow-auto"
        style={{ width: `${ratio * 100}%` }}
      >
        {leftPane}
      </div>

      <div
        className={cn(
          'z-10 h-full w-1.5 shrink-0 cursor-col-resize transition-colors hover:bg-fjord/50',
          isDragging ? 'bg-fjord' : 'bg-border',
        )}
        onMouseDown={handleDragStart}
      />

      <div className="h-full flex-1 overflow-auto">{rightPane}</div>
    </div>
  );
}
