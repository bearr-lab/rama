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
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 mb-4 w-[350px] sm:w-[400px] origin-bottom-right overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl backdrop-blur-xl flex flex-col h-[600px] max-h-[calc(100dvh-100px)]"
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-border bg-surface-subtle p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-inner">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground leading-none">
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
                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 min-h-0 flex-col overflow-y-auto p-4 space-y-4">
              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex w-full gap-3',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {m.role === 'assistant' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-surface-subtle text-foreground border border-border rounded-bl-none'
                    )}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        a: ({ href, children }) => <a href={href} className="underline underline-offset-2 hover:text-primary transition-colors font-medium" target="_blank" rel="noopener noreferrer">{children}</a>
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                  
                  {m.role === 'user' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary border border-border">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Tool Invocations (Generative UI) */}
                  {m.toolInvocations?.map(toolInvocation => {
                    if (toolInvocation.toolName === 'collect_lead_info') {
                      return (
                        <div key={toolInvocation.toolCallId} className="w-full flex justify-start mt-2">
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
                <div className="flex w-full gap-3 justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-surface-subtle px-4 py-4 border border-border">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"></div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex w-full gap-3 justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20">
                    <Bot className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="flex flex-col gap-2 rounded-2xl rounded-bl-none bg-destructive/5 px-4 py-3 border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">Sorry, I encountered a network error.</p>
                    <Button 
                      onClick={() => reload()}
                      variant="outline"
                      size="sm"
                      className="h-8 self-start gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      <RefreshCcw className="h-3 w-3" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
              
              {!hasSubmittedLead && (
                <div className="w-full flex justify-start mt-2">
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
                  className="flex items-center gap-2 relative"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about properties, areas, or rules..."
                    className="w-full rounded-full border border-border bg-surface-subtle px-4 py-3 pr-12 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <div className="mt-2 text-center text-[10px] text-muted-foreground">
                  Powered by RAMA AI Engine
                </div>
              </div>
            ) : (
              <div className="shrink-0 border-t border-border bg-surface p-4 flex items-center justify-center">
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
            'flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300',
            isOpen 
              ? 'bg-surface-subtle border border-border text-foreground hover:bg-surface-subtle/80' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25'
          )}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>
    </div>
  );
}
