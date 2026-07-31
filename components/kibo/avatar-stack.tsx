'use client';

import React, { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/ui/avatar';

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

const statusColors = {
  verified: 'bg-emerald-500',
  online: 'bg-emerald-400',
  busy: 'bg-amber-500',
  offline: 'bg-neutral-400',
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

  const avatarSize = size === 'md' ? 'default' : size;

  return (
    <div className={cn('flex items-center gap-2.5', className)} {...props}>
      <AvatarGroup className={cn(!showRing && '*:data-[slot=avatar]:ring-0')}>
        {visibleAvatars.map((item, index) => (
          <Avatar
            key={item.id || index}
            size={avatarSize}
            title={`${item.name}${item.role ? ` • ${item.role}` : ''}`}
            className="cursor-pointer transition-transform hover:z-30 hover:scale-110"
          >
            <AvatarImage src={item.avatarUrl} alt={item.name} />
            <AvatarFallback>
              {item.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
            {item.status && (
              <AvatarBadge
                className={cn(statusColors[item.status], !showRing && 'ring-0')}
              />
            )}
          </Avatar>
        ))}
        {remainingCount > 0 && (
          <AvatarGroupCount className={cn(!showRing && 'ring-0')}>
            +{remainingCount}
          </AvatarGroupCount>
        )}
      </AvatarGroup>

      {label && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
};
