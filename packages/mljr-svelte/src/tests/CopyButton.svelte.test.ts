import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import CopyButton from '../lib/components/layout/CopyButton.svelte';

describe('CopyButton', () => {
  describe('Rendering', () => {
    it('renders button element', async () => {
      const { container } = render(CopyButton, { text: 'Hello World' });
      expect(container.querySelector('button')).toBeTruthy();
    });

    it('applies mljr-btn class', async () => {
      const { container } = render(CopyButton, { text: 'Hello World' });
      expect(container.querySelector('.mljr-btn')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(CopyButton, { text: 'Hello', label: 'Copy' });
      expect(container.textContent).toContain('Copy');
    });

    it('has correct aria-label', async () => {
      const { container } = render(CopyButton, { text: 'Hello' });
      const btn = container.querySelector('button');
      expect(btn?.getAttribute('aria-label')).toBe('Copy to clipboard');
    });
  });

  describe('Variants', () => {
    it('applies primary variant class', async () => {
      const { container } = render(CopyButton, { text: 'Hello', variant: 'primary' });
      expect(container.querySelector('.mljr-btn-primary')).toBeTruthy();
    });

    it('applies ghost variant by default', async () => {
      const { container } = render(CopyButton, { text: 'Hello' });
      expect(container.querySelector('.mljr-btn-ghost')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(CopyButton, { text: 'Hello', size: 'sm' });
      expect(container.querySelector('.mljr-btn-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(CopyButton, { text: 'Hello', size: 'lg' });
      expect(container.querySelector('.mljr-btn-lg')).toBeTruthy();
    });
  });
});
