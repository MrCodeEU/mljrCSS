import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Alert from '../lib/components/feedback/Alert.svelte';

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders alert element', async () => {
      const { container } = render(Alert, {
        title: 'Test Alert',
      });
      
      expect(container.querySelector('.mljr-alert')).toBeTruthy();
    });

    it('renders title', async () => {
      const { container } = render(Alert, {
        title: 'Important Notice',
      });
      
      expect(container.textContent).toContain('Important Notice');
    });

    it('applies variant classes', async () => {
      const { container } = render(Alert, {
        title: 'Success',
        variant: 'success',
      });
      
      const alert = container.querySelector('.mljr-alert');
      expect(alert?.classList.contains('mljr-alert-success')).toBe(true);
    });

    it('applies solid variant', async () => {
      const { container } = render(Alert, {
        title: 'Success',
        variant: 'success',
        solid: true,
      });
      
      const alert = container.querySelector('.mljr-alert');
      expect(alert?.classList.contains('mljr-alert-success-solid')).toBe(true);
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'info', 'success', 'warning', 'error', 'primary', 'secondary'] as const;
    
    variants.forEach(variant => {
      it(`applies ${variant} variant class`, async () => {
        const { container } = render(Alert, {
          title: 'Test',
          variant,
        });
        
        const alert = container.querySelector('.mljr-alert');
        expect(alert?.classList.contains(`mljr-alert-${variant}`)).toBe(true);
      });
    });
  });

  describe('Dismissible', () => {
    it('shows close button when dismissible', async () => {
      const { container } = render(Alert, {
        title: 'Test',
        dismissible: true,
      });
      
      expect(container.querySelector('.mljr-alert-close')).toBeTruthy();
    });

    it('hides close button when not dismissible', async () => {
      const { container } = render(Alert, {
        title: 'Test',
        dismissible: false,
      });
      
      expect(container.querySelector('.mljr-alert-close')).toBeFalsy();
    });

    it('calls onclose when close button clicked', async () => {
      const handleClose = vi.fn();
      const { container } = render(Alert, {
        title: 'Test',
        dismissible: true,
        onclose: handleClose,
      });
      
      const closeBtn = container.querySelector('.mljr-alert-close');
      (closeBtn as HTMLElement)?.click();
      
      expect(handleClose).toHaveBeenCalledOnce();
    });
  });

  describe('Accessibility', () => {
    it('has role="alert"', async () => {
      const { container } = render(Alert, {
        title: 'Test',
      });
      
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeTruthy();
    });
  });
});
