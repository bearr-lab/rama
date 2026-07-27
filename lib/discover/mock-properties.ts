export interface DiscoverProperty {
  id: string;
  title: string;
  community: string;
  developer: string;
  price: number; // in AED
  beds: number;
  baths: number;
  sqft: number;
  roi: number; // percentage
  trustScore: number; // 0-100
  evidenceScore: number; // 0-100
  riskScore: number; // 0-100
  coordinates: {
    lat: number;
    lng: number;
    // Map position percentages (0-100) for SVG overlay
    x: number;
    y: number;
  };
  imageUrl: string;
  tags: string[];
  isVerified: boolean;
}

export const MOCK_DISCOVER_PROPERTIES: DiscoverProperty[] = [
  {
    id: 'prop-1',
    title: 'Sky Collection Penthouse',
    community: 'Downtown Dubai',
    developer: 'Emaar Properties',
    price: 18500000,
    beds: 4,
    baths: 5,
    sqft: 4200,
    roi: 6.4,
    trustScore: 94,
    evidenceScore: 98,
    riskScore: 5,
    coordinates: { lat: 25.1972, lng: 55.2744, x: 55, y: 45 },
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tags: ['Burj Khalifa View', 'Private Pool', 'Duplex', 'Penthouse'],
    isVerified: true,
  },
  {
    id: 'prop-2',
    title: 'Marina Gate Residence 1',
    community: 'Dubai Marina',
    developer: 'Select Group',
    price: 3450000,
    beds: 2,
    baths: 3,
    sqft: 1450,
    roi: 7.2,
    trustScore: 91,
    evidenceScore: 95,
    riskScore: 8,
    coordinates: { lat: 25.0865, lng: 55.1458, x: 25, y: 70 },
    imageUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    tags: ['Waterfront', 'Full Marina View', 'High Floor', 'Tenanted'],
    isVerified: true,
  },
  {
    id: 'prop-3',
    title: 'Beachfront Signature Villa',
    community: 'Palm Jumeirah',
    developer: 'Nakheel',
    price: 42000000,
    beds: 6,
    baths: 7,
    sqft: 8500,
    roi: 5.1,
    trustScore: 88,
    evidenceScore: 90,
    riskScore: 12,
    coordinates: { lat: 25.1124, lng: 55.139, x: 22, y: 55 },
    imageUrl:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    tags: ['Private Beach', 'Frond K', 'Custom Built', 'Smart Home'],
    isVerified: true,
  },
  {
    id: 'prop-4',
    title: 'The Address Fountain Views',
    community: 'Downtown Dubai',
    developer: 'Emaar Properties',
    price: 5800000,
    beds: 3,
    baths: 4,
    sqft: 2100,
    roi: 6.8,
    trustScore: 96,
    evidenceScore: 100,
    riskScore: 3,
    coordinates: { lat: 25.195, lng: 55.278, x: 57, y: 46 },
    imageUrl:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    tags: ['Serviced', 'Fountain View', 'Sky Bridge Access', 'Vacant'],
    isVerified: true,
  },
  {
    id: 'prop-5',
    title: 'Dubai Hills Grove Mansion',
    community: 'Dubai Hills Estate',
    developer: 'Emaar Properties',
    price: 28000000,
    beds: 5,
    baths: 6,
    sqft: 7200,
    roi: 5.9,
    trustScore: 85,
    evidenceScore: 88,
    riskScore: 15,
    coordinates: { lat: 25.118, lng: 55.25, x: 48, y: 65 },
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tags: ['Golf Course View', 'Park Access', 'Modern Architecture'],
    isVerified: false,
  },
  {
    id: 'prop-6',
    title: 'Creek Horizon Tower A',
    community: 'Dubai Creek Harbour',
    developer: 'Emaar Properties',
    price: 2300000,
    beds: 1,
    baths: 2,
    sqft: 890,
    roi: 7.8,
    trustScore: 89,
    evidenceScore: 92,
    riskScore: 10,
    coordinates: { lat: 25.205, lng: 55.35, x: 75, y: 35 },
    imageUrl:
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80',
    tags: ['Creek View', 'High ROI', 'Investor Deal', 'Near Metro'],
    isVerified: true,
  },
  {
    id: 'prop-7',
    title: "One Za'abeel The Residences",
    community: "Za'abeel",
    developer: 'Ithra Dubai',
    price: 12500000,
    beds: 3,
    baths: 4,
    sqft: 3100,
    roi: 6.1,
    trustScore: 93,
    evidenceScore: 96,
    riskScore: 6,
    coordinates: { lat: 25.225, lng: 55.29, x: 60, y: 30 },
    imageUrl:
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
    tags: [
      'Iconic Architecture',
      'The Link Access',
      'Ultra Luxury',
      'Panoramic City View',
    ],
    isVerified: true,
  },
  {
    id: 'prop-8',
    title: 'Bluewaters Bay Apartment',
    community: 'Bluewaters Island',
    developer: 'Meraas',
    price: 6400000,
    beds: 2,
    baths: 3,
    sqft: 1650,
    roi: 6.5,
    trustScore: 90,
    evidenceScore: 94,
    riskScore: 9,
    coordinates: { lat: 25.078, lng: 55.122, x: 18, y: 75 },
    imageUrl:
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
    tags: ['Ain Dubai View', 'Island Living', 'Private Beach Club'],
    isVerified: true,
  },
  {
    id: 'prop-9',
    title: 'Executive Tower M',
    community: 'Business Bay',
    developer: 'Dubai Properties',
    price: 2100000,
    beds: 2,
    baths: 2,
    sqft: 1350,
    roi: 8.2,
    trustScore: 82,
    evidenceScore: 85,
    riskScore: 18,
    coordinates: { lat: 25.188, lng: 55.265, x: 53, y: 50 },
    imageUrl:
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80',
    tags: ['Near Metro', 'High Yield', 'Spacious Layout', 'Upgraded'],
    isVerified: false,
  },
  {
    id: 'prop-10',
    title: 'Port de La Mer La Rive',
    community: 'Jumeirah',
    developer: 'Meraas',
    price: 4900000,
    beds: 3,
    baths: 4,
    sqft: 1950,
    roi: 6.2,
    trustScore: 87,
    evidenceScore: 91,
    riskScore: 11,
    coordinates: { lat: 25.228, lng: 55.26, x: 52, y: 25 },
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tags: ['Marina Berth', 'Mediterranean Style', 'Private Beach', 'Low Rise'],
    isVerified: true,
  },
];

export const COMMUNITY_LIST = [
  'All Communities',
  'Downtown Dubai',
  'Dubai Marina',
  'Palm Jumeirah',
  'Dubai Hills Estate',
  'Dubai Creek Harbour',
  "Za'abeel",
  'Bluewaters Island',
  'Business Bay',
  'Jumeirah',
];
