import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TimePicker from '../lib/components/forms/TimePicker.svelte';

describe('TimePicker', () => {
  describe('Rendering', () => {
    it('renders time picker element', async () => {
      const { container } = render(TimePicker);
      expect(container.querySelector('.mljr-time-picker')).toBeTruthy();
    });

    it('renders trigger button', async () => {
      const { container } = render(TimePicker);
      expect(container.querySelector('.mljr-time-picker-trigger')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(TimePicker, { label: 'Select Time' });
      expect(container.querySelector('.mljr-time-picker-label')?.textContent).toContain('Select Time');
    });

    it('renders required indicator when required=true', async () => {
      const { container } = render(TimePicker, { label: 'Time', required: true });
      expect(container.querySelector('.mljr-time-picker-required')).toBeTruthy();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(TimePicker, { disabled: true });
      expect(container.querySelector('.mljr-time-picker-disabled')).toBeTruthy();
    });

    it('trigger button is disabled when disabled=true', async () => {
      const { container } = render(TimePicker, { disabled: true });
      const trigger = container.querySelector('.mljr-time-picker-trigger') as HTMLButtonElement;
      expect(trigger?.disabled).toBe(true);
    });
  });

  describe('Error state', () => {
    it('applies error class on trigger when error=true', async () => {
      const { container } = render(TimePicker, { error: true });
      expect(container.querySelector('.mljr-time-picker-error')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('opens picker on trigger click', async () => {
      const { container } = render(TimePicker);
      const trigger = container.querySelector('.mljr-time-picker-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-time-picker-dropdown')).toBeTruthy();
    });
  });
});
