import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from '@vitest/browser/context';
import DropZone from '../lib/components/forms/DropZone.svelte';

describe('DropZone', () => {
  describe('Rendering', () => {
    it('renders the dropzone container', async () => {
      const { container } = render(DropZone);
      expect(container.querySelector('.mljr-dropzone')).toBeTruthy();
    });

    it('renders the drop area', async () => {
      const { container } = render(DropZone);
      expect(container.querySelector('.mljr-dropzone-area')).toBeTruthy();
    });

    it('renders a hidden file input', async () => {
      const { container } = render(DropZone);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.style.display).toBe('none');
    });

    it('shows drag & drop instructions text', async () => {
      const { container } = render(DropZone);
      expect(container.textContent).toContain('Drag & drop');
    });
  });

  describe('Accept prop', () => {
    it('sets accept attribute on file input', async () => {
      const { container } = render(DropZone, { accept: 'image/*' });
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.accept).toBe('image/*');
    });

    it('shows accept hint text', async () => {
      const { container } = render(DropZone, { accept: 'image/*' });
      expect(container.textContent).toContain('image/*');
    });
  });

  describe('Multiple prop', () => {
    it('sets multiple attribute when multiple=true', async () => {
      const { container } = render(DropZone, { multiple: true });
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.multiple).toBe(true);
    });

    it('does not set multiple when multiple=false', async () => {
      const { container } = render(DropZone, { multiple: false });
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.multiple).toBe(false);
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled=true', async () => {
      const { container } = render(DropZone, { disabled: true });
      expect(container.querySelector('.mljr-dropzone-disabled')).toBeTruthy();
    });

    it('disables file input when disabled=true', async () => {
      const { container } = render(DropZone, { disabled: true });
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('maxSize hint', () => {
    it('shows max size in the hint', async () => {
      const { container } = render(DropZone, { maxSize: 1024 * 1024 });
      expect(container.textContent).toContain('Max');
      expect(container.textContent).toContain('MB');
    });
  });

  describe('maxFiles hint', () => {
    it('shows max files in the hint', async () => {
      const { container } = render(DropZone, { maxFiles: 5 });
      expect(container.textContent).toContain('5 files');
    });

    it('shows singular for maxFiles=1', async () => {
      const { container } = render(DropZone, { maxFiles: 1 });
      expect(container.textContent).toContain('1 file');
    });
  });

  describe('Accessibility', () => {
    it('drop area has role=button', async () => {
      const { container } = render(DropZone);
      const area = container.querySelector('.mljr-dropzone-area');
      expect(area?.getAttribute('role')).toBe('button');
    });

    it('drop area has aria-label', async () => {
      const { container } = render(DropZone);
      const area = container.querySelector('.mljr-dropzone-area');
      expect(area?.getAttribute('aria-label')).toBeTruthy();
    });

    it('drop area is focusable (tabindex=0) when not disabled', async () => {
      const { container } = render(DropZone);
      const area = container.querySelector('.mljr-dropzone-area');
      expect(area?.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('File list', () => {
    it('does not render file list when files=[]]', async () => {
      const { container } = render(DropZone, { files: [] });
      expect(container.querySelector('.mljr-dropzone-files')).toBeFalsy();
    });

    it('renders file items when files are provided', async () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const files = [{
        id: '1',
        file,
        progress: 0,
        status: 'idle' as const,
      }];
      const { container } = render(DropZone, { files });
      expect(container.querySelector('.mljr-dropzone-file')).toBeTruthy();
    });

    it('shows file name in the list', async () => {
      const file = new File(['content'], 'myfile.txt', { type: 'text/plain' });
      const files = [{ id: '1', file, progress: 0, status: 'idle' as const }];
      const { container } = render(DropZone, { files });
      expect(container.textContent).toContain('myfile.txt');
    });

    it('renders clear all button when files present', async () => {
      const file = new File([''], 'x.txt', { type: 'text/plain' });
      const files = [{ id: '1', file, progress: 0, status: 'idle' as const }];
      const { container } = render(DropZone, { files });
      expect(container.querySelector('.mljr-dropzone-clear-all')).toBeTruthy();
    });

    it('renders remove button per file', async () => {
      const file = new File([''], 'x.txt', { type: 'text/plain' });
      const files = [{ id: '1', file, progress: 0, status: 'idle' as const }];
      const { container } = render(DropZone, { files });
      expect(container.querySelector('.mljr-dropzone-remove')).toBeTruthy();
    });
  });

  describe('File status classes', () => {
    it('applies uploading class', async () => {
      const file = new File([''], 'x.txt', { type: 'text/plain' });
      const files = [{ id: '1', file, progress: 50, status: 'uploading' as const }];
      const { container } = render(DropZone, { files });
      expect(container.querySelector('.mljr-dropzone-file-uploading')).toBeTruthy();
    });

    it('applies complete class', async () => {
      const file = new File([''], 'x.txt', { type: 'text/plain' });
      const files = [{ id: '1', file, progress: 100, status: 'complete' as const }];
      const { container } = render(DropZone, { files });
      expect(container.querySelector('.mljr-dropzone-file-complete')).toBeTruthy();
    });

    it('applies error class', async () => {
      const file = new File([''], 'x.txt', { type: 'text/plain' });
      const files = [{ id: '1', file, progress: 0, status: 'error' as const, error: 'Failed' }];
      const { container } = render(DropZone, { files });
      expect(container.querySelector('.mljr-dropzone-file-error')).toBeTruthy();
    });
  });

  describe('Custom class', () => {
    it('applies custom CSS class', async () => {
      const { container } = render(DropZone, { class: 'my-dropzone' });
      expect(container.querySelector('.my-dropzone')).toBeTruthy();
    });
  });
});
