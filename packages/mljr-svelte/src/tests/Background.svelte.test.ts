import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Background from '../lib/components/layout/Background.svelte';

describe('Background', () => {
  describe('Rendering', () => {
    it('renders background element', async () => {
      const { container } = render(Background);
      expect(container.querySelector('.mljr-background')).toBeTruthy();
    });

    it('renders pattern element inside', async () => {
      const { container } = render(Background);
      expect(container.querySelector('.mljr-background-pattern')).toBeTruthy();
    });

    it('applies fixed class when fixed=true (default)', async () => {
      const { container } = render(Background, { fixed: true });
      expect(container.querySelector('.mljr-background-fixed')).toBeTruthy();
    });

    it('applies relative class when fixed=false', async () => {
      const { container } = render(Background, { fixed: false });
      expect(container.querySelector('.mljr-background-relative')).toBeTruthy();
    });
  });

  describe('Patterns', () => {
    const patterns = ['crosses', 'dots', 'lines', 'none'] as const;
    patterns.forEach((pattern) => {
      it(`renders with ${pattern} pattern`, async () => {
        const { container } = render(Background, { pattern });
        expect(container.querySelector('.mljr-background')).toBeTruthy();
      });
    });
  });

  describe('Custom styles', () => {
    it('applies custom opacity via CSS variable', async () => {
      const { container } = render(Background, { opacity: 0.5 });
      const el = container.querySelector('.mljr-background') as HTMLElement;
      expect(el?.style.getPropertyValue('--pattern-opacity')).toBe('0.5');
    });

    it('applies custom size via CSS variable', async () => {
      const { container } = render(Background, { size: 64 });
      const el = container.querySelector('.mljr-background') as HTMLElement;
      expect(el?.style.getPropertyValue('--element-size')).toBe('64px');
    });
  });
});
