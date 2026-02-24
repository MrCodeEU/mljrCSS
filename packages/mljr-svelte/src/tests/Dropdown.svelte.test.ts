import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Dropdown from '../lib/components/overlay/Dropdown.svelte';

describe('Dropdown', () => {
  describe('Rendering', () => {
    it('renders dropdown element', async () => {
      const { container } = render(Dropdown, {
        trigger: (() => {}) as any,
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-dropdown')).toBeTruthy();
    });

    it('renders trigger element', async () => {
      const { container } = render(Dropdown, {
        trigger: (() => {}) as any,
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-dropdown-trigger')).toBeTruthy();
    });

    it('menu is not visible when closed', async () => {
      const { container } = render(Dropdown, {
        trigger: (() => {}) as any,
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-dropdown-menu')).toBeFalsy();
    });

    it('trigger has aria-expanded="false" when closed', async () => {
      const { container } = render(Dropdown, {
        trigger: (() => {}) as any,
        children: (() => {}) as any,
      });
      const trigger = container.querySelector('.mljr-dropdown-trigger');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Positions', () => {
    const positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'] as const;
    positions.forEach((position) => {
      it(`applies ${position} position class`, async () => {
        const { container } = render(Dropdown, {
          trigger: (() => {}) as any,
          children: (() => {}) as any,
          position,
        });
        expect(container.querySelector(`.mljr-dropdown-${position}`)).toBeTruthy();
      });
    });
  });

  describe('Interaction', () => {
    it('opens menu on trigger click', async () => {
      const { container } = render(Dropdown, {
        trigger: (() => {}) as any,
        children: (() => {}) as any,
      });
      const trigger = container.querySelector('.mljr-dropdown-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-dropdown-open')).toBeTruthy();
    });

    it('shows menu when open', async () => {
      const { container } = render(Dropdown, {
        trigger: (() => {}) as any,
        children: (() => {}) as any,
      });
      const trigger = container.querySelector('.mljr-dropdown-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-dropdown-menu')).toBeTruthy();
    });
  });
});
