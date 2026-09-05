import type { Meta, StoryObj } from '@storybook/react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
        <AccordionContent>
          Free shipping on all orders over $50. Standard delivery takes 3-5 business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns & Exchanges</AccordionTrigger>
        <AccordionContent>
          30-day return policy on all unworn items. Free returns on your first order.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="care">
        <AccordionTrigger>Care Instructions</AccordionTrigger>
        <AccordionContent>
          Machine wash cold, tumble dry low. Do not bleach or iron directly on print.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
