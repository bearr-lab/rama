import { Inter, Playfair_Display, Noto_Sans_Arabic } from 'next/font/google';
import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryProvider } from '@/lib/query/provider';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'RAMA — Dubai Real Estate Decision Platform',
    template: '%s | RAMA',
  },
  description:
    'Verified properties. Real prices. No guesswork. Discover Dubai real estate with AI-powered guidance.',
  keywords: [
    'Dubai real estate',
    'Dubai properties',
    'buy property Dubai',
    'verified properties',
    'Dubai Marina',
    'Palm Jumeirah',
    'Downtown Dubai',
  ],
  authors: [{ name: 'RAMA' }],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'RAMA',
    title: 'RAMA — Dubai Real Estate Decision Platform',
    description:
      'Verified properties. Real prices. No guesswork. Discover Dubai real estate with AI-powered guidance.',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The root layout has no [locale] param — next-intl locale context is
  // provided by the (public)/[locale] and (workspace)/[locale] layouts.
  // suppressHydrationWarning prevents theme-flicker mismatch on <html>.
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          'antialiased',
          inter.variable,
          playfair.variable,
          notoSansArabic.variable,
          'font-sans',
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-fjord focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
