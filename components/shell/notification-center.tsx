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
          'relative border p-2.5 text-stone-500 transition-all hover:bg-stone-100 hover:text-stone-900 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:bg-stone-900 dark:text-stone-400',
          isOpen
            ? 'dark:border-stone-800-hover border-stone-300 bg-stone-100 text-stone-900 dark:bg-stone-900 dark:text-stone-50'
            : 'border-stone-300 dark:border-stone-800',
        )}
        title="Notifications & Lifecycle Alerts"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="text-caption absolute -end-1 -top-1 flex size-5 animate-pulse items-center justify-center bg-stone-900 font-extrabold text-primary-foreground shadow-sm dark:bg-stone-100">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute end-0 z-50 mt-2 w-80 overflow-hidden border border-stone-300 bg-stone-50 shadow-2xl duration-150 sm:w-96 dark:border-stone-800 dark:bg-stone-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-300 bg-stone-100/50 p-4 dark:border-stone-800 dark:bg-stone-900/50">
            <div className="flex items-center gap-2">
              <h3 className="text-body font-display font-bold text-stone-900 dark:text-stone-50">
                Lifecycle Alerts
              </h3>
              {unreadCount > 0 && (
                <span className="py-0.2 text-caption bg-stone-200 px-2 font-bold text-stone-900 dark:bg-stone-800 dark:text-stone-100">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 p-1.5 text-xs font-semibold text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:bg-stone-950 dark:text-stone-400"
                  title="Mark all as read"
                >
                  <Check className="size-3.5" />
                  <span className="hidden sm:inline">Read all</span>
                </button>
              )}
              {alerts.length > 0 && (
                <button
                  onClick={clearAlerts}
                  className="p-1.5 text-stone-500 transition-colors hover:bg-destructive/10 hover:text-destructive dark:text-stone-400"
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
              <div className="flex flex-col items-center justify-center p-8 text-center text-stone-500 dark:text-stone-400">
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
                    'group relative flex items-start gap-3 p-4 transition-colors hover:bg-stone-100 dark:bg-stone-900',
                    alert.unread &&
                      'bg-stone-200/5 dark:bg-stone-200/10 dark:bg-stone-800/5 dark:bg-stone-800/10',
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 shrink-0 p-2',
                      alert.type === 'trust'
                        ? 'bg-stone-800/10 text-stone-800'
                        : alert.type === 'ai'
                          ? 'bg-stone-200/10 text-stone-600 dark:bg-stone-800/10 dark:text-stone-400'
                          : 'bg-stone-800/10 text-stone-800',
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
                      <h4 className="text-body-sm truncate font-bold text-stone-900 transition-colors group-hover:text-stone-900 dark:text-stone-100">
                        {alert.title}
                      </h4>
                      <span className="shrink-0 text-[10px] text-stone-500 dark:text-stone-400">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-caption mt-0.5 leading-normal text-stone-500 dark:text-stone-400">
                      {alert.description}
                    </p>
                  </div>

                  {alert.unread && (
                    <span className="size-2 shrink-0 self-center bg-stone-200 dark:bg-stone-800" />
                  )}
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-stone-300 bg-stone-100 p-3 text-center dark:border-stone-800 dark:bg-stone-900">
            <Link
              href={`/${locale}/tasks`}
              onClick={() => setIsOpen(false)}
              className="text-caption inline-flex items-center gap-1 font-bold text-stone-900 hover:underline dark:text-stone-100"
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
