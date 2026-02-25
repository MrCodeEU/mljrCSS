import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Mask from '../lib/components/display/Mask.svelte';

describe('Mask', () => {
  describe('Rendering', () => {
    it('renders mask element', async () => {
      const { container } = render(Mask);
      expect(container.querySelector('.mljr-mask')).toBeTruthy();
    });

    it('applies default circle shape class', async () => {
      const { container } = render(Mask);
      expect(container.querySelector('.mljr-mask-circle')).toBeTruthy();
    });

    it('applies custom class', async () => {
      const { container } = render(Mask, { class: 'my-mask' });
      expect(container.querySelector('.my-mask')).toBeTruthy();
    });
  });

  describe('Shapes', () => {
    const shapes = ['circle', 'squircle', 'hexagon', 'triangle', 'star', 'heart', 'pentagon', 'diamond', 'decagon'] as const;
    shapes.forEach((shape) => {
      it(`applies ${shape} shape class`, async () => {
        const { container } = render(Mask, { shape });
        expect(container.querySelector(`.mljr-mask-${shape}`)).toBeTruthy();
      });
    });
  });
});
