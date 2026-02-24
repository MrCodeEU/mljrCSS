import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ImageCompare from '../lib/components/display/ImageCompare.svelte';

describe('ImageCompare', () => {
  describe('Rendering', () => {
    it('renders the container', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
      });
      expect(container.querySelector('.mljr-img-compare')).toBeTruthy();
    });

    it('renders before and after sections', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
      });
      expect(container.querySelector('.mljr-img-compare-before')).toBeTruthy();
      expect(container.querySelector('.mljr-img-compare-after')).toBeTruthy();
    });

    it('renders the drag handle', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
      });
      expect(container.querySelector('.mljr-img-compare-handle')).toBeTruthy();
      expect(container.querySelector('.mljr-img-compare-knob')).toBeTruthy();
    });

    it('shows default labels', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
      });
      const labels = container.querySelectorAll('.mljr-img-compare-label');
      expect(labels.length).toBe(2);
      expect(container.textContent).toContain('Before');
      expect(container.textContent).toContain('After');
    });

    it('shows custom labels', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
        beforeLabel: 'Original',
        afterLabel: 'Edited',
      });
      expect(container.textContent).toContain('Original');
      expect(container.textContent).toContain('Edited');
    });

    it('hides labels when not provided', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
        beforeLabel: '',
        afterLabel: '',
      });
      expect(container.querySelector('.mljr-img-compare-label')).toBeFalsy();
    });
  });

  describe('Position', () => {
    it('sets initial position via CSS var', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
        initialPosition: 30,
      });
      const el = container.querySelector('.mljr-img-compare') as HTMLElement;
      expect(el.style.getPropertyValue('--mljr-compare-pos')).toBe('30%');
    });

    it('defaults to 50% position', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
      });
      const el = container.querySelector('.mljr-img-compare') as HTMLElement;
      expect(el.style.getPropertyValue('--mljr-compare-pos')).toBe('50%');
    });
  });

  describe('Vertical mode', () => {
    it('adds vertical class when vertical=true', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
        vertical: true,
      });
      expect(container.querySelector('.mljr-img-compare-vertical')).toBeTruthy();
    });

    it('does not add vertical class by default', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
      });
      expect(container.querySelector('.mljr-img-compare-vertical')).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('has slider role', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
      });
      expect(container.querySelector('[role="slider"]')).toBeTruthy();
    });

    it('has aria-valuenow attribute', async () => {
      const { container } = render(ImageCompare, {
        before: '/img/before.jpg',
        after: '/img/after.jpg',
        initialPosition: 75,
      });
      const slider = container.querySelector('[role="slider"]') as HTMLElement;
      expect(slider.getAttribute('aria-valuenow')).toBe('75');
    });
  });
});
