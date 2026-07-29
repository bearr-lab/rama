import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const isArabic = locale === 'ar';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="relative h-screen w-full overflow-hidden bg-ink">
        {/* Full Screen Background Imagery */}
        <div className="absolute inset-0 z-0 bg-ink">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover opacity-80 transition-transform duration-[30s] ease-out hover:scale-110"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Deep Gradient Overlay for form contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20 mix-blend-multiply" />

        {/* Minimalist Floating Back Button */}
        <div className="absolute top-6 left-6 z-50 lg:top-12 lg:left-12">
          <Link
            href={`/${locale}`}
            className="group flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 hover:shadow-md"
            aria-label="Back to home"
          >
            <ArrowLeft className={`size-5 transition-transform group-hover:-translate-x-1 ${isArabic ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          </Link>
        </div>
        
        {/* Centered Content Container */}
        <main className="relative z-20 flex size-full flex-col overflow-y-auto px-4 py-8 sm:px-6 lg:px-8" id="main-content">
          <div className="m-auto w-full max-w-105 shrink-0">
            {children}
          </div>
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
