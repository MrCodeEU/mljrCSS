import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import DatePicker from '../lib/components/forms/DatePicker.svelte';

describe('DatePicker', () => {
  describe('Rendering', () => {
    it('renders datepicker element', async () => {
      const { container } = render(DatePicker);
      expect(container.querySelector('.mljr-datepicker')).toBeTruthy();
    });

    it('renders trigger button', async () => {
      const { container } = render(DatePicker);
      expect(container.querySelector('.mljr-datepicker-trigger')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(DatePicker, { label: 'Pick a date' });
      expect(container.querySelector('.mljr-datepicker-label')?.textContent).toContain('Pick a date');
    });

    it('shows placeholder text when no date selected', async () => {
      const { container } = render(DatePicker, { placeholder: 'Choose date' });
      expect(container.querySelector('.mljr-datepicker-value')?.textContent).toContain('Choose date');
    });

    it('shows formatted date when value is set', async () => {
      const date = new Date(2026, 0, 15); // Jan 15, 2026
      const { container } = render(DatePicker, { value: date });
      expect(container.querySelector('.mljr-datepicker-value')?.textContent).toBeTruthy();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(DatePicker, { disabled: true });
      expect(container.querySelector('.mljr-datepicker.is-disabled')).toBeTruthy();
    });

    it('trigger button is disabled when disabled=true', async () => {
      const { container } = render(DatePicker, { disabled: true });
      const trigger = container.querySelector('.mljr-datepicker-trigger') as HTMLButtonElement;
      expect(trigger?.disabled).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('opens picker on trigger click', async () => {
      const { container } = render(DatePicker);
      const trigger = container.querySelector('.mljr-datepicker-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-datepicker.is-open')).toBeTruthy();
    });
  });
});
