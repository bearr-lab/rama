import type { Meta, StoryObj } from '@storybook/react';
import { DiscoverClient } from './discover-client';
import { ListingCard } from './listing-card';
import { MOCK_DISCOVER_PROPERTIES } from '@/lib/discover/mock-properties';

const meta: Meta<typeof DiscoverClient> = {
  title: 'Pages/Discover',
  component: DiscoverClient,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DiscoverClient>;

export const DefaultFullWidthView: Story = {
  render: () => <DiscoverClient locale="en" />,
};

export const SingleListingCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <ListingCard property={MOCK_DISCOVER_PROPERTIES[0]} locale="en" />
    </div>
  ),
};
