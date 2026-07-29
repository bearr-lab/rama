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
      className="relative flex h-screen w-full flex-col justify-center overflow-hidden"
    >
      {/* Cinematic Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        poster="/images/trust/rera-hero.png"
      >
        <source src="/videos/rama-hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay to ensure text contrast without blurring */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content — anchored to the bottom */}
      <Container
        size="xl"
        padding="xl"
        className="relative z-10 flex h-full flex-col justify-end pb-12 md:pb-24"
      >
        <div className="flex w-full flex-col items-center gap-10">
          
          {/* Centered Text Block */}
          <div className="flex w-full max-w-4xl flex-col items-center space-y-4 text-center md:space-y-6">
            {/* Headline */}
            <h1 className="font-display text-5xl leading-1.05 tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
              {isArabic ? (
                <>
                  عقارات{' '}
                  <span className="font-light italic opacity-90">فاخرة</span>
                  <br />
                  في قلب دبي
                </>
              ) : (
                <>
                  Luxury{' '}
                  <span className="font-light italic opacity-90">
                    Real Estate
                  </span>
                  <br />
                  in Dubai
                </>
              )}
            </h1>

            {/* Subtitle — one clean line */}
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/90 drop-shadow-md md:text-lg">
              {isArabic
                ? 'مجموعة منتقاة من أروع العقارات، موثقة بالكامل من دائرة الأراضي والأملاك.'
                : 'A curated collection of verified properties, powered by DLD transparency.'}
            </p>
          </div>

          {/* Centered Search and Stats */}
          <div className="mt-4 flex w-full flex-col items-center justify-center space-y-6">
            <div className="w-full max-w-125">
              <SearchBar variant="hero" locale={locale as 'en' | 'ar'} />
            </div>

            {/* Minimal Stats — inline, centered */}
            <div className="flex items-center gap-6 text-white/50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white/90">2,400+</span>
                <span className="text-xs uppercase tracking-wider">
                  {isArabic ? 'عقار' : 'Properties'}
                </span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white/90">100%</span>
                <span className="text-xs uppercase tracking-wider">
                  {isArabic ? 'موثق' : 'DLD Verified'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
