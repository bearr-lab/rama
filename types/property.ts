/** Property listing from the database */
export interface Property {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  price: number;
  price_verified: boolean;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  community: string;
  sub_community: string | null;
  property_type: PropertyType;
  tenure: Tenure;
  developer: string | null;
  completion_date: string | null;
  service_charge_aed: number | null;
  images: string[];
  thumbnail: string | null;
  latitude: number | null;
  longitude: number | null;
  features: string[];
  amenities: string[];
  verification_status: VerificationStatus;
  verification_source: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type PropertyType = 'apartment' | 'villa' | 'townhouse' | 'penthouse';

export type Tenure = 'ready' | 'off_plan';

export type VerificationStatus = 'verified' | 'review' | 'unknown';

/** Community / area */
export interface Community {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image: string | null;
  property_count: number;
  avg_price: number | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}

/** Search / filter state */
export interface SearchFilters {
  query?: string;
  property_type?: PropertyType[];
  tenure?: Tenure[];
  min_price?: number;
  max_price?: number;
  bedrooms?: number[];
  community?: string[];
  verification_status?: VerificationStatus[];
  sort_by?: SortOption;
}

export type SortOption =
  'price_asc' | 'price_desc' | 'newest' | 'featured' | 'area_asc' | 'area_desc';

/** Shortlist entry */
export interface ShortlistEntry {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: Property;
}
