'use client';

import { useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  User,
  AlertCircle,
  Loader2,
  Trash2,
} from 'lucide-react';
import { useAIChat } from '@/hooks/use-ai-chat';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LeadContactForm, PropertyCardList } from './generative-ui';

export function ChatInterface({ locale = 'en' }: { locale?: 'en' | 'ar' }) {
  const chatState = useAIChat();
  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    error,
    setInput,
    sendMessage,
    clearChat,
  } = chatState;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/debug', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    }).catch(() => {});
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSuggestion = (
    e: React.MouseEvent<HTMLButtonElement>,
    prompt: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setInput(prompt);
    sendMessage(prompt);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(input || '').trim() || isLoading) return;
    sendMessage(input);
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
    <div className="flex h-[calc(100vh-16rem)] min-h-128 flex-col overflow-hidden rounded-none border border-border bg-surface shadow-sm">
      {/* Messages Area */}
      <ScrollArea
        className="relative min-h-0 flex-1 p-6"
        viewportRef={scrollRef}
      >
        <div className="relative mx-auto max-w-4xl space-y-8 pb-4">
          {messages.length > 0 && (
            <div className="absolute -top-4 right-0 z-10">
              <button
                onClick={clearChat}
                className="flex items-center gap-1.5 rounded-none bg-surface/80 px-2 py-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase backdrop-blur-sm transition-colors hover:text-risk"
                title={isArabic ? 'مسح الدردشة' : 'Clear Chat'}
              >
                <Trash2 className="size-3" />
                <span>{isArabic ? 'مسح' : 'Clear'}</span>
              </button>
            </div>
          )}

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-6 py-16 text-center">
              <div className="flex size-16 items-center justify-center rounded-none bg-fjord-soft text-fjord">
                <Sparkles className="size-8" />
              </div>
              <p className="max-w-md font-display text-xl text-muted-foreground">
                {isArabic
                  ? 'أنا مستشارك العقاري. مدعوم ببيانات دائرة الأراضي والأملاك في دبي. اسألني أي شيء.'
                  : "I'm your real estate advisor. Powered by verified DLD data. Ask me anything."}
              </p>

              {/* Centered Hero Suggestions */}
              <div className="relative z-20 flex flex-wrap justify-center gap-2 pt-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={(e) => handleSuggestion(e, suggestion)}
                    className="cursor-pointer rounded-none border border-border bg-canvas px-4 py-2 text-xs font-semibold text-ink transition-all hover:border-fjord hover:bg-surface hover:text-fjord active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
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
                  'flex max-w-[85%] items-start gap-4 sm:max-w-[85%]',
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-none',
                    msg.role === 'user'
                      ? 'border border-border bg-canvas text-muted-foreground'
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
                    'rounded-none p-4 text-base leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-fjord text-white'
                      : 'border border-border bg-surface text-ink shadow-sm',
                  )}
                >
                  <div
                    className={cn(
                      'prose prose-sm dark:prose-invert max-w-none',
                      msg.role === 'user' ? 'text-white' : 'text-ink',
                    )}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      /* eslint-disable @typescript-eslint/no-unused-vars */
                      components={{
                        p: ({ node: _node, ...props }) => (
                          <p className="mb-2 last:mb-0" {...props} />
                        ),
                        ul: ({ node: _node, ...props }) => (
                          <ul className="mb-4 ml-4 list-disc" {...props} />
                        ),
                        ol: ({ node: _node, ...props }) => (
                          <ol className="mb-4 ml-4 list-decimal" {...props} />
                        ),
                        li: ({ node: _node, ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        h1: ({ node: _node, ...props }) => (
                          <h1 className="mb-4 text-lg font-bold" {...props} />
                        ),
                        h2: ({ node: _node, ...props }) => (
                          <h2 className="mb-3 text-base font-bold" {...props} />
                        ),
                        h3: ({ node: _node, ...props }) => (
                          <h3
                            className="mb-2 text-sm font-bold tracking-wider text-muted-foreground uppercase"
                            {...props}
                          />
                        ),
                        table: ({ node: _node, ...props }) => (
                          <div className="my-4 overflow-x-auto rounded-none border border-border">
                            <table
                              className="min-w-full divide-y divide-border text-sm"
                              {...props}
                            />
                          </div>
                        ),
                        thead: ({ node: _node, ...props }) => (
                          <thead className="bg-muted/50" {...props} />
                        ),
                        th: ({ node: _node, ...props }) => (
                          <th
                            className="px-4 py-2 text-left font-semibold"
                            {...props}
                          />
                        ),
                        td: ({ node: _node, ...props }) => (
                          <td className="px-4 py-2" {...props} />
                        ),
                        strong: ({ node: _node, ...props }) => (
                          <strong
                            className="font-semibold text-inherit"
                            {...props}
                          />
                        ),
                        a: ({ node: _node, ...props }) => (
                          <a
                            className="underline hover:text-fjord-hover"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    {msg.toolInvocations?.map((inv: unknown) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const toolInvocation = inv as any;
                      if (toolInvocation.toolName === 'collect_lead_info') {
                        return (
                          <LeadContactForm
                            key={toolInvocation.toolCallId}
                            toolInvocation={toolInvocation}
                          />
                        );
                      }
                      if (toolInvocation.toolName === 'show_property_cards') {
                        return (
                          <PropertyCardList
                            key={toolInvocation.toolCallId}
                            toolInvocation={toolInvocation}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading &&
            (!messages.length ||
              messages[messages.length - 1]?.role === 'user' ||
              (messages[messages.length - 1]?.role === 'assistant' &&
                !messages[messages.length - 1]?.content)) && (
              <div className="animate-in fade-in slide-in-from-bottom-2 flex justify-start duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-none bg-fjord-soft text-fjord">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="flex items-center gap-3 rounded-none border border-border bg-surface px-4 py-3 shadow-sm">
                    <Loader2 className="size-4 animate-spin text-fjord" />
                    <span className="animate-pulse text-sm font-medium text-muted-foreground">
                      {isArabic ? 'RAMA يفكر...' : 'RAMA is generating...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

          {error && (
            <div className="mx-auto flex max-w-md items-center gap-3 rounded-none border border-risk-soft bg-risk-soft p-4 text-risk">
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
            <div className="relative z-20 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={(e) => handleSuggestion(e, suggestion)}
                  className="cursor-pointer rounded-none border border-border bg-canvas px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-fjord/50 hover:text-fjord active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            id="chat-form"
            onSubmit={handleFormSubmit}
            className="relative flex items-center overflow-hidden rounded-none border border-border bg-canvas shadow-sm transition-all focus-within:border-fjord focus-within:ring-1 focus-within:ring-fjord"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder={
                isArabic
                  ? 'اسأل عن الأسعار، أو العائد على الاستثمار، أو ابحث عن عقار...'
                  : 'Ask about prices, ROI, or search for a property...'
              }
              className="w-full bg-transparent py-4 pr-14 pl-4 text-base text-ink placeholder:text-muted-foreground focus:outline-none sm:pl-6"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!(input || '').trim() || isLoading}
              className="absolute right-2 size-10 shrink-0 rounded-none bg-fjord text-white transition-all hover:bg-fjord-hover disabled:opacity-50"
            >
              <Send className="size-4" />
            </Button>
          </form>
          <div className="text-center text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
            Powered by NVIDIA NIM &bull; meta/llama-3.1-70b-instruct
          </div>
        </div>
      </div>
    </div>
  );
}
