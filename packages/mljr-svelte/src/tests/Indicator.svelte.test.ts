import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Indicator from '../lib/components/display/Indicator.svelte';

describe('Indicator', () => {
  describe('Rendering', () => {
    it('renders indicator element', async () => {
      const { container } = render(Indicator);
      expect(container.querySelector('.mljr-indicator')).toBeTruthy();
    });

    it('renders indicator marker', async () => {
      const { container } = render(Indicator);
      expect(container.querySelector('.mljr-indicator-marker')).toBeTruthy();
    });

    it('applies default top-right position class', async () => {
      const { container } = render(Indicator);
      expect(container.querySelector('.mljr-indicator-top-right')).toBeTruthy();
    });
  });

  describe('Positions', () => {
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'] as const;
    positions.forEach((position) => {
      it(`applies ${position} position class`, async () => {
        const { container } = render(Indicator, { position });
        expect(container.querySelector(`.mljr-indicator-${position}`)).toBeTruthy();
      });
    });
  });

  describe('Colors', () => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;
    colors.forEach((color) => {
      it(`applies ${color} color class`, async () => {
        const { container } = render(Indicator, { color });
        expect(container.querySelector(`.mljr-indicator-${color}`)).toBeTruthy();
      });
    });
  });

  describe('Modes', () => {
    it('applies dot class when dot=true', async () => {
      const { container } = render(Indicator, { dot: true });
      expect(container.querySelector('.mljr-indicator-dot')).toBeTruthy();
    });

    it('applies ping class when ping=true', async () => {
      const { container } = render(Indicator, { ping: true });
      expect(container.querySelector('.mljr-indicator-ping')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        const { container } = render(Indicator, { size });
        expect(container.querySelector(`.mljr-indicator-${size}`)).toBeTruthy();
      });
    });
  });
});
