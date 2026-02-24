import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import RadialProgress from '../lib/components/feedback/RadialProgress.svelte';

describe('RadialProgress', () => {
  describe('Rendering', () => {
    it('renders radial progress element', async () => {
      const { container } = render(RadialProgress, { value: 50 });
      expect(container.querySelector('.mljr-radial-progress')).toBeTruthy();
    });

    it('renders SVG', async () => {
      const { container } = render(RadialProgress, { value: 50 });
      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('shows percentage label by default', async () => {
      const { container } = render(RadialProgress, { value: 75 });
      expect(container.textContent).toContain('75');
    });

    it('shows custom label when provided', async () => {
      const { container } = render(RadialProgress, { value: 50, label: 'Custom' });
      expect(container.textContent).toContain('Custom');
    });

    it('hides label when showLabel=false', async () => {
      const { container } = render(RadialProgress, { value: 50, showLabel: false });
      expect(container.querySelector('.mljr-radial-progress-label')).toBeFalsy();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        const { container } = render(RadialProgress, { value: 50, size });
        expect(container.querySelector(`.mljr-radial-progress-${size}`)).toBeTruthy();
      });
    });
  });

  describe('Variants', () => {
    const variants = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const;
    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, async () => {
        const { container } = render(RadialProgress, { value: 50, variant });
        expect(container.querySelector(`.mljr-radial-progress-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Value clamping', () => {
    it('clamps value to 100', async () => {
      const { container } = render(RadialProgress, { value: 150 });
      expect(container.textContent).toContain('100');
    });

    it('clamps value to 0', async () => {
      const { container } = render(RadialProgress, { value: -10 });
      expect(container.textContent).toContain('0');
    });
  });
});
