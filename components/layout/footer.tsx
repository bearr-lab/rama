import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { getLocale } from 'next-intl/server';

import { buttonVariants } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { RamaLogo } from '@/components/ui/rama-logo';

export async function Footer() {
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  return (
    <footer className="sticky bottom-0 z-0 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 p-12 sm:px-16 lg:flex-row lg:items-end lg:justify-between lg:px-20">
        <div className="max-w-xl">
          <Link href={`/${locale}#hero`}>
            <RamaLogo variant="full" size="md" />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-text">
            {isArabic
              ? 'مكان هادئ لجمع الأدلة ومقارنة الخيارات واتخاذ قرارك العقاري بتأنٍ.'
              : 'A quieter place to gather evidence, compare options and make a considered property decision.'}
          </p>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-verified" />
            {isArabic
              ? 'تعرض راما مدى توفر الأدلة، وليس جودة العقار أو وضعه القانوني أو جدواه الاستثمارية.'
              : 'RAMA displays evidence availability, not a statement of property quality, legal status or investment merit.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton
            render={
              <Link
                href={`/${locale}/homes`}
                className={buttonVariants({ variant: 'outline' })}
              >
                {isArabic ? 'استكشف العقارات' : 'Explore homes'}
              </Link>
            }
          />
          <MagneticButton
            render={
              <Link
                href={`/${locale}/login`}
                className={buttonVariants({ variant: 'default' })}
              >
                {isArabic ? 'سجّل الدخول' : 'Sign in'}
                <ArrowRight className="ms-2 size-4" />
              </Link>
            }
          />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-12 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-16 lg:px-20">
          <p>© {new Date().getFullYear()} RAMA</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-muted/60">
              {isArabic ? 'الصور مقدمة من ' : 'Imagery provided by '}
              <a
                href="https://www.pexels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-fjord"
              >
                Pexels
              </a>
            </span>
            <span className="hidden text-border sm:inline">|</span>
            <Link href={`/${locale}/homes`} className="hover:text-fjord">
              {isArabic ? 'العقارات' : 'Homes'}
            </Link>
            <Link href={`/${locale}/areas`} className="hover:text-fjord">
              {isArabic ? 'المجتمعات' : 'Areas'}
            </Link>
            <Link
              href={`/${locale === 'ar' ? 'en' : 'ar'}`}
              className="hover:text-fjord"
            >
              {locale === 'ar' ? 'English' : 'العربية'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
