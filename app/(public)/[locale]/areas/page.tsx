import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/layout/page-header';
import { getHeroImage } from '@/lib/pexels';
import { MapPin } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { BlurFade } from '@/components/ui/blur-fade';
import { Building2 } from 'lucide-react';

export const revalidate = 3600; // Cache for 1 hour

export default async function AreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const heroImage = await getHeroImage('Dubai skyline aerial golden hour cinematic 8k', '/images/hero/areas.png');
  const supabase = await createClient();

  const { data: communities, error } = await supabase
    .from('communities')
    .select('*')
    .order('name_en');

  if (error) {
    console.error('Error fetching communities:', error);
  }

  return (
    <>
      <div className="sticky top-0 z-0">
        <PageHeader
          title={isArabic ? 'المجمعات السكنية' : 'Dubai Communities'}
          description={
            isArabic
              ? 'استكشف أشهر أحياء دبي، من المعيشة على الواجهة البحرية إلى مجمعات الفيلات الهادئة.'
              : "Explore Dubai's most popular neighborhoods, from waterfront living to serene villa communities."
          }
          className="border-none shadow-none"
          backgroundImage={heroImage}
          badge={
            <>
              <MapPin className="size-4" />
              <span>{isArabic ? 'المجمعات' : 'Explore Communities'}</span>
            </>
          }
        />
      </div>

      <Section className="relative z-10 bg-canvas">
        <Container size="2xl">
          {(!communities || communities.length === 0) ? (
            <EmptyState
              title={isArabic ? 'لم يتم العثور على مجمعات سكنية' : 'No Communities Found'}
              description={isArabic ? 'لم نتمكن من تحميل قائمة المجمعات السكنية حالياً.' : 'We could not load the communities list at this time.'}
            />
          ) : (
            <BlurFade delay={0.1}>
              <BentoGrid className="grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {communities.map((community, idx) => {
                  const name = isArabic ? (community.name_ar || community.name_en) : community.name_en;
                  const description = isArabic ? (community.description_ar || community.description_en) : community.description_en;

                  return (
                    <BentoCard
                      key={community.id}
                      name={name}
                      className={idx % 4 === 0 || idx % 4 === 3 ? "lg:col-span-2" : "lg:col-span-1"}
                      description={description || ''}
                      href={`/${locale}/homes?community=${community.name_en.toLowerCase().replace(/\s+/g, '-')}`}
                      cta={isArabic ? 'استكشف العقارات' : 'Explore Properties'}
                      Icon={Building2}
                      background={
                        community.image ? (
                          <Image
                            src={community.image}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="absolute inset-0 size-full object-cover transition-all duration-700 group-hover:scale-105"
                          />
                        ) : null
                      }
                    />
                  );
                })}
              </BentoGrid>
            </BlurFade>
          )}
        </Container>
      </Section>
    </>
  );
}
