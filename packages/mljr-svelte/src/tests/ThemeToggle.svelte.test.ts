import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ThemeToggle from '../lib/components/layout/ThemeToggle.svelte';
import { themeStore } from '../lib/stores/theme.svelte';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Reset theme to light for each test
    themeStore.setTheme('light');
  });

  describe('Rendering', () => {
    it('renders toggle element', async () => {
      const { container } = render(ThemeToggle);
      
      const toggle = container.querySelector('.mljr-theme-toggle, .mljr-theme-toggle-simple, .mljr-theme-toggle-segmented');
      expect(toggle).toBeTruthy();
    });

    it('renders default variant', async () => {
      const { container } = render(ThemeToggle);
      
      expect(container.querySelector('.mljr-theme-toggle')).toBeTruthy();
    });

    it('renders simple variant', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'simple',
      });
      
      expect(container.querySelector('.mljr-theme-toggle-simple')).toBeTruthy();
    });

    it('renders segmented variant', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'segmented',
      });
      
      expect(container.querySelector('.mljr-theme-toggle-segmented')).toBeTruthy();
    });

    it('applies size classes', async () => {
      const { container } = render(ThemeToggle, {
        size: 'lg',
      });
      
      const toggle = container.querySelector('[data-size="lg"]');
      expect(toggle).toBeTruthy();
    });
  });

  describe('Simple Variant', () => {
    it('displays sun icon in dark mode', async () => {
      themeStore.setTheme('dark');
      
      const { container } = render(ThemeToggle, { variant: 'simple' });
      
      expect(container.querySelector('.mljr-theme-toggle-simple')).toBeTruthy();
    });

    it('displays moon icon in light mode', async () => {
      themeStore.setTheme('light');
      
      const { container } = render(ThemeToggle, { variant: 'simple' });
      
      expect(container.querySelector('.mljr-theme-toggle-simple')).toBeTruthy();
    });
  });

  describe('Segmented Variant', () => {
    it('renders three options', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'segmented',
      });
      
      const buttons = container.querySelectorAll('.mljr-theme-toggle-segmented-btn');
      expect(buttons.length).toBe(3);
    });

    it('marks active theme as selected', async () => {
      themeStore.setTheme('dark');
      
      const { container } = render(ThemeToggle, {
        variant: 'segmented',
      });
      
      const activeButton = container.querySelector('.mljr-theme-toggle-segmented-btn.active');
      expect(activeButton).toBeTruthy();
    });

    it('has proper radio group role', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'segmented',
      });
      
      expect(container.querySelector('[role="radiogroup"]')).toBeTruthy();
    });

    it('buttons have radio role', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'segmented',
      });
      
      expect(container.querySelector('[role="radio"]')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label for simple variant', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'simple',
      });
      
      const toggle = container.querySelector('.mljr-theme-toggle-simple');
      expect(toggle?.getAttribute('aria-label')).toContain('mode');
    });

    it('has aria-label for segmented variant', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'segmented',
      });
      
      const group = container.querySelector('[role="radiogroup"]');
      expect(group?.getAttribute('aria-label')).toBe('Theme selection');
    });

    it('shows labels when showLabels is true', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'segmented',
        showLabels: true,
      });
      
      const labels = container.querySelectorAll('.mljr-theme-toggle-label');
      expect(labels.length).toBe(3);
    });
  });

  describe('Dropdown Variant', () => {
    it('renders dropdown menu', async () => {
      const { container } = render(ThemeToggle, {
        variant: 'default',
      });
      
      // Menu is hidden by default but in DOM
      expect(container.querySelector('.mljr-theme-toggle-menu')).toBeTruthy();
    });

    it('shows current theme in button', async () => {
      themeStore.setTheme('dark');
      
      const { container } = render(ThemeToggle, {
        variant: 'default',
        showLabels: true,
      });
      
      const label = container.querySelector('.mljr-theme-toggle-label');
      expect(label?.textContent).toContain('Dark');
    });
  });
});
