import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import CommandPalette from '../lib/components/navigation/CommandPalette.svelte';

const commands = [
  { id: 'home', label: 'Go Home', section: 'Navigation', action: vi.fn() },
  { id: 'settings', label: 'Open Settings', section: 'Navigation', action: vi.fn() },
  { id: 'search', label: 'Search Files', section: 'Tools', action: vi.fn() },
  { id: 'disabled', label: 'Disabled Command', disabled: true, action: vi.fn() },
];

describe('CommandPalette', () => {
  describe('Rendering', () => {
    it('renders nothing when closed', async () => {
      const { container } = render(CommandPalette, { commands, open: false });
      expect(container.querySelector('.mljr-command-palette')).toBeFalsy();
    });

    it('renders palette when open', async () => {
      const { container } = render(CommandPalette, { commands, open: true });
      expect(container.querySelector('.mljr-command-palette')).toBeTruthy();
    });

    it('renders search input when open', async () => {
      const { container } = render(CommandPalette, { commands, open: true });
      expect(container.querySelector('.mljr-command-palette-search input')).toBeTruthy();
    });

    it('renders commands when open', async () => {
      const { container } = render(CommandPalette, { commands, open: true });
      expect(container.textContent).toContain('Go Home');
      expect(container.textContent).toContain('Open Settings');
    });

    it('renders custom placeholder text', async () => {
      const { container } = render(CommandPalette, {
        commands,
        open: true,
        placeholder: 'Search commands...',
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('Search commands...');
    });
  });

  describe('Sections', () => {
    it('renders section group headings', async () => {
      const { container } = render(CommandPalette, { commands, open: true });
      expect(container.textContent).toContain('Navigation');
      expect(container.textContent).toContain('Tools');
    });
  });
});
