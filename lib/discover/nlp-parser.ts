import { DiscoverProperty, MOCK_DISCOVER_PROPERTIES } from './mock-properties';

export interface DiscoverFilters {
  queryText: string;
  community: string;
  beds?: number;
  maxPrice?: number;
  minTrust?: number;
  onlyVerified?: boolean;
  sortBy: 'trust' | 'price-asc' | 'price-desc' | 'roi';
}

export const INITIAL_FILTERS: DiscoverFilters = {
  queryText: '',
  community: 'All Communities',
  sortBy: 'trust',
};

/**
 * Hybrid NLP Parser (Epic 5.4)
 * Instantly extracts structured filters from natural language search queries.
 */
export function parseNaturalLanguageQuery(
  rawQuery: string,
  currentFilters: DiscoverFilters,
): DiscoverFilters {
  const text = rawQuery.toLowerCase().trim();
  const newFilters: DiscoverFilters = {
    ...currentFilters,
    queryText: rawQuery,
  };

  if (!text) {
    return { ...INITIAL_FILTERS, sortBy: currentFilters.sortBy };
  }

  // 1. Extract Community / Neighborhood
  const communityMap: Record<string, string> = {
    marina: 'Dubai Marina',
    downtown: 'Downtown Dubai',
    palm: 'Palm Jumeirah',
    hills: 'Dubai Hills Estate',
    creek: 'Dubai Creek Harbour',
    zaabeel: "Za'abeel",
    'business bay': 'Business Bay',
    bluewaters: 'Bluewaters Island',
    jumeirah: 'Jumeirah',
  };

  for (const [key, fullValue] of Object.entries(communityMap)) {
    if (text.includes(key)) {
      newFilters.community = fullValue;
      break;
    }
  }

  // 2. Extract Bedroom Count (e.g., "4 bed", "3br", "2 bedrooms", "studio")
  const bedMatch = text.match(/(\d+)\s*(?:bed|br|bedroom|beds|bedrooms)/i);
  if (bedMatch && bedMatch[1]) {
    newFilters.beds = parseInt(bedMatch[1], 10);
  } else if (text.includes('studio')) {
    newFilters.beds = 0;
  }

  // 3. Extract Max Price / Budget (e.g., "under 15m", "< 5 million", "below 10000000", "max 4.5m")
  const priceMatch =
    text.match(
      /(?:under|below|<|max|budget|up to)\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?/i,
    ) || text.match(/(\d+(?:\.\d+)?)\s*(m|million)\b/i);

  if (priceMatch && priceMatch[1]) {
    let val = parseFloat(priceMatch[1]);
    const multiplier = priceMatch[2]?.toLowerCase();
    if (multiplier === 'm' || multiplier === 'million' || val < 100) {
      val *= 1000000;
    } else if (multiplier === 'k' || multiplier === 'thousand') {
      val *= 1000;
    }
    newFilters.maxPrice = val;
  }

  // 4. Extract Trust & Verification constraints (e.g., "high trust", "verified", "safe", "no risk")
  if (
    text.includes('verified') ||
    text.includes('high trust') ||
    text.includes('safe') ||
    text.includes('high score')
  ) {
    newFilters.minTrust = 88;
    newFilters.onlyVerified = true;
  }

  // 5. Detect sorting preferences
  if (
    text.includes('high roi') ||
    text.includes('best yield') ||
    text.includes('highest roi') ||
    text.includes('investment')
  ) {
    newFilters.sortBy = 'roi';
  } else if (
    text.includes('cheapest') ||
    text.includes('lowest price') ||
    text.includes('affordable')
  ) {
    newFilters.sortBy = 'price-asc';
  } else if (
    text.includes('luxury') ||
    text.includes('most expensive') ||
    text.includes('highest price') ||
    text.includes('penthouse') ||
    text.includes('mansion')
  ) {
    newFilters.sortBy = 'price-desc';
  }

  return newFilters;
}

/**
 * Filter and sort properties based on structured DiscoverFilters
 */
export function filterProperties(
  properties: DiscoverProperty[],
  filters: DiscoverFilters,
): DiscoverProperty[] {
  return properties
    .filter((prop) => {
      // Community filter
      if (filters.community && filters.community !== 'All Communities') {
        if (prop.community !== filters.community) return false;
      }

      // Bedroom filter
      if (filters.beds !== undefined && prop.beds !== filters.beds) {
        // If filtering by 4+ beds, allow matching 4 or more
        if (!(filters.beds >= 4 && prop.beds >= 4)) {
          return false;
        }
      }

      // Price filter
      if (filters.maxPrice !== undefined && prop.price > filters.maxPrice) {
        return false;
      }

      // Trust score filter
      if (
        filters.minTrust !== undefined &&
        prop.trustScore < filters.minTrust
      ) {
        return false;
      }

      // Verified filter
      if (filters.onlyVerified && !prop.isVerified) {
        return false;
      }

      // Keyword / Tag matching if there is remaining query text that didn't match structured fields
      if (filters.queryText) {
        const q = filters.queryText.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesCommunity = prop.community.toLowerCase().includes(q);
        const matchesDeveloper = prop.developer.toLowerCase().includes(q);
        const matchesTags = prop.tags.some((t) => t.toLowerCase().includes(q));

        // We don't strictly reject if community/price matched, but if query contains specific tag keywords like "pool" or "beach", require it
        const specificKeywords = [
          'pool',
          'beach',
          'penthouse',
          'duplex',
          'waterfront',
          'golf',
          'serviced',
          'metro',
          'view',
        ];
        for (const kw of specificKeywords) {
          if (q.includes(kw)) {
            const hasKeyword =
              prop.title.toLowerCase().includes(kw) ||
              prop.tags.some((t) => t.toLowerCase().includes(kw));
            if (!hasKeyword) return false;
          }
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'roi':
          return b.roi - a.roi;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'trust':
        default:
          return b.trustScore - a.trustScore;
      }
    });
}
