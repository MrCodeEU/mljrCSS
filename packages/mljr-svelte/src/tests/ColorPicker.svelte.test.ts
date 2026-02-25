import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ColorPicker from '../lib/components/forms/ColorPicker.svelte';

describe('ColorPicker', () => {
  describe('Rendering', () => {
    it('renders colorpicker element', async () => {
      const { container } = render(ColorPicker);
      expect(container.querySelector('.mljr-colorpicker')).toBeTruthy();
    });

    it('renders trigger button', async () => {
      const { container } = render(ColorPicker);
      expect(container.querySelector('.mljr-colorpicker-trigger')).toBeTruthy();
    });

    it('renders color preview', async () => {
      const { container } = render(ColorPicker);
      expect(container.querySelector('.mljr-colorpicker-preview')).toBeTruthy();
    });

    it('renders label when provided', async () => {
      const { container } = render(ColorPicker, { label: 'Pick a color' });
      expect(container.querySelector('.mljr-colorpicker-label')?.textContent).toContain('Pick a color');
    });

    it('preview shows current value color', async () => {
      const { container } = render(ColorPicker, { value: '#FF0000' });
      const preview = container.querySelector('.mljr-colorpicker-preview') as HTMLElement;
      expect(preview?.style.backgroundColor).toBeTruthy();
    });
  });

  describe('Format display', () => {
    it('shows format toggle when showFormat=true (default)', async () => {
      const { container } = render(ColorPicker, { showFormat: true });
      expect(container.querySelector('.mljr-colorpicker-format')).toBeTruthy();
    });

    it('hides format toggle when showFormat=false', async () => {
      const { container } = render(ColorPicker, { showFormat: false });
      expect(container.querySelector('.mljr-colorpicker-format')).toBeFalsy();
    });
  });

  describe('Interaction', () => {
    it('opens picker on trigger click', async () => {
      const { container } = render(ColorPicker);
      const trigger = container.querySelector('.mljr-colorpicker-trigger') as HTMLElement;
      trigger?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-colorpicker.is-open')).toBeTruthy();
    });
  });
});
