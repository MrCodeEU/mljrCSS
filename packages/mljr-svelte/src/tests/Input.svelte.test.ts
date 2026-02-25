import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Input from '../lib/components/forms/Input.svelte';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', async () => {
      const { container } = render(Input);
      expect(container.querySelector('.mljr-input')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(Input, { label: 'Email address' });
      expect(container.querySelector('.mljr-label')).toBeTruthy();
      expect(container.textContent).toContain('Email address');
    });

    it('renders helper text', async () => {
      const { container } = render(Input, { helperText: 'Enter a valid email' });
      expect(container.textContent).toContain('Enter a valid email');
    });

    it('renders error text', async () => {
      const { container } = render(Input, { errorText: 'Required field', error: true });
      expect(container.textContent).toContain('Required field');
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Input, { size: 'sm' });
      expect(container.querySelector('.mljr-input-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Input, { size: 'lg' });
      expect(container.querySelector('.mljr-input-lg')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('applies error class', async () => {
      const { container } = render(Input, { error: true });
      expect(container.querySelector('.mljr-input-error')).toBeTruthy();
    });

    it('applies success class', async () => {
      const { container } = render(Input, { success: true });
      expect(container.querySelector('.mljr-input-success')).toBeTruthy();
    });

    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Input, { disabled: true });
      expect(container.querySelector('input')?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Required', () => {
    it('marks label as required', async () => {
      const { container } = render(Input, { label: 'Name', required: true });
      expect(container.querySelector('.mljr-label-required')).toBeTruthy();
    });

    it('does not show required marker without required prop', async () => {
      const { container } = render(Input, { label: 'Name' });
      expect(container.querySelector('.mljr-label-required')).toBeFalsy();
    });
  });

  describe('Value', () => {
    it('sets initial value', async () => {
      const { container } = render(Input, { value: 'hello' });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBe('hello');
    });
  });

  describe('Attributes', () => {
    it('passes placeholder through', async () => {
      const { container } = render(Input, { placeholder: 'Type here...' });
      expect(container.querySelector('input')?.getAttribute('placeholder')).toBe('Type here...');
    });

    it('passes type through', async () => {
      const { container } = render(Input, { type: 'number' });
      expect(container.querySelector('input')?.getAttribute('type')).toBe('number');
    });
  });
});
