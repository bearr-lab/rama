import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

interface AIAppTeaserProps {
  locale: string;
  isArabic: boolean;
}

export function AIAppTeaser({ locale, isArabic }: AIAppTeaserProps) {
  return (
    <Section
      background="surface"
      spacing="xl"
      className="relative overflow-hidden"
    >
      <Container size="lg" padding="lg" className="relative z-10">
        {/* Text on top — centered, narrow */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-fjord uppercase">
            {isArabic ? 'توجيه مدعوم بالذكاء الاصطناعي' : 'AI-Powered Guidance'}
          </p>
          <h2 className="mb-6 font-display text-3xl leading-tight font-light text-ink md:text-4xl lg:text-5xl">
            {isArabic ? 'قابل مستشارك العقاري الشخصي.' : 'Meet your personal'}
            {!isArabic && (
              <span className="mt-2 block text-muted-foreground italic">
                Real Estate Advisor.
              </span>
            )}
          </h2>
          <p className="mx-auto mb-8 max-w-prose text-lg leading-relaxed text-muted-foreground">
            {isArabic
              ? 'تخطى التصفح اللانهائي. أخبر راما بما تبحث عنه، واحصل على توصيات مخصصة بناءً على بيانات السوق في الوقت الفعلي.'
              : "Skip the endless browsing. Tell RAMA you're looking for, and get personalized recommendations based on real-time market data."}
          </p>
          <Link href={`/${locale}/advisor`} className="inline-block">
            <Button
              size="sm"
              className="h-9 rounded-none bg-fjord px-6 text-[11px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-fjord-hover"
            >
              {isArabic ? 'اسأل راما' : 'Ask RAMA'}
              <ArrowRight className="ml-2 size-3.5" />
            </Button>
          </Link>
        </div>

        {/* Massive phone mock — centered */}
        <div className="flex justify-center">
          <div className="relative w-75 md:w-90 lg:w-100">
            {/* Phone frame */}
            <div className="relative rounded-[3.5rem] bg-ink-bg p-3 shadow-2xl ring-1 ring-border">
              {/* Screen */}
              <div className="aspect-[9/19] overflow-hidden rounded-[3rem] bg-background">
                {/* Chat UI mockup inside phone */}
                <div className="flex h-full flex-col">
                  {/* Chat header */}
                  <div className="flex items-center gap-3 bg-surface-subtle px-4 py-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-fjord">
                      <Bot className="size-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">RAMA AI</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 space-y-4 overflow-hidden p-4">
                    {/* AI message */}
                    <div className="flex gap-2">
                      <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-fjord">
                        <Bot className="size-3 text-white" />
                      </div>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-surface-subtle px-4 py-3 text-ink">
                        <p className="text-sm">
                          Welcome! I&apos;m RAMA AI. Ask me anything about Dubai
                          real estate.
                        </p>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex justify-end gap-2">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-fjord px-4 py-3 text-white">
                        <p className="text-sm">
                          Best areas for families under 3M?
                        </p>
                      </div>
                    </div>

                    {/* AI response with property card */}
                    <div className="flex gap-2">
                      <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-fjord">
                        <Bot className="size-3 text-white" />
                      </div>
                      <div className="max-w-[90%] space-y-2">
                        <div className="rounded-2xl rounded-tl-none bg-surface-subtle px-4 py-3 text-ink">
                          <p className="text-sm">
                            I found 3 great options. Arabian Ranches III is a
                            top choice for families.
                          </p>
                        </div>
                        {/* Mini property card */}
                        <div className="overflow-hidden rounded-none border border-border bg-background shadow-sm">
                          <div className="relative aspect-video bg-surface-subtle">
                            <Image
                              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600"
                              alt="Arabian Ranches III"
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3 text-ink">
                            <p className="text-sm font-medium">
                              Arabian Ranches III
                            </p>
                            <p className="text-xs text-muted-foreground">
                              AED 2,800,000 · 4 Beds
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="border-t border-border px-4 py-3">
                    <div className="flex items-center gap-2 rounded-full bg-surface-subtle px-4 py-2">
                      <span className="flex-1 text-sm text-muted-foreground">
                        Type a message...
                      </span>
                      <div className="flex size-6 items-center justify-center rounded-full bg-fjord">
                        <Send className="-ml-1 size-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around phone */}
            <div className="absolute -top-4 -right-4 rounded-none border border-border bg-background p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center bg-verified-soft">
                  <Check className="size-4 text-verified" />
                </div>
                <div>
                  <p className="text-xs font-medium text-ink">DLD Verified</p>
                  <p className="text-[10px] text-muted-foreground">
                    Price confirmed
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 rounded-none border border-border bg-background p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center bg-fjord-soft">
                  <Sparkles className="size-4 text-fjord" />
                </div>
                <div>
                  <p className="text-xs font-medium text-ink">AI Match</p>
                  <p className="text-[10px] text-muted-foreground">
                    98% relevant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
