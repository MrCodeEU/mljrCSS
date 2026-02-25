import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import NumberInput from '../lib/components/forms/NumberInput.svelte';

describe('NumberInput', () => {
  describe('Rendering', () => {
    it('renders the container with mljr-number-input class', async () => {
      const { container } = render(NumberInput);
      expect(container.querySelector('.mljr-number-input')).toBeTruthy();
    });

    it('renders decrement and increment buttons', async () => {
      const { container } = render(NumberInput);
      expect(container.querySelector('.mljr-number-input-decrement')).toBeTruthy();
      expect(container.querySelector('.mljr-number-input-increment')).toBeTruthy();
    });

    it('renders the input field', async () => {
      const { container } = render(NumberInput);
      expect(container.querySelector('.mljr-number-input-field')).toBeTruthy();
    });

    it('shows initial value', async () => {
      const { container } = render(NumberInput, { value: 42 });
      const input = container.querySelector('.mljr-number-input-field') as HTMLInputElement;
      expect(input.value).toBe('42');
    });
  });

  describe('Size variants', () => {
    it('applies sm size class', async () => {
      const { container } = render(NumberInput, { size: 'sm' });
      expect(container.querySelector('.mljr-number-input-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(NumberInput, { size: 'lg' });
      expect(container.querySelector('.mljr-number-input-lg')).toBeTruthy();
    });

    it('md size has no extra size class', async () => {
      const { container } = render(NumberInput, { size: 'md' });
      expect(container.querySelector('.mljr-number-input-sm')).toBeNull();
      expect(container.querySelector('.mljr-number-input-lg')).toBeNull();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class', async () => {
      const { container } = render(NumberInput, { disabled: true });
      expect(container.querySelector('.mljr-number-input-disabled')).toBeTruthy();
    });

    it('disables the input when disabled', async () => {
      const { container } = render(NumberInput, { disabled: true });
      const input = container.querySelector('.mljr-number-input-field') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('Readonly state', () => {
    it('applies readonly class', async () => {
      const { container } = render(NumberInput, { readonly: true });
      expect(container.querySelector('.mljr-number-input-readonly')).toBeTruthy();
    });
  });

  describe('Min/Max constraints', () => {
    it('disables decrement button when value equals min', async () => {
      const { container } = render(NumberInput, { value: 0, min: 0 });
      const btn = container.querySelector('.mljr-number-input-decrement') as HTMLButtonElement;
      expect(btn.disabled).toBe(true);
    });

    it('disables increment button when value equals max', async () => {
      const { container } = render(NumberInput, { value: 100, max: 100 });
      const btn = container.querySelector('.mljr-number-input-increment') as HTMLButtonElement;
      expect(btn.disabled).toBe(true);
    });

    it('passes min attribute to input', async () => {
      const { container } = render(NumberInput, { min: 5 });
      const input = container.querySelector('.mljr-number-input-field') as HTMLInputElement;
      expect(input.min).toBe('5');
    });

    it('passes max attribute to input', async () => {
      const { container } = render(NumberInput, { max: 50 });
      const input = container.querySelector('.mljr-number-input-field') as HTMLInputElement;
      expect(input.max).toBe('50');
    });
  });

  describe('Placeholder', () => {
    it('shows custom placeholder', async () => {
      const { container } = render(NumberInput, { placeholder: '—' });
      const input = container.querySelector('.mljr-number-input-field') as HTMLInputElement;
      expect(input.placeholder).toBe('—');
    });
  });
});
