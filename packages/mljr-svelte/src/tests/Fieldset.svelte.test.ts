import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Fieldset from '../lib/components/forms/Fieldset.svelte';

describe('Fieldset', () => {
  describe('Rendering', () => {
    it('renders fieldset element', async () => {
      const { container } = render(Fieldset);
      expect(container.querySelector('fieldset.mljr-fieldset')).toBeTruthy();
    });

    it('renders legend when provided', async () => {
      const { container } = render(Fieldset, { legend: 'Personal Info' });
      expect(container.querySelector('.mljr-fieldset-legend')?.textContent).toContain('Personal Info');
    });

    it('does not render legend when not provided', async () => {
      const { container } = render(Fieldset);
      expect(container.querySelector('.mljr-fieldset-legend')).toBeFalsy();
    });
  });

  describe('Disabled state', () => {
    it('disables fieldset when disabled=true', async () => {
      const { container } = render(Fieldset, { disabled: true });
      const fieldset = container.querySelector('fieldset') as HTMLFieldSetElement;
      expect(fieldset?.disabled).toBe(true);
    });

    it('fieldset is not disabled by default', async () => {
      const { container } = render(Fieldset);
      const fieldset = container.querySelector('fieldset') as HTMLFieldSetElement;
      expect(fieldset?.disabled).toBe(false);
    });
  });
});
