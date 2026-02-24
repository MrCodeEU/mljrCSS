import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Select from '../lib/components/forms/Select.svelte';

describe('Select', () => {
  describe('Rendering', () => {
    it('renders select element', async () => {
      const { container } = render(Select);
      expect(container.querySelector('.mljr-select')).toBeTruthy();
    });

    it('renders a <select> tag', async () => {
      const { container } = render(Select);
      expect(container.querySelector('select')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(Select, { label: 'Country' });
      expect(container.textContent).toContain('Country');
    });

    it('renders helper text', async () => {
      const { container } = render(Select, { helperText: 'Select your region' });
      expect(container.textContent).toContain('Select your region');
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Select, { size: 'sm' });
      expect(container.querySelector('.mljr-select-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Select, { size: 'lg' });
      expect(container.querySelector('.mljr-select-lg')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('applies error class', async () => {
      const { container } = render(Select, { error: true });
      expect(container.querySelector('.mljr-select-error')).toBeTruthy();
    });

    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Select, { disabled: true });
      expect(container.querySelector('select')?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Required', () => {
    it('marks label as required', async () => {
      const { container } = render(Select, { label: 'Role', required: true });
      expect(container.querySelector('.mljr-label-required')).toBeTruthy();
    });
  });
});
