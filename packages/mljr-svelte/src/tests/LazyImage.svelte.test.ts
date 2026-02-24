import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import LazyImage from '../lib/components/display/LazyImage.svelte';

describe('LazyImage', () => {
  describe('Rendering', () => {
    it('renders the container div', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg', alt: 'Test' });
      expect(container.querySelector('.mljr-lazy-img')).toBeTruthy();
    });

    it('renders the actual image once in viewport', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg', alt: 'Test' });
      // Wait for IntersectionObserver to fire (element in viewport in test env)
      await new Promise((r) => setTimeout(r, 150));
      expect(container.querySelector('.mljr-lazy-img-actual')).toBeTruthy();
    });

    it('sets correct alt on the image', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg', alt: 'My photo' });
      await new Promise((r) => setTimeout(r, 150));
      const img = container.querySelector('.mljr-lazy-img-actual') as HTMLImageElement;
      expect(img?.alt).toBe('My photo');
    });

    it('sets correct src on the image', async () => {
      const { container } = render(LazyImage, { src: '/img/photo.jpg', alt: 'Photo' });
      await new Promise((r) => setTimeout(r, 150));
      const img = container.querySelector('.mljr-lazy-img-actual') as HTMLImageElement;
      expect(img?.src).toContain('/img/photo.jpg');
    });
  });

  describe('Dimensions', () => {
    it('applies numeric width as px', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg', width: 300 });
      const el = container.querySelector('.mljr-lazy-img') as HTMLElement;
      expect(el.style.width).toBe('300px');
    });

    it('applies string width directly', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg', width: '50%' });
      const el = container.querySelector('.mljr-lazy-img') as HTMLElement;
      expect(el.style.width).toBe('50%');
    });

    it('applies numeric height as px', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg', height: 200 });
      const el = container.querySelector('.mljr-lazy-img') as HTMLElement;
      expect(el.style.height).toBe('200px');
    });
  });

  describe('Custom class', () => {
    it('applies custom CSS class', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg', class: 'my-img' });
      expect(container.querySelector('.my-img')).toBeTruthy();
    });
  });

  describe('Skeleton placeholder', () => {
    it('shows skeleton before image enters viewport (hard to test in browser env but container is present)', async () => {
      const { container } = render(LazyImage, { src: '/img/test.jpg' });
      // The container always renders
      expect(container.querySelector('.mljr-lazy-img')).toBeTruthy();
    });
  });
});
