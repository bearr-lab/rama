import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Load translation messages for this locale and provide them to client components.
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col relative w-full">
        <Navbar />
        <main className="flex-1 relative z-10 bg-background" id="main-content">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </NextIntlClientProvider>
  );
}
