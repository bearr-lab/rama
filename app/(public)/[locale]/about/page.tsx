import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Info } from 'lucide-react';
import { Globe } from '@/components/magicui/globe';
import { BlurFade } from '@/components/ui/blur-fade';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  
  return {
    title: isArabic ? "من نحن | راما" : "About Us | Rama",
    description: isArabic ? "الوساطة العقارية الفاخرة الرائدة واستشارات الاستثمار في دبي." : "The leading luxury real estate brokerage and investment advisory in Dubai.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <>
      <PageHeader
        title={isArabic ? 'من نحن' : 'About RAMA'}
        description={
          isArabic
            ? 'نربط المستثمرين العالميين بأرقى العقارات في دبي.'
            : 'Connecting global investors with Dubai’s finest real estate.'
        }
        icon={<Info className="size-8" />}
      />

      <Section spacing="lg" className="relative min-h-[60vh] overflow-hidden bg-surface">
        <Container size="xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            
            <BlurFade delay={0.25} inView>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-semibold text-ink">
                  {isArabic ? 'الوصول العالمي، الخبرة المحلية' : 'Global Reach, Local Expertise'}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {isArabic 
                    ? 'في راما، نحن ندرك أن الاستثمار في عقارات دبي هو قرار عالمي. توفر منصتنا وصولاً غير مسبوق إلى العقارات الفاخرة، مدعومة بالبيانات والشفافية التامة والتصميم الذي يعطي الأولوية للوضوح.' 
                    : 'At RAMA, we understand that investing in Dubai real estate is a global decision. Our platform provides unprecedented access to luxury properties, backed by data, complete transparency, and a design that prioritizes clarity.'}
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-border/50 pt-8">
                  <div>
                    <h4 className="mb-2 font-display text-3xl font-bold text-fjord">150+</h4>
                    <p className="text-sm tracking-widest text-muted-foreground uppercase">{isArabic ? 'دولة ممثلة' : 'Countries Represented'}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-display text-3xl font-bold text-fjord">$2B+</h4>
                    <p className="text-sm tracking-widest text-muted-foreground uppercase">{isArabic ? 'معاملات' : 'In Transactions'}</p>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} inView className="relative flex h-150 items-center justify-center">
              <Globe className="opacity-80 mix-blend-multiply dark:mix-blend-screen" />
            </BlurFade>

          </div>
        </Container>
      </Section>
    </>
  );
}
