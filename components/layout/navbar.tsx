'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Menu, X, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { LocaleSwitcher } from './locale-switcher';
import { UserMenu } from '@/components/auth/user-menu';
import { useTheme } from 'next-themes';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { RamaLogo } from '@/components/ui/rama-logo';


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  // Determine if we are on a landing page with a dark full-bleed hero image
  const isTransparentNavPage =
    pathname === '/en' ||
    pathname === '/ar' ||
    pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavDark = isTransparentNavPage && !isScrolled;

  const navClasses = cn(
    'fixed top-0 right-0 left-0 z-50 border-b transition-all duration-200',
    {
      'border-transparent bg-transparent text-white': isNavDark,
      'border-border/50 bg-surface/90 text-ink shadow-xs backdrop-blur-xl saturate-[1.8]': !isNavDark,
    },
  );

  const linkClasses = cn(
    'text-sm font-semibold transition-colors',
    {
      'text-white/90 hover:text-white': isNavDark,
      'text-ink hover:text-fjord': !isNavDark,
    },
  );

  return (
    <>
      <header className={navClasses}>
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-12 sm:px-16 lg:px-20">
          {/* Logo */}
          <Link
            href={`/${locale}#hero`}
            className="flex shrink-0 items-center cursor-pointer"
            onClick={(e) => {
              if (
                pathname === `/${locale}` ||
                pathname === `/${locale}/` ||
                pathname === '/' ||
                pathname === '/en' ||
                pathname === '/ar'
              ) {
                const heroEl = document.getElementById('hero');
                if (heroEl) {
                  e.preventDefault();
                  heroEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }}
          >
            <RamaLogo isScrolled={isScrolled} isDark={isNavDark} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href={`/${locale}/projects`} className={linkClasses}>
              {locale === 'ar' ? 'المشاريع' : 'Projects'}
            </Link>
            <Link href={`/${locale}/homes`} className={linkClasses}>
              {locale === 'ar' ? 'العقارات' : 'Homes'}
            </Link>
            <Link href={`/${locale}/areas`} className={linkClasses}>
              {locale === 'ar' ? 'المناطق' : 'Communities'}
            </Link>
            <Link href={`/${locale}/invest`} className={linkClasses}>
              {locale === 'ar' ? 'استثمر' : 'Invest'}
            </Link>
            <Link href={`/${locale}/insights`} className={linkClasses}>
              {locale === 'ar' ? 'رؤى' : 'Insights'}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {mounted ? (
              <AnimatedThemeToggler
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                onThemeChange={setTheme}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                  isNavDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-ink hover:bg-surface-subtle',
                )}
              />
            ) : (
              <div className="h-9 w-9" />
            )}
            <LocaleSwitcher isDark={isNavDark} />
            <UserMenu
              locale={locale as 'en' | 'ar'}
              isDark={isNavDark}
            />
          </div>


          {/* Mobile Menu Toggle */}
          <button
            className="-mr-2 p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
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
