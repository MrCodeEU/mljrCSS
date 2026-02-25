import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import SelectMenu from '../lib/components/forms/SelectMenu.svelte';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('SelectMenu', () => {
  describe('Rendering', () => {
    it('renders select menu element', async () => {
      const { container } = render(SelectMenu, { options });
      expect(container.querySelector('.mljr-select-menu')).toBeTruthy();
    });

    it('renders trigger button', async () => {
      const { container } = render(SelectMenu, { options });
      expect(container.querySelector('.mljr-select-menu-trigger')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(SelectMenu, { options, label: 'Choose option' });
      expect(container.querySelector('.mljr-select-menu-label')?.textContent).toContain('Choose option');
    });

    it('renders required marker when required=true', async () => {
      const { container } = render(SelectMenu, { options, label: 'Option', required: true });
      expect(container.querySelector('.mljr-select-menu-required')).toBeTruthy();
    });

    it('shows placeholder when no value selected', async () => {
      const { container } = render(SelectMenu, { options, placeholder: 'Pick one' });
      expect(container.querySelector('.mljr-select-menu-placeholder')?.textContent).toContain('Pick one');
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(SelectMenu, { options, disabled: true });
      expect(container.querySelector('.mljr-select-menu-disabled')).toBeTruthy();
    });
  });

  describe('Error state', () => {
    it('applies error class on trigger when error=true', async () => {
      const { container } = render(SelectMenu, { options, error: true });
      expect(container.querySelector('.mljr-select-menu-error')).toBeTruthy();
    });

    it('renders error message when errorMessage provided', async () => {
      const { container } = render(SelectMenu, { options, error: true, errorMessage: 'Required field' });
      expect(container.textContent).toContain('Required field');
    });
  });

  describe('Interaction', () => {
    it('opens dropdown on trigger click', async () => {
      const { container } = render(SelectMenu, { options });
      const trigger = container.querySelector('.mljr-select-menu-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-select-menu-open')).toBeTruthy();
    });

    it('calls onchange when option selected', async () => {
      const handleChange = vi.fn();
      const { container } = render(SelectMenu, { options, onchange: handleChange });
      const trigger = container.querySelector('.mljr-select-menu-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      const firstOption = container.querySelector('.mljr-select-menu-option') as HTMLElement;
      firstOption?.click();
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
