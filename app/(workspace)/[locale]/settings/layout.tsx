import * as React from 'react';
import { SettingsSidebar } from '@/components/settings/settings-sidebar';
import { SettingsProvider } from '@/components/settings/settings-context';
import { PageShell } from '@/components/ui/page-shell';

export default async function SettingsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <SettingsProvider>
      <PageShell className="flex-col gap-16 md:flex-row">
        <aside className="w-full shrink-0 md:w-64">
          <h2 className="mb-8 font-display text-3xl font-medium tracking-tight text-ink">Settings</h2>
          <SettingsSidebar locale={locale} />
        </aside>
        <main className="flex-1 bg-surface-subtle p-8 lg:p-12">
          {children}
        </main>
      </PageShell>
    </SettingsProvider>
  );
}
