import { ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { VerificationStatus } from '@/types/property';

interface TrustBadgeProps {
  status: VerificationStatus;
  variant?: 'solid' | 'outline';
  className?: string;
}

export function TrustBadge({
  status,
  variant = 'solid',
  className,
}: TrustBadgeProps) {
  const config = {
    verified: {
      icon: ShieldCheck,
      text: 'DLD Verified',
      color: 'text-verified',
      bgSolid: 'bg-verified-soft',
      bgOutline: 'bg-transparent border-verified/30',
      tooltip:
        'Price and details matched with official Dubai Land Department records.',
    },
    review: {
      icon: Clock,
      text: 'Under Review',
      color: 'text-review',
      bgSolid: 'bg-review-soft',
      bgOutline: 'bg-transparent border-review/30',
      tooltip: 'Currently verifying this listing with our partners.',
    },
    unknown: {
      icon: AlertTriangle,
      text: 'Not Verified',
      color: 'text-unknown',
      bgSolid: 'bg-unknown-soft',
      bgOutline: 'bg-transparent border-unknown/30',
      tooltip: 'Proceed with caution. Details have not been verified by RAMA.',
    },
  };

  const {
    icon: Icon,
    text,
    color,
    bgSolid,
    bgOutline,
    tooltip,
  } = config[status];

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          className={cn(
            'flex cursor-help items-center gap-1.5 border font-medium transition-colors',
            variant === 'solid' ? bgSolid : bgOutline,
            variant === 'solid' ? 'border-transparent' : '',
            color,
            className,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{text}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-[250px] p-3 text-center leading-relaxed">
        <p className="text-sm">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
