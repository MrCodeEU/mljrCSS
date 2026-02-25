import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Chip from '../lib/components/display/Chip.svelte';

describe('Chip', () => {
  describe('Rendering', () => {
    it('renders chip element', async () => {
      const { container } = render(Chip);
      expect(container.querySelector('.mljr-chip')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'outline'] as const;

    variants.forEach((variant) => {
      it(`applies ${variant} variant`, async () => {
        const { container } = render(Chip, { variant });
        const chip = container.querySelector('.mljr-chip');
        if (variant === 'default') {
          expect(chip).toBeTruthy();
        } else {
          expect(chip?.classList.contains(`mljr-chip-${variant}`)).toBe(true);
        }
      });
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Chip, { size: 'sm' });
      expect(container.querySelector('.mljr-chip-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Chip, { size: 'lg' });
      expect(container.querySelector('.mljr-chip-lg')).toBeTruthy();
    });
  });

  describe('Removable', () => {
    it('shows remove button when removable', async () => {
      const { container } = render(Chip, { removable: true });
      expect(container.querySelector('.mljr-chip-remove')).toBeTruthy();
    });

    it('calls onRemove when remove clicked', async () => {
      const handleRemove = vi.fn();
      const { container } = render(Chip, { removable: true, onRemove: handleRemove });
      const removeBtn = container.querySelector('.mljr-chip-remove') as HTMLElement;
      removeBtn?.click();
      expect(handleRemove).toHaveBeenCalledOnce();
    });
  });

  describe('Disabled', () => {
    it('applies disabled attribute/class', async () => {
      const { container } = render(Chip, { disabled: true });
      const chip = container.querySelector('.mljr-chip');
      // disabled chips either have aria-disabled or a disabled class
      const isDisabled =
        chip?.hasAttribute('disabled') ||
        chip?.getAttribute('aria-disabled') === 'true' ||
        chip?.classList.contains('mljr-chip-disabled');
      expect(isDisabled).toBe(true);
    });
  });
});
