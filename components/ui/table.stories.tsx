import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Table>;

const sampleData = [
  {
    community: 'Dubai Marina',
    avgPrice: 'AED 2,450,000',
    yieldNet: '6.8%',
    status: 'High Growth',
  },
  {
    community: 'Downtown Dubai',
    avgPrice: 'AED 3,800,000',
    yieldNet: '5.4%',
    status: 'Prime Stable',
  },
  {
    community: 'Business Bay',
    avgPrice: 'AED 1,950,000',
    yieldNet: '7.1%',
    status: 'High Demand',
  },
  {
    community: 'Palm Jumeirah',
    avgPrice: 'AED 8,200,000',
    yieldNet: '4.9%',
    status: 'Ultra Luxury',
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Real Estate Performance Overview (Q3 2026)</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Community</TableHead>
          <TableHead>Avg Price</TableHead>
          <TableHead>NET Yield</TableHead>
          <TableHead>Market Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.community}>
            <TableCell className="font-medium">{row.community}</TableCell>
            <TableCell>{row.avgPrice}</TableCell>
            <TableCell>{row.yieldNet}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
