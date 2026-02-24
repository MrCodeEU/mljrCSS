import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Stepper from '../lib/components/navigation/Stepper.svelte';

describe('Stepper', () => {
  const defaultSteps = [
    { id: 'account', title: 'Account', description: 'Create your account' },
    { id: 'profile', title: 'Profile', description: 'Set up your profile' },
    { id: 'review', title: 'Review', description: 'Review and submit' },
  ];

  describe('Rendering', () => {
    it('renders stepper element', async () => {
      const { container } = render(Stepper, { steps: defaultSteps });
      expect(container.querySelector('.mljr-stepper')).toBeTruthy();
    });

    it('renders all steps', async () => {
      const { container } = render(Stepper, { steps: defaultSteps });
      // Stepper uses .mljr-step for each step (not .mljr-stepper-step)
      const stepEls = container.querySelectorAll('.mljr-step');
      expect(stepEls.length).toBe(3);
    });

    it('renders step titles', async () => {
      const { container } = render(Stepper, { steps: defaultSteps });
      const text = container.textContent ?? '';
      expect(text).toContain('Account');
      expect(text).toContain('Profile');
      expect(text).toContain('Review');
    });
  });

  describe('Current step', () => {
    it('marks the current step as active', async () => {
      const { container } = render(Stepper, { steps: defaultSteps, currentStep: 1 });
      const activeStep = container.querySelector('.mljr-step-active');
      expect(activeStep).toBeTruthy();
    });

    it('marks completed steps', async () => {
      const { container } = render(Stepper, { steps: defaultSteps, currentStep: 2 });
      const completedSteps = container.querySelectorAll('.mljr-step-completed');
      expect(completedSteps.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Orientation', () => {
    it('applies horizontal class by default', async () => {
      const { container } = render(Stepper, { steps: defaultSteps });
      expect(container.querySelector('.mljr-stepper-horizontal')).toBeTruthy();
    });

    it('applies vertical class', async () => {
      const { container } = render(Stepper, { steps: defaultSteps, orientation: 'vertical' });
      expect(container.querySelector('.mljr-stepper-vertical')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Stepper, { steps: defaultSteps, size: 'sm' });
      expect(container.querySelector('.mljr-stepper-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Stepper, { steps: defaultSteps, size: 'lg' });
      expect(container.querySelector('.mljr-stepper-lg')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('calls onStepClick when allowClick is true', async () => {
      const handleClick = vi.fn();
      const { container } = render(Stepper, {
        steps: defaultSteps,
        currentStep: 2,
        allowClick: true,
        onStepClick: handleClick,
      });
      const firstStep = container.querySelector('.mljr-step-completed') as HTMLElement;
      firstStep?.click();
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
