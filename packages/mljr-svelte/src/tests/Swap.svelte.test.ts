import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Swap from '../lib/components/display/Swap.svelte';

describe('Swap', () => {
  describe('Rendering', () => {
    it('renders a button element', async () => {
      const { container } = render(Swap);
      expect(container.querySelector('button')).toBeTruthy();
    });

    it('applies mljr-swap class', async () => {
      const { container } = render(Swap);
      expect(container.querySelector('.mljr-swap')).toBeTruthy();
    });

    it('applies default rotate animation class', async () => {
      const { container } = render(Swap);
      expect(container.querySelector('.mljr-swap-rotate')).toBeTruthy();
    });

    it('applies flip animation class', async () => {
      const { container } = render(Swap, { animation: 'flip' });
      expect(container.querySelector('.mljr-swap-flip')).toBeTruthy();
    });

    it('applies fade animation class', async () => {
      const { container } = render(Swap, { animation: 'fade' });
      expect(container.querySelector('.mljr-swap-fade')).toBeTruthy();
    });

    it('applies none animation class', async () => {
      const { container } = render(Swap, { animation: 'none' });
      expect(container.querySelector('.mljr-swap-none')).toBeTruthy();
    });
  });

  describe('Active state', () => {
    it('does not have active class by default', async () => {
      const { container } = render(Swap);
      expect(container.querySelector('.mljr-swap-active')).toBeFalsy();
    });

    it('applies active class when active=true', async () => {
      const { container } = render(Swap, { active: true });
      expect(container.querySelector('.mljr-swap-active')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('calls onchange when clicked', async () => {
      const handleChange = vi.fn();
      const { container } = render(Swap, { onchange: handleChange });
      const btn = container.querySelector('button') as HTMLElement;
      btn?.click();
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles active state on click', async () => {
      const { container } = render(Swap, { active: false });
      const btn = container.querySelector('button') as HTMLElement;
      btn?.click();
      // Await microtask queue flush for Svelte 5 reactive updates
      await Promise.resolve();
      expect(container.querySelector('.mljr-swap-active')).toBeTruthy();
    });
  });
});
