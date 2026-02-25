import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import FileUpload from '../lib/components/forms/FileUpload.svelte';

describe('FileUpload', () => {
  describe('Rendering', () => {
    it('renders file upload element', async () => {
      const { container } = render(FileUpload);
      expect(container.querySelector('.mljr-file-upload')).toBeTruthy();
    });

    it('renders upload zone', async () => {
      const { container } = render(FileUpload);
      expect(container.querySelector('.mljr-file-upload-zone')).toBeTruthy();
    });

    it('renders file input', async () => {
      const { container } = render(FileUpload);
      expect(container.querySelector('input[type="file"]')).toBeTruthy();
    });

    it('renders label text', async () => {
      const { container } = render(FileUpload, { label: 'Upload your documents' });
      expect(container.textContent).toContain('Upload your documents');
    });

    it('renders hint text when provided', async () => {
      const { container } = render(FileUpload, { hint: 'Max 10MB' });
      expect(container.textContent).toContain('Max 10MB');
    });
  });

  describe('Multiple files', () => {
    it('input accepts multiple files when multiple=true', async () => {
      const { container } = render(FileUpload, { multiple: true });
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input?.multiple).toBe(true);
    });

    it('input does not accept multiple files by default', async () => {
      const { container } = render(FileUpload);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input?.multiple).toBe(false);
    });
  });

  describe('Accept attribute', () => {
    it('sets accept attribute when provided', async () => {
      const { container } = render(FileUpload, { accept: 'image/*' });
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input?.accept).toBe('image/*');
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class to upload zone when disabled=true', async () => {
      const { container } = render(FileUpload, { disabled: true });
      expect(container.querySelector('.mljr-file-upload-zone-disabled')).toBeTruthy();
    });
  });
});
