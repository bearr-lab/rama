'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  Bell,
  ShieldCheck,
  Sparkles,
  CheckSquare,
  Check,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  time: string;
  href: string;
  type: 'trust' | 'ai' | 'task';
  unread: boolean;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alert-1',
    title: 'Trust Score Increased (+3)',
    description:
      'Marina Gate Residence 1 re-verified against DLD escrow registry. Score is now 94/100.',
    time: '10m ago',
    href: '/property/prop-2',
    type: 'trust',
    unread: true,
  },
  {
    id: 'alert-2',
    title: 'New High-Yield Match',
    description:
      'Creek Horizon Tower A added to discovery. Yield projected at 7.8% net ROI.',
    time: '2h ago',
    href: '/property/prop-6',
    type: 'ai',
    unread: true,
  },
  {
    id: 'alert-3',
    title: 'Deal Stage Action Required',
    description:
      'Your viewing schedule for Sky Collection Penthouse is ready for DLD legal verification.',
    time: '1d ago',
    href: '/tasks',
    type: 'task',
    unread: true,
  },
];

export function NotificationCenter() {
  const locale = useLocale() || 'en';
  const [alerts, setAlerts] = React.useState<AlertItem[]>(INITIAL_ALERTS);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = alerts.filter((a) => a.unread).length;

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, unread: false })));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const handleAlertClick = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, unread: false } : a)),
    );
    setIsOpen(false);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications & Lifecycle Alerts"
        aria-expanded={isOpen}
        className={cn(
          'relative border p-2.5 text-muted-foreground transition-all hover:bg-surface hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none  dark:text-stone-400',
          isOpen
            ? ' border-border/60 bg-surface text-ink  '
            : 'border-border/60 ',
        )}
        title="Notifications & Lifecycle Alerts"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="text-caption absolute -inset-e-1 -top-1 flex size-5 animate-pulse items-center justify-center bg-rose-500 font-extrabold text-white shadow-sm dark:bg-surface">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute inset-e-0 z-50 mt-2 w-80 overflow-hidden border border-border/60 bg-surface-subtle shadow-2xl duration-150 sm:w-96  ">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-surface/50 p-4  ">
            <div className="flex items-center gap-2">
              <h3 className="text-body font-display font-bold text-ink ">
                Lifecycle Alerts
              </h3>
              {unreadCount > 0 && (
                <span className="py-0.2 text-caption bg-border/50 px-2 font-bold text-ink  ">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 p-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-ink  dark:text-stone-400"
                  title="Mark all as read"
                >
                  <Check className="size-3.5" />
                  <span className="hidden sm:inline">Read all</span>
                </button>
              )}
              {alerts.length > 0 && (
                <button
                  onClick={clearAlerts}
                  className="p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive dark:text-stone-400"
                  title="Clear all alerts"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Alerts List */}
          <div className="max-h-96 divide-y divide-stone-300 overflow-y-auto dark:divide-stone-800">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground dark:text-stone-400">
                <Bell className="mb-2 size-8 opacity-30" />
                <p className="text-body-sm font-semibold">All caught up!</p>
                <p className="text-caption">
                  No pending real estate alerts or task reminders.
                </p>
              </div>
            ) : (
              alerts.map((alert) => (
                <Link
                  key={alert.id}
                  href={`/${locale}${alert.href}`}
                  onClick={() => handleAlertClick(alert.id)}
                  className="block border-b border-border/60 p-3 transition-colors last:border-0 hover:bg-surface-subtle"
                >
                  <Alert
                    className={cn(
                      'border-none p-0',
                      alert.unread ? 'opacity-100' : 'opacity-70',
                    )}
                  >
                    {alert.type === 'trust' && (
                      <ShieldCheck className="size-4 text-ink" />
                    )}
                    {alert.type === 'ai' && <Sparkles className="size-4 text-ink" />}
                    {alert.type === 'task' && (
                      <CheckSquare className="size-4 text-ink" />
                    )}
                    <AlertTitle className="text-body-sm flex items-center justify-between font-bold text-ink">
                      <span>{alert.title}</span>
                      <span className="text-[10px] font-normal text-muted-foreground">
                        {alert.time}
                      </span>
                    </AlertTitle>
                    <AlertDescription className="text-caption mt-0.5 text-muted-foreground">
                      {alert.description}
                    </AlertDescription>
                  </Alert>
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border/60 bg-surface p-3 text-center  ">
            <Link
              href={`/${locale}/tasks`}
              onClick={() => setIsOpen(false)}
              className="text-caption inline-flex items-center gap-1 font-bold text-ink hover:underline "
            >
              <span>View All Transaction Tasks</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
