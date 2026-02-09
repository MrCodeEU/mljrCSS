import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import Password from '../lib/components/Password.svelte';

describe('Password', () => {
  describe('Rendering', () => {
    it('renders password input', async () => {
      render(Password);
      
      const input = page.getByRole('textbox');
      await expect.element(input).toBeInTheDocument();
    });

    it('renders with label', async () => {
      render(Password, {
        label: 'Password Label',
      });
      
      const label = page.getByText('Password Label');
      await expect.element(label).toBeInTheDocument();
    });

    it('renders with helper text', async () => {
      render(Password, {
        helperText: 'Choose a strong password',
      });
      
      const helper = page.getByText('Choose a strong password');
      await expect.element(helper).toBeInTheDocument();
    });
  });

  describe('Password Visibility', () => {
    it('has toggle button', async () => {
      render(Password);
      
      const input = page.getByRole('textbox');
      // Default is password type
      await expect.element(input).toHaveAttribute('type', 'password');
      
      // Toggle button should exist
      const toggleBtn = page.getByRole('button');
      await expect.element(toggleBtn).toBeInTheDocument();
    });
  });

  describe('Password Strength', () => {
    it('shows strength meter when showStrength is true', async () => {
      const { container } = render(Password, {
        showStrength: true,
        value: 'test',
      });
      
      // Check container HTML for strength elements
      const html = container.innerHTML;
      expect(html).toContain('mljr-password-strength');
    });

    it('shows strength feedback', async () => {
      const { container } = render(Password, {
        showStrength: true,
        value: '123',
      });
      
      const html = container.innerHTML;
      expect(html).toContain('mljr-password-strength');
    });
  });

  describe('Password Requirements', () => {
    it('shows requirements checklist when showRequirements is true', async () => {
      const { container } = render(Password, {
        showRequirements: true,
      });
      
      expect(container.innerHTML).toContain('mljr-password-requirements');
    });
  });

  describe('Validation States', () => {
    it('shows error state when error prop is true', async () => {
      render(Password, {
        error: true,
        errorText: 'Password is required',
      });
      
      const errorText = page.getByText('Password is required');
      await expect.element(errorText).toBeInTheDocument();
    });

    it('shows success state when success prop is true', async () => {
      const { container } = render(Password, {
        success: true,
      });
      
      expect(container.innerHTML).toContain('mljr-password-success');
    });
  });

  describe('Input Handling', () => {
    it('respects disabled state', async () => {
      render(Password, {
        disabled: true,
      });
      
      const input = page.getByRole('textbox');
      await expect.element(input).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('toggle button exists', async () => {
      render(Password);
      
      const toggleBtn = page.getByRole('button');
      await expect.element(toggleBtn).toBeInTheDocument();
    });

    it('has correct input attributes', async () => {
      render(Password);
      
      const input = page.getByRole('textbox');
      await expect.element(input).toHaveAttribute('type', 'password');
    });
  });
});
