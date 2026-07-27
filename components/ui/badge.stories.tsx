import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Verified Property',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Escrow Tier 1',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'High Risk',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Downtown Dubai',
    variant: 'outline',
  },
};
