import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Switch from '../lib/components/forms/Switch.svelte';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders switch element', async () => {
      const { container } = render(Switch);
      expect(container.querySelector('.mljr-switch')).toBeTruthy();
    });

    it('renders a checkbox input underneath', async () => {
      const { container } = render(Switch);
      const input = container.querySelector('.mljr-switch-input, input[type=checkbox]');
      expect(input).toBeTruthy();
    });

    it('renders label text', async () => {
      const { container } = render(Switch, { label: 'Enable notifications' });
      expect(container.textContent).toContain('Enable notifications');
    });
  });

  describe('States', () => {
    it('is checked when checked prop is true', async () => {
      const { container } = render(Switch, { checked: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.checked).toBe(true);
    });

    it('is unchecked by default', async () => {
      const { container } = render(Switch);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.checked).toBe(false);
    });

    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Switch, { disabled: true });
      expect(container.querySelector('input')?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Variants', () => {
    it('applies secondary class', async () => {
      const { container } = render(Switch, { secondary: true });
      expect(container.querySelector('.mljr-switch-secondary')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('fires change event on toggle', async () => {
      const handleChange = vi.fn();
      const { container } = render(Switch, { onchange: handleChange });
      const input = container.querySelector('input') as HTMLElement;
      input?.click();
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
