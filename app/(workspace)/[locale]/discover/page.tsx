import { getTranslations } from 'next-intl/server';
import { DiscoverClient } from '@/components/discover/discover-client';

export default async function DiscoverPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Discover');

  return <DiscoverClient locale={locale} />;
}
