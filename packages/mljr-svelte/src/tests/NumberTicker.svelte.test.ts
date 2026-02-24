import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import NumberTicker from '../lib/components/display/NumberTicker.svelte';

describe('NumberTicker', () => {
  describe('Rendering', () => {
    it('renders the ticker element', async () => {
      const { container } = render(NumberTicker, { value: 42 });
      expect(container.querySelector('.mljr-number-ticker')).toBeTruthy();
    });

    it('renders the value span with formatted number', async () => {
      const { container } = render(NumberTicker, { value: 42, from: 42, duration: 0 });
      // from=value=42 means no animation; initial displayValue = from = 42
      const valueSpan = container.querySelector('.mljr-number-ticker-value');
      expect(valueSpan).toBeTruthy();
      expect(valueSpan?.textContent).toContain('42');
    });

    it('renders initial value from `from` prop before animation', async () => {
      // from=99 with value=0 — before any rAF ticks, displayValue should be 99
      const { container } = render(NumberTicker, { value: 0, from: 99 });
      const valueSpan = container.querySelector('.mljr-number-ticker-value');
      expect(valueSpan?.textContent).toContain('99');
    });

    it('renders prefix when provided', async () => {
      const { container } = render(NumberTicker, { value: 100, prefix: '$' });
      expect(container.querySelector('.mljr-number-ticker-prefix')?.textContent).toBe('$');
    });

    it('renders suffix when provided', async () => {
      const { container } = render(NumberTicker, { value: 50, suffix: '%' });
      expect(container.querySelector('.mljr-number-ticker-suffix')?.textContent).toBe('%');
    });

    it('does not render prefix span when not provided', async () => {
      const { container } = render(NumberTicker, { value: 10 });
      expect(container.querySelector('.mljr-number-ticker-prefix')).toBeFalsy();
    });

    it('does not render suffix span when not provided', async () => {
      const { container } = render(NumberTicker, { value: 10 });
      expect(container.querySelector('.mljr-number-ticker-suffix')).toBeFalsy();
    });

    it('formats value with decimals', async () => {
      // from=value=3.14 so no animation; decimals=2
      const { container } = render(NumberTicker, { value: 3.14, from: 3.14, decimals: 2 });
      const valueSpan = container.querySelector('.mljr-number-ticker-value');
      // Intl.NumberFormat formats 3.14 with 2 decimals — locale may vary but decimal separator present
      expect(valueSpan?.textContent).toMatch(/3[.,]14/);
    });

    it('formats integer without decimals by default', async () => {
      const { container } = render(NumberTicker, { value: 42, from: 42 });
      const valueSpan = container.querySelector('.mljr-number-ticker-value');
      expect(valueSpan?.textContent).not.toMatch(/[.,]\d/);
    });

    it('applies custom class to root element', async () => {
      const { container } = render(NumberTicker, { value: 1, class: 'my-ticker' });
      expect(container.querySelector('.my-ticker')).toBeTruthy();
    });
  });

  describe('Size classes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`applies size class mljr-number-ticker-${size}`, async () => {
        const { container } = render(NumberTicker, { value: 1, size });
        expect(container.querySelector(`.mljr-number-ticker-${size}`)).toBeTruthy();
      });
    });
  });

  describe('Color classes', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'error'] as const;

    colors.forEach((color) => {
      it(`applies color class mljr-number-ticker-${color}`, async () => {
        const { container } = render(NumberTicker, { value: 1, color });
        expect(container.querySelector(`.mljr-number-ticker-${color}`)).toBeTruthy();
      });
    });
  });

  describe('Accessibility', () => {
    it('has aria-live="polite" on live region', async () => {
      const { container } = render(NumberTicker, { value: 0 });
      expect(container.querySelector('[aria-live="polite"]')).toBeTruthy();
    });

    it('has aria-atomic="true" on live region', async () => {
      const { container } = render(NumberTicker, { value: 0 });
      expect(container.querySelector('[aria-atomic="true"]')).toBeTruthy();
    });

    it('value span is aria-hidden to avoid double-announcement', async () => {
      const { container } = render(NumberTicker, { value: 0 });
      const valueSpan = container.querySelector('.mljr-number-ticker-value');
      expect(valueSpan?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
