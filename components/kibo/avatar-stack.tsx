'use client';

import React, { type HTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface AvatarItem {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  status?: 'verified' | 'online' | 'busy' | 'offline';
}

export interface AvatarStackProps extends HTMLAttributes<HTMLDivElement> {
  avatars: AvatarItem[];
  maxAvatars?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showRing?: boolean;
}

const sizeClasses = {
  sm: 'h-7 w-7 text-[10px] -ml-2 first:ml-0',
  md: 'h-9 w-9 text-xs -ml-3 first:ml-0',
  lg: 'h-11 w-11 text-sm -ml-3.5 first:ml-0',
};

const dotSizes = {
  sm: 'h-2 w-2 right-0 bottom-0',
  md: 'h-2.5 w-2.5 right-0 bottom-0',
  lg: 'h-3 w-3 right-0.5 bottom-0.5',
};

const statusColors = {
  verified: 'bg-emerald-500 ring-white dark:ring-ink-bg',
  online: 'bg-emerald-400 ring-white dark:ring-ink-bg',
  busy: 'bg-amber-500 ring-white dark:ring-ink-bg',
  offline: 'bg-neutral-400 ring-white dark:ring-ink-bg',
};

export const AvatarStack = ({
  avatars = [],
  maxAvatars = 4,
  size = 'md',
  label,
  showRing = true,
  className,
  ...props
}: AvatarStackProps) => {
  const visibleAvatars = avatars.slice(0, maxAvatars);
  const remainingCount = avatars.length - maxAvatars;

  return (
    <div className={cn('flex items-center gap-2.5', className)} {...props}>
      <div className="flex items-center">
        {visibleAvatars.map((item, index) => (
          <motion.div
            key={item.id || index}
            whileHover={{ scale: 1.15, zIndex: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={cn(
              'group relative relative inline-flex items-center justify-center rounded-full border-2 border-white bg-neutral-100 font-semibold text-neutral-700 shadow-sm transition-all duration-200 select-none dark:border-ink-bg dark:bg-neutral-800 dark:text-neutral-200',
              sizeClasses[size],
              showRing && item.status === 'verified' && 'ring-2 ring-emerald-500/50 ring-offset-1 ring-offset-white dark:ring-offset-ink-bg'
            )}
            title={`${item.name}${item.role ? ` • ${item.role}` : ''}`}
            style={{ zIndex: visibleAvatars.length - index }}
          >
            {item.avatarUrl ? (
              <img
                src={item.avatarUrl}
                alt={item.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span>{item.name.slice(0, 2).toUpperCase()}</span>
            )}

            {item.status && (
              <span
                className={cn(
                  'absolute rounded-full ring-2',
                  dotSizes[size],
                  statusColors[item.status]
                )}
              />
            )}

            {/* Hover Tooltip */}
            <div className="pointer-events-none absolute -top-8 left-1/2 z-50 whitespace-nowrap rounded-md bg-ink-bg px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-neutral-900 -translate-x-1/2">
              {item.name}
            </div>
          </motion.div>
        ))}

        {remainingCount > 0 && (
          <motion.div
            whileHover={{ scale: 1.1, zIndex: 30 }}
            className={cn(
              'relative inline-flex items-center justify-center rounded-full border-2 border-white bg-neutral-200 font-bold text-neutral-600 shadow-sm select-none dark:border-ink-bg dark:bg-neutral-700 dark:text-neutral-200',
              sizeClasses[size]
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </motion.div>
        )}
      </div>

      {label && (
        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {label}
        </span>
      )}
    </div>
  );
};
