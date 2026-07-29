'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChat, type Message } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, RefreshCcw } from 'lucide-react';
import { LeadCaptureForm } from './lead-capture-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmittedLead, setHasSubmittedLead] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('rama_lead_submitted')) {
      setHasSubmittedLead(true);
    }
  }, []);

  const handleLeadSuccess = () => {
    setHasSubmittedLead(true);
    localStorage.setItem('rama_lead_submitted', 'true');
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, addToolResult } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'initial-msg',
        role: 'assistant',
        content: "Hi! I'm RAMA, your personal AI real estate advisor. How can I help you navigate the Dubai market today?",
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute right-0 bottom-16 mb-4 flex h-150 max-h-[calc(100dvh-100px)] w-[calc(100vw-2rem)] max-w-100 origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-subtle p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-inner">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-base leading-none font-semibold text-foreground">
                    RAMA AI
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Active & ready to assist
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="min-h-0 flex-1 flex-col space-y-4 overflow-y-auto p-4">
              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex w-full gap-3',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {m.role === 'assistant' && (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <Bot className="size-4 text-primary" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm',
                      m.role === 'user'
                        ? 'rounded-br-none bg-primary text-primary-foreground'
                        : 'rounded-bl-none border border-border bg-surface-subtle text-foreground'
                    )}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        a: ({ href, children }) => <a href={href} className="font-medium underline underline-offset-2 transition-colors hover:text-primary" target="_blank" rel="noopener noreferrer">{children}</a>
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                  
                  {m.role === 'user' && (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                      <User className="size-4 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Tool Invocations (Generative UI) */}
                  {m.toolInvocations?.map(toolInvocation => {
                    if (toolInvocation.toolName === 'collect_lead_info') {
                      return (
                        <div key={toolInvocation.toolCallId} className="mt-2 flex w-full justify-start">
                          <LeadCaptureForm 
                            reason={toolInvocation.args.reason}
                            onSuccess={() => {
                              addToolResult({
                                toolCallId: toolInvocation.toolCallId,
                                result: 'Lead successfully captured. Please thank the user and confirm our agent will contact them.',
                              });
                            }}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex w-full justify-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <Bot className="size-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-none border border-border bg-surface-subtle p-4">
                    <div className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                    <div className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                    <div className="size-1.5 animate-bounce rounded-full bg-muted-foreground"></div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex w-full justify-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10">
                    <Bot className="size-4 text-destructive" />
                  </div>
                  <div className="flex flex-col gap-2 rounded-2xl rounded-bl-none border border-destructive/20 bg-destructive/5 px-4 py-3">
                    <p className="text-sm font-medium text-destructive">Sorry, I encountered a network error.</p>
                    <Button 
                      onClick={() => reload()}
                      variant="outline"
                      size="sm"
                      className="h-8 gap-2 self-start border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <RefreshCcw className="size-3" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
              
              {!hasSubmittedLead && (
                <div className="mt-2 flex w-full justify-start">
                  <LeadCaptureForm 
                    reason="Please provide your contact details to unlock the AI advisor." 
                    onSuccess={handleLeadSuccess} 
                  />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {hasSubmittedLead ? (
              <div className="shrink-0 border-t border-border bg-surface p-4">
                <form
                  onSubmit={handleSubmit}
                  className="relative flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about properties, areas, or rules..."
                    className="w-full rounded-full border border-border bg-surface-subtle px-4 py-3 pr-12 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="absolute top-1.5 right-1.5 size-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
                <div className="mt-2 text-center text-[10px] text-muted-foreground">
                  Powered by RAMA AI Engine
                </div>
              </div>
            ) : (
              <div className="flex shrink-0 items-center justify-center border-t border-border bg-surface p-4">
                <p className="text-xs text-muted-foreground">Please complete the form above to start chatting.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex size-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300',
            isOpen 
              ? 'border border-border bg-surface-subtle text-foreground hover:bg-surface-subtle/80' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25'
          )}
        >
          {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        </Button>
      </motion.div>
    </div>
  );
}
