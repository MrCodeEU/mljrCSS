import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Form from '../lib/components/forms/Form.svelte';

describe('Form', () => {
  describe('Rendering', () => {
    it('renders form element', async () => {
      const { container } = render(Form);
      expect(container.querySelector('form.mljr-form')).toBeTruthy();
    });

    it('renders form fieldset wrapper', async () => {
      const { container } = render(Form);
      expect(container.querySelector('.mljr-form-fieldset')).toBeTruthy();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(Form, { disabled: true });
      expect(container.querySelector('.mljr-form-disabled')).toBeTruthy();
    });

    it('disables fieldset when disabled=true', async () => {
      const { container } = render(Form, { disabled: true });
      const fieldset = container.querySelector('.mljr-form-fieldset') as HTMLFieldSetElement;
      expect(fieldset?.disabled).toBe(true);
    });
  });
});
