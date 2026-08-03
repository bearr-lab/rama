import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { RamaLogo } from '@/components/ui/rama-logo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: 'en' | 'ar';
}

export function MobileNav({ isOpen, onClose, locale = 'en' }: MobileNavProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('MobileNav');
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const drawerNode = drawerRef.current;
    if (!drawerNode) return;

    const focusableElements = drawerNode.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (firstElement) {
      firstElement.focus();
    } else {
      drawerNode.focus();
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-fjord/20 backdrop-blur-sm transition-opacity duration-240',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        tabIndex={-1}
        className={cn(
          'ease-decelerate fixed inset-y-0 right-0 z-50 flex w-75 max-w-[80vw] transform flex-col bg-surface shadow-lg transition-transform duration-240 outline-none',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        {...(!isOpen ? { inert: true } : {})}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <Link href={`/${locale}#hero`} onClick={onClose}>
            <RamaLogo variant="full" size="sm" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 rounded-none p-2 text-muted-foreground transition-colors hover:text-fjord focus-visible:ring-2 focus-visible:ring-fjord-muted focus-visible:outline-none"
            aria-label={t('closeMenu')}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-4">
            <Link
              href={`/${locale}/projects`}
              className="text-lg font-medium text-fjord transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'المشاريع' : 'Projects'}
            </Link>
            <Link
              href={`/${locale}/homes`}
              className="text-lg font-medium text-fjord transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'العقارات' : 'Homes'}
            </Link>
            <Link
              href={`/${locale}/areas`}
              className="text-lg font-medium text-fjord transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'المناطق' : 'Communities'}
            </Link>
            <Link
              href={`/${locale}/invest`}
              className="text-lg font-medium text-fjord transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'استثمر' : 'Invest'}
            </Link>
            <Link
              href={`/${locale}/insights`}
              className="text-lg font-medium text-fjord transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'رؤى' : 'Insights'}
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
            <Link
              href={`/${locale}/login`}
              onClick={onClose}
              className={buttonVariants({
                className:
                  'rounded-none w-full bg-fjord text-white hover:bg-fjord-hover',
              })}
            >
              Sign In
            </Link>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Language</span>
              <div className="flex gap-2">
                <Link
                  href="/en"
                  className="rounded-none bg-surface-subtle px-2 py-1 text-sm font-medium text-ink"
                >
                  EN
                </Link>
                <Link
                  href="/ar"
                  className="rounded-none px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-surface-subtle hover:text-ink"
                >
                  AR
                </Link>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'المظهر' : 'Theme'}
              </span>
              {mounted && (
                <div className="flex items-center gap-2">
                  <AnimatedThemeToggler
                    theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                    onThemeChange={setTheme}
                    className="flex size-9 items-center justify-center rounded-none bg-surface-subtle text-ink transition-colors hover:bg-surface-subtle/80 focus-visible:ring-2 focus-visible:ring-fjord-muted focus-visible:outline-none"
                    aria-label={
                      resolvedTheme === 'dark'
                        ? t('themeLight')
                        : t('themeDark')
                    }
                  />
                  <span className="text-xs font-medium text-fjord">
                    {resolvedTheme === 'dark'
                      ? locale === 'ar'
                        ? 'داكن'
                        : 'Dark'
                      : locale === 'ar'
                        ? 'فاتح'
                        : 'Light'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
