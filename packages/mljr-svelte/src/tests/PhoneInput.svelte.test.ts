import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import PhoneInput from '../lib/components/forms/PhoneInput.svelte';

describe('PhoneInput', () => {
  describe('Rendering', () => {
    it('renders phone input element', async () => {
      const { container } = render(PhoneInput);
      expect(container.querySelector('.mljr-phone-input')).toBeTruthy();
    });

    it('renders country selector button', async () => {
      const { container } = render(PhoneInput);
      expect(container.querySelector('.mljr-phone-country')).toBeTruthy();
    });

    it('renders phone number input', async () => {
      const { container } = render(PhoneInput);
      expect(container.querySelector('input[type="tel"]')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(PhoneInput, { label: 'Phone Number' });
      expect(container.querySelector('.mljr-phone-label')?.textContent).toContain('Phone Number');
    });

    it('renders required indicator when required=true', async () => {
      const { container } = render(PhoneInput, { label: 'Phone', required: true });
      expect(container.querySelector('.mljr-phone-required')).toBeTruthy();
    });
  });

  describe('Country selector', () => {
    it('renders flag emoji when showFlags=true (default)', async () => {
      const { container } = render(PhoneInput, { showFlags: true });
      expect(container.querySelector('.mljr-phone-flag')).toBeTruthy();
    });

    it('hides flag when showFlags=false', async () => {
      const { container } = render(PhoneInput, { showFlags: false });
      expect(container.querySelector('.mljr-phone-flag')).toBeFalsy();
    });

    it('shows calling code', async () => {
      const { container } = render(PhoneInput, { country: 'US' });
      expect(container.querySelector('.mljr-phone-code')?.textContent).toContain('+1');
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(PhoneInput, { disabled: true });
      expect(container.querySelector('.mljr-phone-input.is-disabled')).toBeTruthy();
    });
  });

  describe('Error state', () => {
    it('applies error class when error is set', async () => {
      const { container } = render(PhoneInput, { error: 'Invalid phone' });
      expect(container.querySelector('.mljr-phone-input.has-error')).toBeTruthy();
    });
  });
});
