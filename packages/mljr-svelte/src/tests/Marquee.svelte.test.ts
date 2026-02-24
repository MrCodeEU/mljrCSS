import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Marquee from '../lib/components/display/Marquee.svelte';

const items = ['Svelte', 'TypeScript', 'TailwindCSS', 'Vite'];

describe('Marquee', () => {
  describe('Rendering', () => {
    it('renders marquee container', async () => {
      const { container } = render(Marquee, { items });
      expect(container.querySelector('.mljr-marquee')).toBeTruthy();
    });

    it('renders two content strips for seamless loop', async () => {
      const { container } = render(Marquee, { items });
      const strips = container.querySelectorAll('.mljr-marquee-content');
      expect(strips.length).toBe(2);
    });

    it('renders all items', async () => {
      const { container } = render(Marquee, { items });
      const marqueeItems = container.querySelectorAll('.mljr-marquee-item');
      // items appear twice (two strips)
      expect(marqueeItems.length).toBe(items.length * 2);
    });

    it('displays item text', async () => {
      const { container } = render(Marquee, { items });
      expect(container.textContent).toContain('Svelte');
      expect(container.textContent).toContain('TypeScript');
    });
  });

  describe('Variants', () => {
    it('applies reverse class', async () => {
      const { container } = render(Marquee, { items, reverse: true });
      expect(container.querySelector('.mljr-marquee-reverse')).toBeTruthy();
    });

    it('applies pause-on-hover class', async () => {
      const { container } = render(Marquee, { items, pauseOnHover: true });
      expect(container.querySelector('.mljr-marquee-pause')).toBeTruthy();
    });

    it('applies gradient class by default', async () => {
      const { container } = render(Marquee, { items });
      expect(container.querySelector('.mljr-marquee-gradient')).toBeTruthy();
    });

    it('omits gradient class when gradient=false', async () => {
      const { container } = render(Marquee, { items, gradient: false });
      expect(container.querySelector('.mljr-marquee-gradient')).toBeNull();
    });

    it('applies vertical class', async () => {
      const { container } = render(Marquee, { items, vertical: true });
      expect(container.querySelector('.mljr-marquee-vertical')).toBeTruthy();
    });
  });

  describe('Duration / Style', () => {
    it('sets custom duration via CSS custom property', async () => {
      const { container } = render(Marquee, { items, duration: 10 });
      const el = container.querySelector('.mljr-marquee') as HTMLElement;
      expect(el?.style.getPropertyValue('--mljr-marquee-duration')).toBe('10s');
    });

    it('sets custom gap via CSS custom property', async () => {
      const { container } = render(Marquee, { items, gap: '2rem' });
      const el = container.querySelector('.mljr-marquee') as HTMLElement;
      expect(el?.style.getPropertyValue('--mljr-marquee-gap')).toBe('2rem');
    });
  });

  describe('Accessibility', () => {
    it('has role="marquee" on container', async () => {
      const { container } = render(Marquee, { items });
      expect(container.querySelector('[role="marquee"]')).toBeTruthy();
    });

    it('second strip has aria-hidden', async () => {
      const { container } = render(Marquee, { items });
      const strips = container.querySelectorAll('.mljr-marquee-content');
      expect(strips[1]?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
