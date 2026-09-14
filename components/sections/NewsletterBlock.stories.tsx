import type { Meta, StoryObj } from '@storybook/react';

import { sampleNewsletter } from './homeSections.fixtures';
import { NewsletterBlock } from './NewsletterBlock';

/**
 * Interactive: type an invalid email to see the error state, a valid one to
 * see success, and the same email twice to see "already subscribed".
 */
const meta: Meta<typeof NewsletterBlock> = {
  title: 'Sections/NewsletterBlock',
  component: NewsletterBlock,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof NewsletterBlock>;

export const Default: Story = { args: { data: sampleNewsletter } };
