import { SearchBar } from "@/components/search/search-bar"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

interface HeroEditorialProps {
  locale: string
  isArabic: boolean
}

export function HeroEditorial({ locale, isArabic }: HeroEditorialProps) {
  return (
    <Section background="ink" spacing="none" className="min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 lg:pt-24 pb-8 lg:pb-12">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      
      {/* Gradients for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />

      {/* Content Container */}
      <Container size="2xl" padding="xl" className="relative z-10 text-center flex flex-col items-center justify-center">
        
        {/* Main Headline (Centered) */}
        <div className="max-w-2xl mx-auto space-y-4 lg:space-y-6 mb-10 lg:mb-12">
          <div className="space-y-2 lg:space-y-4">
            <p className="text-fjord text-sm tracking-[0.2em] font-medium uppercase">
              {isArabic ? "بوابتك للحياة الاستثنائية" : "The Gateway to Exceptional Living"}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tight">
              {isArabic ? (
                <>عقارات <span className="italic font-light opacity-90">فاخرة</span></>
              ) : (
                <>LUXURY <span className="italic font-light opacity-90">REAL ESTATE</span></>
              )}
              <br />
              {isArabic ? "في قلب دبي" : "IN DUBAI"}
            </h1>
          </div>
          
          <p className="text-base md:text-lg text-white/80 font-light leading-relaxed pt-4 md:pt-6 mx-auto max-w-prose border-t border-white/20">
            {isArabic 
              ? "اكتشف مجموعة منتقاة بعناية من أروع العقارات في دبي، موثقة بالكامل من دائرة الأراضي والأملاك لضمان الشفافية المطلقة."
              : "Discover a curated collection of Dubai's finest properties, fully verified by the DLD for absolute transparency and peace of mind."}
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="w-full max-w-4xl mx-auto space-y-8 lg:space-y-10">
          <div className="bg-surface/10 backdrop-blur-md border border-white/20 rounded-3xl p-1 max-w-2xl mx-auto">
            <SearchBar variant="hero" locale={locale as "en" | "ar"} />
          </div>

          <div className="flex justify-center gap-12 lg:gap-16 text-center">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-display text-white">2,400+</p>
              <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider font-medium">
                {isArabic ? "عقارات موثقة" : "Verified Properties"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-display text-white">100%</p>
              <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider font-medium">
                {isArabic ? "بيانات حقيقية" : "DLD Connected"}
              </p>
            </div>
          </div>
        </div>

      </Container>
    </Section>
  )
}
