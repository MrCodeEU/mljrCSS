import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import AlertDialog from '../lib/components/overlay/AlertDialog.svelte';

function queryDialog(selector: string) {
  return document.body.querySelector(selector);
}

afterEach(() => {
  document.body.querySelectorAll('.mljr-alert-dialog-overlay').forEach((el) => el.remove());
  document.body.style.overflow = '';
});

describe('AlertDialog', () => {
  describe('Rendering', () => {
    it('renders when open=true', async () => {
      render(AlertDialog, { open: true, title: 'Delete item?' });
      expect(queryDialog('.mljr-alert-dialog')).toBeTruthy();
    });

    it('does not render when open=false', async () => {
      render(AlertDialog, { open: false });
      expect(queryDialog('.mljr-alert-dialog')).toBeFalsy();
    });

    it('renders title', async () => {
      render(AlertDialog, { open: true, title: 'Are you sure?' });
      expect(queryDialog('.mljr-alert-dialog-title')?.textContent).toContain('Are you sure?');
    });

    it('renders description', async () => {
      render(AlertDialog, { open: true, description: 'This cannot be undone.' });
      expect(queryDialog('.mljr-alert-dialog-description')?.textContent).toContain('This cannot be undone.');
    });

    it('renders custom confirm and cancel labels', async () => {
      render(AlertDialog, { open: true, confirmLabel: 'Delete', cancelLabel: 'Keep' });
      const actions = queryDialog('.mljr-alert-dialog-actions');
      expect(actions?.textContent).toContain('Delete');
      expect(actions?.textContent).toContain('Keep');
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'danger', 'warning'] as const;

    variants.forEach((variant) => {
      it(`applies data-variant="${variant}"`, async () => {
        render(AlertDialog, { open: true, variant });
        expect(queryDialog(`[data-variant="${variant}"]`)).toBeTruthy();
      });
    });

    it('danger variant uses mljr-btn-danger on confirm button', async () => {
      render(AlertDialog, { open: true, variant: 'danger' });
      const buttons = document.body.querySelectorAll('.mljr-alert-dialog-actions button');
      const confirmBtn = buttons[buttons.length - 1] as HTMLElement;
      expect(confirmBtn.classList.contains('mljr-btn-danger')).toBe(true);
    });

    it('default variant uses mljr-btn-primary on confirm button', async () => {
      render(AlertDialog, { open: true, variant: 'default' });
      const buttons = document.body.querySelectorAll('.mljr-alert-dialog-actions button');
      const confirmBtn = buttons[buttons.length - 1] as HTMLElement;
      expect(confirmBtn.classList.contains('mljr-btn-primary')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has role="alertdialog"', async () => {
      render(AlertDialog, { open: true });
      expect(queryDialog('[role="alertdialog"]')).toBeTruthy();
    });

    it('has aria-modal="true"', async () => {
      render(AlertDialog, { open: true });
      expect(queryDialog('[aria-modal="true"]')).toBeTruthy();
    });

    it('has aria-labelledby when title is set', async () => {
      render(AlertDialog, { open: true, title: 'Confirm' });
      const dialog = queryDialog('[role="alertdialog"]') as HTMLElement;
      expect(dialog?.getAttribute('aria-labelledby')).toBeTruthy();
    });

    it('does not have aria-labelledby when title is empty', async () => {
      render(AlertDialog, { open: true });
      const dialog = queryDialog('[role="alertdialog"]') as HTMLElement;
      expect(dialog?.getAttribute('aria-labelledby')).toBeFalsy();
    });

    it('has aria-describedby when description is set', async () => {
      render(AlertDialog, { open: true, description: 'Some detail.' });
      const dialog = queryDialog('[role="alertdialog"]') as HTMLElement;
      expect(dialog?.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('does not have aria-describedby when description is empty', async () => {
      render(AlertDialog, { open: true });
      const dialog = queryDialog('[role="alertdialog"]') as HTMLElement;
      expect(dialog?.getAttribute('aria-describedby')).toBeFalsy();
    });

    it('sets body overflow to hidden while open', async () => {
      render(AlertDialog, { open: true });
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('Keyboard', () => {
    it('calls oncancel when Escape is pressed', async () => {
      const oncancel = vi.fn();
      render(AlertDialog, { open: true, oncancel });
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(oncancel).toHaveBeenCalledOnce();
    });
  });

  describe('Backdrop', () => {
    it('renders overlay element for backdrop click handling', async () => {
      render(AlertDialog, { open: true });
      const overlay = document.body.querySelector('.mljr-alert-dialog-overlay');
      // Overlay must exist for backdrop-click-to-dismiss to work
      expect(overlay).toBeTruthy();
    });

    it('dialog is nested inside overlay (not a sibling)', async () => {
      render(AlertDialog, { open: true });
      const overlay = document.body.querySelector('.mljr-alert-dialog-overlay');
      const dialog = overlay?.querySelector('.mljr-alert-dialog');
      // Dialog must be a child of overlay so target !== currentTarget when clicking dialog
      expect(dialog).toBeTruthy();
    });
  });

  describe('Callbacks', () => {
    it('calls onconfirm when confirm button is clicked', async () => {
      const onconfirm = vi.fn();
      render(AlertDialog, { open: true, confirmLabel: 'OK', onconfirm });
      const buttons = document.body.querySelectorAll('.mljr-alert-dialog-actions button');
      // Confirm is the last button
      (buttons[buttons.length - 1] as HTMLElement).click();
      expect(onconfirm).toHaveBeenCalledOnce();
    });

    it('calls oncancel when cancel button is clicked', async () => {
      const oncancel = vi.fn();
      render(AlertDialog, { open: true, cancelLabel: 'No', oncancel });
      const buttons = document.body.querySelectorAll('.mljr-alert-dialog-actions button');
      // Cancel is the first button
      (buttons[0] as HTMLElement).click();
      expect(oncancel).toHaveBeenCalledOnce();
    });
  });
});
