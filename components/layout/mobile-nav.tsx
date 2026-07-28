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
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    if (drawerRef.current) {
      drawerRef.current.focus();
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
          'fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm transition-opacity duration-240',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef as any}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        tabIndex={-1}
        className={cn(
          'ease-decelerate fixed inset-y-0 right-0 z-50 flex w-[300px] max-w-[80vw] transform flex-col bg-surface shadow-lg transition-transform duration-240 outline-none',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!isOpen}
        {...(!isOpen ? ({ inert: true } as any) : {})}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <Link
            href={`/${locale}#hero`}
            onClick={onClose}
          >
            <RamaLogo variant="full" size="sm" />
          </Link>
          <button
            onClick={onClose}
            className="-mr-2 p-2 text-muted-foreground transition-colors hover:text-ink"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-4">
            <Link
              href={`/${locale}/projects`}
              className="text-lg font-medium text-ink transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'المشاريع' : 'Projects'}
            </Link>
            <Link
              href={`/${locale}/homes`}
              className="text-lg font-medium text-ink transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'العقارات' : 'Homes'}
            </Link>
            <Link
              href={`/${locale}/areas`}
              className="text-lg font-medium text-ink transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'المناطق' : 'Communities'}
            </Link>
            <Link
              href={`/${locale}/invest`}
              className="text-lg font-medium text-ink transition-colors hover:text-fjord"
              onClick={onClose}
            >
              {locale === 'ar' ? 'استثمر' : 'Invest'}
            </Link>
            <Link
              href={`/${locale}/insights`}
              className="text-lg font-medium text-ink transition-colors hover:text-fjord"
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
                  'rounded-button w-full bg-fjord text-white hover:bg-fjord-hover',
              })}
            >
              Sign In
            </Link>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Language</span>
              <div className="flex gap-2">
                <Link
                  href="/en"
                  className="rounded bg-surface-subtle px-2 py-1 text-sm font-medium text-ink"
                >
                  EN
                </Link>
                <Link
                  href="/ar"
                  className="rounded px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-surface-subtle hover:text-ink"
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-subtle text-ink transition-colors hover:bg-surface-subtle/80"
                  />
                  <span className="text-xs font-medium text-ink">
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
