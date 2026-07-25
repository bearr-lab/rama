import Image from "next/image"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

interface AboutAsymmetricalProps {
  locale: string
  isArabic: boolean
}

export function AboutAsymmetrical({ locale, isArabic }: AboutAsymmetricalProps) {
  return (
    <Section background="canvas" spacing="lg" className="relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-subtle opacity-50 skew-x-12 translate-x-32" />

      <Container size="lg" padding="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Massive Drop Cap & Typography */}
          <div className="space-y-12 relative max-w-lg">
            
            {/* The Massive Drop Cap Element mimicking Vellaro reference */}
            <div className="absolute -top-24 -left-4 text-[12rem] lg:text-[15rem] font-display text-surface leading-none select-none z-[-1]">
              Aa
            </div>

            <div className="space-y-6">
              <p className="text-fjord text-sm tracking-[0.2em] uppercase font-medium">
                {isArabic ? "حول راما" : "About RAMA"}
              </p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-ink leading-[1.1]">
                {isArabic ? "إعادة تعريف الشفافية" : "Redefining Transparency"}
                <br />
                <span className="italic font-light text-muted-foreground">
                  {isArabic ? "في سوق دبي" : "in Dubai's Market"}
                </span>
              </h2>
            </div>

            <div className="space-y-8 pl-4 border-l border-border/60">
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-ink">DLD Verified Data</h3>
                <p className="text-muted-foreground leading-relaxed max-w-prose">
                  {isArabic 
                    ? "يتم التحقق من كل عقار وكل سعر وكل التفاصيل الخاصة بالمطورين بشكل متبادل مع دائرة الأراضي والأملاك."
                    : "Every property, every price, and every developer detail is cross-referenced with official Dubai Land Department records."}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-ink">AI-Powered Curation</h3>
                <p className="text-muted-foreground leading-relaxed max-w-prose">
                  {isArabic 
                    ? "يتفهم مستشارنا المدعوم بالذكاء الاصطناعي تفضيلاتك في نمط الحياة، ويطابقك مع مجتمعات وعقارات قد لا تكتشفها أبدًا بمفردك."
                    : "Our AI Advisor understands your lifestyle preferences, matching you with communities and properties you might never discover on your own."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetrical Imagery */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 lg:gap-8 items-start">
              
              {/* Image 1 (Taller, shifted up) */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mt-0 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000"
                  alt="Modern Dubai Villa Interior"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image 2 (Shorter, shifted down) */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mt-16 lg:mt-32 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"
                  alt="Luxury Real Estate Exterior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overlapping floating stat card */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-12 bg-white border border-border p-6 rounded-2xl shadow-floating z-20 w-64 text-center">
              <p className="text-4xl font-display text-ink mb-1">15+</p>
              <p className="text-sm font-medium text-fjord uppercase tracking-wider">
                {isArabic ? "سنوات خبرة في دبي" : "Years Dubai Experience"}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
