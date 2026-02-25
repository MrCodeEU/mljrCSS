import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Kbd from '../lib/components/display/Kbd.svelte';

describe('Kbd', () => {
  describe('Rendering', () => {
    it('renders kbd element with class', async () => {
      const { container } = render(Kbd, { keys: ['Ctrl', 'C'] });
      expect(container.querySelector('.mljr-kbd')).toBeTruthy();
    });

    it('renders single key from key prop', async () => {
      const { container } = render(Kbd, { key: 'Enter' });
      expect(container.textContent).toContain('↵');
    });

    it('renders multiple keys from keys array', async () => {
      const { container } = render(Kbd, { keys: ['Ctrl', 'C'] });
      const keys = container.querySelectorAll('.mljr-kbd-key');
      expect(keys.length).toBe(2);
    });

    it('shows separator between keys', async () => {
      const { container } = render(Kbd, { keys: ['Ctrl', 'C'] });
      expect(container.querySelector('.mljr-kbd-separator')).toBeTruthy();
    });

    it('maps special keys to symbols', async () => {
      const { container } = render(Kbd, { key: 'cmd' });
      expect(container.textContent).toContain('⌘');
    });

    it('maps shift to symbol', async () => {
      const { container } = render(Kbd, { key: 'shift' });
      expect(container.textContent).toContain('⇧');
    });

    it('maps escape to Esc', async () => {
      const { container } = render(Kbd, { key: 'escape' });
      expect(container.textContent).toContain('Esc');
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Kbd, { keys: ['A'], size: 'sm' });
      expect(container.querySelector('.mljr-kbd-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Kbd, { keys: ['A'], size: 'lg' });
      expect(container.querySelector('.mljr-kbd-lg')).toBeTruthy();
    });

    it('does not add size class for md (default)', async () => {
      const { container } = render(Kbd, { keys: ['A'], size: 'md' });
      expect(container.querySelector('.mljr-kbd-md')).toBeFalsy();
    });
  });
});
