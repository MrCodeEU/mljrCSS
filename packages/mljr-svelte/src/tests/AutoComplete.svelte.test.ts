import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import AutoComplete from '../lib/components/forms/AutoComplete.svelte';

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

describe('AutoComplete', () => {
  describe('Rendering', () => {
    it('renders the autocomplete container', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      expect(container.querySelector('.mljr-autocomplete')).toBeTruthy();
    });

    it('renders the input element', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      expect(container.querySelector('input[type="text"]')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(AutoComplete, { options: fruits, label: 'Pick a fruit' });
      const label = container.querySelector('label');
      expect(label?.textContent).toContain('Pick a fruit');
    });

    it('renders helper text when provided', async () => {
      const { container } = render(AutoComplete, {
        options: fruits,
        helperText: 'Start typing to filter',
      });
      expect(container.querySelector('.mljr-input-hint')?.textContent).toContain('Start typing to filter');
    });

    it('dropdown is not visible initially', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      expect(container.querySelector('.mljr-autocomplete-dropdown')).toBeNull();
    });
  });

  describe('Dropdown', () => {
    it('opens dropdown on focus', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      const input = container.querySelector('input[type="text"]') as HTMLElement;
      input.focus();
      await new Promise(r => setTimeout(r, 10));
      expect(container.querySelector('.mljr-autocomplete-dropdown')).toBeTruthy();
    });

    it('shows options in dropdown when opened', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      const input = container.querySelector('input[type="text"]') as HTMLElement;
      input.focus();
      await new Promise(r => setTimeout(r, 10));
      const options = container.querySelectorAll('.mljr-autocomplete-option');
      expect(options.length).toBeGreaterThan(0);
    });

    it('shows no-results message when no match', async () => {
      const { container } = render(AutoComplete, {
        options: fruits,
        value: '',
        noResultsText: 'Nothing found',
      });
      const input = container.querySelector('input[type="text"]') as HTMLInputElement;
      input.focus();
      await new Promise(r => setTimeout(r, 10));
      // Manually set an unmatched value
      input.value = 'zzzzz';
      input.dispatchEvent(new Event('input'));
      await new Promise(r => setTimeout(r, 10));
      expect(container.textContent).toContain('Nothing found');
    });
  });

  describe('Error State', () => {
    it('renders error message when error=true', async () => {
      const { container } = render(AutoComplete, {
        options: fruits,
        error: true,
        errorMessage: 'Required field',
      });
      expect(container.querySelector('.mljr-input-error-text')?.textContent).toContain('Required field');
    });
  });

  describe('Disabled', () => {
    it('disables the input', async () => {
      const { container } = render(AutoComplete, { options: fruits, disabled: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has combobox role on input', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      expect(container.querySelector('[role="combobox"]')).toBeTruthy();
    });

    it('input has aria-controls pointing to dropdown id', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      const input = container.querySelector('[role="combobox"]') as HTMLInputElement;
      expect(input.getAttribute('aria-controls')).toBeTruthy();
    });

    it('input has aria-expanded=false when closed', async () => {
      const { container } = render(AutoComplete, { options: fruits });
      const input = container.querySelector('[role="combobox"]') as HTMLInputElement;
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
