import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ContextMenu from '../lib/components/overlay/ContextMenu.svelte';

const items = [
  { label: 'Cut', shortcut: '⌘X' },
  { label: 'Copy', shortcut: '⌘C' },
  { label: 'Paste', shortcut: '⌘V' },
  { divider: true },
  { label: 'Delete', danger: true },
  { label: 'Disabled Action', disabled: true },
];

describe('ContextMenu', () => {
  describe('Rendering', () => {
    it('renders the trigger wrapper', async () => {
      const { container } = render(ContextMenu, { items });
      expect(container.querySelector('.mljr-context-menu-trigger')).toBeTruthy();
    });

    it('does not show menu initially', async () => {
      const { container } = render(ContextMenu, { items });
      expect(container.querySelector('.mljr-context-menu')).toBeNull();
    });
  });

  describe('Items structure', () => {
    it('accepts danger item in items array', async () => {
      const dangerItems = [{ label: 'Delete', danger: true }];
      const { container } = render(ContextMenu, { items: dangerItems });
      // Trigger is rendered even without menu open
      expect(container.querySelector('.mljr-context-menu-trigger')).toBeTruthy();
    });

    it('accepts divider item in items array', async () => {
      const dividerItems = [{ label: 'Item' }, { divider: true }, { label: 'Item 2' }];
      const { container } = render(ContextMenu, { items: dividerItems });
      expect(container.querySelector('.mljr-context-menu-trigger')).toBeTruthy();
    });

    it('accepts disabled item in items array', async () => {
      const disabledItems = [{ label: 'Disabled', disabled: true }];
      const { container } = render(ContextMenu, { items: disabledItems });
      expect(container.querySelector('.mljr-context-menu-trigger')).toBeTruthy();
    });
  });

  describe('Custom class', () => {
    it('applies custom class to trigger', async () => {
      const { container } = render(ContextMenu, { items, class: 'my-custom-trigger' });
      const trigger = container.querySelector('.mljr-context-menu-trigger');
      expect(trigger?.className).toContain('my-custom-trigger');
    });
  });
});
