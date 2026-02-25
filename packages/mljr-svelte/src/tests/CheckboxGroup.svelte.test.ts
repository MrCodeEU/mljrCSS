import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import CheckboxGroup from '../lib/components/forms/CheckboxGroup.svelte';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('CheckboxGroup', () => {
  describe('Rendering', () => {
    it('renders checkboxes for each option', async () => {
      const { container } = render(CheckboxGroup, { options });
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBe(3);
    });

    it('renders option labels', async () => {
      const { container } = render(CheckboxGroup, { options });
      expect(container.textContent).toContain('Option A');
      expect(container.textContent).toContain('Option B');
    });

    it('renders group label when provided', async () => {
      const { container } = render(CheckboxGroup, { options, label: 'Pick options' });
      expect(container.textContent).toContain('Pick options');
    });

    it('renders select all checkbox when showSelectAll=true', async () => {
      const { container } = render(CheckboxGroup, { options, showSelectAll: true });
      expect(container.textContent).toContain('Select All');
    });
  });

  describe('Selection', () => {
    it('marks selected values as checked', async () => {
      const { container } = render(CheckboxGroup, { options, value: ['a', 'c'] });
      const checkboxes = container.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
      expect(checkboxes[0].checked).toBe(true);
      expect(checkboxes[1].checked).toBe(false);
      expect(checkboxes[2].checked).toBe(true);
    });
  });

  describe('Disabled state', () => {
    it('disables all checkboxes when disabled=true', async () => {
      const { container } = render(CheckboxGroup, { options, disabled: true });
      const checkboxes = container.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
      checkboxes.forEach((cb) => expect(cb.disabled).toBe(true));
    });

    it('disables individual option when option.disabled=true', async () => {
      const opts = [
        { value: 'a', label: 'A', disabled: true },
        { value: 'b', label: 'B' },
      ];
      const { container } = render(CheckboxGroup, { options: opts });
      const checkboxes = container.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
      expect(checkboxes[0].disabled).toBe(true);
      expect(checkboxes[1].disabled).toBe(false);
    });
  });

  describe('Layout', () => {
    it('applies horizontal direction class', async () => {
      const { container } = render(CheckboxGroup, { options, direction: 'horizontal' });
      expect(container.querySelector('.mljr-checkbox-group-horizontal')).toBeTruthy();
    });
  });
});
