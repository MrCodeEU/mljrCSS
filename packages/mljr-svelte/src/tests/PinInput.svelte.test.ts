import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from '@vitest/browser/context';
import PinInput from '../lib/components/forms/PinInput.svelte';

describe('PinInput', () => {
  describe('Rendering', () => {
    it('renders the container', async () => {
      const { container } = render(PinInput);
      expect(container.querySelector('.mljr-pin-input')).toBeTruthy();
    });

    it('renders 4 digit inputs by default', async () => {
      const { container } = render(PinInput);
      const inputs = container.querySelectorAll('.mljr-pin-digit');
      expect(inputs.length).toBe(4);
    });

    it('renders custom length of 6', async () => {
      const { container } = render(PinInput, { length: 6 });
      const inputs = container.querySelectorAll('.mljr-pin-digit');
      expect(inputs.length).toBe(6);
    });

    it('renders toggle button when masked=true (default)', async () => {
      const { container } = render(PinInput, { masked: true, showToggle: true });
      expect(container.querySelector('.mljr-pin-toggle')).toBeTruthy();
    });

    it('does not render toggle when showToggle=false', async () => {
      const { container } = render(PinInput, { showToggle: false });
      expect(container.querySelector('.mljr-pin-toggle')).toBeFalsy();
    });

    it('does not render toggle when masked=false', async () => {
      const { container } = render(PinInput, { masked: false });
      expect(container.querySelector('.mljr-pin-toggle')).toBeFalsy();
    });
  });

  describe('Input types', () => {
    it('uses type=password when masked=true and not revealed', async () => {
      const { container } = render(PinInput, { masked: true });
      const inputs = container.querySelectorAll<HTMLInputElement>('.mljr-pin-digit');
      expect(inputs[0].type).toBe('password');
    });

    it('uses type=text when masked=false', async () => {
      const { container } = render(PinInput, { masked: false });
      const inputs = container.querySelectorAll<HTMLInputElement>('.mljr-pin-digit');
      expect(inputs[0].type).toBe('text');
    });
  });

  describe('Initial value', () => {
    it('pre-fills digits from value prop', async () => {
      const { container } = render(PinInput, { value: '1234', masked: false, length: 4 });
      const inputs = container.querySelectorAll<HTMLInputElement>('.mljr-pin-digit');
      expect(inputs[0].value).toBe('1');
      expect(inputs[3].value).toBe('4');
    });
  });

  describe('State variants', () => {
    it('applies error class when state=error', async () => {
      const { container } = render(PinInput, { status:'error' });
      expect(container.querySelector('.mljr-pin-input-error')).toBeTruthy();
    });

    it('applies success class when state=success', async () => {
      const { container } = render(PinInput, { status:'success' });
      expect(container.querySelector('.mljr-pin-input-success')).toBeTruthy();
    });

    it('shows message text', async () => {
      const { container } = render(PinInput, { message: 'Enter your PIN', status:'default' });
      expect(container.textContent).toContain('Enter your PIN');
    });

    it('error message has alert role', async () => {
      const { container } = render(PinInput, { message: 'Wrong PIN', status:'error' });
      const msg = container.querySelector('.mljr-pin-message');
      expect(msg?.getAttribute('role')).toBe('alert');
    });
  });

  describe('Size variants', () => {
    it('applies sm class to digits when size=sm', async () => {
      const { container } = render(PinInput, { size: 'sm' });
      expect(container.querySelector('.mljr-pin-digit-sm')).toBeTruthy();
    });

    it('applies lg class to digits when size=lg', async () => {
      const { container } = render(PinInput, { size: 'lg' });
      expect(container.querySelector('.mljr-pin-digit-lg')).toBeTruthy();
    });

    it('applies no size class by default (md)', async () => {
      const { container } = render(PinInput);
      expect(container.querySelector('.mljr-pin-digit-sm')).toBeFalsy();
      expect(container.querySelector('.mljr-pin-digit-lg')).toBeFalsy();
    });
  });

  describe('Separator', () => {
    it('renders separator element when provided', async () => {
      const { container } = render(PinInput, { length: 6, separator: '-', separatorAt: 3 });
      expect(container.querySelector('.mljr-pin-separator')).toBeTruthy();
    });

    it('does not render separator when separatorAt=0', async () => {
      const { container } = render(PinInput, { length: 6, separator: '-', separatorAt: 0 });
      expect(container.querySelector('.mljr-pin-separator')).toBeFalsy();
    });
  });

  describe('Disabled state', () => {
    it('disables all inputs when disabled=true', async () => {
      const { container } = render(PinInput, { disabled: true });
      const inputs = container.querySelectorAll<HTMLInputElement>('.mljr-pin-digit');
      inputs.forEach(input => expect(input.disabled).toBe(true));
    });
  });

  describe('Custom class', () => {
    it('applies custom CSS class', async () => {
      const { container } = render(PinInput, { class: 'my-pin' });
      expect(container.querySelector('.my-pin')).toBeTruthy();
    });
  });

  describe('Filled state', () => {
    it('sets data-filled attribute on filled digits', async () => {
      const { container } = render(PinInput, { value: '12', length: 4, masked: false });
      const inputs = container.querySelectorAll<HTMLInputElement>('.mljr-pin-digit');
      expect(inputs[0].dataset.filled).toBe('true');
      expect(inputs[1].dataset.filled).toBe('true');
      expect(inputs[2].dataset.filled).toBe('false');
    });
  });

  describe('Keyboard navigation', () => {
    it('focuses next input after entering a digit', async () => {
      const { container } = render(PinInput, { masked: false });
      const inputs = container.querySelectorAll<HTMLInputElement>('.mljr-pin-digit');
      inputs[0].focus();
      await userEvent.type(inputs[0], '5');
      // The second input should receive focus
      expect(document.activeElement).toBe(inputs[1]);
    });
  });
});
