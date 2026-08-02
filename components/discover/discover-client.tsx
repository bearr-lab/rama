'use client';

import * as React from 'react';
import {
  MOCK_DISCOVER_PROPERTIES,
  COMMUNITY_LIST,
  DiscoverProperty,
} from '@/lib/discover/mock-properties';
import {
  DiscoverFilters,
  INITIAL_FILTERS,
  parseNaturalLanguageQuery,
  filterProperties,
} from '@/lib/discover/nlp-parser';
import { searchProperties } from '@/app/actions/search-properties';
import { DubaiMap } from '@/components/discover/dubai-map';
import { ListingCard } from '@/components/discover/listing-card';
import {
  Sparkles,
  Search,
  Map as MapIcon,
  LayoutGrid,
  List,
  X,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LifeBriefBar } from '@/components/shell/life-brief-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { NumberTicker } from '@/components/magicui/number-ticker';

import { AnimatedShinyText } from '@/components/magicui/shiny-text';

export function DiscoverClient({ locale = 'en' }: { locale?: string }) {
  const [filters, setFilters] =
    React.useState<DiscoverFilters>(INITIAL_FILTERS);
  const [rawQuery, setRawQuery] = React.useState('');
  const [selectedProperty, setSelectedProperty] =
    React.useState<DiscoverProperty | null>(null);
  const [showMapDrawer, setShowMapDrawer] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchResults, setSearchResults] = React.useState<DiscoverProperty[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  // Debounced real API search
  React.useEffect(() => {
    const fetchResults = async () => {
      if (!rawQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      const res = await searchProperties(rawQuery);
      if (res.success && res.data) {
        setSearchResults(res.data);
      }
      setIsSearching(false);
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(timer);
  }, [rawQuery]);

  // Handle NLP search submission / live typing
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setRawQuery(text);
    setFilters((prev) => parseNaturalLanguageQuery(text, prev));
  };

  const applyQuickChip = (chipQuery: string) => {
    setRawQuery(chipQuery);
    setFilters((prev) => parseNaturalLanguageQuery(chipQuery, prev));
  };

  const handleClearSearch = () => {
    setRawQuery('');
    setFilters(INITIAL_FILTERS);
    setSelectedProperty(null);
  };

  const removeFilter = (key: keyof DiscoverFilters) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (key === 'community') next.community = 'All Communities';
      if (key === 'beds') delete next.beds;
      if (key === 'maxPrice') delete next.maxPrice;
      if (key === 'minTrust' || key === 'onlyVerified') {
        delete next.minTrust;
        delete next.onlyVerified;
      }
      return next;
    });
  };

  const filteredProperties = React.useMemo(() => {
    // If we have AI search results from the DB, use those. 
    // Otherwise fall back to local mock data filtered via NLP parser.
    if (rawQuery.trim() && searchResults.length > 0) {
       return searchResults;
    }
    return filterProperties(MOCK_DISCOVER_PROPERTIES, filters);
  }, [filters, searchResults, rawQuery]);

  // Calculate quick summary metrics
  const avgYield = React.useMemo(() => {
    if (!filteredProperties.length) return 0;
    const sum = filteredProperties.reduce((acc, p) => acc + p.roi, 0);
    return (sum / filteredProperties.length).toFixed(1);
  }, [filteredProperties]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 lg:p-10">
      {/* Header & Stats Banner */}
      <header className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold tracking-widest text-ink uppercase ">
            WORKSPACE · DISCOVERY ENGINE
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl ">
            Discover Dubai Real Estate
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground dark:text-stone-400">
            Universal semantic search paired with verified Trust Passports and
            live geospatial intelligence.
          </p>
        </div>

        {/* Executive Summary Metrics & Actions */}
        <div className="flex flex-row flex-wrap items-center gap-4 border-t border-border/60 pt-6">
          <div className="border-border/60/80 flex flex-row items-center gap-3.5 rounded-none border bg-surface-subtle px-4 py-2 text-xs shadow-2xs sm:gap-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-ink ">
                <NumberTicker value={filteredProperties.length} />
              </span>
              <span className="font-medium text-muted-foreground dark:text-stone-400">
                Listings
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-ink ">
                <NumberTicker
                  value={Number(avgYield)}
                  decimalPlaces={1}
                  suffix="%"
                />
              </span>
              <span className="font-medium text-muted-foreground dark:text-stone-400">
                Avg Yield
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 font-semibold text-ink ">
              <ShieldCheck className="size-4 shrink-0 text-ink " />
              <AnimatedShinyText className="font-semibold text-ink ">
                {filters.onlyVerified ? 'Verified Only' : '100% DLD Passports'}
              </AnimatedShinyText>
            </div>
          </div>

          {/* Map Drawer Toggle Button */}
          <Button
            variant={showMapDrawer ? 'primary' : 'outline'}
            onClick={() => setShowMapDrawer(!showMapDrawer)}
            className={cn(
              'flex flex-row items-center gap-2 rounded-none border font-semibold shadow-2xs transition-all',
              showMapDrawer
                ? 'border-transparent bg-fjord text-white hover:bg-fjord'
                : 'border-border/60 bg-surface text-ink hover:border-border hover:bg-surface-subtle'
            )}
          >
            <MapIcon className="size-4" />
            <span>{showMapDrawer ? 'Hide Map' : 'Interactive Map'}</span>
            {showMapDrawer ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Persistent Life Brief & Goal Engine */}
      <LifeBriefBar />

      {/* Top Collapsible Geospatial Map Drawer */}
      {showMapDrawer && (
        <div className="w-full overflow-hidden rounded-none border border-border/60 bg-card shadow-md transition-all duration-300 ">
          <div className="flex items-center justify-between border-b border-border/60 bg-surface/40 px-4 py-2.5  ">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink ">
              <MapIcon className="size-4 text-ink " />
              <span>Geospatial Dubai Heatmap & Property Pins</span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowMapDrawer(false)}
              className="size-7 text-muted-foreground hover:text-ink dark:text-stone-400"
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="h-105 w-full">
            <DubaiMap
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onSelectProperty={(p) => setSelectedProperty(p)}
            />
          </div>
        </div>
      )}

      {/* ── Integrated Lagom Executive Command Console ── */}
      <div className="shadow-subtle hover:shadow-floating border-border/60/40 space-y-5 rounded-none border bg-surface-subtle/70 p-6 backdrop-blur-md transition-all duration-300  ">
        {/* Main AI Semantic Search Bar */}
        <div className="relative flex w-full items-center">
          <div className="pointer-events-none absolute left-5 flex items-center gap-2 font-semibold text-ink ">
            <Sparkles className="size-4.5 animate-pulse text-ink " />
            <span className="hidden text-xs font-bold tracking-widest uppercase sm:inline">
              AI Search
            </span>
          </div>
          <input
            type="text"
            value={rawQuery}
            onChange={handleQueryChange}
            placeholder="Search properties, communities, or describe what you're looking for..."
            className="border-border/60/60 w-full rounded-none border bg-surface-subtle/90 px-12 py-4 text-sm font-medium text-ink shadow-2xs transition-all placeholder:text-stone-400 hover:border-stone-900/40 focus:border-stone-900 focus:bg-surface-subtle focus:ring-2 focus:ring-ink/10 focus:outline-none sm:pl-36   dark:text-stone-200 dark:placeholder:text-stone-600"
          />
          {rawQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 rounded-none p-1.5 text-muted-foreground transition-colors hover:bg-surface hover:text-ink  dark:text-stone-400"
              title="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
          {isSearching && (
             <div className="absolute right-12">
               <div className="size-5 animate-spin rounded-none border-2 border-stone-900 border-t-transparent  dark:border-t-transparent" />
             </div>
          )}
        </div>

        {/* Quick Natural Language Command Pills & Filters Bar */}
        <div className="flex flex-col gap-4 pt-1 lg:flex-row lg:items-center lg:justify-between">
          {/* Quick Command Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="mr-1 flex items-center gap-1.5 font-semibold text-muted-foreground dark:text-stone-400">
              <Sparkles className="size-3.5 animate-pulse text-ink " />{' '}
              Suggestions:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Yield > 7%')}
              className="border-border/60/20 bg-border/50/5 hover:bg-border/50/15 h-7 rounded-none px-3.5 text-xs font-semibold text-ink shadow-2xs transition-all   "
            >
              High Yield (&gt;7%)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Downtown Penthouse')}
              className="border-border/60/60 h-7 rounded-none bg-surface-subtle px-3.5 text-xs font-medium text-ink shadow-2xs transition-all hover:border-stone-900/40 hover:bg-border/50 hover:text-ink   "
            >
              Downtown Luxury
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Verified Trust 90+')}
              className="border-border/60/60 h-7 rounded-none bg-surface-subtle px-3.5 text-xs font-medium text-ink shadow-2xs transition-all hover:border-stone-900/40 hover:bg-border/50 hover:text-ink   "
            >
              Verified Trust (90+)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Under 10M')}
              className="border-border/60/60 h-7 rounded-none bg-surface-subtle px-3.5 text-xs font-medium text-ink shadow-2xs transition-all hover:border-stone-900/40 hover:bg-border/50 hover:text-ink   "
            >
              Under AED 10M
            </Button>
          </div>

          {/* Active Filter Toggles & Sort */}
          <div className="border-border/60/40 flex flex-wrap items-center justify-between gap-3 border-t pt-3 lg:border-t-0 lg:pt-0 ">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filters.community}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, community: e.target.value }))
                }
                className="-strong border-border/60/60 rounded-none border bg-surface-subtle px-3.5 py-1.5 text-xs font-semibold text-ink shadow-2xs transition-colors hover:border-border/60 focus:border-stone-900 focus:ring-2 focus:ring-ink/10 focus:outline-none   "
              >
                {COMMUNITY_LIST.map((comm) => (
                  <option key={comm} value={comm}>
                    {comm}
                  </option>
                ))}
              </select>

              {filters.beds !== undefined && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 rounded-none border border-stone-900/30 bg-border/50 px-3.5 py-1 text-xs font-semibold text-ink shadow-2xs   "
                >
                  <span>
                    {filters.beds === 0 ? 'Studio' : `${filters.beds}+ Beds`}
                  </span>
                  <button
                    onClick={() => removeFilter('beds')}
                    className="hover:text-ink "
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {filters.maxPrice !== undefined && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 rounded-none border border-stone-900/30 bg-border/50 px-3.5 py-1 text-xs font-semibold text-ink shadow-2xs   "
                >
                  <span>
                    Max AED {(filters.maxPrice / 1000000).toFixed(1)}M
                  </span>
                  <button
                    onClick={() => removeFilter('maxPrice')}
                    className="hover:text-ink "
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {(filters.community !== 'All Communities' ||
                filters.beds !== undefined ||
                filters.maxPrice !== undefined ||
                filters.minTrust ||
                rawQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="h-7 gap-1 text-xs font-medium text-muted-foreground hover:text-foreground dark:text-stone-400"
                >
                  <RotateCcw className="size-3" /> Reset All
                </Button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold text-muted-foreground sm:inline dark:text-stone-400">
                  Sort:
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as DiscoverFilters['sortBy'],
                    }))
                  }
                  className="-strong border-border/60/60 rounded-none border bg-surface-subtle px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs transition-colors hover:border-border/60 focus:border-stone-900 focus:ring-2 focus:ring-ink/10 focus:outline-none   "
                >
                  <option value="trust">Highest Trust Score</option>
                  <option value="roi">Highest Rental Yield (ROI)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Grid vs List View Mode */}
              <div className="border-border/60/60 flex items-center rounded-none border bg-surface/50 p-1 shadow-2xs  ">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex items-center gap-1 rounded-none p-1.5 text-xs font-semibold transition-all',
                    viewMode === 'grid'
                      ? 'border-border/60/40 border bg-surface-subtle font-bold text-ink shadow-2xs   '
                      : 'text-muted-foreground hover:text-ink dark:text-stone-400',
                  )}
                  title="Grid View"
                >
                  <LayoutGrid className="size-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'flex items-center gap-1 rounded-none p-1.5 text-xs font-medium transition-colors',
                    viewMode === 'list'
                      ? 'border-border/60/40 border bg-surface-subtle font-bold text-ink shadow-2xs   '
                      : 'text-muted-foreground hover:text-ink dark:text-stone-400',
                  )}
                  title="List View"
                >
                  <List className="size-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Full-Width Property Grid */}
      <div className="mt-2 min-h-125 w-full overflow-hidden">
        {filteredProperties.length === 0 ? (
          <Card className="border-border/60/80 flex h-80 w-full flex-col items-center justify-center border-dashed bg-surface-subtle/50 p-6 text-center  ">
            <Search className="mb-3 size-10 text-muted-foreground dark:text-stone-400" />
            <h3 className="font-display text-base font-bold text-ink ">
              No Verified Properties Found
            </h3>
            <p className="mt-1 mb-4 max-w-md text-xs text-muted-foreground dark:text-stone-400">
              We couldn&apos;t find any listings matching your AI search query.
              Try broadening your budget or community constraints.
            </p>
            <Button
              variant="primary"
              onClick={handleClearSearch}
              className="bg-ink font-semibold text-white shadow-2xs transition-colors hover:bg-ink dark:bg-border/50"
            >
              Reset All Filters
            </Button>
          </Card>
        ) : (
          <div
            className={cn(
              'grid w-full gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2',
            )}
          >
            {filteredProperties.map((prop) => (
              <ListingCard
                key={prop.id}
                property={prop}
                isSelected={selectedProperty?.id === prop.id}
                onSelect={(p) =>
                  setSelectedProperty(selectedProperty?.id === p.id ? null : p)
                }
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
