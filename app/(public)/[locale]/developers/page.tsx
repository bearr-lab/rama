import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Building } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

export default async function DevelopersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const developers = [
    { name: 'Emaar Properties', logo: 'EMAAR' },
    { name: 'Nakheel', logo: 'NAKHEEL' },
    { name: 'Damac Properties', logo: 'DAMAC' },
    { name: 'Meraas', logo: 'MERAAS' },
    { name: 'Omniyat', logo: 'OMNIYAT' },
    { name: 'Sobha Realty', logo: 'SOBHA' },
    { name: 'Select Group', logo: 'SELECT GROUP' },
    { name: 'Ellington Properties', logo: 'ELLINGTON' },
  ];

  return (
    <>
      <PageHeader
        title={isArabic ? 'المطورين العقاريين' : 'Top Developers'}
        description={
          isArabic
            ? 'اكتشف أفضل المطورين العقاريين في دبي والمشاريع التي يبنونها.'
            : 'Discover the top real estate developers in Dubai and the iconic projects they build.'
        }
        icon={<Building className="h-8 w-8" />}
      />

      <Section spacing="lg" className="min-h-[60vh] bg-surface overflow-hidden">
        <Container size="xl" className="py-20">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {developers.map((dev) => (
                <div key={dev.name} className="mx-8 flex items-center justify-center p-6 border border-border/50 bg-white/50 backdrop-blur-md rounded-none min-w-[250px]">
                  <span className="font-display text-4xl font-bold text-fjord opacity-80 tracking-widest">{dev.logo}</span>
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-surface"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-surface"></div>
          </div>
          
          <div className="mt-32 text-center text-muted-foreground max-w-2xl mx-auto">
            <p className="text-lg">
              {isArabic ? 'نحن نتعاون فقط مع المطورين الموثوقين لضمان تسليم استثماراتك في الوقت المحدد وبأعلى جودة.' : 'We partner exclusively with trusted developers to ensure your investments are delivered on time and to the highest quality standards.'}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
