'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';
import { LocaleSwitcher } from './locale-switcher';
import { UserMenu } from '@/components/auth/user-menu';
import { useTheme } from 'next-themes';
import { ThemeToggler } from '@/components/ui/theme-toggler';
import { RamaLogo } from '@/components/ui/rama-logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Nav');

  useEffect(() => {
    setMounted(true);
  }, []);

  // All top-level public pages that render a full-bleed dark HeroNordic hero.
  // Matching on segment[1] covers both listing pages (/en/projects) and their
  // detail children (/en/projects/slug) which also carry their own hero imagery.
  const HERO_PAGE_SEGMENTS = [
    '',
    'projects',
    'homes',
    'communities',
    'invest',
    'insights',
  ];

  const isTransparentNavPage = (() => {
    // usePathname from next-intl/routing returns the pathname WITHOUT the locale prefix
    // e.g. on /en/projects it returns '/projects', on /en it returns '/'
    const segments = pathname.split('/').filter(Boolean); // e.g. ['projects']
    const pageSegment = segments[0] ?? ''; // '' for home ('/'), 'projects' for /projects
    // Only apply transparent nav on top-level listing pages, NOT detail children
    // e.g. /projects (1 segment) = transparent, /insights/10 (2 segments) = solid
    const isListingPage = segments.length <= 1;
    return HERO_PAGE_SEGMENTS.includes(pageSegment) && isListingPage;
  })();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavDark = isTransparentNavPage && !isScrolled;

  const navClasses = cn(
    'fixed inset-x-0 top-0 z-50 border-b transition-all duration-200',
    {
      'border-transparent bg-transparent text-white': isNavDark,
      'border-border/50 bg-surface/90 text-fjord shadow-xs saturate-[1.8] backdrop-blur-xl dark:border-border/50 dark:bg-fjord-hover/90 dark:text-white':
        !isNavDark,
    },
  );

  const linkClasses = cn('text-sm font-semibold transition-colors', {
    'text-white/90 hover:text-white': isNavDark,
    'text-fjord hover:text-fjord dark:text-white': !isNavDark,
  });

  return (
    <>
      <header className={navClasses}>
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-12 sm:px-16 lg:px-20">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 cursor-pointer items-center">
            <RamaLogo isScrolled={isScrolled} isDark={isNavDark} />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            <Link href="/projects" className={linkClasses}>
              {t('projects')}
            </Link>
            <Link href="/homes" className={linkClasses}>
              {t('homes')}
            </Link>
            <Link href="/communities" className={linkClasses}>
              {t('communities')}
            </Link>
            <Link href="/invest" className={linkClasses}>
              {t('invest')}
            </Link>
            <Link href="/insights" className={linkClasses}>
              {t('insights')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {mounted ? (
              <ThemeToggler
                className={cn(
                  'mr-2',
                  isNavDark && 'border-white/20 bg-black/20 hover:border-white/40 hover:bg-black/40'
                )}
              />
            ) : (
              <div className="size-9" />
            )}
            <LocaleSwitcher isDark={isNavDark} />
            <UserMenu locale={locale as 'en' | 'ar'} isDark={isNavDark} />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="-mr-2 p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={t('openMenu')}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale as 'en' | 'ar'}
      />
    </>
  );
}
