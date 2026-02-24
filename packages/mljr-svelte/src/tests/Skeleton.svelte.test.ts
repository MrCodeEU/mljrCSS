import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Skeleton from '../lib/components/feedback/Skeleton.svelte';

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders skeleton element', async () => {
      const { container } = render(Skeleton);
      expect(container.querySelector('.mljr-skeleton')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants = ['text', 'title', 'avatar', 'card', 'button', 'image'] as const;

    variants.forEach((variant) => {
      it(`applies ${variant} variant`, async () => {
        const { container } = render(Skeleton, { variant });
        expect(container.querySelector(`.mljr-skeleton-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`applies ${size} size with text variant`, async () => {
        const { container } = render(Skeleton, { variant: 'text', size });
        expect(container.querySelector(`.mljr-skeleton-text-${size}`)).toBeTruthy();
      });
    });
  });

  describe('Modifiers', () => {
    it('applies pulse class', async () => {
      const { container } = render(Skeleton, { pulse: true });
      expect(container.querySelector('.mljr-skeleton-pulse')).toBeTruthy();
    });

    it('applies static class when static=true', async () => {
      const { container } = render(Skeleton, { static: true });
      expect(container.querySelector('.mljr-skeleton-static')).toBeTruthy();
    });

    it('applies circle class', async () => {
      const { container } = render(Skeleton, { circle: true });
      expect(container.querySelector('.mljr-skeleton-circle')).toBeTruthy();
    });

    it('applies secondary color class', async () => {
      const { container } = render(Skeleton, { color: 'secondary' });
      expect(container.querySelector('.mljr-skeleton-secondary')).toBeTruthy();
    });
  });

  describe('Custom dimensions', () => {
    it('applies custom width via inline style', async () => {
      const { container } = render(Skeleton, { width: '200px' });
      const el = container.querySelector('.mljr-skeleton') as HTMLElement;
      expect(el?.style.width).toBe('200px');
    });

    it('applies custom height via inline style', async () => {
      const { container } = render(Skeleton, { height: '50px' });
      const el = container.querySelector('.mljr-skeleton') as HTMLElement;
      expect(el?.style.height).toBe('50px');
    });
  });
});
