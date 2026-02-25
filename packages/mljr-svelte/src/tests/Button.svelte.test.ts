import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Button from '../lib/components/forms/Button.svelte';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders button element', async () => {
      const { container } = render(Button);
      
      expect(container.querySelector('button')).toBeTruthy();
    });

    it('renders with default variant', async () => {
      const { container } = render(Button);
      
      const button = container.querySelector('button');
      expect(button?.classList.contains('mljr-btn')).toBe(true);
    });

    it('applies primary variant class', async () => {
      const { container } = render(Button, { variant: 'primary' });
      
      const button = container.querySelector('button');
      expect(button?.classList.contains('mljr-btn-primary')).toBe(true);
    });

    it('applies secondary variant class', async () => {
      const { container } = render(Button, { variant: 'secondary' });
      
      const button = container.querySelector('button');
      expect(button?.classList.contains('mljr-btn-secondary')).toBe(true);
    });

    it('applies size classes correctly', async () => {
      const { container: containerSm } = render(Button, { size: 'sm' });
      expect(containerSm.querySelector('button')?.classList.contains('mljr-btn-sm')).toBe(true);
      
      const { container: containerLg } = render(Button, { size: 'lg' });
      expect(containerLg.querySelector('button')?.classList.contains('mljr-btn-lg')).toBe(true);
    });

    it('applies block class when block prop is true', async () => {
      const { container } = render(Button, {
        block: true,
      });
      
      const button = container.querySelector('button');
      expect(button?.classList.contains('mljr-btn-block')).toBe(true);
    });

    it('applies icon class when icon prop is true', async () => {
      const { container } = render(Button, {
        icon: true,
      });
      
      const button = container.querySelector('button');
      expect(button?.classList.contains('mljr-btn-icon')).toBe(true);
    });

    it('applies custom className', async () => {
      const { container } = render(Button, {
        class: 'custom-class',
      });
      
      const button = container.querySelector('button');
      expect(button?.classList.contains('custom-class')).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const { container } = render(Button, {
        onclick: handleClick,
      });
      
      const button = container.querySelector('button');
      (button as HTMLElement)?.click();
      
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('is disabled when disabled prop is true', async () => {
      const { container } = render(Button, {
        disabled: true,
      });
      
      const button = container.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('is disabled when loading prop is true', async () => {
      const { container } = render(Button, {
        loading: true,
      });
      
      const button = container.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('applies loading class when loading', async () => {
      const { container } = render(Button, {
        loading: true,
      });
      
      const button = container.querySelector('button');
      expect(button?.classList.contains('mljr-btn-loading')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('is a button element', async () => {
      const { container } = render(Button);
      
      expect(container.querySelector('button')).toBeTruthy();
    });

    it('has disabled attribute when disabled', async () => {
      const { container } = render(Button, {
        disabled: true,
      });
      
      const button = container.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });
  });
});
