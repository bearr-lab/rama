import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { FloatingChat } from '@/components/chat/floating-chat';

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
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />
        <main className="relative z-10 flex-1 bg-background" id="main-content">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingChat />
      </div>
    </NextIntlClientProvider>
  );
}
