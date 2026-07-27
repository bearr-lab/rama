import type { Meta, StoryObj } from '@storybook/react';
import { Widget } from './widget';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const meta: Meta<typeof Widget> = {
  title: 'Composite/DashboardWidget',
  component: Widget,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Widget>;

export const DefaultWidget: Story = {
  args: {
    title: 'Market Overview',
    subtitle: 'Real-time key statistics across Dubai sectors',
    children: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-surface-subtle/30 p-3">
            <span className="text-xs text-muted-foreground">Total Volume</span>
            <p className="text-lg font-bold">AED 4.2B</p>
          </div>
          <div className="rounded-lg bg-surface-subtle/30 p-3">
            <span className="text-xs text-muted-foreground">Avg Yield</span>
            <p className="text-lg font-bold text-green-600">6.7%</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const WidgetWithTable: Story = {
  render: () => (
    <Widget
      title="Top Performing Communities"
      subtitle="Ranked by 12-month capital appreciation"
      action={
        <Button variant="outline" size="sm">
          Export Report
        </Button>
      }
      className="w-full max-w-2xl"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Yield</TableHead>
            <TableHead>YoY Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Dubai Creek Harbour</TableCell>
            <TableCell>6.9%</TableCell>
            <TableCell className="text-green-600">+14.2%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Jumeirah Village Circle
            </TableCell>
            <TableCell>7.4%</TableCell>
            <TableCell className="text-green-600">+11.8%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Widget>
  ),
};
