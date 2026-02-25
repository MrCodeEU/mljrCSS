import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Password from '../lib/components/forms/Password.svelte';

describe('Password', () => {
  describe('Rendering', () => {
    it('renders password input', async () => {
      const { container } = render(Password);
      expect(container.querySelector('input[type="password"]')).toBeTruthy();
    });

    it('renders with label', async () => {
      const { container } = render(Password, { label: 'Password Label' });
      expect(container.textContent).toContain('Password Label');
    });

    it('renders with helper text', async () => {
      const { container } = render(Password, { helperText: 'Choose a strong password' });
      expect(container.textContent).toContain('Choose a strong password');
    });
  });

  describe('Password Visibility', () => {
    it('has toggle button', async () => {
      const { container } = render(Password);
      expect(container.querySelector('button')).toBeTruthy();
    });

    it('input defaults to type=password', async () => {
      const { container } = render(Password);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('password');
    });
  });

  describe('Password Strength', () => {
    it('shows strength meter when showStrength is true', async () => {
      const { container } = render(Password, { showStrength: true, value: 'test' });
      expect(container.innerHTML).toContain('mljr-password-strength');
    });

    it('shows strength feedback', async () => {
      const { container } = render(Password, { showStrength: true, value: '123' });
      expect(container.innerHTML).toContain('mljr-password-strength');
    });
  });

  describe('Password Requirements', () => {
    it('shows requirements checklist when showRequirements is true', async () => {
      const { container } = render(Password, { showRequirements: true });
      expect(container.innerHTML).toContain('mljr-password-requirements');
    });
  });

  describe('Validation States', () => {
    it('shows error state when error prop is true', async () => {
      const { container } = render(Password, { error: true, errorText: 'Password is required' });
      expect(container.textContent).toContain('Password is required');
    });

    it('shows success state when success prop is true', async () => {
      const { container } = render(Password, { success: true });
      expect(container.innerHTML).toContain('mljr-password-success');
    });
  });

  describe('Input Handling', () => {
    it('respects disabled state', async () => {
      const { container } = render(Password, { disabled: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('toggle button exists', async () => {
      const { container } = render(Password);
      expect(container.querySelector('button')).toBeTruthy();
    });

    it('has correct input attributes', async () => {
      const { container } = render(Password);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('password');
    });
  });
});
