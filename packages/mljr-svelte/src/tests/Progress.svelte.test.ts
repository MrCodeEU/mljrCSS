import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Progress from '../lib/components/feedback/Progress.svelte';

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders progress element', async () => {
      const { container } = render(Progress);
      expect(container.querySelector('.mljr-progress')).toBeTruthy();
    });

    it('renders progress bar', async () => {
      const { container } = render(Progress, { value: 50 });
      expect(container.querySelector('.mljr-progress-bar')).toBeTruthy();
    });

    it('sets aria-valuenow', async () => {
      const { container } = render(Progress, { value: 40 });
      const progress = container.querySelector('[aria-valuenow]');
      expect(progress?.getAttribute('aria-valuenow')).toBe('40');
    });

    it('sets aria-valuemax from max prop', async () => {
      const { container } = render(Progress, { value: 30, max: 200 });
      const progress = container.querySelector('[aria-valuemax]');
      expect(progress?.getAttribute('aria-valuemax')).toBe('200');
    });
  });

  describe('Variants', () => {
    // Note: primary is the default and does NOT add a variant class
    it('primary is default (no extra variant class)', async () => {
      const { container } = render(Progress, { variant: 'primary' });
      expect(container.querySelector('.mljr-progress')).toBeTruthy();
      expect(container.querySelector('.mljr-progress-primary')).toBeFalsy();
    });

    const nonPrimaryVariants = ['secondary', 'success', 'warning', 'error'] as const;

    nonPrimaryVariants.forEach((variant) => {
      it(`applies ${variant} variant`, async () => {
        const { container } = render(Progress, { variant });
        expect(container.querySelector(`.mljr-progress-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        const { container } = render(Progress, { size });
        expect(container.querySelector(`.mljr-progress-${size}`)).toBeTruthy();
      });
    });
  });

  describe('Modifiers', () => {
    it('applies indeterminate class', async () => {
      const { container } = render(Progress, { indeterminate: true });
      expect(container.querySelector('.mljr-progress-indeterminate')).toBeTruthy();
    });

    it('applies striped class', async () => {
      const { container } = render(Progress, { striped: true });
      expect(container.querySelector('.mljr-progress-striped')).toBeTruthy();
    });

    it('applies animated striped class', async () => {
      const { container } = render(Progress, { striped: true, animated: true });
      expect(container.querySelector('.mljr-progress-striped-animated')).toBeTruthy();
    });
  });

  describe('Label', () => {
    it('renders percentage label when showLabel is true', async () => {
      const { container } = render(Progress, { showLabel: true, value: 60 });
      // showLabel shows a percentage — check for the labeled container
      expect(container.querySelector('.mljr-progress-label')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has role="progressbar"', async () => {
      const { container } = render(Progress);
      expect(container.querySelector('[role="progressbar"]')).toBeTruthy();
    });

    it('has aria-valuemin=0', async () => {
      const { container } = render(Progress);
      expect(container.querySelector('[aria-valuemin="0"]')).toBeTruthy();
    });
  });
});
