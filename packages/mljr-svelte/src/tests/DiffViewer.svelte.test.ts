import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import DiffViewer from '../lib/components/display/DiffViewer.svelte';

const before = `function hello() {
  return "Hello";
}`;

const after = `function hello(name: string) {
  return \`Hello \${name}\`;
}
export { hello };`;

describe('DiffViewer', () => {
  describe('Rendering', () => {
    it('renders the diff container', async () => {
      const { container } = render(DiffViewer, { before, after });
      expect(container.querySelector('.mljr-diff')).toBeTruthy();
    });

    it('renders the header', async () => {
      const { container } = render(DiffViewer, { before, after });
      expect(container.querySelector('.mljr-diff-header')).toBeTruthy();
    });

    it('shows unified view by default', async () => {
      const { container } = render(DiffViewer, { before, after });
      expect(container.querySelector('.mljr-diff-unified')).toBeTruthy();
    });

    it('shows split view when mode="split"', async () => {
      const { container } = render(DiffViewer, { before, after, mode: 'split' });
      expect(container.querySelector('.mljr-diff-split')).toBeTruthy();
    });
  });

  describe('Stats', () => {
    it('shows stats for changed files', async () => {
      const { container } = render(DiffViewer, { before, after });
      expect(container.querySelector('.mljr-diff-stats')).toBeTruthy();
    });

    it('shows added count', async () => {
      const { container } = render(DiffViewer, { before, after });
      expect(container.querySelector('.mljr-diff-stat-added')).toBeTruthy();
    });

    it('shows removed count', async () => {
      const { container } = render(DiffViewer, { before, after });
      expect(container.querySelector('.mljr-diff-stat-removed')).toBeTruthy();
    });
  });

  describe('Identical files', () => {
    it('shows "No changes" message for identical strings', async () => {
      const same = 'const x = 1;';
      const { container } = render(DiffViewer, { before: same, after: same });
      expect(container.textContent).toContain('No changes');
    });

    it('shows empty diff message element', async () => {
      const same = 'const x = 1;';
      const { container } = render(DiffViewer, { before: same, after: same });
      expect(container.querySelector('.mljr-diff-empty')).toBeTruthy();
    });
  });

  describe('Diff lines', () => {
    it('marks added lines with the correct class', async () => {
      const { container } = render(DiffViewer, { before: 'line1', after: 'line1\nline2' });
      expect(container.querySelector('.mljr-diff-line-added')).toBeTruthy();
    });

    it('marks removed lines with the correct class', async () => {
      const { container } = render(DiffViewer, { before: 'line1\nline2', after: 'line1' });
      expect(container.querySelector('.mljr-diff-line-removed')).toBeTruthy();
    });

    it('shows + sign for added lines', async () => {
      const { container } = render(DiffViewer, { before: 'a', after: 'a\nb' });
      const signs = Array.from(container.querySelectorAll('.mljr-diff-sign'));
      expect(signs.some(s => s.textContent?.trim() === '+')).toBe(true);
    });

    it('shows - sign for removed lines', async () => {
      const { container } = render(DiffViewer, { before: 'a\nb', after: 'a' });
      const signs = Array.from(container.querySelectorAll('.mljr-diff-sign'));
      expect(signs.some(s => s.textContent?.trim() === '-')).toBe(true);
    });
  });

  describe('Title', () => {
    it('shows title when provided', async () => {
      const { container } = render(DiffViewer, { before, after, title: 'hello.ts' });
      expect(container.textContent).toContain('hello.ts');
    });
  });

  describe('Line numbers', () => {
    it('shows gutters by default', async () => {
      const { container } = render(DiffViewer, { before, after });
      expect(container.querySelector('.mljr-diff-gutter')).toBeTruthy();
    });

    it('hides gutters when showLineNumbers=false', async () => {
      const { container } = render(DiffViewer, { before, after, showLineNumbers: false });
      expect(container.querySelector('.mljr-diff-gutter')).toBeFalsy();
    });
  });

  describe('Mode tabs', () => {
    it('renders unified and split tabs', async () => {
      const { container } = render(DiffViewer, { before, after });
      const tabs = container.querySelectorAll('.mljr-diff-tab');
      expect(tabs.length).toBe(2);
      const labels = Array.from(tabs).map(t => t.textContent?.trim());
      expect(labels).toContain('Unified');
      expect(labels).toContain('Split');
    });
  });

  describe('Split mode labels', () => {
    it('shows before/after labels in split mode', async () => {
      const { container } = render(DiffViewer, {
        before,
        after,
        mode: 'split',
        beforeLabel: 'Old',
        afterLabel: 'New',
      });
      expect(container.textContent).toContain('Old');
      expect(container.textContent).toContain('New');
    });
  });

  describe('Empty strings', () => {
    it('handles empty before string', async () => {
      const { container } = render(DiffViewer, { before: '', after: 'new line' });
      expect(container.querySelector('.mljr-diff-line-added')).toBeTruthy();
    });

    it('handles empty after string', async () => {
      const { container } = render(DiffViewer, { before: 'old line', after: '' });
      expect(container.querySelector('.mljr-diff-line-removed')).toBeTruthy();
    });
  });
});
