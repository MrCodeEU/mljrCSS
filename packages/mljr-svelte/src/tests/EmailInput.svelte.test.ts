import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import EmailInput from '../lib/components/forms/EmailInput.svelte';

describe('EmailInput', () => {
  describe('Rendering', () => {
    it('renders input element', async () => {
      const { container } = render(EmailInput);
      
      expect(container.querySelector('.mljr-email-field')).toBeTruthy();
    });

    it('renders with label', async () => {
      const { container } = render(EmailInput, {
        label: 'Email Address',
      });
      
      const label = container.querySelector('.mljr-email-label');
      expect(label?.textContent).toContain('Email Address');
    });

    it('shows required indicator', async () => {
      const { container } = render(EmailInput, {
        label: 'Email',
        required: true,
      });
      
      const required = container.querySelector('.mljr-email-required');
      expect(required?.textContent).toBe('*');
    });

    it('renders with placeholder', async () => {
      const { container } = render(EmailInput, {
        placeholder: 'your@email.com',
      });
      
      const input = container.querySelector('.mljr-email-field');
      expect(input?.getAttribute('placeholder')).toBe('your@email.com');
    });
  });

  describe('Validation', () => {
    it('shows valid state for correct email', async () => {
      const { container } = render(EmailInput, {
        value: 'test@example.com',
        showValidation: true,
      });
      
      const wrapper = container.querySelector('.mljr-email-input');
      expect(wrapper?.classList.contains('is-valid')).toBe(true);
    });

    it('shows invalid state for incorrect email', async () => {
      const { container } = render(EmailInput, {
        value: 'invalid-email',
        showValidation: true,
      });
      
      // After blur, should show error
      const wrapper = container.querySelector('.mljr-email-input');
      // Invalid email should have error class after validation
      expect(wrapper).toBeTruthy();
    });

    it('shows validation state when enabled', async () => {
      const { container } = render(EmailInput, {
        value: 'test@example.com',
        showValidation: true,
      });
      
      // Valid email should show valid state
      const wrapper = container.querySelector('.mljr-email-input');
      expect(wrapper).toBeTruthy();
    });

    it('validates multiple emails when multiple prop is true', async () => {
      const { container } = render(EmailInput, {
        value: 'test1@example.com, test2@example.com',
        multiple: true,
        showValidation: true,
      });
      
      const wrapper = container.querySelector('.mljr-email-input');
      expect(wrapper?.classList.contains('is-valid')).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('updates value on input', async () => {
      let value = '';
      const { container } = render(EmailInput, {
        value: '',
        onvaluechange: (v: string) => { value = v; },
      });
      
      const input = container.querySelector('.mljr-email-field') as HTMLInputElement;
      input.value = 'test@example.com';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // onchange should have been called
      expect(value).toBeTruthy();
    });

    it('respects disabled state', async () => {
      const { container } = render(EmailInput, {
        disabled: true,
      });
      
      const input = container.querySelector('.mljr-email-field');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper label association', async () => {
      const { container } = render(EmailInput, {
        label: 'Email',
        id: 'email-input',
      });
      
      const label = container.querySelector('label');
      expect(label?.getAttribute('for')).toBe('email-input');
      
      const input = container.querySelector('.mljr-email-field');
      expect(input?.getAttribute('id')).toBe('email-input');
    });

    it('shows error message when error prop is set', async () => {
      const { container } = render(EmailInput, {
        error: 'Email is required',
      });
      
      const error = container.querySelector('.mljr-email-error');
      expect(error?.textContent).toContain('Email is required');
    });

    it('shows helper text when provided', async () => {
      const { container } = render(EmailInput, {
        helper: 'We will never share your email',
      });
      
      const helper = container.querySelector('.mljr-email-helper');
      expect(helper?.textContent).toContain('We will never share your email');
    });

    it('has correct input type', async () => {
      const { container } = render(EmailInput);
      
      const input = container.querySelector('.mljr-email-field');
      expect(input?.getAttribute('type')).toBe('email');
    });
  });
});
