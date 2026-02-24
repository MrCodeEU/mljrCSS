import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import PdfViewer from '../lib/components/display/PdfViewer.svelte';

const SAMPLE_PDF = 'https://example.com/sample.pdf';

describe('PdfViewer', () => {
  describe('Rendering', () => {
    it('renders the pdf container', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF });
      expect(container.querySelector('.mljr-pdf')).toBeTruthy();
    });

    it('sets custom height via inline style', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF, height: '600px' });
      const pdf = container.querySelector('.mljr-pdf') as HTMLElement;
      expect(pdf?.style.height).toBe('600px');
    });

    it('renders the viewer area', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF });
      expect(container.querySelector('.mljr-pdf-viewer')).toBeTruthy();
    });
  });

  describe('Toolbar', () => {
    it('renders toolbar by default', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF });
      expect(container.querySelector('.mljr-pdf-toolbar')).toBeTruthy();
    });

    it('hides toolbar when showToolbar=false', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF, showToolbar: false });
      expect(container.querySelector('.mljr-pdf-toolbar')).toBeNull();
    });

    it('shows the title in the toolbar', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF, title: 'My Document' });
      expect(container.textContent).toContain('My Document');
    });

    it('shows download button when allowDownload=true', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF, allowDownload: true });
      const downloadBtn = container.querySelector('a[download]');
      expect(downloadBtn).toBeTruthy();
    });

    it('hides download button when allowDownload=false', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF, allowDownload: false });
      expect(container.querySelector('a[download]')).toBeNull();
    });

    it('shows open-in-new-tab button when allowNewTab=true', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF, allowNewTab: true });
      const newTabBtn = container.querySelector('a[target="_blank"]');
      expect(newTabBtn).toBeTruthy();
    });

    it('hides open-in-new-tab button when allowNewTab=false', async () => {
      const { container } = render(PdfViewer, { src: SAMPLE_PDF, allowNewTab: false, allowDownload: false });
      expect(container.querySelector('.mljr-pdf-actions a')).toBeNull();
    });
  });

  describe('Title derivation', () => {
    it('derives title from filename when title prop is empty', async () => {
      const { container } = render(PdfViewer, { src: 'https://example.com/my-report.pdf' });
      expect(container.textContent).toContain('my-report');
    });
  });
});
