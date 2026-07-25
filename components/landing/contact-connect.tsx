import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Shield, Lock, Clock } from "lucide-react"

interface ContactConnectProps {
  locale: string
  isArabic: boolean
}

export function ContactConnect({ locale, isArabic }: ContactConnectProps) {
  return (
    <Section
      background="transparent"
      spacing="none"
      className="relative min-h-[700px] flex items-center py-24 md:py-32 overflow-hidden"
    >
      {/* Background image — full bleed, darkened, blurred */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070"
          alt="Dubai skyline"
          fill
          className="object-cover"
        />
        {/* Dark overlay + blur */}
        <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
      </div>

      {/* Content — centered, contained */}
      <Container size="lg" padding="lg" className="relative z-10">
        {/* Glassmorphic card */}
        <div className="bg-canvas/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Column: Typography & Info */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-light text-ink font-display">
                  {isArabic ? "لنتواصل معاً." : "Let's connect."}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {isArabic 
                    ? "سواء كنت تتطلع للشراء أو البيع أو مجرد استكشاف السوق، فنحن هنا للمساعدة."
                    : "Whether you're looking to buy, sell, or just explore the market, we're here to help."}
                </p>
              </div>

              {/* Additional Contact Details */}
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-4 text-ink">
                  <div className="w-12 h-12 rounded-full bg-surface-subtle flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-fjord" />
                  </div>
                  <div>
                    <p className="font-medium">{isArabic ? "ساعات العمل" : "Office Hours"}</p>
                    <p className="text-sm text-muted-foreground">{isArabic ? "الاثنين - الجمعة, 9 ص - 6 م" : "Mon - Fri, 9am - 6pm"}</p>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="pt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-verified" />
                  {isArabic ? "موثق من الدائرة" : "DLD Verified"}
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-fjord" />
                  {isArabic ? "مشفر" : "Encrypted"}
                </span>
              </div>
            </div>

            {/* Right Column: Form */}
            <div>
              <form className="space-y-5 bg-surface-subtle/50 p-6 md:p-8 rounded-2xl border border-border">
                <div>
                  <label className="block text-sm text-ink mb-2 font-medium">
                    {isArabic ? "الاسم" : "Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={isArabic ? "الاسم الكامل" : "Your full name"}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-canvas text-ink placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-fjord/30 focus:border-fjord transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-ink mb-2 font-medium">
                    {isArabic ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <input
                    type="email"
                    placeholder={isArabic ? "أنت@مثال.com" : "you@example.com"}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-canvas text-ink placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-fjord/30 focus:border-fjord transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-ink mb-2 font-medium">
                    {isArabic ? "رقم الهاتف" : "Phone number"}
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 50 123 4567"
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-canvas text-ink placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-fjord/30 focus:border-fjord transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-ink mb-2 font-medium">
                    {isArabic ? "كيف يمكننا المساعدة؟" : "How can we help?"}
                  </label>
                  <textarea
                    placeholder={isArabic ? "أخبرنا عما تبحث عنه..." : "Tell us what you are looking for..."}
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-canvas text-ink placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-fjord/30 focus:border-fjord transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-2 bg-fjord hover:bg-fjord-hover text-white rounded-button"
                >
                  {isArabic ? "إرسال الرسالة" : "Send Message"}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  )
}
