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
          'relative border p-2.5 text-muted transition-all hover:bg-surface-subtle hover:text-fjord focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:bg-fjord-hover dark:text-muted',
          isOpen
            ? 'dark:border-border-hover border-border bg-surface-subtle text-fjord dark:bg-fjord-hover dark:text-white'
            : 'border-border dark:border-border',
        )}
        title="Notifications & Lifecycle Alerts"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="text-caption absolute -end-1 -top-1 flex size-5 animate-pulse items-center justify-center bg-fjord-hover font-extrabold text-primary-foreground shadow-sm dark:bg-surface-subtle">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute end-0 z-50 mt-2 w-80 overflow-hidden border border-border bg-surface shadow-2xl duration-150 sm:w-96 dark:border-border dark:bg-fjord-hover">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface-subtle/50 p-4 dark:border-border dark:bg-fjord-hover/50">
            <div className="flex items-center gap-2">
              <h3 className="text-body font-display font-bold text-fjord dark:text-white">
                Lifecycle Alerts
              </h3>
              {unreadCount > 0 && (
                <span className="py-0.2 text-caption bg-surface-subtle px-2 font-bold text-fjord dark:bg-surface-subtle dark:text-muted">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 p-1.5 text-xs font-semibold text-muted transition-colors hover:bg-surface hover:text-fjord dark:bg-fjord-hover dark:text-muted"
                  title="Mark all as read"
                >
                  <Check className="size-3.5" />
                  <span className="hidden sm:inline">Read all</span>
                </button>
              )}
              {alerts.length > 0 && (
                <button
                  onClick={clearAlerts}
                  className="p-1.5 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive dark:text-muted"
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
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted dark:text-muted">
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
                  className={cn(
                    'group relative flex items-start gap-3 p-4 transition-colors hover:bg-surface-subtle dark:bg-fjord-hover',
                    alert.unread &&
                      'bg-surface-subtle/5 dark:bg-surface-subtle/10 dark:bg-surface-subtle/5 dark:bg-surface-subtle/10',
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 shrink-0 p-2',
                      alert.type === 'trust'
                        ? 'bg-surface-subtle/10 text-fjord'
                        : alert.type === 'ai'
                          ? 'bg-surface-subtle/10 text-muted dark:bg-surface-subtle/10 dark:text-muted'
                          : 'bg-surface-subtle/10 text-fjord',
                    )}
                  >
                    {alert.type === 'trust' && (
                      <ShieldCheck className="size-4" />
                    )}
                    {alert.type === 'ai' && <Sparkles className="size-4" />}
                    {alert.type === 'task' && (
                      <CheckSquare className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-body-sm truncate font-bold text-fjord transition-colors group-hover:text-fjord dark:text-muted">
                        {alert.title}
                      </h4>
                      <span className="shrink-0 text-[10px] text-muted dark:text-muted">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-caption mt-0.5 leading-normal text-muted dark:text-muted">
                      {alert.description}
                    </p>
                  </div>

                  {alert.unread && (
                    <span className="size-2 shrink-0 self-center bg-surface-subtle dark:bg-surface-subtle" />
                  )}
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-surface-subtle p-3 text-center dark:border-border dark:bg-fjord-hover">
            <Link
              href={`/${locale}/tasks`}
              onClick={() => setIsOpen(false)}
              className="text-caption inline-flex items-center gap-1 font-bold text-fjord hover:underline dark:text-muted"
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
