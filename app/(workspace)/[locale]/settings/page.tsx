import { createClient } from '@/lib/supabase/server';
import { SettingsClient } from '@/components/settings/settings-client';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SettingsClient locale={locale} user={user} />;
}
