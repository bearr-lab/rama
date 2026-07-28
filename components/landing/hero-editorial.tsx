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
        className="absolute inset-0 h-full w-full object-cover"
        poster="/images/trust/rera-hero.png"
      >
        <source src="/videos/hero-cityscape.mp4" type="video/mp4" />
      </video>

      {/* Light gradient — only at the bottom so the video stays visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

      {/* Content — anchored to the bottom */}
      <Container
        size="xl"
        padding="xl"
        className="relative z-10 flex h-full flex-col justify-end pb-12 md:pb-24"
      >
        <div className="flex flex-col items-center gap-10 w-full">
          
          {/* Centered Text Block */}
          <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-4 md:space-y-6">
            {/* Headline */}
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
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
            <p className="max-w-2xl mx-auto text-base font-light leading-relaxed text-white/70 md:text-lg">
              {isArabic
                ? 'مجموعة منتقاة من أروع العقارات، موثقة بالكامل من دائرة الأراضي والأملاك.'
                : 'A curated collection of verified properties, powered by DLD transparency.'}
            </p>
          </div>

          {/* Centered Search and Stats */}
          <div className="flex w-full flex-col items-center justify-center space-y-6 mt-4">
            <div className="w-full max-w-[500px]">
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
