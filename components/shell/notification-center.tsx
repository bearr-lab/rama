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
          'relative rounded-xl border p-2.5 text-muted transition-all hover:bg-surface-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isOpen
            ? 'border-border-hover bg-surface-subtle text-ink'
            : 'border-border',
        )}
        title="Notifications & Lifecycle Alerts"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -end-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-fjord text-caption font-extrabold text-primary-foreground shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute end-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl duration-150 sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface-subtle/50 p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-body font-display font-bold text-ink">
                Lifecycle Alerts
              </h3>
              {unreadCount > 0 && (
                <span className="py-0.2 rounded-full bg-fjord-soft px-2 text-caption font-bold text-fjord">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 rounded-lg p-1.5 text-xs font-semibold text-muted transition-colors hover:bg-surface hover:text-ink"
                  title="Mark all as read"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Read all</span>
                </button>
              )}
              {alerts.length > 0 && (
                <button
                  onClick={clearAlerts}
                  className="rounded-lg p-1.5 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
                  title="Clear all alerts"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Alerts List */}
          <div className="max-h-96 divide-y divide-border overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted">
                <Bell className="mb-2 h-8 w-8 opacity-30" />
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
                    'group relative flex items-start gap-3 p-4 transition-colors hover:bg-surface-subtle',
                    alert.unread && 'bg-sky-500/5 dark:bg-sky-500/10',
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 shrink-0 rounded-xl p-2',
                      alert.type === 'trust'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : alert.type === 'ai'
                          ? 'bg-sky-500/10 text-sky-500'
                          : 'bg-purple-500/10 text-purple-500',
                    )}
                  >
                    {alert.type === 'trust' && (
                      <ShieldCheck className="h-4 w-4" />
                    )}
                    {alert.type === 'ai' && <Sparkles className="h-4 w-4" />}
                    {alert.type === 'task' && (
                      <CheckSquare className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-body-sm truncate font-bold text-ink transition-colors group-hover:text-fjord">
                        {alert.title}
                      </h4>
                      <span className="shrink-0 text-[10px] text-muted">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-caption mt-0.5 leading-normal text-muted">
                      {alert.description}
                    </p>
                  </div>

                  {alert.unread && (
                    <span className="h-2 w-2 shrink-0 self-center rounded-full bg-sky-500" />
                  )}
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-surface-subtle p-3 text-center">
            <Link
              href={`/${locale}/tasks`}
              onClick={() => setIsOpen(false)}
              className="text-caption inline-flex items-center gap-1 font-bold text-fjord hover:underline"
            >
              <span>View All Transaction Tasks</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
