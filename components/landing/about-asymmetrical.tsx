import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

interface AboutAsymmetricalProps {
  isArabic: boolean;
}

export function AboutAsymmetrical({
  isArabic,
}: AboutAsymmetricalProps) {
  return (
    <Section
      background="canvas"
      spacing="lg"
      className="relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 h-full w-1/3 translate-x-32 skew-x-12 bg-surface-subtle opacity-50" />

      <Container size="lg" padding="lg" className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          {/* Left Column: Massive Drop Cap & Typography */}
          <div className="relative max-w-lg space-y-12">
            {/* The Massive Drop Cap Element mimicking Vellaro reference */}
            <div className="absolute -top-24 -left-4 -z-1 font-display text-[12rem] leading-none text-surface select-none lg:text-[15rem]">
              Aa
            </div>

            <div className="space-y-6">
              <p className="text-sm font-medium tracking-[0.2em] text-fjord uppercase">
                {isArabic ? 'حول راما' : 'About RAMA'}
              </p>
              <h2 className="leading-1.1 font-display text-4xl text-ink lg:text-5xl xl:text-6xl">
                {isArabic ? 'إعادة تعريف الشفافية' : 'Redefining Transparency'}
                <br />
                <span className="font-light text-muted-foreground italic">
                  {isArabic ? 'في سوق دبي' : "in Dubai's Market"}
                </span>
              </h2>
            </div>

            <div className="space-y-8 border-l border-border/60 pl-4">
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-ink">
                  DLD Verified Data
                </h3>
                <p className="max-w-prose leading-relaxed text-muted-foreground">
                  {isArabic
                    ? 'يتم التحقق من كل عقار وكل سعر وكل التفاصيل الخاصة بالمطورين بشكل متبادل مع دائرة الأراضي والأملاك.'
                    : 'Every property, every price, and every developer detail is cross-referenced with official Dubai Land Department records.'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-ink">
                  AI-Powered Curation
                </h3>
                <p className="max-w-prose leading-relaxed text-muted-foreground">
                  {isArabic
                    ? 'يتفهم مستشارنا المدعوم بالذكاء الاصطناعي تفضيلاتك في نمط الحياة، ويطابقك مع مجتمعات وعقارات قد لا تكتشفها أبدًا بمفردك.'
                    : 'Our AI Advisor understands your lifestyle preferences, matching you with communities and properties you might never discover on your own.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetrical Imagery */}
          <div className="relative">
            <div className="grid grid-cols-2 items-start gap-4 lg:gap-8">
              {/* Image 1 (Taller, shifted up) */}
              <div className="relative mt-0 aspect-3/4 w-full overflow-hidden rounded-none shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000"
                  alt="Modern Dubai Villa Interior"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Image 2 (Shorter, shifted down) */}
              <div className="relative mt-16 aspect-square w-full overflow-hidden rounded-none shadow-xl lg:mt-32">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"
                  alt="Luxury Real Estate Exterior"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overlapping floating stat card */}
            <div className="shadow-floating absolute -bottom-8 left-1/2 z-20 w-64 -translate-x-1/2 rounded-none border border-border bg-white p-6 text-center lg:-left-12 lg:translate-x-0">
              <p className="mb-1 font-display text-4xl text-ink">15+</p>
              <p className="text-sm font-medium tracking-wider text-fjord uppercase">
                {isArabic ? 'سنوات خبرة في دبي' : 'Years Dubai Experience'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
