import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Info } from 'lucide-react';
import { Globe } from '@/components/magicui/globe';
import { BlurFade } from '@/components/ui/blur-fade';

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
        icon={<Info className="h-8 w-8" />}
      />

      <Section spacing="lg" className="min-h-[60vh] bg-surface overflow-hidden relative">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <BlurFade delay={0.25} inView>
              <div className="space-y-8">
                <h2 className="text-4xl font-display font-semibold text-ink leading-tight">
                  {isArabic ? 'الوصول العالمي، الخبرة المحلية' : 'Global Reach, Local Expertise'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {isArabic 
                    ? 'في راما، نحن ندرك أن الاستثمار في عقارات دبي هو قرار عالمي. توفر منصتنا وصولاً غير مسبوق إلى العقارات الفاخرة، مدعومة بالبيانات والشفافية التامة والتصميم الذي يعطي الأولوية للوضوح.' 
                    : 'At RAMA, we understand that investing in Dubai real estate is a global decision. Our platform provides unprecedented access to luxury properties, backed by data, complete transparency, and a design that prioritizes clarity.'}
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
                  <div>
                    <h4 className="text-3xl font-display font-bold text-fjord mb-2">150+</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{isArabic ? 'دولة ممثلة' : 'Countries Represented'}</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-display font-bold text-fjord mb-2">$2B+</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{isArabic ? 'معاملات' : 'In Transactions'}</p>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} inView className="relative flex items-center justify-center h-[600px]">
              <Globe className="opacity-80 mix-blend-multiply dark:mix-blend-screen" />
            </BlurFade>

          </div>
        </Container>
      </Section>
    </>
  );
}
