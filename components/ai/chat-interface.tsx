'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, AlertCircle, Loader2 } from 'lucide-react';
import { useAIChat } from '@/hooks/use-ai-chat';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function ChatInterface({ locale = 'en' }: { locale?: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading, error } = useAIChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
    sendMessage(prompt);
    setInput('');
  };

  const isArabic = locale === 'ar';

  const suggestions = isArabic
    ? [
        'ما هو العائد على الاستثمار في وسط مدينة دبي؟',
        'مقارنة بين جي بي آر ومارينا',
        'رسوم نقل ملكية دائرة الأراضي والأملاك',
      ]
    : ['ROI on Downtown?', 'Compare JBR vs Marina', 'DLD transfer fees'];

  return (
    <div className="flex h-[calc(100vh-16rem)] min-h-125 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
        <div className="mx-auto max-w-4xl space-y-8 pb-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4 py-20 text-center opacity-80">
              <div className="flex size-16 items-center justify-center rounded-full bg-fjord-soft text-fjord">
                <Sparkles className="size-8" />
              </div>
              <p className="max-w-md font-display text-xl text-muted">
                {isArabic
                  ? 'أنا مستشارك العقاري. مدعوم ببيانات دائرة الأراضي والأملاك في دبي. اسألني أي شيء.'
                  : "I'm your real estate advisor. Powered by verified DLD data. Ask me anything."}
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex w-full',
                msg.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={cn(
                  'flex max-w-[85%] items-start gap-4 sm:max-w-[75%]',
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full',
                    msg.role === 'user'
                      ? 'border border-border bg-canvas text-muted'
                      : 'bg-fjord-soft text-fjord',
                  )}
                >
                  {msg.role === 'user' ? (
                    <User className="size-4" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={cn(
                    'rounded-2xl p-4 text-base leading-relaxed',
                    msg.role === 'user'
                      ? 'rounded-tr-sm bg-fjord text-white'
                      : 'rounded-tl-sm border border-border bg-surface text-ink shadow-sm',
                  )}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-fjord-soft text-fjord">
                  <Sparkles className="size-4" />
                </div>
                <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3 shadow-sm">
                  <Loader2 className="size-4 animate-spin text-fjord" />
                  <span className="text-sm font-medium text-muted">
                    {isArabic ? 'RAMA يفكر...' : 'RAMA is thinking...'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mx-auto flex max-w-md items-center gap-3 rounded-xl border border-risk-soft bg-risk-soft p-4 text-risk">
              <AlertCircle className="size-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area (Sticky Bottom) */}
      <div className="border-t border-border bg-surface p-4 sm:p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestion(suggestion)}
                  disabled={isLoading}
                  className="rounded-full border border-border bg-canvas px-4 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-fjord/50 hover:text-fjord disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="relative flex items-center overflow-hidden rounded-xl border border-border bg-canvas shadow-sm focus-within:border-fjord focus-within:ring-1 focus-within:ring-fjord"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isArabic
                  ? 'اسأل عن الأسعار، أو العائد على الاستثمار، أو ابحث عن عقار...'
                  : 'Ask about prices, ROI, or search for a property...'
              }
              className="w-full bg-transparent py-4 pr-14 pl-4 text-base text-ink placeholder:text-muted focus:outline-none sm:pl-6"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 size-10 shrink-0 rounded-lg bg-fjord text-white transition-all hover:bg-fjord-hover disabled:opacity-50"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
