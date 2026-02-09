import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Icon from '../lib/components/Icon.svelte';

describe('Icon', () => {
  describe('Rendering', () => {
    it('renders icon element', async () => {
      const { container } = render(Icon, {
        icon: 'ph:house',
      });
      
      expect(container.querySelector('.mljr-icon')).toBeTruthy();
    });

    it('applies size correctly', async () => {
      const { container } = render(Icon, {
        icon: 'ph:house',
        size: 32,
      });
      
      const icon = container.querySelector('.mljr-icon');
      expect(icon?.getAttribute('style')).toContain('--icon-size');
    });

    it('applies custom className', async () => {
      const { container } = render(Icon, {
        icon: 'ph:house',
        class: 'custom-icon-class',
      });
      
      const icon = container.querySelector('.mljr-icon');
      expect(icon?.classList.contains('custom-icon-class')).toBe(true);
    });

    it('renders with color style', async () => {
      const { container } = render(Icon, {
        icon: 'ph:house',
        color: '#F97316',
      });
      
      const icon = container.querySelector('.mljr-icon');
      expect(icon?.getAttribute('style')).toContain('color');
    });
  });

  describe('Props', () => {
    it('accepts icon prop', async () => {
      const { container } = render(Icon, {
        icon: 'ph:star',
      });
      
      expect(container.innerHTML).toContain('ph:star');
    });

    it('accepts width and height props', async () => {
      const { container } = render(Icon, {
        icon: 'ph:house',
        width: 40,
        height: 40,
      });
      
      expect(container.querySelector('.mljr-icon')).toBeTruthy();
    });

    it('accepts hFlip prop', async () => {
      const { container } = render(Icon, {
        icon: 'ph:arrow-right',
        hFlip: true,
      });
      
      expect(container.querySelector('.mljr-icon')).toBeTruthy();
    });

    it('accepts vFlip prop', async () => {
      const { container } = render(Icon, {
        icon: 'ph:arrow-up',
        vFlip: true,
      });
      
      expect(container.querySelector('.mljr-icon')).toBeTruthy();
    });

    it('accepts rotate prop', async () => {
      const { container } = render(Icon, {
        icon: 'ph:arrow-right',
        rotate: 2,
      });
      
      expect(container.querySelector('.mljr-icon')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label', async () => {
      const { container } = render(Icon, {
        icon: 'ph:house',
      });
      
      const icon = container.querySelector('.mljr-icon');
      expect(icon?.getAttribute('aria-label')).toBe('ph:house');
    });

    it('has role="img"', async () => {
      const { container } = render(Icon, {
        icon: 'ph:house',
      });
      
      const icon = container.querySelector('.mljr-icon');
      expect(icon?.getAttribute('role')).toBe('img');
    });
  });

  describe('Fallback', () => {
    it('shows fallback for invalid icon', async () => {
      const { container } = render(Icon, {
        icon: 'invalid:icon:name',
      });
      
      // Component should still render even if icon fails to load
      expect(container.querySelector('.mljr-icon')).toBeTruthy();
    });
  });
});
