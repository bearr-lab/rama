import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-87.5">
      <CardHeader>
        <CardTitle>Property Insights</CardTitle>
        <CardDescription>Dubai Marina ROI and yield analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Average rental yield in Dubai Marina sits at 6.8% NET with strong
          capital appreciation over 3 years.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Explore Area</Button>
      </CardFooter>
    </Card>
  ),
};
