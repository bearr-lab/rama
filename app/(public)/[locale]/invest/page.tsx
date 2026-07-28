import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TrendingUp, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function InvestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-20 border-b border-border/40 overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Real Estate Investment"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        <Container size="xl" className="relative z-20">
          <BlurFade delay={0.1} offset={20}>
            <div className="max-w-4xl space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase rounded-none backdrop-blur-md">
                <TrendingUp className="h-4 w-4" />
                <span>{isArabic ? 'فرص استثمارية' : 'Investment Hub'}</span>
              </div>
              <h1 className="font-display text-5xl leading-[1.1] font-normal text-white md:text-7xl lg:text-8xl tracking-tight">
                {isArabic
                  ? 'استثمر في مستقبل دبي'
                  : 'Invest in the Future of Dubai'}
              </h1>
              <p className="text-lg font-light text-white/80 md:text-xl max-w-2xl leading-relaxed">
                {isArabic
                  ? 'اكتشف عوائد استثمارية استثنائية مع تحليلات بيانات حية ومدعومة بالذكاء الاصطناعي للسوق العقاري في دبي.'
                  : 'Discover exceptional ROI with real-time, AI-driven analytics of the Dubai real estate market.'}
              </p>
            </div>
          </BlurFade>
        </Container>
      </section>

      <Section spacing="lg">
        <Container size="xl">

          {/* Investment Pillars */}
          <BlurFade delay={0.2} offset={20}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="border border-border/40 bg-surface p-8 transition-colors hover:border-fjord">
                <BarChart3 className="h-8 w-8 text-fjord mb-6" />
                <h3 className="font-display text-2xl font-bold text-ink mb-4">
                  {isArabic ? 'تحليلات العوائد' : 'Yield Analytics'}
                </h3>
                <p className="text-muted-foreground mb-8 text-sm">
                  {isArabic
                    ? 'تتبع العوائد الإيجارية التاريخية والمستقبلية بدقة متناهية.'
                    : 'Track historical and predictive rental yields with granular precision.'}
                </p>
                <Link
                  href={`/${locale}/homes`}
                  className="inline-flex items-center text-sm font-semibold text-fjord hover:underline"
                >
                  {isArabic ? 'عرض العقارات' : 'View Properties'} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Pillar 2 */}
              <div className="border border-border/40 bg-surface p-8 transition-colors hover:border-fjord">
                <ShieldCheck className="h-8 w-8 text-fjord mb-6" />
                <h3 className="font-display text-2xl font-bold text-ink mb-4">
                  {isArabic ? 'أمان التشفير' : 'Crypto Security'}
                </h3>
                <p className="text-muted-foreground mb-8 text-sm">
                  {isArabic
                    ? 'مدفوعات آمنة مدعومة بالبلوك تشين وعقود ذكية للمستثمرين العالميين.'
                    : 'Secure blockchain-verified payments and smart contracts for global investors.'}
                </p>
                <span className="inline-flex items-center text-sm font-bold tracking-widest text-muted uppercase">
                  {isArabic ? 'قريباً' : 'Coming Soon'}
                </span>
              </div>

              {/* Pillar 3 */}
              <div className="border border-border/40 bg-ink-bg p-8 transition-colors text-white">
                <div className="h-8 w-8 bg-emerald-400 rounded-none mb-6 animate-pulse" />
                <h3 className="font-display text-2xl font-bold mb-4">
                  {isArabic ? 'التسجيل لـ VIP' : 'VIP Access'}
                </h3>
                <p className="text-white/70 mb-8 text-sm">
                  {isArabic
                    ? 'احصل على أولوية الوصول إلى المشاريع قيد الإنشاء قبل طرحها للعامة.'
                    : 'Gain priority access to off-plan inventory before public launch.'}
                </p>
                <Link
                  href={`/${locale}/login`}
                  className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:underline"
                >
                  {isArabic ? 'سجل الآن' : 'Register Now'} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </BlurFade>
        </Container>
      </Section>
    </div>
  );
}
