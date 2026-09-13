import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="description" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specs">Specs</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <p className="text-sm text-muted p-4">
          Ultra-soft oversized hoodie made from premium cotton blend.
        </p>
      </TabsContent>
      <TabsContent value="specs">
        <p className="text-sm text-muted p-4">80% Cotton, 20% Polyester. Machine washable.</p>
      </TabsContent>
      <TabsContent value="reviews">
        <p className="text-sm text-muted p-4">Customer reviews will appear here.</p>
      </TabsContent>
    </Tabs>
  ),
};
