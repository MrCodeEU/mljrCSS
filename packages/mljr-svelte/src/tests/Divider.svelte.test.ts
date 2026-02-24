import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Divider from '../lib/components/display/Divider.svelte';

describe('Divider', () => {
  describe('Rendering', () => {
    it('renders divider element', async () => {
      const { container } = render(Divider);
      expect(container.querySelector('.mljr-divider')).toBeTruthy();
    });

    it('has horizontal role by default', async () => {
      const { container } = render(Divider);
      const divider = container.querySelector('.mljr-divider');
      expect(divider).toBeTruthy();
      expect(divider?.classList.contains('mljr-divider-vertical')).toBe(false);
    });
  });

  describe('Orientation', () => {
    it('applies vertical class', async () => {
      const { container } = render(Divider, { orientation: 'vertical' });
      expect(container.querySelector('.mljr-divider-vertical')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    // 'primary' is the default variant and does not add an extra class
    it('renders with primary variant (default, no extra class)', async () => {
      const { container } = render(Divider, { variant: 'primary' });
      expect(container.querySelector('.mljr-divider')).toBeTruthy();
      expect(container.querySelector('.mljr-divider-primary')).toBeFalsy();
    });

    const nonDefaultVariants = ['secondary', 'accent', 'subtle'] as const;

    nonDefaultVariants.forEach((variant) => {
      it(`applies ${variant} variant class`, async () => {
        const { container } = render(Divider, { variant });
        expect(container.querySelector(`.mljr-divider-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Styles', () => {
    it('applies dashed style', async () => {
      const { container } = render(Divider, { style: 'dashed' });
      expect(container.querySelector('.mljr-divider-dashed')).toBeTruthy();
    });

    it('applies solid style', async () => {
      const { container } = render(Divider, { style: 'solid' });
      expect(container.querySelector('.mljr-divider-solid')).toBeTruthy();
    });
  });

  describe('Thickness', () => {
    it('applies thin class', async () => {
      const { container } = render(Divider, { thickness: 'thin' });
      expect(container.querySelector('.mljr-divider-thin')).toBeTruthy();
    });

    it('applies thick class', async () => {
      const { container } = render(Divider, { thickness: 'thick' });
      expect(container.querySelector('.mljr-divider-thick')).toBeTruthy();
    });
  });

  describe('Spacing', () => {
    const spacings = ['sm', 'lg', 'xl'] as const;

    spacings.forEach((spacing) => {
      it(`applies ${spacing} spacing`, async () => {
        const { container } = render(Divider, { spacing });
        expect(container.querySelector(`.mljr-divider-${spacing}`)).toBeTruthy();
      });
    });
  });
});
