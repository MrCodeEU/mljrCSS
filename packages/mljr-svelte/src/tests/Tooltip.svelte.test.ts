import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Tooltip from '../lib/components/overlay/Tooltip.svelte';

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('renders tooltip wrapper', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip text',
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip')).toBeTruthy();
    });

    it('renders tooltip content element', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip text',
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip-content')).toBeTruthy();
    });

    it('shows tooltip text in content', async () => {
      const { container } = render(Tooltip, {
        content: 'Helpful text',
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip-content')?.textContent).toContain('Helpful text');
    });

    it('has role="tooltip" on content', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip text',
        children: (() => {}) as any,
      });
      expect(container.querySelector('[role="tooltip"]')).toBeTruthy();
    });
  });

  describe('Positions', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;
    positions.forEach((position) => {
      it(`applies ${position} position class`, async () => {
        const { container } = render(Tooltip, {
          content: 'Tooltip',
          position,
          children: (() => {}) as any,
        });
        expect(container.querySelector(`.mljr-tooltip-${position}`)).toBeTruthy();
      });
    });
  });

  describe('Variants', () => {
    it('applies secondary variant class', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip',
        variant: 'secondary',
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip-secondary')).toBeTruthy();
    });

    it('does not apply primary class (it is the default)', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip',
        variant: 'primary',
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip-primary')).toBeFalsy();
    });
  });

  describe('Visibility', () => {
    it('is initially hidden (no visible class)', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip',
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip-visible')).toBeFalsy();
    });

    it('tooltip content has aria-hidden initially', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip',
        children: (() => {}) as any,
      });
      const tooltipContent = container.querySelector('.mljr-tooltip-content');
      expect(tooltipContent?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Rich Content', () => {
    it('applies rich class when richContent is provided', async () => {
      const richContent = (() => {}) as any;
      const { container } = render(Tooltip, {
        richContent,
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip-rich')).toBeTruthy();
    });

    it('applies maxWidth style when provided', async () => {
      const { container } = render(Tooltip, {
        content: 'Tooltip',
        maxWidth: '300px',
        children: (() => {}) as any,
      });
      const tooltipContent = container.querySelector('.mljr-tooltip-content') as HTMLElement;
      expect(tooltipContent?.style.maxWidth).toBe('300px');
    });

    it('does not apply rich class when only content provided', async () => {
      const { container } = render(Tooltip, {
        content: 'Plain text',
        children: (() => {}) as any,
      });
      expect(container.querySelector('.mljr-tooltip-rich')).toBeFalsy();
    });
  });
});
