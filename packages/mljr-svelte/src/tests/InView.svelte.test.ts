import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import InView from '../lib/components/display/InView.svelte';

describe('InView', () => {
  describe('Rendering', () => {
    it('renders a wrapper div with base class', async () => {
      const { container } = render(InView, { animation: 'fade' } as any);
      expect(container.querySelector('.mljr-inview')).toBeTruthy();
    });
  });

  describe('Animation classes', () => {
    it('adds mljr-inview-fade class for fade animation', async () => {
      const { container } = render(InView, { animation: 'fade' } as any);
      expect(container.querySelector('.mljr-inview-fade')).toBeTruthy();
    });

    it('adds mljr-inview-slide-up class', async () => {
      const { container } = render(InView, { animation: 'slide-up' } as any);
      expect(container.querySelector('.mljr-inview-slide-up')).toBeTruthy();
    });

    it('adds mljr-inview-slide-down class', async () => {
      const { container } = render(InView, { animation: 'slide-down' } as any);
      expect(container.querySelector('.mljr-inview-slide-down')).toBeTruthy();
    });

    it('adds mljr-inview-slide-left class', async () => {
      const { container } = render(InView, { animation: 'slide-left' } as any);
      expect(container.querySelector('.mljr-inview-slide-left')).toBeTruthy();
    });

    it('adds mljr-inview-slide-right class', async () => {
      const { container } = render(InView, { animation: 'slide-right' } as any);
      expect(container.querySelector('.mljr-inview-slide-right')).toBeTruthy();
    });

    it('adds mljr-inview-scale class', async () => {
      const { container } = render(InView, { animation: 'scale' } as any);
      expect(container.querySelector('.mljr-inview-scale')).toBeTruthy();
    });

    it('adds mljr-inview-flip class', async () => {
      const { container } = render(InView, { animation: 'flip' } as any);
      expect(container.querySelector('.mljr-inview-flip')).toBeTruthy();
    });

    it('does not add animation class when animation="none"', async () => {
      const { container } = render(InView, { animation: 'none' } as any);
      const el = container.querySelector('.mljr-inview') as HTMLElement;
      // Only the base class should be present (plus visible once IO fires)
      expect(el.className.replace('mljr-inview-visible', '').trim()).toBe('mljr-inview');
    });

    it('applies custom class via class prop', async () => {
      const { container } = render(InView, { animation: 'fade', class: 'my-custom' } as any);
      expect(container.querySelector('.my-custom')).toBeTruthy();
    });
  });

  describe('CSS custom properties', () => {
    it('sets --mljr-inview-duration from duration prop', async () => {
      const { container } = render(InView, { animation: 'fade', duration: 900 } as any);
      const el = container.querySelector('.mljr-inview') as HTMLElement;
      expect(el.style.getPropertyValue('--mljr-inview-duration')).toBe('900ms');
    });

    it('sets --mljr-inview-delay from delay prop', async () => {
      const { container } = render(InView, { animation: 'fade', delay: 250 } as any);
      const el = container.querySelector('.mljr-inview') as HTMLElement;
      expect(el.style.getPropertyValue('--mljr-inview-delay')).toBe('250ms');
    });

    it('defaults to 600ms duration', async () => {
      const { container } = render(InView, { animation: 'fade' } as any);
      const el = container.querySelector('.mljr-inview') as HTMLElement;
      expect(el.style.getPropertyValue('--mljr-inview-duration')).toBe('600ms');
    });
  });

  describe('Visibility', () => {
    it('becomes visible when IntersectionObserver fires (element in viewport in test env)', async () => {
      const { container } = render(InView, { animation: 'fade' } as any);
      await new Promise((r) => setTimeout(r, 150));
      const el = container.querySelector('.mljr-inview') as HTMLElement;
      expect(el.classList.contains('mljr-inview-visible')).toBe(true);
    });
  });
});
