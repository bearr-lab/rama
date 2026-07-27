'use client';

import { useState } from 'react';
import { Search, MapPin, Home, TrendingUp } from 'lucide-react';
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
  initialTenure = 'ready',
  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [tenure, setTenure] = useState<string>(initialTenure);
  const [isFocused, setIsFocused] = useState(false);

  const isHero = variant === 'hero';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, tenure);
    } else {
      const params = new URLSearchParams();
      if (query) params.set('query', query);
      if (tenure) params.set('tenure', tenure);
      router.push(`/${locale}/homes?${params.toString()}`);
    }
  };

  return (
    <div className={cn('mx-auto w-full max-w-[400px]', className)}>
      {isHero && (
        <Tabs
          defaultValue="ready"
          value={tenure}
          onValueChange={setTenure}
          className="mb-2 flex justify-center w-full"
        >
          <TabsList className="rounded-none border border-white/20 bg-white/10 p-1 backdrop-blur-xl shadow-sm">
            <TabsTrigger
              value="ready"
              className="rounded-none px-4 py-1 text-[11px] font-bold tracking-wider uppercase text-white/80 transition-all data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-none"
            >
              <Home className="mr-1.5 h-3.5 w-3.5" />
              {locale === 'ar' ? 'جاهز' : 'Ready'}
            </TabsTrigger>
            <TabsTrigger
              value="off_plan"
              className="rounded-none px-4 py-1 text-[11px] font-bold tracking-wider uppercase text-white/80 transition-all data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-none"
            >
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
              {locale === 'ar' ? 'قيد الإنشاء' : 'Off-Plan'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <form
        onSubmit={handleSearch}
        className={cn(
          'relative flex w-full items-center transition-all duration-300 rounded-none p-1 shadow-xl backdrop-blur-xl overflow-hidden border-none',
          isHero ? 'bg-white/95 text-ink' : 'bg-surface text-ink',
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
          <MapPin className="h-4 w-4" />
        </div>

        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            locale === 'ar'
              ? 'ابحث عن منطقة في دبي...'
              : 'Search Dubai area...'
          }
          className="relative z-10 flex-1 border-none bg-transparent px-2 text-sm font-medium text-ink placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:outline-none rounded-none"
        />

        <ShimmerButton
          type="submit"
          borderRadius="0px"
          shimmerColor="#34d399"
          background="var(--fjord)"
          className="relative z-10 px-4 py-2 text-xs font-semibold text-white transition-all shadow-none hover:bg-fjord-hover"
        >
          <Search className="h-3.5 w-3.5 md:mr-1.5 inline" />
          <span className="hidden md:inline">
            {locale === 'ar' ? 'بحث' : 'Search'}
          </span>
        </ShimmerButton>
      </form>
    </div>
  );
}
