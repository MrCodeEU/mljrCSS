import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import TableOfContent from '../lib/components/display/TableOfContent.svelte';

const sampleItems = [
  { id: 'intro', text: 'Introduction', level: 2 },
  { id: 'setup', text: 'Setup', level: 3 },
  { id: 'usage', text: 'Usage', level: 3 },
  { id: 'advanced', text: 'Advanced', level: 2 },
];

describe('TableOfContent', () => {
  describe('Rendering', () => {
    it('renders the nav element', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      expect(container.querySelector('.mljr-toc')).toBeTruthy();
    });

    it('renders the TOC list', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      expect(container.querySelector('.mljr-toc-list')).toBeTruthy();
    });

    it('renders all items', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      const links = container.querySelectorAll('.mljr-toc-link');
      expect(links.length).toBe(sampleItems.length);
    });

    it('renders item text', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      expect(container.textContent).toContain('Introduction');
      expect(container.textContent).toContain('Setup');
      expect(container.textContent).toContain('Advanced');
    });

    it('renders links with correct hrefs', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      const firstLink = container.querySelector('.mljr-toc-link') as HTMLAnchorElement;
      expect(firstLink.getAttribute('href')).toBe('#intro');
    });
  });

  describe('Title', () => {
    it('shows default title', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      expect(container.textContent).toContain('On this page');
    });

    it('shows custom title', async () => {
      const { container } = render(TableOfContent, { items: sampleItems, title: 'Contents' });
      expect(container.textContent).toContain('Contents');
    });

    it('shows title element when title provided', async () => {
      const { container } = render(TableOfContent, { items: sampleItems, title: 'My TOC' });
      expect(container.querySelector('.mljr-toc-title')).toBeTruthy();
    });
  });

  describe('Indentation levels', () => {
    it('applies level-specific class to h3 items', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      expect(container.querySelector('.mljr-toc-h3')).toBeTruthy();
    });

    it('applies level-specific class to h2 items', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      expect(container.querySelector('.mljr-toc-h2')).toBeTruthy();
    });
  });

  describe('Sticky mode', () => {
    it('adds sticky class when sticky=true', async () => {
      const { container } = render(TableOfContent, { items: sampleItems, sticky: true });
      expect(container.querySelector('.mljr-toc-sticky')).toBeTruthy();
    });

    it('does not add sticky class by default', async () => {
      const { container } = render(TableOfContent, { items: sampleItems });
      expect(container.querySelector('.mljr-toc-sticky')).toBeFalsy();
    });
  });

  describe('Empty state', () => {
    it('renders nothing when items is empty (hidden until headings scanned)', async () => {
      const { container } = render(TableOfContent, { items: [] });
      // Component hides itself when there are no items to show
      expect(container.querySelector('.mljr-toc')).toBeFalsy();
    });
  });
});
