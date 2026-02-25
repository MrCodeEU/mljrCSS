import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import OtpInput from '../lib/components/forms/OtpInput.svelte';

describe('OtpInput', () => {
  describe('Rendering', () => {
    it('renders otp input element', async () => {
      const { container } = render(OtpInput);
      expect(container.querySelector('.mljr-otp-input')).toBeTruthy();
    });

    it('renders correct number of digit inputs (default length=6)', async () => {
      const { container } = render(OtpInput);
      const digits = container.querySelectorAll('.mljr-otp-digit');
      expect(digits.length).toBe(6);
    });

    it('renders correct number of digit inputs with custom length', async () => {
      const { container } = render(OtpInput, { length: 4 });
      const digits = container.querySelectorAll('.mljr-otp-digit');
      expect(digits.length).toBe(4);
    });

    it('renders digit inputs with correct maxlength', async () => {
      const { container } = render(OtpInput, { type: 'text' });
      const firstDigit = container.querySelector('.mljr-otp-digit') as HTMLInputElement;
      expect(firstDigit?.maxLength).toBeGreaterThan(0);
    });
  });

  describe('Types', () => {
    it('renders number type inputs', async () => {
      const { container } = render(OtpInput, { type: 'number' });
      const digits = container.querySelectorAll('.mljr-otp-digit');
      expect(digits.length).toBeGreaterThan(0);
    });

    it('renders password type inputs', async () => {
      const { container } = render(OtpInput, { type: 'password' });
      const digits = container.querySelectorAll('.mljr-otp-digit[type="password"]');
      expect(digits.length).toBe(6);
    });
  });

  describe('Disabled state', () => {
    it('disables all digit inputs when disabled=true', async () => {
      const { container } = render(OtpInput, { disabled: true });
      const digits = container.querySelectorAll('.mljr-otp-digit') as NodeListOf<HTMLInputElement>;
      digits.forEach((digit) => expect(digit.disabled).toBe(true));
    });
  });

  describe('Accessibility', () => {
    it('digits have aria-label attributes', async () => {
      const { container } = render(OtpInput);
      const firstDigit = container.querySelector('.mljr-otp-digit');
      expect(firstDigit?.getAttribute('aria-label')).toBeTruthy();
    });
  });
});
