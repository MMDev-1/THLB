import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Right: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Cart</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>Review your items before checkout.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-muted">Cart items will appear here.</p>
        </div>
        <DrawerFooter>
          <Button className="w-full">Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open Menu</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <nav className="flex-1 p-6 space-y-4">
          <p className="text-sm text-muted">Navigation links here.</p>
        </nav>
      </DrawerContent>
    </Drawer>
  ),
};
