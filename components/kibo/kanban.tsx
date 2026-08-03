'use client';

import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GripVertical,
  Plus,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface KanbanColumn<T> {
  id: string;
  title: string;
  color?: string;
  badgeCount?: number;
  items: T[];
}

export interface KanbanProps<T> {
  columns: KanbanColumn<T>[];
  onMoveItem?: (
    itemId: string,
    sourceColId: string,
    targetColId: string,
  ) => void;
  renderCard: (
    item: T,
    colId: string,
    onMove: (dir: 'left' | 'right') => void,
  ) => ReactNode;
  onAddColumn?: () => void;
  className?: string;
}

export function Kanban<T extends { id: string }>({
  columns,
  onMoveItem,
  renderCard,
  className,
}: KanbanProps<T>) {
  const [activeCols, setActiveCols] = useState<KanbanColumn<T>[]>(columns);

  React.useEffect(() => {
    setActiveCols(columns);
  }, [columns]);

  const handleMoveDirection = (
    itemId: string,
    colIndex: number,
    direction: 'left' | 'right',
  ) => {
    const targetIndex = direction === 'left' ? colIndex - 1 : colIndex + 1;
    if (targetIndex < 0 || targetIndex >= activeCols.length) return;
    const sourceCol = activeCols[colIndex];
    const targetCol = activeCols[targetIndex];
    if (onMoveItem) {
      onMoveItem(itemId, sourceCol.id, targetCol.id);
    }
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {activeCols.map((col, colIndex) => (
        <div
          key={col.id}
          className="flex flex-col rounded-none border border-border/60 bg-surface-subtle/40 p-4 shadow-sm backdrop-blur-sm"
        >
          {/* Column Header */}
          <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-3">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  'size-2.5 rounded-none',
                  col.color || 'bg-fjord',
                )}
              />
              <h3 className="font-display text-sm font-bold tracking-wider text-fjord uppercase">
                {col.title}
              </h3>
            </div>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-none bg-border/40 px-2 text-xs font-bold text-muted-foreground">
              {col.items.length}
            </span>
          </div>

          {/* Cards List */}
          <div className="flex min-h-50 flex-1 flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {col.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.15 },
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="group relative"
                >
                  {renderCard(item, col.id, (dir) =>
                    handleMoveDirection(item.id, colIndex, dir),
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {col.items.length === 0 && (
              <div className="flex flex-1 items-center justify-center rounded-none border border-dashed border-border/60 p-6 text-center text-xs font-medium text-muted-foreground">
                No active deals in this stage
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
