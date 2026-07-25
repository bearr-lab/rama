"use client"

import { useState } from "react"
import { Search, MapPin, Home, Building2, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchBarProps {
  variant?: "hero" | "inline"
  locale?: "en" | "ar"
  initialQuery?: string
  initialTenure?: string
  onSearch?: (query: string, tenure: string) => void
  className?: string
}

export function SearchBar({ 
  variant = "hero", 
  locale = "en",
  initialQuery = "",
  initialTenure = "ready",
  onSearch,
  className 
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [tenure, setTenure] = useState<string>(initialTenure)
  const [isFocused, setIsFocused] = useState(false)

  const isHero = variant === "hero"

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query, tenure)
    } else {
      // Default behavior: navigate to homes page with query params
      const params = new URLSearchParams()
      if (query) params.set("query", query)
      if (tenure) params.set("tenure", tenure)
      router.push(`/${locale}/homes?${params.toString()}`)
    }
  }

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      {isHero && (
        <Tabs defaultValue="ready" value={tenure} onValueChange={setTenure} className="w-full mb-4">
          <TabsList className="bg-surface/20 backdrop-blur-md border border-white/20 p-1">
            <TabsTrigger value="ready" className="data-[state=active]:bg-white data-[state=active]:text-ink text-white">
              <Home className="w-4 h-4 mr-2" />
              Ready
            </TabsTrigger>
            <TabsTrigger value="off_plan" className="data-[state=active]:bg-white data-[state=active]:text-ink text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Off-Plan
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <form 
        onSubmit={handleSearch}
        className={cn(
          "relative flex items-center w-full transition-all duration-300",
          isHero 
            ? "bg-white p-2 rounded-full shadow-lg" 
            : "bg-surface border border-border rounded-lg p-1",
          isFocused && (isHero ? "shadow-xl scale-[1.01]" : "border-fjord ring-1 ring-fjord")
        )}
      >
        <div className="flex items-center justify-center pl-4 pr-2 text-muted-foreground">
          <MapPin className="w-5 h-5" />
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={locale === "ar" ? "أين تريد أن تعيش؟" : "Where do you want to live?"}
          className="flex-1 border-none shadow-none focus-visible:ring-0 px-2 text-lg"
        />
        
        <Button 
          type="submit" 
          size={isHero ? "lg" : "default"}
          className={cn(
            "bg-fjord hover:bg-fjord-hover text-white transition-colors",
            isHero ? "rounded-full px-8" : "rounded-md"
          )}
        >
          <Search className="w-5 h-5 md:mr-2" />
          <span className="hidden md:inline">
            {locale === "ar" ? "بحث" : "Search"}
          </span>
        </Button>
      </form>
    </div>
  )
}
