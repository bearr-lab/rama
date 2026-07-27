'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        if ((err as Error).name !== 'AbortError') {
          fallbackCopy();
        }
      }
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="secondary"
            size="icon"
            onClick={handleShare}
            className="h-10 w-10 rounded-full border border-border bg-surface text-ink shadow-sm hover:bg-surface-subtle"
          />
        }
      >
        {copied ? (
          <Check className="h-4 w-4 text-verified" />
        ) : (
          <Share2 className="h-4 w-4 text-ink" />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{copied ? 'Link copied!' : 'Share property'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
