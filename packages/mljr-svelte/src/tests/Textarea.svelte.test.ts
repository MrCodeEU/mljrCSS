import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Textarea from '../lib/components/forms/Textarea.svelte';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders textarea element', async () => {
      const { container } = render(Textarea);
      expect(container.querySelector('.mljr-textarea')).toBeTruthy();
    });

    it('renders a <textarea> tag', async () => {
      const { container } = render(Textarea);
      expect(container.querySelector('textarea')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(Textarea, { label: 'Message' });
      expect(container.textContent).toContain('Message');
    });

    it('renders helper text', async () => {
      const { container } = render(Textarea, { helperText: 'Max 500 characters' });
      expect(container.textContent).toContain('Max 500 characters');
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Textarea, { size: 'sm' });
      expect(container.querySelector('.mljr-textarea-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Textarea, { size: 'lg' });
      expect(container.querySelector('.mljr-textarea-lg')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('applies error class', async () => {
      const { container } = render(Textarea, { error: true });
      expect(container.querySelector('.mljr-textarea-error')).toBeTruthy();
    });

    it('applies success class', async () => {
      const { container } = render(Textarea, { success: true });
      expect(container.querySelector('.mljr-textarea-success')).toBeTruthy();
    });

    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Textarea, { disabled: true });
      expect(container.querySelector('textarea')?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Character count', () => {
    it('shows character count when showCount is true', async () => {
      const { container } = render(Textarea, { showCount: true, maxLength: 100, value: 'Hello' });
      expect(container.textContent).toContain('5');
      expect(container.textContent).toContain('100');
    });
  });

  describe('Auto resize', () => {
    it('applies auto-resize class', async () => {
      const { container } = render(Textarea, { autoResize: true });
      expect(container.querySelector('.mljr-textarea-auto-resize')).toBeTruthy();
    });
  });

  describe('Value', () => {
    it('sets initial value', async () => {
      const { container } = render(Textarea, { value: 'Some text' });
      const ta = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(ta?.value).toBe('Some text');
    });
  });
});
