import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Spinner from '../lib/components/feedback/Spinner.svelte';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders spinner element', async () => {
      const { container } = render(Spinner);
      expect(container.querySelector('.mljr-spinner')).toBeTruthy();
    });

    it('applies ring variant by default', async () => {
      // Default variant is 'ring', not 'circle'
      const { container } = render(Spinner);
      expect(container.querySelector('.mljr-spinner-ring')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants = ['circle', 'ring', 'pulse', 'dots', 'bars', 'orbit'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, async () => {
        const { container } = render(Spinner, { variant });
        expect(container.querySelector(`.mljr-spinner-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        const { container } = render(Spinner, { size });
        expect(container.querySelector(`.mljr-spinner-${size}`)).toBeTruthy();
      });
    });
  });

  describe('Colors', () => {
    it('applies secondary color class', async () => {
      const { container } = render(Spinner, { color: 'secondary' });
      expect(container.querySelector('.mljr-spinner-secondary')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has role="status"', async () => {
      const { container } = render(Spinner);
      expect(container.querySelector('[role="status"]')).toBeTruthy();
    });

    it('renders aria label text', async () => {
      const { container } = render(Spinner, { label: 'Loading data' });
      expect(container.querySelector('.mljr-spinner-text')).toBeTruthy();
    });
  });
});
