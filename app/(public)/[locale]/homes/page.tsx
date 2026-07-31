import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { PropertyGrid } from '@/components/property/property-grid';
import { SearchBar } from '@/components/search/search-bar';
import { HeroNordic } from '@/components/layout/hero-nordic';
import { HomesFilterChips } from '@/components/search/homes-filter-chips';
import { EmptyState } from '@/components/ui/empty-state';
import { Property } from '@/types/property';
import { Home } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { MOCK_PROPERTIES } from '@/lib/mock-properties';
import { HomesEditorial } from '@/components/landing/homes-editorial';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return {
    title: isArabic ? 'منازل فاخرة | راما' : 'Signature Homes | Rama',
    description: isArabic
      ? 'اكتشف أرقى الفلل والمنازل الجاهزة في أفضل مجتمعات دبي السكنية'
      : "Discover ready-to-move-in luxury villas and mansions in Dubai's most prestigious communities.",
  };
}

export default async function HomesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const { query, tenure, property_type, community } = await searchParams;
  const isArabic = locale === 'ar';

  const heroVideoUrl = '/videos/homes-bg.mp4';
  const heroImageUrl = heroVideoUrl ? null : '/images/hero/homes-hero.jpg';

  const supabase = await createClient();

  // Basic query logic
  let dbQuery = supabase.from('properties').select('*').eq('is_active', true);

  if (tenure && typeof tenure === 'string') {
    dbQuery = dbQuery.eq('tenure', tenure);
  }

  if (property_type) {
    if (Array.isArray(property_type)) {
      dbQuery = dbQuery.in('property_type', property_type);
    } else {
      dbQuery = dbQuery.eq('property_type', property_type);
    }
  }

  // Text search on english title or community for simplicity
  if (query && typeof query === 'string') {
    const safeQuery = query.replace(/"/g, '""');
    dbQuery = dbQuery.or(
      `title_en.ilike."%${safeQuery}%",community.ilike."%${safeQuery}%"`,
    );
  }

  if (community && typeof community === 'string') {
    const unslugified = community.replace(/-/g, ' ');
    dbQuery = dbQuery.ilike('community', `%${unslugified}%`);
  }

  const { data: properties, error } = await dbQuery.order('created_at', {
    ascending: false,
  });

  if (error) {
    console.error('Error fetching properties:', error);
  }

  const activeProperties =
    properties && properties.length > 0 ? properties : MOCK_PROPERTIES;

  return (
    <>
      <HeroNordic
        size="md"
        badgeIcon={<Home className="size-3.5" />}
        badgeText={isArabic ? 'عقارات جاهزة' : 'Ready to Move In'}
        titleClassName="max-w-[520px]"
        title={
          isArabic ? (
            <>
              منازل
              <br />
              فاخرة
            </>
          ) : (
            <>
              Signature
              <br />
              Homes
            </>
          )
        }
        subtitle={
          isArabic
            ? 'اكتشف أرقى الفلل والمنازل الجاهزة في أفضل مجمعات دبي السكنية'
            : 'Discover ready-to-move-in luxury villas and mansions in Dubai’s most prestigious communities.'
        }
        backgroundVideo={heroVideoUrl || undefined}
        backgroundImage={
          !heroVideoUrl && heroImageUrl ? heroImageUrl : undefined
        }
        bottomConsole={
          <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-8">
            <div className="w-full max-w-95">
              <SearchBar
                variant="hero"
                locale={locale as 'en' | 'ar'}
                initialQuery={typeof query === 'string' ? query : ''}
                initialTenure={typeof tenure === 'string' ? tenure : 'ready'}
              />
            </div>

            <div className="flex w-full justify-center">
              <HomesFilterChips
                options={[
                  {
                    value: 'apartment',
                    label: locale === 'ar' ? 'شقق' : 'Apartments',
                  },
                  { value: 'villa', label: locale === 'ar' ? 'فلل' : 'Villas' },
                  {
                    value: 'townhouse',
                    label: locale === 'ar' ? 'تاون هاوس' : 'Townhouses',
                  },
                  {
                    value: 'penthouse',
                    label: locale === 'ar' ? 'بنتهاوس' : 'Penthouses',
                  },
                ]}
              />
            </div>
          </div>
        }
      />

      <Section
        spacing="lg"
        className="relative z-10 min-h-screen rounded-none bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      >
        <Container size="lg">
          {!activeProperties || activeProperties.length === 0 ? (
            <EmptyState
              variant="search"
              title={locale === 'ar' ? 'لا توجد عقارات' : 'No properties found'}
              description={
                locale === 'ar'
                  ? 'لم نتمكن من العثور على أي عقارات تطابق بحثك. حاول تعديل خيارات البحث.'
                  : "We couldn't find any properties matching your current filters. Try adjusting your search criteria."
              }
            />
          ) : (
            <PropertyGrid
              properties={activeProperties as Property[]}
              locale={locale as 'en' | 'ar'}
            />
          )}
        </Container>
      </Section>

      <HomesEditorial isArabic={isArabic} locale={locale} />
    </>
  );
}
