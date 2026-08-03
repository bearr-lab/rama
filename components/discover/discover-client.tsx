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
    return filterProperties(MOCK_DISCOVER_PROPERTIES, filters);
  }, [filters]);

  // Calculate quick summary metrics
  const avgYield = React.useMemo(() => {
    if (!filteredProperties.length) return 0;
    const sum = filteredProperties.reduce((acc, p) => acc + p.roi, 0);
    return (sum / filteredProperties.length).toFixed(1);
  }, [filteredProperties]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      {/* Header & Stats Banner */}
      <header className="dark:border-border-strong/60 flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase dark:text-white">
            WORKSPACE · DISCOVERY ENGINE
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-fjord sm:text-4xl dark:text-white">
            Discover Dubai Real Estate
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted dark:text-muted/70">
            Universal semantic search paired with verified Trust Passports and
            live geospatial intelligence.
          </p>
        </div>

        {/* Executive Summary Metrics & Actions */}
        <div className="flex flex-row flex-wrap items-center gap-3">
          <div className="dark:border-border-strong/80 flex flex-row items-center gap-3.5 rounded-none border border-border/80 bg-surface px-4 py-2 text-xs shadow-2xs sm:gap-4 dark:bg-fjord">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-fjord dark:text-white">
                <NumberTicker value={filteredProperties.length} />
              </span>
              <span className="font-medium text-muted dark:text-muted/70">
                Listings
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-fjord dark:text-white">
                <NumberTicker
                  value={Number(avgYield)}
                  decimalPlaces={1}
                  suffix="%"
                />
              </span>
              <span className="font-medium text-muted dark:text-muted/70">
                Avg Yield
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 font-semibold text-fjord dark:text-white">
              <ShieldCheck className="size-4 shrink-0 text-fjord dark:text-white" />
              <AnimatedShinyText className="font-semibold text-fjord dark:text-white">
                {filters.onlyVerified ? 'Verified Only' : '100% DLD Passports'}
              </AnimatedShinyText>
            </div>
          </div>

          {/* Map Drawer Toggle Button */}
          <Button
            variant={showMapDrawer ? 'primary' : 'outline'}
            onClick={() => setShowMapDrawer(!showMapDrawer)}
            className={cn(
              'flex flex-row items-center gap-2 rounded-none font-semibold shadow-2xs transition-all',
              showMapDrawer
                ? 'border-transparent bg-fjord-hover text-white hover:bg-fjord-hover/80 dark:bg-surface-subtle'
                : 'dark:border-border-strong dark:border-border-strong/80 border-border/80 bg-surface text-fjord hover:border-border hover:bg-surface-subtle/50 dark:bg-fjord dark:text-white',
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
        <div className="dark:border-border-strong w-full overflow-hidden rounded-none border border-border bg-card shadow-md transition-all duration-300">
          <div className="bg-surface-subtle/50/40 dark:border-border-strong flex items-center justify-between border-b border-border px-4 py-2.5 dark:bg-fjord-hover/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-fjord dark:text-white">
              <MapIcon className="size-4 text-fjord dark:text-white" />
              <span>Geospatial Dubai Heatmap & Property Pins</span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowMapDrawer(false)}
              className="size-7 text-muted hover:text-fjord dark:text-muted/70"
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
      <div className="shadow-subtle hover:shadow-floating dark:border-border-strong/40 space-y-5 rounded-none border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all duration-300 dark:bg-fjord/70">
        {/* Main AI Semantic Search Bar */}
        <div className="relative flex w-full items-center">
          <div className="pointer-events-none absolute left-5 flex items-center gap-2 font-semibold text-fjord dark:text-white">
            <Sparkles className="size-4.5 animate-pulse text-fjord dark:text-white" />
            <span className="hidden text-xs font-bold tracking-widest uppercase sm:inline">
              AI Search
            </span>
          </div>
          <input
            type="text"
            value={rawQuery}
            onChange={handleQueryChange}
            placeholder='Try typing "4 bed penthouse in Marina under 15m with high trust"...'
            className="dark:border-border-strong/60 dark:text-muted/70/70 w-full rounded-none border border-border/60 bg-surface/90 px-12 py-4 text-sm font-medium text-fjord shadow-2xs transition-all placeholder:text-muted hover:border-fjord/40 focus:border-fjord focus:bg-surface focus:ring-2 focus:ring-fjord/10 focus:outline-none sm:pl-36 dark:bg-fjord/90"
          />
          {rawQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 rounded-none p-1.5 text-muted transition-colors hover:bg-surface-subtle/50 hover:text-fjord dark:bg-fjord-hover dark:text-muted/70"
              title="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Quick Natural Language Command Pills & Filters Bar */}
        <div className="flex flex-col gap-4 pt-1 lg:flex-row lg:items-center lg:justify-between">
          {/* Quick Command Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="mr-1 flex items-center gap-1.5 font-semibold text-muted dark:text-muted/70">
              <Sparkles className="size-3.5 animate-pulse text-fjord dark:text-white" />{' '}
              Suggestions:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Yield > 7%')}
              className="h-7 rounded-none border-border/20 bg-surface-subtle/5 px-3.5 text-xs font-semibold text-fjord shadow-2xs transition-all hover:bg-surface-subtle/15 dark:border-border/20 dark:bg-fjord-hover/10 dark:text-white"
            >
              High Yield (&gt;7%)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Downtown Penthouse')}
              className="dark:border-border-strong/60 h-7 rounded-none border-border/60 bg-surface px-3.5 text-xs font-medium text-fjord shadow-2xs transition-all hover:border-fjord/40 hover:bg-surface-subtle hover:text-fjord dark:bg-fjord-hover dark:text-white"
            >
              Downtown Luxury
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Verified Trust 90+')}
              className="dark:border-border-strong/60 h-7 rounded-none border-border/60 bg-surface px-3.5 text-xs font-medium text-fjord shadow-2xs transition-all hover:border-fjord/40 hover:bg-surface-subtle hover:text-fjord dark:bg-fjord-hover dark:text-white"
            >
              Verified Trust (90+)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Under 10M')}
              className="dark:border-border-strong/60 h-7 rounded-none border-border/60 bg-surface px-3.5 text-xs font-medium text-fjord shadow-2xs transition-all hover:border-fjord/40 hover:bg-surface-subtle hover:text-fjord dark:bg-fjord-hover dark:text-white"
            >
              Under AED 10M
            </Button>
          </div>

          {/* Active Filter Toggles & Sort */}
          <div className="dark:border-border-strong/40 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3 lg:border-t-0 lg:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filters.community}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, community: e.target.value }))
                }
                className="dark:border-border-strong dark:border-border-strong/60 rounded-none border border-border/60 bg-surface px-3.5 py-1.5 text-xs font-semibold text-fjord shadow-2xs transition-colors hover:border-border focus:border-fjord focus:ring-2 focus:ring-fjord/10 focus:outline-none dark:bg-fjord-hover dark:text-white"
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
                  className="dark:border-border/60/30 flex items-center gap-1.5 rounded-none border border-fjord/30 bg-surface-subtle px-3.5 py-1 text-xs font-semibold text-fjord shadow-2xs dark:bg-fjord-hover/80 dark:text-white"
                >
                  <span>
                    {filters.beds === 0 ? 'Studio' : `${filters.beds}+ Beds`}
                  </span>
                  <button
                    onClick={() => removeFilter('beds')}
                    className="hover:text-fjord dark:text-white"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {filters.maxPrice !== undefined && (
                <Badge
                  variant="secondary"
                  className="dark:border-border/60/30 flex items-center gap-1.5 rounded-none border border-fjord/30 bg-surface-subtle px-3.5 py-1 text-xs font-semibold text-fjord shadow-2xs dark:bg-fjord-hover/80 dark:text-white"
                >
                  <span>
                    Max AED {(filters.maxPrice / 1000000).toFixed(1)}M
                  </span>
                  <button
                    onClick={() => removeFilter('maxPrice')}
                    className="hover:text-fjord dark:text-white"
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
                  className="h-7 gap-1 text-xs font-medium text-muted hover:text-foreground dark:text-muted/70"
                >
                  <RotateCcw className="size-3" /> Reset All
                </Button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold text-muted sm:inline dark:text-muted/70">
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
                  className="dark:border-border-strong dark:border-border-strong/60 rounded-none border border-border/60 bg-surface px-3 py-1.5 text-xs font-semibold text-fjord shadow-2xs transition-colors hover:border-border focus:border-fjord focus:ring-2 focus:ring-fjord/10 focus:outline-none dark:bg-fjord-hover dark:text-white"
                >
                  <option value="trust">Highest Trust Score</option>
                  <option value="roi">Highest Rental Yield (ROI)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Grid vs List View Mode */}
              <div className="dark:border-border-strong/60 flex items-center rounded-none border border-border/60 bg-surface-subtle/50 p-1 shadow-2xs dark:bg-fjord-hover/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex items-center gap-1 rounded-none p-1.5 text-xs font-semibold transition-all',
                    viewMode === 'grid'
                      ? 'dark:border-border-strong/40 border border-border/40 bg-surface font-bold text-fjord shadow-2xs dark:bg-fjord dark:text-white'
                      : 'text-muted hover:text-fjord dark:text-muted/70',
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
                      ? 'dark:border-border-strong/40 border border-border/40 bg-surface font-bold text-fjord shadow-2xs dark:bg-fjord dark:text-white'
                      : 'text-muted hover:text-fjord dark:text-muted/70',
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
      <div className="mt-2 min-h-125 w-full">
        {filteredProperties.length === 0 ? (
          <Card className="dark:border-border-strong/80 flex h-80 w-full flex-col items-center justify-center border-dashed border-border/80 bg-surface/50 p-6 text-center dark:bg-fjord/50">
            <Search className="mb-3 size-10 text-muted dark:text-muted/70" />
            <h3 className="font-display text-base font-bold text-fjord dark:text-white">
              No Verified Properties Found
            </h3>
            <p className="mt-1 mb-4 max-w-md text-xs text-muted dark:text-muted/70">
              We couldn&apos;t find any listings matching your AI search query.
              Try broadening your budget or community constraints.
            </p>
            <Button
              variant="primary"
              onClick={handleClearSearch}
              className="bg-fjord-hover font-semibold text-white shadow-2xs transition-colors hover:bg-fjord-hover/80 dark:bg-surface-subtle"
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
