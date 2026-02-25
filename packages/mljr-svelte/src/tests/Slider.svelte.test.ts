import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Slider from '../lib/components/forms/Slider.svelte';

describe('Slider', () => {
  describe('Rendering', () => {
    it('renders slider element', async () => {
      const { container } = render(Slider);
      expect(container.querySelector('.mljr-slider')).toBeTruthy();
    });

    it('renders an input[type=range]', async () => {
      const { container } = render(Slider);
      const input = container.querySelector('input[type=range]');
      expect(input).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(Slider, { label: 'Volume' });
      expect(container.textContent).toContain('Volume');
    });
  });

  describe('Props', () => {
    it('sets value on the input', async () => {
      const { container } = render(Slider, { value: 60 });
      const input = container.querySelector('input[type=range]') as HTMLInputElement;
      expect(Number(input?.value)).toBe(60);
    });

    it('sets min attribute', async () => {
      const { container } = render(Slider, { min: 10 });
      const input = container.querySelector('input[type=range]');
      expect(input?.getAttribute('min')).toBe('10');
    });

    it('sets max attribute', async () => {
      const { container } = render(Slider, { max: 200 });
      const input = container.querySelector('input[type=range]');
      expect(input?.getAttribute('max')).toBe('200');
    });

    it('sets step attribute', async () => {
      const { container } = render(Slider, { step: 5 });
      const input = container.querySelector('input[type=range]');
      expect(input?.getAttribute('step')).toBe('5');
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Slider, { disabled: true });
      const input = container.querySelector('input[type=range]');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });

    it('applies disabled class', async () => {
      const { container } = render(Slider, { disabled: true });
      expect(container.querySelector('.mljr-slider-disabled')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Slider, { size: 'sm' });
      expect(container.querySelector('.mljr-slider-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Slider, { size: 'lg' });
      expect(container.querySelector('.mljr-slider-lg')).toBeTruthy();
    });
  });

  describe('Show value', () => {
    it('displays current value when showValue is true', async () => {
      const { container } = render(Slider, { value: 42, showValue: true });
      expect(container.textContent).toContain('42');
    });
  });
});
