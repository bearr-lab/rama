import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { MapPin } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { MOCK_PROPERTIES } from '@/lib/mock-properties';

interface FeaturedSignatureProps {
  locale: string;
  isArabic: boolean;
}

export async function FeaturedSignature({
  locale,
  isArabic,
}: FeaturedSignatureProps) {
  const supabase = await createClient();

  // Fetch top 2 premium properties
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: false })
    .limit(2);

  if (error) {
    console.error('Error fetching signature properties:', error);
  }

  const activeProperties =
    properties && properties.length > 0
      ? properties
      : process.env.NODE_ENV === 'development'
        ? MOCK_PROPERTIES.slice(0, 2)
        : [];

  if (!activeProperties || activeProperties.length === 0) {
    return null;
  }

  return (
    <Section background="surface" spacing="lg">
      <Container size="lg" padding="lg">
        <div className="mb-12 flex flex-col items-center space-y-6 text-center lg:mb-20">
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-[0.2em] text-fjord uppercase">
              {isArabic ? 'مجموعة حصرية' : 'Exclusive Collection'}
            </p>
            <h2 className="font-display text-4xl text-ink lg:text-5xl">
              {isArabic ? 'عقارات مميزة' : 'Signature Properties'}
            </h2>
          </div>
          <Link
            href={`/${locale}/homes`}
            className="inline-flex shrink-0 items-center gap-2 font-medium text-fjord decoration-fjord/30 underline-offset-4 hover:underline"
          >
            {isArabic ? 'عرض جميع العقارات ←' : 'View All Properties →'}
          </Link>
        </div>

        <div className="space-y-16">
          {activeProperties.map((property, index) => {
            const primaryImage =
              property.images?.[0] ||
              property.thumbnail ||
              (index === 0
                ? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200'
                : 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200');

            const title = isArabic ? property.title_ar : property.title_en;
            const location = property.community;
            const price = new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-AE', {
              style: 'currency',
              currency: 'AED',
              maximumFractionDigits: 0,
            }).format(property.price);

            // Alternate layout for visual interest
            const isEven = index % 2 === 0;

            return (
              <Link
                href={`/${locale}/homes/${property.slug}`}
                key={property.id}
                className="group block"
              >
                <div
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 overflow-hidden rounded-none border border-border bg-canvas transition-all duration-500 hover:shadow-2xl`}
                >
                  {/* Huge Image Area */}
                  <div className="relative aspect-4/3 w-full overflow-hidden lg:aspect-auto lg:min-h-125 lg:w-2/3">
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="size-full bg-surface-subtle" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent lg:hidden" />
                  </div>

                  {/* Content Area */}
                  <div className="relative flex w-full flex-col justify-center bg-canvas p-10 lg:w-1/3 lg:p-12">
                    {/* Decorative number */}
                    <div className="absolute top-8 right-8 z-0 font-display text-6xl text-border/40 select-none">
                      0{index + 1}
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="inline-flex items-center gap-1.5 bg-fjord-soft px-3 py-1 text-xs font-medium tracking-wider text-fjord uppercase">
                        <MapPin className="size-3.5" />
                        {location}
                      </div>

                      <h3 className="font-display text-3xl leading-tight text-ink transition-colors group-hover:text-fjord lg:text-4xl">
                        {title}
                      </h3>

                      <div className="border-t border-border pt-6">
                        <p className="mb-1 text-sm tracking-widest text-muted-foreground uppercase">
                          {isArabic ? 'السعر المطلوب' : 'Asking Price'}
                        </p>
                        <p className="font-display text-3xl text-ink">
                          {price}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
                        {property.bedrooms && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink">
                              {property.bedrooms}
                            </span>
                            {isArabic ? 'غرف نوم' : 'Beds'}
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink">
                              {property.bathrooms}
                            </span>
                            {isArabic ? 'حمامات' : 'Baths'}
                          </div>
                        )}
                        {property.area_sqft && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink">
                              {property.area_sqft}
                            </span>
                            {isArabic ? 'قدم مربع' : 'Sq Ft'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
