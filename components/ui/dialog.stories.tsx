import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';
import { Button } from './button';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open Investment Calculator
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Investment Yield Analysis</DialogTitle>
          <DialogDescription>
            Calculate projected returns for off-plan properties in Downtown
            Dubai.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm font-medium">
          Estimated 5-Year Capital Gain:{' '}
          <span className="font-bold text-green-600">24.5%</span>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>
            Close
          </DialogClose>
          <Button variant="default">Save Portfolio Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
