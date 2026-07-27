import { getTranslations } from 'next-intl/server';
import { PropertyWorkspaceClient } from '@/components/property/property-workspace-client';
import { MOCK_DISCOVER_PROPERTIES } from '@/lib/discover/mock-properties';

export default async function PropertyWorkspacePage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations('Property');

  // Look up property from our Discovery mock data layer
  const mockMatch = MOCK_DISCOVER_PROPERTIES.find((p) => p.id === id);

  const property = mockMatch
    ? {
        id: mockMatch.id,
        title: mockMatch.title,
        community: mockMatch.community,
        price: mockMatch.price,
        beds: mockMatch.beds,
        baths: mockMatch.baths,
        sqft: mockMatch.sqft,
        trustPassport: {
          healthScore: mockMatch.trustScore,
          evidenceScore: mockMatch.trustScore > 90 ? 100 : 88,
          riskScore: mockMatch.trustScore > 90 ? 4 : 12,
          freshnessScore: 92,
        },
      }
    : {
        id: id || 'prop-1',
        title: 'Sky Collection Penthouse',
        community: 'Downtown Dubai',
        price: 18500000,
        beds: 4,
        baths: 5,
        sqft: 4200,
        trustPassport: {
          healthScore: 94,
          evidenceScore: 100,
          riskScore: 5,
          freshnessScore: 90,
        },
      };

  return <PropertyWorkspaceClient property={property} locale={locale} />;
}
