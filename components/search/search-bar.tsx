'use client';

import { useState } from 'react';
import { Search, Sparkles, Send, Mic } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BorderBeam } from '@/components/magicui/border-beam';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

interface SearchBarProps {
  variant?: 'hero' | 'inline';
  locale?: 'en' | 'ar';
  initialQuery?: string;
  initialTenure?: string;
  onSearch?: (query: string, tenure: string) => void;
  className?: string;
}

export function SearchBar({
  variant = 'hero',
  locale = 'en',
  initialQuery = '',
  initialTenure = '',

  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  const isHero = variant === 'hero';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, initialTenure);
    } else {
      const params = new URLSearchParams();
      if (query) params.set('query', query);
      if (initialTenure) params.set('tenure', initialTenure);
      router.push(`/${locale}/homes?${params.toString()}`);
    }
  };

  return (
    <div className={cn('mx-auto w-full max-w-100', className)}>
      {/* Removed the AI Concierge Badge to maintain a clean, minimalistic Nordic Lagom aesthetic */}
      <form
        onSubmit={handleSearch}
        className={cn(
          'relative flex w-full items-center overflow-hidden rounded-none border-none p-1 shadow-xl backdrop-blur-xl transition-all duration-300',
          isHero ? 'bg-white/95 text-fjord' : 'bg-surface text-fjord',
          isFocused && 'ring-1 ring-fjord',
        )}
      >
        <BorderBeam
          duration={4}
          colorFrom="#00f2fe"
          colorTo="#10b981"
          borderWidth={2}
          innerClassName={
            isHero ? 'bg-white dark:bg-[#0b1329]' : 'bg-surface dark:bg-surface'
          }
        />

        <div className="z-10 flex items-center justify-center ps-3 pe-1 text-fjord">
          <Sparkles className="size-4" />
        </div>

        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            locale === 'ar'
              ? 'ابحث بالذكاء الاصطناعي (مثال: فيلا بإطلالة بحرية)...'
              : 'Try "Penthouse with Burj Khalifa view under 15M"...'
          }
          className="relative z-10 flex-1 rounded-none border-none bg-transparent px-2 text-sm font-medium text-fjord placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:outline-none"
        />

        <button
          type="button"
          aria-label={locale === 'ar' ? 'البحث الصوتي' : 'Voice Search'}
          className="z-10 px-2 text-muted transition-colors hover:text-fjord"
        >
          <Mic className="size-4" />
        </button>

        <ShimmerButton
          type="submit"
          borderRadius="0px"
          shimmerColor="#34d399"
          background="var(--fjord)"
          className="relative z-10 px-4 py-2 text-xs font-semibold text-white shadow-none transition-all hover:bg-fjord-hover"
        >
          <Send className="inline size-3.5 md:mr-1.5" />
          <span className="hidden md:inline">
            {locale === 'ar' ? 'اسأل الذكاء' : 'Ask AI'}
          </span>
        </ShimmerButton>
      </form>
    </div>
  );
}
