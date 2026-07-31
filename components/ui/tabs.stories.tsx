import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-100">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="financials">Financials</TabsTrigger>
        <TabsTrigger value="escrow">Escrow</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4">
        Property overview details and location highlights.
      </TabsContent>
      <TabsContent value="financials" className="p-4">
        Estimated net yield: 6.8%. AED 18.25M valuation.
      </TabsContent>
      <TabsContent value="escrow" className="p-4">
        RERA Escrow Account #8992-1 Active.
      </TabsContent>
    </Tabs>
  ),
};
