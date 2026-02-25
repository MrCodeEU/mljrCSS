import { describe, it, expect, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import Toast from '../lib/components/feedback/Toast.svelte';
import { toastStore } from '../lib/stores/toast.svelte';

afterEach(() => {
  toastStore.clear();
  document.body.querySelectorAll('.mljr-toast-container').forEach((el) => el.remove());
});

function queryToast(selector: string) {
  return document.body.querySelector(selector);
}

describe('Toast', () => {
  describe('Rendering', () => {
    it('renders nothing when no toasts present', async () => {
      render(Toast);
      expect(queryToast('.mljr-toast-container')).toBeFalsy();
    });

    it('renders toast container when toasts are present', async () => {
      toastStore.add({ type: 'info', message: 'Hello' });
      render(Toast);
      await Promise.resolve();
      expect(queryToast('.mljr-toast-container')).toBeTruthy();
    });

    it('renders toast message', async () => {
      toastStore.add({ type: 'info', message: 'Test message' });
      render(Toast);
      await Promise.resolve();
      expect(queryToast('.mljr-toast-message')?.textContent).toContain('Test message');
    });

    it('renders toast title when provided', async () => {
      toastStore.add({ type: 'success', message: 'Done', title: 'Success!' });
      render(Toast);
      await Promise.resolve();
      expect(queryToast('.mljr-toast-title')?.textContent).toContain('Success!');
    });
  });

  describe('Types', () => {
    const types = ['info', 'success', 'warning', 'error'] as const;
    types.forEach((type) => {
      it(`renders ${type} toast type`, async () => {
        toastStore.add({ type, message: `${type} message` });
        render(Toast);
        await Promise.resolve();
        expect(queryToast(`.mljr-toast-${type}`)).toBeTruthy();
      });
    });
  });

  describe('Positions', () => {
    const positions = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'] as const;
    positions.forEach((position) => {
      it(`applies ${position} position class`, async () => {
        toastStore.add({ type: 'info', message: 'msg' });
        render(Toast, { position });
        await Promise.resolve();
        expect(queryToast(`.mljr-toast-container-${position}`)).toBeTruthy();
      });
    });
  });

  describe('Dismissible', () => {
    it('renders close button when dismissible=true', async () => {
      toastStore.add({ type: 'info', message: 'Dismissible', dismissible: true });
      render(Toast);
      await Promise.resolve();
      expect(queryToast('.mljr-toast-close')).toBeTruthy();
    });
  });
});
