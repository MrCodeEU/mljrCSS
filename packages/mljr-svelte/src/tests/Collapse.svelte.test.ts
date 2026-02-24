import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Collapse from '../lib/components/overlay/Collapse.svelte';

describe('Collapse', () => {
  describe('Rendering', () => {
    it('renders collapse element', async () => {
      const { container } = render(Collapse, { title: 'Section' });
      expect(container.querySelector('.mljr-collapse')).toBeTruthy();
    });

    it('renders trigger button', async () => {
      const { container } = render(Collapse, { title: 'Section' });
      expect(container.querySelector('.mljr-collapse-trigger')).toBeTruthy();
    });

    it('renders title text', async () => {
      const { container } = render(Collapse, { title: 'My Section' });
      expect(container.querySelector('.mljr-collapse-title')?.textContent).toContain('My Section');
    });

    it('does not have open class by default', async () => {
      const { container } = render(Collapse, { title: 'Section' });
      expect(container.querySelector('.mljr-collapse-open')).toBeFalsy();
    });

    it('trigger has aria-expanded="false" when closed', async () => {
      const { container } = render(Collapse, { title: 'Section' });
      const trigger = container.querySelector('.mljr-collapse-trigger');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Interaction', () => {
    it('opens on trigger click', async () => {
      const { container } = render(Collapse, { title: 'Section' });
      const trigger = container.querySelector('.mljr-collapse-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-collapse-open')).toBeTruthy();
    });

    it('calls ontoggle when clicked', async () => {
      const handleToggle = vi.fn();
      const { container } = render(Collapse, { title: 'Section', ontoggle: handleToggle });
      const trigger = container.querySelector('.mljr-collapse-trigger') as HTMLElement;
      trigger?.click();
      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    it('does not open when disabled', async () => {
      const { container } = render(Collapse, { title: 'Section', disabled: true });
      expect(container.querySelector('.mljr-collapse-disabled')).toBeTruthy();
    });
  });

  describe('Initial state', () => {
    it('starts open when open=true', async () => {
      const { container } = render(Collapse, { title: 'Section', open: true });
      expect(container.querySelector('.mljr-collapse-open')).toBeTruthy();
    });
  });
});
