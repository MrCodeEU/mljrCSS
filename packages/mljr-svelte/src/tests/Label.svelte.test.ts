import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Label from '../lib/components/forms/Label.svelte';

describe('Label', () => {
  describe('Rendering', () => {
    it('renders label wrapper element', async () => {
      const { container } = render(Label, { label: 'My Label' });
      expect(container.querySelector('.mljr-label-wrapper')).toBeTruthy();
    });

    it('renders label text', async () => {
      const { container } = render(Label, { label: 'Username' });
      expect(container.querySelector('.mljr-label')?.textContent).toContain('Username');
    });

    it('renders required indicator when required=true', async () => {
      const { container } = render(Label, { label: 'Email', required: true });
      expect(container.querySelector('.mljr-label-required')).toBeTruthy();
      expect(container.querySelector('.mljr-label-required')?.textContent).toContain('*');
    });

    it('does not render required indicator when required=false', async () => {
      const { container } = render(Label, { label: 'Email', required: false });
      expect(container.querySelector('.mljr-label-required')).toBeFalsy();
    });
  });

  describe('Helper text', () => {
    it('renders helper text when provided', async () => {
      const { container } = render(Label, { label: 'Email', helperText: 'Enter your email address' });
      expect(container.querySelector('.mljr-label-helper')?.textContent).toContain('Enter your email address');
    });

    it('does not show helper text when error is present', async () => {
      const { container } = render(Label, {
        label: 'Email',
        helperText: 'Helper',
        error: 'Invalid email',
      });
      expect(container.querySelector('.mljr-label-helper')).toBeFalsy();
    });
  });

  describe('Error state', () => {
    it('applies error class when error is set', async () => {
      const { container } = render(Label, { label: 'Email', error: 'Invalid' });
      expect(container.querySelector('.mljr-label-error')).toBeTruthy();
    });

    it('shows error message text', async () => {
      const { container } = render(Label, { label: 'Email', error: 'Email is invalid' });
      expect(container.querySelector('.mljr-label-error-text')?.textContent).toContain('Email is invalid');
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(Label, { label: 'Email', disabled: true });
      expect(container.querySelector('.mljr-label-disabled')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('sets for attribute on label element', async () => {
      const { container } = render(Label, { label: 'Email', for: 'email-input' });
      const labelEl = container.querySelector('label');
      expect(labelEl?.getAttribute('for')).toBe('email-input');
    });
  });
});
