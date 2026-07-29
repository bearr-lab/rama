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
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            WORKSPACE · DISCOVERY ENGINE
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Discover Dubai Real Estate
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            Universal semantic search paired with verified Trust Passports and live geospatial intelligence.
          </p>
        </div>

        {/* Executive Summary Metrics & Actions */}
        <div className="flex flex-row flex-wrap items-center gap-3">
          <div className="flex flex-row items-center gap-3.5 rounded-xl border border-border/80 bg-surface px-4 py-2 text-xs shadow-2xs sm:gap-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-ink">
                <NumberTicker value={filteredProperties.length} />
              </span>
              <span className="font-medium text-muted">Listings</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-emerald-600 dark:text-emerald-400">
                <NumberTicker value={Number(avgYield)} decimalPlaces={1} suffix="%" />
              </span>
              <span className="font-medium text-muted">Avg Yield</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <ShieldCheck className="size-4 shrink-0 text-emerald-500" />
              <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
                {filters.onlyVerified ? 'Verified Only' : '100% DLD Passports'}
              </AnimatedShinyText>
            </div>
          </div>

          {/* Map Drawer Toggle Button */}
          <Button
            variant={showMapDrawer ? 'default' : 'outline'}
            onClick={() => setShowMapDrawer(!showMapDrawer)}
            className={cn(
              'flex flex-row items-center gap-2 rounded-xl font-semibold shadow-2xs transition-all',
              showMapDrawer
                ? 'border-transparent bg-fjord text-white hover:bg-fjord-hover'
                : 'hover:border-border-strong border-border/80 bg-surface text-ink hover:bg-surface-subtle',
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
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300">
          <div className="flex items-center justify-between border-b border-border bg-surface-subtle/40 px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <MapIcon className="size-4 text-fjord" />
              <span>Geospatial Dubai Heatmap & Property Pins</span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowMapDrawer(false)}
              className="size-7 text-muted hover:text-ink"
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
      <div className="shadow-subtle hover:shadow-floating space-y-5 rounded-3xl border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all duration-300">
        {/* Main AI Semantic Search Bar */}
        <div className="relative flex w-full items-center">
          <div className="pointer-events-none absolute left-5 flex items-center gap-2 font-semibold text-fjord">
            <Sparkles className="size-4.5 animate-pulse text-fjord" />
            <span className="hidden text-xs font-bold tracking-widest uppercase sm:inline">
              AI Search
            </span>
          </div>
          <input
            type="text"
            value={rawQuery}
            onChange={handleQueryChange}
            placeholder='Try typing "4 bed penthouse in Marina under 15m with high trust"...'
            className="w-full rounded-2xl border border-border/60 bg-surface/90 px-12 py-4 text-sm font-medium text-ink shadow-2xs transition-all placeholder:text-muted-foreground/70 hover:border-fjord/40 focus:border-fjord focus:bg-surface focus:ring-2 focus:ring-fjord/10 focus:outline-none sm:pl-36"
          />
          {rawQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-ink"
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
            <span className="mr-1 flex items-center gap-1.5 font-semibold text-muted-foreground">
              <Sparkles className="size-3.5 animate-pulse text-fjord" /> Suggestions:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Yield > 7%')}
              className="h-7 rounded-full border-emerald-500/20 bg-emerald-500/5 px-3.5 text-xs font-semibold text-emerald-600 shadow-2xs transition-all hover:bg-emerald-500/15 dark:text-emerald-400"
            >
              High Yield (&gt;7%)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Downtown Penthouse')}
              className="h-7 rounded-full border-border/60 bg-surface px-3.5 text-xs font-medium text-ink shadow-2xs transition-all hover:border-fjord/40 hover:bg-fjord-soft/40 hover:text-fjord"
            >
              Downtown Luxury
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Verified Trust 90+')}
              className="h-7 rounded-full border-border/60 bg-surface px-3.5 text-xs font-medium text-ink shadow-2xs transition-all hover:border-fjord/40 hover:bg-fjord-soft/40 hover:text-fjord"
            >
              Verified Trust (90+)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyQuickChip('Under 10M')}
              className="h-7 rounded-full border-border/60 bg-surface px-3.5 text-xs font-medium text-ink shadow-2xs transition-all hover:border-fjord/40 hover:bg-fjord-soft/40 hover:text-fjord"
            >
              Under AED 10M
            </Button>
          </div>

          {/* Active Filter Toggles & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3 lg:border-t-0 lg:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filters.community}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, community: e.target.value }))
                }
                className="hover:border-border-strong rounded-xl border border-border/60 bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink shadow-2xs transition-colors focus:border-fjord focus:ring-2 focus:ring-fjord/10 focus:outline-none"
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
                  className="flex items-center gap-1.5 rounded-full border border-fjord/30 bg-fjord-soft px-3.5 py-1 text-xs font-semibold text-fjord shadow-2xs"
                >
                  <span>
                    {filters.beds === 0 ? 'Studio' : `${filters.beds}+ Beds`}
                  </span>
                  <button
                    onClick={() => removeFilter('beds')}
                    className="hover:text-ink"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {filters.maxPrice !== undefined && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 rounded-full border border-fjord/30 bg-fjord-soft px-3.5 py-1 text-xs font-semibold text-fjord shadow-2xs"
                >
                  <span>Max AED {(filters.maxPrice / 1000000).toFixed(1)}M</span>
                  <button
                    onClick={() => removeFilter('maxPrice')}
                    className="hover:text-ink"
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
                  className="h-7 gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-3" /> Reset All
                </Button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold text-muted-foreground sm:inline">
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
                  className="hover:border-border-strong rounded-xl border border-border/60 bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs transition-colors focus:border-fjord focus:ring-2 focus:ring-fjord/10 focus:outline-none"
                >
                  <option value="trust">Highest Trust Score</option>
                  <option value="roi">Highest Rental Yield (ROI)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Grid vs List View Mode */}
              <div className="flex items-center rounded-xl border border-border/60 bg-surface-subtle/50 p-1 shadow-2xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex items-center gap-1 rounded-lg p-1.5 text-xs font-semibold transition-all',
                    viewMode === 'grid'
                      ? 'border border-border/40 bg-surface font-bold text-ink shadow-2xs'
                      : 'text-muted-foreground hover:text-ink',
                )}
                title="Grid View"
              >
                <LayoutGrid className="size-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center gap-1 rounded-md p-1.5 text-xs font-medium transition-colors',
                  viewMode === 'list'
                    ? 'border border-border/40 bg-surface font-bold text-ink shadow-2xs'
                    : 'text-muted hover:text-ink',
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
          <Card className="flex h-80 w-full flex-col items-center justify-center border-dashed border-border/80 bg-surface/50 p-6 text-center">
            <Search className="mb-3 size-10 text-muted" />
            <h3 className="font-display text-base font-bold text-ink">
              No Verified Properties Found
            </h3>
            <p className="mt-1 mb-4 max-w-md text-xs text-muted">
              We couldn&apos;t find any listings matching your AI search query. Try
              broadening your budget or community constraints.
            </p>
            <Button
              variant="default"
              onClick={handleClearSearch}
              className="bg-fjord font-semibold text-white shadow-2xs transition-colors hover:bg-fjord-hover"
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
