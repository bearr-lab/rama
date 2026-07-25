"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Brain, User, AlertCircle, Loader2 } from "lucide-react"

import { useAIChat } from "@/hooks/use-ai-chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function ChatInterface({ locale = "en" }: { locale?: "en" | "ar" }) {
  const [input, setInput] = useState("")
  const { messages, sendMessage, isLoading, error } = useAIChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput("")
  }

  const isArabic = locale === "ar"

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Chat Header */}
      <div className="p-4 bg-ink text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-fjord flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-display font-semibold">RAMA AI Advisor</h2>
          <p className="text-xs text-white/70">
            {isArabic ? "متصل - جاهز للمساعدة" : "Online - Ready to help"}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12 px-4 space-y-4 text-muted-foreground flex flex-col items-center">
              <Brain className="w-12 h-12 text-muted-foreground/30" />
              <p className="max-w-sm">
                {isArabic 
                  ? "مرحباً! أنا مستشارك العقاري الشخصي للذكاء الاصطناعي. كيف يمكنني مساعدتك في العثور على عقارك المثالي في دبي اليوم؟"
                  : "Hello! I'm your personal AI real estate advisor. How can I help you find your perfect property in Dubai today?"}
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <Avatar className="w-8 h-8 shrink-0">
                {msg.role === "user" ? (
                  <AvatarFallback className="bg-fjord text-white"><User className="w-4 h-4" /></AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-verified text-white"><Brain className="w-4 h-4" /></AvatarFallback>
                )}
              </Avatar>
              <div 
                className={cn(
                  "p-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm",
                  msg.role === "user" 
                    ? "bg-fjord text-white rounded-tr-sm" 
                    : "bg-surface-subtle text-ink rounded-tl-sm border border-border"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-verified text-white"><Brain className="w-4 h-4" /></AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-2xl rounded-tl-sm bg-surface-subtle text-ink border border-border flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-fjord" />
                <span className="text-xs text-muted-foreground">RAMA is thinking...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-risk p-3 bg-risk-soft rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-border">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isArabic ? "اسأل عن العقارات، الأسعار، العائد على الاستثمار..." : "Ask about properties, prices, ROI..."}
            className="pr-12 py-6 rounded-full bg-surface-subtle border-none focus-visible:ring-1 focus-visible:ring-fjord"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 w-10 h-10 rounded-full bg-fjord hover:bg-fjord-hover text-white transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
