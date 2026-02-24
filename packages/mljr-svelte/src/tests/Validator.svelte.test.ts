import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Validator from '../lib/components/forms/Validator.svelte';

describe('Validator', () => {
  describe('Rendering', () => {
    it('renders validator element', async () => {
      const { container } = render(Validator);
      expect(container.querySelector('.mljr-validator')).toBeTruthy();
    });

    it('applies info variant class by default', async () => {
      const { container } = render(Validator, { message: 'Info' });
      expect(container.querySelector('.mljr-validator-info')).toBeTruthy();
    });

    it('renders message when provided', async () => {
      const { container } = render(Validator, { message: 'This field is required' });
      expect(container.querySelector('.mljr-validator-message')?.textContent).toContain('This field is required');
    });
  });

  describe('Variants', () => {
    const variants = ['error', 'success', 'warning', 'info'] as const;
    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, async () => {
        const { container } = render(Validator, { variant, message: `${variant} message` });
        expect(container.querySelector(`.mljr-validator-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Validation rules', () => {
    it('renders no message when no rules and no message', async () => {
      const { container } = render(Validator);
      expect(container.querySelector('.mljr-validator-message')).toBeFalsy();
    });

    it('runs rules and shows error when validation fails', async () => {
      const rules = [{ validate: () => false, message: 'Must not be empty' }];
      const { container } = render(Validator, { value: 'test', rules });
      await new Promise((r) => setTimeout(r, 50));
      expect(container.querySelector('.mljr-validator-error')).toBeTruthy();
    });
  });
});
