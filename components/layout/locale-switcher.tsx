'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  isDark?: boolean;
}

export function LocaleSwitcher({ isDark = false }: LocaleSwitcherProps) {
  const pathname = usePathname();

  // Basic implementation until next-intl is fully configured
  const currentLocale =
    pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
  const nextLocale = currentLocale === 'en' ? 'ar' : 'en';
  let togglePath = pathname;
  if (pathname === '/' || pathname === '') {
    togglePath = `/${nextLocale}`;
  } else if (
    pathname === `/${currentLocale}` ||
    pathname.startsWith(`/${currentLocale}/`)
  ) {
    togglePath = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
  } else {
    togglePath = `/${nextLocale}${pathname}`;
  }

  return (
    <Link
      href={togglePath || `/${nextLocale}`}
      className={cn(
        'rounded-none px-2 py-1 text-xs font-semibold tracking-wider uppercase transition-colors',
        isDark
          ? 'text-white hover:bg-white/10'
          : 'text-ink hover:bg-surface-subtle',
      )}
    >
      {nextLocale}
    </Link>
  );
}
