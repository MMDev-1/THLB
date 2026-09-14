import type { Meta, StoryObj } from '@storybook/react';

import { sampleUGCTiles } from './homeSections.fixtures';
import { UGCGridView } from './UGCGridView';

const meta: Meta<typeof UGCGridView> = {
  title: 'Sections/UGCGrid',
  component: UGCGridView,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof UGCGridView>;

export const Default: Story = {
  args: {
    heading: 'Styled by you',
    instagramHandle: '@thehoodielb',
    instagramUrl: 'https://www.instagram.com/thehoodielb',
    tiles: sampleUGCTiles,
  },
};
