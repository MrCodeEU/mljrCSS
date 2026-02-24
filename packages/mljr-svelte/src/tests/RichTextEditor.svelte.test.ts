import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import RichTextEditor from '../lib/components/forms/RichTextEditor.svelte';

describe('RichTextEditor', () => {
  describe('Rendering', () => {
    it('renders the editor container', async () => {
      const { container } = render(RichTextEditor, {});
      expect(container.querySelector('.mljr-rte')).toBeTruthy();
    });

    it('renders the toolbar by default', async () => {
      const { container } = render(RichTextEditor, {});
      expect(container.querySelector('.mljr-rte-toolbar')).toBeTruthy();
    });

    it('renders the content area', async () => {
      const { container } = render(RichTextEditor, {});
      expect(container.querySelector('.mljr-rte-content')).toBeTruthy();
    });

    it('renders word/char count footer when showCount=true', async () => {
      const { container } = render(RichTextEditor, { showCount: true });
      expect(container.querySelector('.mljr-rte-footer')).toBeTruthy();
    });

    it('does not render count footer by default', async () => {
      const { container } = render(RichTextEditor, {});
      expect(container.querySelector('.mljr-rte-footer')).toBeNull();
    });
  });

  describe('Readonly / Disabled', () => {
    it('applies readonly class when readonly=true', async () => {
      const { container } = render(RichTextEditor, { readonly: true });
      expect(container.querySelector('.mljr-rte-readonly')).toBeTruthy();
    });

    it('hides toolbar when readonly=true', async () => {
      const { container } = render(RichTextEditor, { readonly: true });
      expect(container.querySelector('.mljr-rte-toolbar')).toBeNull();
    });

    it('applies disabled class when disabled=true', async () => {
      const { container } = render(RichTextEditor, { disabled: true });
      expect(container.querySelector('.mljr-rte-disabled')).toBeTruthy();
    });

    it('sets contenteditable to false when disabled', async () => {
      const { container } = render(RichTextEditor, { disabled: true });
      const content = container.querySelector('.mljr-rte-content') as HTMLElement;
      expect(content?.getAttribute('contenteditable')).toBe('false');
    });

    it('sets contenteditable to false when readonly', async () => {
      const { container } = render(RichTextEditor, { readonly: true });
      const content = container.querySelector('.mljr-rte-content') as HTMLElement;
      expect(content?.getAttribute('contenteditable')).toBe('false');
    });

    it('sets contenteditable to true when neither disabled nor readonly', async () => {
      const { container } = render(RichTextEditor, {});
      const content = container.querySelector('.mljr-rte-content') as HTMLElement;
      expect(content?.getAttribute('contenteditable')).toBe('true');
    });
  });

  describe('Size variants', () => {
    it('applies sm size class', async () => {
      const { container } = render(RichTextEditor, { size: 'sm' });
      expect(container.querySelector('.mljr-rte-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(RichTextEditor, { size: 'lg' });
      expect(container.querySelector('.mljr-rte-lg')).toBeTruthy();
    });

    it('does not apply size class for md (default)', async () => {
      const { container } = render(RichTextEditor, { size: 'md' });
      const rte = container.querySelector('.mljr-rte');
      expect(rte?.className).not.toContain('mljr-rte-sm');
      expect(rte?.className).not.toContain('mljr-rte-lg');
    });
  });

  describe('Toolbar buttons', () => {
    it('renders bold button', async () => {
      const { container } = render(RichTextEditor, {});
      const btn = container.querySelector('[aria-label="Bold"]');
      expect(btn).toBeTruthy();
    });

    it('renders italic button', async () => {
      const { container } = render(RichTextEditor, {});
      expect(container.querySelector('[aria-label="Italic"]')).toBeTruthy();
    });

    it('renders heading select', async () => {
      const { container } = render(RichTextEditor, {});
      expect(container.querySelector('.mljr-rte-select')).toBeTruthy();
    });
  });

  describe('Placeholder', () => {
    it('sets data-placeholder attribute', async () => {
      const { container } = render(RichTextEditor, { placeholder: 'Type here...' });
      const content = container.querySelector('.mljr-rte-content');
      expect(content?.getAttribute('data-placeholder')).toBe('Type here...');
    });
  });
});
