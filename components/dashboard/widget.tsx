import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Widget({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}: WidgetProps) {
  return (
    <Card
      className={cn('flex flex-col border-border bg-card shadow-sm', className)}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base leading-none font-semibold">
            {title}
          </CardTitle>
          {subtitle && (
            <CardDescription className="text-xs">{subtitle}</CardDescription>
          )}
        </div>
        <CardAction className="flex items-center gap-2">
          {action}
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-8 w-8 text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 pt-4">{children}</CardContent>
    </Card>
  );
}
