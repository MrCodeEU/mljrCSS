import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Badge from '../lib/components/feedback/Badge.svelte';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders badge element', async () => {
      const { container } = render(Badge);
      expect(container.querySelector('.mljr-badge')).toBeTruthy();
    });

    it('applies default variant class', async () => {
      const { container } = render(Badge);
      expect(container.querySelector('.mljr-badge-default')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;

    variants.forEach((variant) => {
      it(`applies ${variant} variant`, async () => {
        const { container } = render(Badge, { variant });
        expect(container.querySelector(`.mljr-badge-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Badge, { size: 'sm' });
      expect(container.querySelector('.mljr-badge-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Badge, { size: 'lg' });
      expect(container.querySelector('.mljr-badge-lg')).toBeTruthy();
    });
  });

  describe('Modifiers', () => {
    it('applies solid modifier (switches to solid class per variant)', async () => {
      const { container } = render(Badge, { variant: 'primary', solid: true });
      // solid replaces the base variant class with e.g. mljr-badge-primary-solid
      expect(container.querySelector('.mljr-badge-primary-solid')).toBeTruthy();
    });

    it('applies outline modifier (switches to outline class per variant)', async () => {
      const { container } = render(Badge, { variant: 'primary', outline: true });
      // primary outline class is mljr-badge-outline-primary
      expect(container.querySelector('.mljr-badge-outline-primary')).toBeTruthy();
    });

    it('applies dot modifier', async () => {
      const { container } = render(Badge, { dot: true });
      expect(container.querySelector('.mljr-badge-dot')).toBeTruthy();
    });
  });

  describe('Removable', () => {
    it('shows remove button when removable', async () => {
      const { container } = render(Badge, { removable: true });
      expect(container.querySelector('.mljr-badge-remove')).toBeTruthy();
    });

    it('calls onremove when remove button clicked', async () => {
      const handleRemove = vi.fn();
      const { container } = render(Badge, { removable: true, onremove: handleRemove });
      const removeBtn = container.querySelector('.mljr-badge-remove') as HTMLElement;
      removeBtn?.click();
      expect(handleRemove).toHaveBeenCalledOnce();
    });

    it('does not show remove button when not removable', async () => {
      const { container } = render(Badge);
      expect(container.querySelector('.mljr-badge-remove')).toBeFalsy();
    });
  });

  describe('Custom class', () => {
    it('applies custom class', async () => {
      const { container } = render(Badge, { class: 'my-badge' });
      expect(container.querySelector('.my-badge')).toBeTruthy();
    });
  });
});
