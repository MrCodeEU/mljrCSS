import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Radio from '../lib/components/forms/Radio.svelte';

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders radio element', async () => {
      const { container } = render(Radio);
      expect(container.querySelector('.mljr-radio')).toBeTruthy();
    });

    it('renders an input[type=radio]', async () => {
      const { container } = render(Radio);
      const input = container.querySelector('input');
      expect(input?.getAttribute('type')).toBe('radio');
    });

    it('renders label text', async () => {
      const { container } = render(Radio, { label: 'Option A' });
      expect(container.textContent).toContain('Option A');
    });
  });

  describe('States', () => {
    it('is checked when checked prop is true', async () => {
      const { container } = render(Radio, { checked: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.checked).toBe(true);
    });

    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Radio, { disabled: true });
      expect(container.querySelector('input')?.hasAttribute('disabled')).toBe(true);
    });

    it('applies error class', async () => {
      const { container } = render(Radio, { error: true });
      expect(container.querySelector('.mljr-radio-error')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Radio, { size: 'sm' });
      expect(container.querySelector('.mljr-radio-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Radio, { size: 'lg' });
      expect(container.querySelector('.mljr-radio-lg')).toBeTruthy();
    });
  });

  describe('Colors', () => {
    it('applies secondary color class', async () => {
      const { container } = render(Radio, { color: 'secondary' });
      expect(container.querySelector('.mljr-radio-secondary')).toBeTruthy();
    });

    it('applies accent color class', async () => {
      const { container } = render(Radio, { color: 'accent' });
      expect(container.querySelector('.mljr-radio-accent')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('fires change event when selected', async () => {
      const handleChange = vi.fn();
      // Use value different from default group ('') so clicking fires change
      const { container } = render(Radio, { value: 'optionA', onchange: handleChange });
      const input = container.querySelector('input') as HTMLElement;
      input?.click();
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
