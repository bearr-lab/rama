import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { PropertyGrid } from '@/components/property/property-grid';
import { SearchBar } from '@/components/search/search-bar';
import { HomesFilterChips } from '@/components/search/homes-filter-chips';
import { EmptyState } from '@/components/ui/empty-state';
import { Property } from '@/types/property';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { MOCK_PROPERTIES } from '@/lib/mock-properties';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const { query, tenure, property_type } = await searchParams;

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

  const { data: properties, error } = await dbQuery.order('created_at', {
    ascending: false,
  });

  if (error) {
    console.error('Error fetching properties:', error);
  }

  const activeProperties = properties && properties.length > 0 ? properties : MOCK_PROPERTIES;

  return (
    <>
      <div className="sticky top-0 z-0">
        <PageHeader
          title={locale === 'ar' ? 'اكتشف العقارات' : 'Discover Properties'}
          description={
            locale === 'ar'
              ? 'ابحث في آلاف العقارات الموثقة في دبي.'
              : 'Search through thousands of verified properties in Dubai.'
          }
          className="border-none shadow-none"
          backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000"
        >
          <div className="mt-6 flex flex-col items-center gap-5 w-full">
            <div className="w-full max-w-[400px] mx-auto">
              <SearchBar
                variant="hero"
                locale={locale as 'en' | 'ar'}
                initialQuery={typeof query === 'string' ? query : ''}
                initialTenure={typeof tenure === 'string' ? tenure : 'ready'}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80 me-2">
                {locale === 'ar' ? 'التصنيفات:' : 'Filter By:'}
              </span>
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
        </PageHeader>
      </div>

      <Section spacing="lg" className="min-h-[100vh] relative z-10 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[3rem]">
        <Container size="2xl">
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
    </>
  );
}
