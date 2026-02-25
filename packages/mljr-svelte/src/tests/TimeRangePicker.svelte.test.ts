import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import TimeRangePicker from '../lib/components/forms/TimeRangePicker.svelte';

describe('TimeRangePicker', () => {
  describe('Rendering', () => {
    it('renders time range picker element', async () => {
      const { container } = render(TimeRangePicker);
      expect(container.querySelector('.mljr-time-range-picker')).toBeTruthy();
    });

    it('renders two time inputs', async () => {
      const { container } = render(TimeRangePicker);
      const inputs = container.querySelectorAll('.mljr-time-range-picker-input');
      expect(inputs.length).toBe(2);
    });

    it('renders label when provided', async () => {
      const { container } = render(TimeRangePicker, { label: 'Working Hours' });
      expect(container.querySelector('.mljr-time-range-picker-label')?.textContent).toContain('Working Hours');
    });

    it('renders required indicator when required=true', async () => {
      const { container } = render(TimeRangePicker, { label: 'Hours', required: true });
      expect(container.querySelector('.mljr-time-range-picker-required')).toBeTruthy();
    });

    it('renders separator between inputs', async () => {
      const { container } = render(TimeRangePicker);
      expect(container.querySelector('.mljr-time-range-picker-separator')).toBeTruthy();
    });
  });

  describe('Initial values', () => {
    it('sets start value in first input', async () => {
      const { container } = render(TimeRangePicker, { startValue: '09:00' });
      const inputs = container.querySelectorAll('.mljr-time-range-picker-input') as NodeListOf<HTMLInputElement>;
      expect(inputs[0].value).toBe('09:00');
    });

    it('sets end value in second input', async () => {
      const { container } = render(TimeRangePicker, { endValue: '17:30' });
      const inputs = container.querySelectorAll('.mljr-time-range-picker-input') as NodeListOf<HTMLInputElement>;
      expect(inputs[1].value).toBe('17:30');
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(TimeRangePicker, { disabled: true });
      expect(container.querySelector('.mljr-time-range-picker-disabled')).toBeTruthy();
    });
  });

  describe('Error state', () => {
    it('applies error class when error=true', async () => {
      const { container } = render(TimeRangePicker, { error: true });
      expect(container.querySelector('.mljr-time-range-picker-error')).toBeTruthy();
    });
  });

  describe('Callbacks', () => {
    it('calls onchange when time changes', async () => {
      const handleChange = vi.fn();
      render(TimeRangePicker, { startValue: '09:00', endValue: '17:00', onchange: handleChange });
    });
  });
});
