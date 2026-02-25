import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import FormWizard from '../lib/components/forms/FormWizard.svelte';

const steps = [
  { id: 'step1', title: 'Personal Info', description: 'Enter your details' },
  { id: 'step2', title: 'Contact', description: 'Your contact info' },
  { id: 'step3', title: 'Review', description: 'Review and submit' },
];

describe('FormWizard', () => {
  describe('Rendering', () => {
    it('renders form wizard element', async () => {
      const { container } = render(FormWizard, { steps });
      expect(container.querySelector('.mljr-form-wizard')).toBeTruthy();
    });

    it('renders progress bar', async () => {
      const { container } = render(FormWizard, { steps });
      expect(container.querySelector('.mljr-wizard-progress')).toBeTruthy();
    });

    it('renders step buttons for each step', async () => {
      const { container } = render(FormWizard, { steps });
      const stepButtons = container.querySelectorAll('.mljr-wizard-step');
      expect(stepButtons.length).toBe(3);
    });

    it('renders step titles', async () => {
      const { container } = render(FormWizard, { steps });
      expect(container.textContent).toContain('Personal Info');
      expect(container.textContent).toContain('Contact');
    });

    it('first step is active by default', async () => {
      const { container } = render(FormWizard, { steps });
      const activeStep = container.querySelector('.mljr-wizard-step.active');
      expect(activeStep).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('navigation buttons are rendered', async () => {
      const { container } = render(FormWizard, { steps });
      expect(container.querySelector('.mljr-wizard-actions')).toBeTruthy();
    });
  });
});
