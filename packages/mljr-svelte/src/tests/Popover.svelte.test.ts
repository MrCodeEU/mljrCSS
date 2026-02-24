import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Popover from '../lib/components/overlay/Popover.svelte';

describe('Popover', () => {
  describe('Rendering', () => {
    it('renders popover element', async () => {
      const { container } = render(Popover, {
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-popover')).toBeTruthy();
    });

    it('renders trigger element', async () => {
      const { container } = render(Popover, {
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-popover-trigger')).toBeTruthy();
    });

    it('renders content element', async () => {
      const { container } = render(Popover, {
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-popover-content')).toBeTruthy();
    });
  });

  describe('Positions', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;
    positions.forEach((position) => {
      it(`applies ${position} position class`, async () => {
        const { container } = render(Popover, {
          children: (() => {}) as any,
          position,
        });
        expect(container.querySelector(`.mljr-popover-${position}`)).toBeTruthy();
      });
    });
  });

  describe('Title', () => {
    it('shows title in header when provided', async () => {
      const { container } = render(Popover, {
        children: (() => {}) as any,
        title: 'My Popover',
      });
      expect(container.querySelector('.mljr-popover-title')?.textContent).toContain('My Popover');
    });

    it('shows close button when showClose=true', async () => {
      const { container } = render(Popover, {
        children: (() => {}) as any,
        showClose: true,
      });
      expect(container.querySelector('.mljr-popover-close')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('click trigger opens popover when trigger=click', async () => {
      const { container } = render(Popover, {
        children: (() => {}) as any,
        trigger: 'click',
      });
      const trigger = container.querySelector('.mljr-popover-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-popover-open')).toBeTruthy();
    });
  });
});
