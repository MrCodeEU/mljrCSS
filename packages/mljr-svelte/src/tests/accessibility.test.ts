import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../lib/components/Button.svelte';
import Alert from '../lib/components/Alert.svelte';
import Modal from '../lib/components/Modal.svelte';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  describe('Button', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(Button, {
        props: { children: () => 'Accessible Button' },
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible when disabled', async () => {
      const { container } = render(Button, {
        props: {
          disabled: true,
          children: () => 'Disabled Button',
        },
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Alert', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(Alert, {
        props: {
          title: 'Alert Title',
          children: () => 'Alert message',
        },
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible when dismissible', async () => {
      const { container } = render(Alert, {
        props: {
          title: 'Dismissible Alert',
          dismissible: true,
          children: () => 'Can be closed',
        },
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Modal', () => {
    it('should not have accessibility violations when open', async () => {
      const { container } = render(Modal, {
        props: {
          open: true,
          title: 'Modal Title',
          children: () => 'Modal content',
        },
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
