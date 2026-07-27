import { SearchBar } from '@/components/search/search-bar';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

interface HeroEditorialProps {
  locale: string;
  isArabic: boolean;
}

export function HeroEditorial({ locale, isArabic }: HeroEditorialProps) {
  return (
    <Section
      id="hero"
      background="ink-bg"
      spacing="none"
      className="flex min-h-[85vh] w-full flex-col justify-center overflow-hidden py-24 md:py-28 lg:py-32"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Gradients for text legibility in both Light and Dark modes */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-bg via-ink-bg/20 to-ink-bg/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-ink-bg/20 to-ink-bg/80" />

      {/* Content Container */}
      <Container
        size="2xl"
        padding="xl"
        className="relative z-10 flex flex-col items-center justify-center text-center"
      >
        {/* Main Headline (Centered) */}
        <div className="mx-auto mb-10 max-w-2xl space-y-4 lg:mb-12 lg:space-y-6">
          <div className="space-y-3 lg:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-none border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-none bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>
                {isArabic
                  ? 'بوابتك للحياة الاستثنائية'
                  : 'THE GATEWAY TO EXCEPTIONAL LIVING'}
              </span>
            </div>
            <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              {isArabic ? (
                <>
                  عقارات{' '}
                  <span className="font-light italic opacity-90">فاخرة</span>
                </>
              ) : (
                <>
                  LUXURY{' '}
                  <span className="font-light italic opacity-90">
                    REAL ESTATE
                  </span>
                </>
              )}
              <br />
              {isArabic ? 'في قلب دبي' : 'IN DUBAI'}
            </h1>
          </div>

          <p className="mx-auto max-w-prose border-t border-white/20 pt-4 text-base leading-relaxed font-light text-white/80 md:pt-6 md:text-lg">
            {isArabic
              ? 'اكتشف مجموعة منتقاة بعناية من أروع العقارات في دبي، موثقة بالكامل من دائرة الأراضي والأملاك لضمان الشفافية المطلقة.'
              : "Discover a curated collection of Dubai's finest properties, fully verified by the DLD for absolute transparency and peace of mind."}
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="mx-auto w-full max-w-2xl space-y-8 lg:space-y-10">
          <div className="mx-auto max-w-[400px]">
            <SearchBar variant="hero" locale={locale as 'en' | 'ar'} />
          </div>

          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-6 text-center sm:gap-12 lg:gap-16">
            <div className="flex items-center gap-3 rounded-none border border-white/15 bg-white/5 px-6 py-3.5 shadow-lg backdrop-blur-md">
              <div className="text-left">
                <p className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  2,400+
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-white/70 uppercase md:text-xs">
                  {isArabic ? 'عقارات موثقة' : 'Verified Properties'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-none border border-white/15 bg-white/5 px-6 py-3.5 shadow-lg backdrop-blur-md">
              <div className="text-left">
                <p className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  100%
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-white/70 uppercase md:text-xs">
                  {isArabic ? 'بيانات حقيقية' : 'DLD Connected'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
