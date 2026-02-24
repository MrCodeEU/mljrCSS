import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Modal from '../lib/components/overlay/Modal.svelte';

// Modal uses a portal action that appends to document.body
// so we query document.body instead of container
function queryModal(selector: string) {
  return document.body.querySelector(selector);
}

afterEach(() => {
  // Clean up any portaled modals left in body
  document.body.querySelectorAll('.mljr-modal-backdrop').forEach((el) => el.remove());
  document.body.style.overflow = '';
});

describe('Modal', () => {
  describe('Rendering when open', () => {
    it('renders modal when open=true', async () => {
      render(Modal, { open: true, title: 'Test Modal' });
      expect(queryModal('.mljr-modal')).toBeTruthy();
    });

    it('renders modal title', async () => {
      render(Modal, { open: true, title: 'Confirm Action' });
      expect(queryModal('.mljr-modal-title')?.textContent).toContain('Confirm Action');
    });

    it('renders modal description', async () => {
      render(Modal, { open: true, description: 'Are you sure?' });
      expect(queryModal('.mljr-modal-description')?.textContent).toContain('Are you sure?');
    });

    it('shows close button by default', async () => {
      render(Modal, { open: true });
      expect(queryModal('.mljr-modal-close')).toBeTruthy();
    });

    it('hides close button when showClose=false', async () => {
      render(Modal, { open: true, showClose: false });
      expect(queryModal('.mljr-modal-close')).toBeFalsy();
    });
  });

  describe('Rendering when closed', () => {
    it('does not render modal content when open=false', async () => {
      render(Modal, { open: false });
      expect(queryModal('.mljr-modal')).toBeFalsy();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'lg', 'xl', 'full'] as const;

    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        render(Modal, { open: true, size });
        expect(queryModal(`.mljr-modal-${size}`)).toBeTruthy();
      });
    });
  });

  describe('Interaction', () => {
    it('calls onclose when close button is clicked', async () => {
      const handleClose = vi.fn();
      render(Modal, { open: true, showClose: true, onclose: handleClose });
      const closeBtn = queryModal('.mljr-modal-close') as HTMLElement;
      closeBtn?.click();
      expect(handleClose).toHaveBeenCalledOnce();
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog"', async () => {
      render(Modal, { open: true });
      const dialog = queryModal('[role="dialog"]');
      expect(dialog).toBeTruthy();
    });

    it('has aria-modal="true"', async () => {
      render(Modal, { open: true });
      const dialog = queryModal('[aria-modal="true"]');
      expect(dialog).toBeTruthy();
    });
  });
});
