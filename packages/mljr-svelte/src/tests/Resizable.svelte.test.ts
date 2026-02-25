import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Resizable from '../lib/components/display/Resizable.svelte';

describe('Resizable', () => {
  describe('Rendering', () => {
    it('renders the resizable container', async () => {
      const { container } = render(Resizable, {});
      expect(container.querySelector('.mljr-resizable')).toBeTruthy();
    });

    it('renders two panels', async () => {
      const { container } = render(Resizable, {});
      const panels = container.querySelectorAll('.mljr-resizable-panel');
      expect(panels.length).toBe(2);
    });

    it('renders handle', async () => {
      const { container } = render(Resizable, {});
      expect(container.querySelector('.mljr-resizable-handle')).toBeTruthy();
    });

    it('applies horizontal handle class by default', async () => {
      const { container } = render(Resizable, {});
      expect(container.querySelector('.mljr-resizable-handle-horizontal')).toBeTruthy();
    });

    it('applies vertical handle class when direction=vertical', async () => {
      const { container } = render(Resizable, { direction: 'vertical' });
      expect(container.querySelector('.mljr-resizable-handle-vertical')).toBeTruthy();
    });

    it('applies vertical container class when direction=vertical', async () => {
      const { container } = render(Resizable, { direction: 'vertical' });
      expect(container.querySelector('.mljr-resizable-vertical')).toBeTruthy();
    });

    it('first panel width reflects initialSplit (horizontal)', async () => {
      const { container } = render(Resizable, { initialSplit: 30, direction: 'horizontal' });
      const panel = container.querySelectorAll('.mljr-resizable-panel')[0] as HTMLElement;
      expect(panel.style.width).toBe('30%');
    });

    it('first panel height reflects initialSplit (vertical)', async () => {
      const { container } = render(Resizable, { initialSplit: 70, direction: 'vertical' });
      const panel = container.querySelectorAll('.mljr-resizable-panel')[0] as HTMLElement;
      expect(panel.style.height).toBe('70%');
    });
  });

  describe('Accessibility', () => {
    it('handle has role="separator"', async () => {
      const { container } = render(Resizable, {});
      expect(container.querySelector('[role="separator"]')).toBeTruthy();
    });

    it('handle has aria-valuenow reflecting initialSplit', async () => {
      const { container } = render(Resizable, { initialSplit: 50 });
      const handle = container.querySelector('[role="separator"]');
      expect(handle?.getAttribute('aria-valuenow')).toBe('50');
    });

    it('handle has aria-valuemin reflecting minSize', async () => {
      const { container } = render(Resizable, { minSize: 15 });
      const handle = container.querySelector('[role="separator"]');
      expect(handle?.getAttribute('aria-valuemin')).toBe('15');
    });

    it('handle has aria-valuemax reflecting maxSize', async () => {
      const { container } = render(Resizable, { maxSize: 85 });
      const handle = container.querySelector('[role="separator"]');
      expect(handle?.getAttribute('aria-valuemax')).toBe('85');
    });

    it('handle has aria-orientation="horizontal" by default', async () => {
      const { container } = render(Resizable, {});
      const handle = container.querySelector('[role="separator"]');
      expect(handle?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('handle has aria-orientation="vertical" when direction=vertical', async () => {
      const { container } = render(Resizable, { direction: 'vertical' });
      const handle = container.querySelector('[role="separator"]');
      expect(handle?.getAttribute('aria-orientation')).toBe('vertical');
    });
  });

  describe('Keyboard interaction', () => {
    it('ArrowRight increases split and calls onresize (horizontal)', async () => {
      const onresize = vi.fn();
      const { container } = render(Resizable, { initialSplit: 50, minSize: 10, maxSize: 90, onresize });
      const handle = container.querySelector('[role="separator"]') as HTMLElement;
      handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      expect(onresize).toHaveBeenCalledOnce();
      const newSplit = onresize.mock.calls[0][0] as number;
      expect(newSplit).toBeGreaterThan(50);
    });

    it('ArrowLeft decreases split and calls onresize (horizontal)', async () => {
      const onresize = vi.fn();
      const { container } = render(Resizable, { initialSplit: 50, minSize: 10, maxSize: 90, onresize });
      const handle = container.querySelector('[role="separator"]') as HTMLElement;
      handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      expect(onresize).toHaveBeenCalledOnce();
      const newSplit = onresize.mock.calls[0][0] as number;
      expect(newSplit).toBeLessThan(50);
    });

    it('clamps split at minSize when ArrowLeft pushed below min', async () => {
      const onresize = vi.fn();
      const { container } = render(Resizable, { initialSplit: 12, minSize: 10, maxSize: 90, onresize });
      const handle = container.querySelector('[role="separator"]') as HTMLElement;
      // Step is 5; 12-5=7, which is below minSize=10; should clamp to 10
      handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      expect(onresize.mock.calls[0][0]).toBe(10);
    });

    it('clamps split at maxSize when ArrowRight pushed above max', async () => {
      const onresize = vi.fn();
      const { container } = render(Resizable, { initialSplit: 88, minSize: 10, maxSize: 90, onresize });
      const handle = container.querySelector('[role="separator"]') as HTMLElement;
      // Step is 5; 88+5=93, which is above maxSize=90; should clamp to 90
      handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      expect(onresize.mock.calls[0][0]).toBe(90);
    });
  });
});
