import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TrendingUp, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return {
    title: isArabic
      ? 'ذكاء الاستثمار | راما'
      : 'Investment Intelligence | Rama',
    description: isArabic
      ? 'تحليل سوقي بمستوى مؤسسي وتحليلات العوائد لعقارات دبي.'
      : 'Institutional-grade market analysis and yield analytics for Dubai real estate.',
  };
}

export default async function InvestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const heroImage = '/images/hero/invest-hero.jpg';

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      {/* Cinematic Hero */}
      <PageHeader
        title={
          isArabic ? 'استثمر في مستقبل دبي' : 'Invest in the Future of Dubai'
        }
        description={
          isArabic
            ? 'اكتشف عوائد استثمارية استثنائية مع تحليلات بيانات حية ومدعومة بالذكاء الاصطناعي للسوق العقاري في دبي.'
            : 'Discover exceptional ROI with real-time, AI-driven analytics of the Dubai real estate market.'
        }
        backgroundImage={heroImage}
        variant="editorial"
        mediaPosition="object-top"
        badge={
          <>
            <TrendingUp className="size-4" />
            <span>{isArabic ? 'فرص استثمارية' : 'Investment Hub'}</span>
          </>
        }
      />

      <Section spacing="lg">
        <Container size="lg">
          {/* Investment Pillars */}
          <BlurFade delay={0.2} offset={20}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Pillar 1 */}
              <div className="border border-border/40 bg-surface p-8 transition-colors hover:border-fjord">
                <BarChart3 className="mb-6 size-8 text-fjord" />
                <h3 className="mb-4 font-display text-2xl font-bold text-ink">
                  {isArabic ? 'تحليلات العوائد' : 'Yield Analytics'}
                </h3>
                <p className="mb-8 text-sm text-muted-foreground">
                  {isArabic
                    ? 'تتبع العوائد الإيجارية التاريخية والمستقبلية بدقة متناهية.'
                    : 'Track historical and predictive rental yields with granular precision.'}
                </p>
                <Link
                  href={`/${locale}/homes`}
                  className="inline-flex items-center text-sm font-semibold text-fjord hover:underline"
                >
                  {isArabic ? 'عرض العقارات' : 'View Properties'}{' '}
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </div>

              {/* Pillar 2 */}
              <div className="border border-border/40 bg-surface p-8 transition-colors hover:border-fjord">
                <ShieldCheck className="mb-6 size-8 text-fjord" />
                <h3 className="mb-4 font-display text-2xl font-bold text-ink">
                  {isArabic ? 'أمان التشفير' : 'Crypto Security'}
                </h3>
                <p className="mb-8 text-sm text-muted-foreground">
                  {isArabic
                    ? 'مدفوعات آمنة مدعومة بالبلوك تشين وعقود ذكية للمستثمرين العالميين.'
                    : 'Secure blockchain-verified payments and smart contracts for global investors.'}
                </p>
                <span className="inline-flex items-center text-sm font-bold tracking-widest text-muted uppercase">
                  {isArabic ? 'قريباً' : 'Coming Soon'}
                </span>
              </div>

              {/* Pillar 3 */}
              <div className="border border-border/40 bg-ink-bg p-8 text-white transition-colors">
                <div className="mb-6 size-8 animate-pulse rounded-none bg-emerald-400" />
                <h3 className="mb-4 font-display text-2xl font-bold">
                  {isArabic ? 'التسجيل لـ VIP' : 'VIP Access'}
                </h3>
                <p className="mb-8 text-sm text-white/70">
                  {isArabic
                    ? 'احصل على أولوية الوصول إلى المشاريع قيد الإنشاء قبل طرحها للعامة.'
                    : 'Gain priority access to off-plan inventory before public launch.'}
                </p>
                <Link
                  href={`/${locale}/login`}
                  className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:underline"
                >
                  {isArabic ? 'سجل الآن' : 'Register Now'}{' '}
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </div>
            </div>
          </BlurFade>
        </Container>
      </Section>
    </div>
  );
}
