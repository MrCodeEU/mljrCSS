import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { fireEvent } from '@testing-library/svelte';
import ChipInput from '../lib/components/forms/ChipInput.svelte';

describe('ChipInput', () => {
  describe('Rendering', () => {
    it('renders chip input wrapper', async () => {
      const { container } = render(ChipInput);
      expect(container.querySelector('.chip-input-wrapper')).toBeTruthy();
    });

    it('renders input field', async () => {
      const { container } = render(ChipInput);
      expect(container.querySelector('.chip-input-field')).toBeTruthy();
    });

    it('renders existing chips from value', async () => {
      const { container } = render(ChipInput, { value: ['tag1', 'tag2'] });
      // The chips are rendered as span elements with mljr-chip class
      const chips = container.querySelectorAll('.mljr-chip');
      expect(chips.length).toBe(2);
    });

    it('renders label when provided', async () => {
      const { container } = render(ChipInput, { label: 'Tags' });
      const label = container.querySelector('.mljr-label');
      expect(label?.textContent).toContain('Tags');
    });

    it('renders helper text when provided', async () => {
      const { container } = render(ChipInput, { helperText: 'Press Enter to add' });
      const hint = container.querySelector('.mljr-input-hint');
      expect(hint?.textContent).toContain('Press Enter to add');
    });
  });

  describe('Adding Chips', () => {
    it('adds chip on Enter key', async () => {
      const handleChange = vi.fn();
      const { container } = render(ChipInput, { value: [], onChange: handleChange });
      const input = container.querySelector('.chip-input-field') as HTMLInputElement;

      fireEvent.input(input, { target: { value: 'newtag' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith(expect.arrayContaining(['newtag']));
    });

    it('adds chip on comma key', async () => {
      const handleChange = vi.fn();
      const { container } = render(ChipInput, { value: [], onChange: handleChange });
      const input = container.querySelector('.chip-input-field') as HTMLInputElement;

      fireEvent.input(input, { target: { value: 'tag1' } });
      fireEvent.keyDown(input, { key: ',' });

      expect(handleChange).toHaveBeenCalled();
    });

    it('does not add empty chips', async () => {
      const handleChange = vi.fn();
      const { container } = render(ChipInput, { value: [], onChange: handleChange });
      const input = container.querySelector('.chip-input-field') as HTMLInputElement;

      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Removing Chips', () => {
    it('renders remove button on each chip', async () => {
      const { container } = render(ChipInput, { value: ['tag1', 'tag2'] });
      const removeButtons = container.querySelectorAll('.mljr-chip-remove');
      expect(removeButtons.length).toBe(2);
    });

    it('removes chip when remove button clicked', async () => {
      const handleChange = vi.fn();
      const { container } = render(ChipInput, { value: ['tag1', 'tag2'], onChange: handleChange });
      const removeBtn = container.querySelector('.mljr-chip-remove') as HTMLElement;
      removeBtn?.click();
      expect(handleChange).toHaveBeenCalledWith(['tag2']);
    });

    it('removes last chip on Backspace when input is empty', async () => {
      const handleChange = vi.fn();
      const { container } = render(ChipInput, { value: ['tag1', 'tag2'], onChange: handleChange });
      const input = container.querySelector('.chip-input-field') as HTMLInputElement;

      fireEvent.keyDown(input, { key: 'Backspace' });

      expect(handleChange).toHaveBeenCalledWith(['tag1']);
    });
  });

  describe('Validation', () => {
    it('calls custom validate function', async () => {
      const validate = vi.fn().mockReturnValue(null);
      const { container } = render(ChipInput, { value: [], validate });
      const input = container.querySelector('.chip-input-field') as HTMLInputElement;

      fireEvent.input(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(validate).toHaveBeenCalledWith('test');
    });

    it('shows error message when error prop is set', async () => {
      const { container } = render(ChipInput, {
        error: true,
        errorMessage: 'Invalid value',
      });
      const errorText = container.querySelector('.mljr-input-error-text');
      expect(errorText).toBeTruthy();
      expect(errorText?.textContent).toContain('Invalid value');
    });
  });

  describe('Max Limit', () => {
    it('does not add chip beyond max limit', async () => {
      const handleChange = vi.fn();
      const { container } = render(ChipInput, {
        value: ['a', 'b', 'c'],
        max: 3,
        onChange: handleChange,
      });
      const input = container.querySelector('.chip-input-field');
      // Input should not be rendered when at max
      expect(input).toBeNull();
    });
  });

  describe('Disabled', () => {
    it('applies disabled styling', async () => {
      const { container } = render(ChipInput, { value: ['tag1'], disabled: true });
      expect(container.querySelector('.chip-input-disabled')).toBeTruthy();
    });

    it('hides remove buttons when disabled', async () => {
      const { container } = render(ChipInput, { value: ['tag1'], disabled: true });
      const removeBtn = container.querySelector('.mljr-chip-remove');
      expect(removeBtn).toBeNull();
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'primary', 'secondary', 'accent'] as const;
    variants.forEach((variant) => {
      it(`renders ${variant} chip variant`, async () => {
        const { container } = render(ChipInput, { value: ['tag1'], chipVariant: variant });
        const chip = container.querySelector('.mljr-chip');
        expect(chip).toBeTruthy();
      });
    });
  });

  describe('Error State', () => {
    it('applies error styling when error is true', async () => {
      const { container } = render(ChipInput, { error: true });
      expect(container.querySelector('.chip-input-error')).toBeTruthy();
    });

    it('shows errorMessage when provided', async () => {
      const { container } = render(ChipInput, { error: true, errorMessage: 'Field has an error' });
      const errorText = container.querySelector('.mljr-input-error-text');
      expect(errorText?.textContent).toContain('Field has an error');
    });
  });
});
