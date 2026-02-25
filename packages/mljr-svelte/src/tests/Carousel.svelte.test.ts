import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Carousel from '../lib/components/display/Carousel.svelte';

// Helper snippet to render slides
const slides = {
  render() {
    return document.createTextNode('');
  },
};

describe('Carousel', () => {
  describe('Rendering', () => {
    it('renders carousel element', async () => {
      const { container } = render(Carousel, {
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-carousel')).toBeTruthy();
    });

    it('has correct role attributes', async () => {
      const { container } = render(Carousel, {
        children: (() => {}) as any,
      });
      const carousel = container.querySelector('.mljr-carousel');
      expect(carousel?.getAttribute('role')).toBe('region');
      expect(carousel?.getAttribute('aria-roledescription')).toBe('carousel');
    });

    it('applies fade variant class', async () => {
      const { container } = render(Carousel, {
        children: (() => {}) as any,
        variant: 'fade',
      });
      expect(container.querySelector('.mljr-carousel-fade')).toBeTruthy();
    });

    it('applies peek variant class', async () => {
      const { container } = render(Carousel, {
        children: (() => {}) as any,
        variant: 'peek',
      });
      expect(container.querySelector('.mljr-carousel-peek')).toBeTruthy();
    });

    it('renders inner list', async () => {
      const { container } = render(Carousel, {
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-carousel-inner')).toBeTruthy();
    });

    it('applies custom class', async () => {
      const { container } = render(Carousel, {
        children: (() => {}) as any,
        class: 'my-carousel',
      });
      expect(container.querySelector('.my-carousel')).toBeTruthy();
    });
  });
});
