import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import CodeExample from '../lib/components/CodeExample.svelte';

const sampleCode = `<Button variant="primary">Click me</Button>`;

describe('CodeExample', () => {
  describe('Rendering', () => {
    it('renders the toggle button', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      expect(container.querySelector('.code-example-toggle')).toBeTruthy();
    });

    it('renders default title text', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      expect(container.textContent).toContain('Code Example');
    });

    it('renders custom title when provided', async () => {
      const { container } = render(CodeExample, { code: sampleCode, title: 'My Snippet' });
      expect(container.textContent).toContain('My Snippet');
    });

    it('does not show code block initially (collapsed)', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      expect(container.querySelector('.code-example-content')).toBeNull();
    });
  });

  describe('Interaction', () => {
    it('expands code block on toggle click', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      const toggle = container.querySelector('.code-example-toggle') as HTMLElement;
      toggle?.click();
      await Promise.resolve();
      expect(container.querySelector('.code-example-content')).toBeTruthy();
    });

    it('shows the code content after toggle', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      const toggle = container.querySelector('.code-example-toggle') as HTMLElement;
      toggle?.click();
      await Promise.resolve();
      expect(container.textContent).toContain('Click me');
    });

    it('sets aria-expanded back to false on second click', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      const toggle = container.querySelector('.code-example-toggle') as HTMLElement;
      toggle?.click();
      await Promise.resolve();
      toggle?.click();
      await Promise.resolve();
      expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Accessibility', () => {
    it('toggle has aria-expanded=false when collapsed', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      const toggle = container.querySelector('.code-example-toggle');
      expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    });

    it('toggle has aria-expanded=true when expanded', async () => {
      const { container } = render(CodeExample, { code: sampleCode });
      const toggle = container.querySelector('.code-example-toggle') as HTMLElement;
      toggle?.click();
      await Promise.resolve();
      expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
