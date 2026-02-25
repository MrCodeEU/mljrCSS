import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Checkbox from '../lib/components/forms/Checkbox.svelte';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders checkbox element', async () => {
      const { container } = render(Checkbox);
      expect(container.querySelector('.mljr-checkbox')).toBeTruthy();
    });

    it('renders an input[type=checkbox]', async () => {
      const { container } = render(Checkbox);
      const input = container.querySelector('input');
      expect(input?.getAttribute('type')).toBe('checkbox');
    });

    it('renders label text', async () => {
      const { container } = render(Checkbox, { label: 'Accept terms' });
      expect(container.textContent).toContain('Accept terms');
    });
  });

  describe('States', () => {
    it('is checked when checked prop is true', async () => {
      const { container } = render(Checkbox, { checked: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.checked).toBe(true);
    });

    it('is unchecked by default', async () => {
      const { container } = render(Checkbox);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.checked).toBe(false);
    });

    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Checkbox, { disabled: true });
      expect(container.querySelector('input')?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Variants', () => {
    it('applies secondary class', async () => {
      const { container } = render(Checkbox, { secondary: true });
      expect(container.querySelector('.mljr-checkbox-secondary')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('fires change event on click', async () => {
      const handleChange = vi.fn();
      const { container } = render(Checkbox, { onchange: handleChange });
      const input = container.querySelector('input') as HTMLElement;
      input?.click();
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
