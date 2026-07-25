import Link from "next/link"
import { ArrowRight, Brain, Sparkles, Check, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

interface AIAppTeaserProps {
  locale: string
  isArabic: boolean
}

export function AIAppTeaser({ locale, isArabic }: AIAppTeaserProps) {
  return (
    <Section background="surface" spacing="xl" className="relative overflow-hidden">
      <Container size="lg" padding="lg" className="relative z-10">
        
        {/* Text on top — centered, narrow */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-fjord text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            {isArabic ? "توجيه مدعوم بالذكاء الاصطناعي" : "AI-Powered Guidance"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-ink leading-tight mb-6 font-display">
            {isArabic ? "قابل مستشارك العقاري الشخصي." : "Meet your personal"}
            {!isArabic && (
              <span className="block italic text-muted-foreground mt-2">
                Real Estate Advisor.
              </span>
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-prose mx-auto">
            {isArabic 
              ? "تخطى التصفح اللانهائي. أخبر راما بما تبحث عنه، واحصل على توصيات مخصصة بناءً على بيانات السوق في الوقت الفعلي."
              : "Skip the endless browsing. Tell RAMA what you&apos;re looking for, and get personalized recommendations based on real-time market data."}
          </p>
          <Link href={`/${locale}/advisor`} className="inline-block">
            <Button size="lg" className="bg-ink hover:bg-ink-hover text-white rounded-button px-8 h-14 min-w-[220px]">
              {isArabic ? "اسأل راما أي شيء" : "Ask RAMA Anything"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Massive phone mock — centered */}
        <div className="flex justify-center">
          <div className="relative w-[300px] md:w-[360px] lg:w-[400px]">
            {/* Phone frame */}
            <div className="relative rounded-[3.5rem] bg-ink p-3 shadow-2xl">
              {/* Screen */}
              <div className="rounded-[3rem] overflow-hidden bg-white aspect-[9/19]">
                {/* Chat UI mockup inside phone */}
                <div className="h-full flex flex-col">
                  {/* Chat header */}
                  <div className="bg-surface-subtle px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-fjord flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">RAMA AI</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-hidden">
                    {/* AI message */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-fjord flex-shrink-0 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-surface-subtle rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] text-ink">
                        <p className="text-sm">Welcome! I&apos;m RAMA AI. Ask me anything about Dubai real estate.</p>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex gap-2 justify-end">
                      <div className="bg-fjord text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%]">
                        <p className="text-sm">Best areas for families under 3M?</p>
                      </div>
                    </div>

                    {/* AI response with property card */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-fjord flex-shrink-0 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="space-y-2 max-w-[90%]">
                        <div className="bg-surface-subtle rounded-2xl rounded-tl-none px-4 py-3 text-ink">
                          <p className="text-sm">I found 3 great options. Arabian Ranches III is a top choice for families.</p>
                        </div>
                        {/* Mini property card */}
                        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                          <div className="aspect-[16/9] bg-surface-subtle relative">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                              Property Image
                            </div>
                          </div>
                          <div className="p-3 text-ink">
                            <p className="text-sm font-medium">Arabian Ranches III</p>
                            <p className="text-xs text-muted-foreground">AED 2,800,000 · 4 Beds</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="border-t border-border px-4 py-3">
                    <div className="bg-surface-subtle rounded-full px-4 py-2 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground flex-1">Type a message...</span>
                      <div className="w-6 h-6 rounded-full bg-fjord flex items-center justify-center">
                        <Send className="w-3 h-3 text-white -ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around phone */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-verified-soft flex items-center justify-center">
                  <Check className="w-4 h-4 text-verified" />
                </div>
                <div>
                  <p className="text-xs font-medium text-ink">DLD Verified</p>
                  <p className="text-[10px] text-muted-foreground">Price confirmed</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-fjord-soft flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-fjord" />
                </div>
                <div>
                  <p className="text-xs font-medium text-ink">AI Match</p>
                  <p className="text-[10px] text-muted-foreground">98% relevant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
