import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Property } from '@/types/property';
import { MOCK_PROPERTIES } from '@/lib/mock-properties';
import { PropertyDetailClient } from './property-detail-client';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  let property: Property | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) property = data as Property;
  } catch {
    // Ignore error
  }

  if (!property) {
    const found = MOCK_PROPERTIES.find(
      (m) =>
        m.slug.toLowerCase() === slug.toLowerCase() ||
        m.id.toLowerCase() === slug.toLowerCase() ||
        m.slug.includes(slug) ||
        slug.includes(m.slug),
    );
    property = found || MOCK_PROPERTIES[0];
  }

  const title = locale === 'ar' ? property.title_ar : property.title_en;
  const desc =
    locale === 'ar' ? property.description_ar : property.description_en;

  return {
    title: `${title} · ${property.community}`,
    description: desc?.slice(0, 160),
    openGraph: {
      images: [
        {
          url: property.thumbnail || property.images[0],
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/homes/${slug}`,
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  let property: Property | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) property = data as Property;
  } catch {
    // DB offline or table missing
  }

  if (!property) {
    // Robust fallback to mock properties or match by slug/id
    const found = MOCK_PROPERTIES.find(
      (m) =>
        m.slug.toLowerCase() === slug.toLowerCase() ||
        m.id.toLowerCase() === slug.toLowerCase() ||
        m.slug.includes(slug) ||
        slug.includes(m.slug),
    );
    property = found || MOCK_PROPERTIES[0];
  }

  return <PropertyDetailClient property={property} locale={locale} />;
}
