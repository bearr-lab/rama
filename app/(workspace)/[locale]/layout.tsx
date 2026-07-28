import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AppShell } from '@/components/shell/app-shell';

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
}
