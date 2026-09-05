import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Size Guide</ModalTitle>
          <ModalDescription>
            Find the perfect fit for your new hoodie.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4 text-sm text-muted">
          Size chart placeholder — real content will go here.
        </div>
        <ModalFooter>
          <Button variant="secondary">Close</Button>
          <Button>Got it</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
