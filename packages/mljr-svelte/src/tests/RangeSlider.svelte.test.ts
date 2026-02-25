import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import RangeSlider from '../lib/components/forms/RangeSlider.svelte';

describe('RangeSlider', () => {
  describe('Rendering', () => {
    it('renders range slider element', async () => {
      const { container } = render(RangeSlider);
      expect(container.querySelector('.mljr-range-slider')).toBeTruthy();
    });

    it('renders two range inputs', async () => {
      const { container } = render(RangeSlider);
      const inputs = container.querySelectorAll('input[type="range"]');
      expect(inputs.length).toBe(2);
    });

    it('shows floating values by default', async () => {
      const { container } = render(RangeSlider, { showFloatingValue: true });
      expect(container.querySelector('.mljr-range-slider-floating')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(RangeSlider, { label: 'Price Range' });
      expect(container.textContent).toContain('Price Range');
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(RangeSlider, { size: 'sm' });
      expect(container.querySelector('.mljr-range-slider-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(RangeSlider, { size: 'lg' });
      expect(container.querySelector('.mljr-range-slider-lg')).toBeTruthy();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(RangeSlider, { disabled: true });
      expect(container.querySelector('.mljr-range-slider-disabled')).toBeTruthy();
    });

    it('inputs are disabled when disabled=true', async () => {
      const { container } = render(RangeSlider, { disabled: true });
      const inputs = container.querySelectorAll('input[type="range"]');
      inputs.forEach((input) => {
        expect((input as HTMLInputElement).disabled).toBe(true);
      });
    });
  });

  describe('Default values', () => {
    it('renders with default min/max values', async () => {
      const { container } = render(RangeSlider, { minValue: 20, maxValue: 80 });
      const inputs = container.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;
      expect(parseInt(inputs[0].value)).toBe(20);
      expect(parseInt(inputs[1].value)).toBe(80);
    });
  });
});
