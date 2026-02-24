import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import RadioGroup from '../lib/components/forms/RadioGroup.svelte';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('renders radio buttons for each option', async () => {
      const { container } = render(RadioGroup, { options, name: 'test-group' });
      const radios = container.querySelectorAll('input[type="radio"]');
      expect(radios.length).toBe(3);
    });

    it('renders option labels', async () => {
      const { container } = render(RadioGroup, { options, name: 'test-group' });
      expect(container.textContent).toContain('Option A');
      expect(container.textContent).toContain('Option B');
    });

    it('renders group label when provided', async () => {
      const { container } = render(RadioGroup, { options, name: 'test-group', label: 'Choose one' });
      expect(container.textContent).toContain('Choose one');
    });

    it('all radios share the same name', async () => {
      const { container } = render(RadioGroup, { options, name: 'my-group' });
      const radios = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      radios.forEach((radio) => expect(radio.name).toBe('my-group'));
    });
  });

  describe('Selection', () => {
    it('marks selected value as checked', async () => {
      const { container } = render(RadioGroup, { options, name: 'test', value: 'b' });
      const radios = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(radios[2].checked).toBe(false);
    });
  });

  describe('Error state', () => {
    it('shows error message when error and errorMessage are set', async () => {
      const { container } = render(RadioGroup, {
        options,
        name: 'test',
        error: true,
        errorMessage: 'Please select an option',
      });
      expect(container.textContent).toContain('Please select an option');
    });
  });

  describe('Disabled state', () => {
    it('disables all radios when disabled=true', async () => {
      const { container } = render(RadioGroup, { options, name: 'test', disabled: true });
      const radios = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      radios.forEach((radio) => expect(radio.disabled).toBe(true));
    });
  });

  describe('Layout', () => {
    it('applies horizontal direction class', async () => {
      const { container } = render(RadioGroup, { options, name: 'test', direction: 'horizontal' });
      expect(container.querySelector('.mljr-radio-group-horizontal')).toBeTruthy();
    });
  });
});
