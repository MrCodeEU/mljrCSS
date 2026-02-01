import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Button from '../lib/components/Button.svelte';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Button, {
        props: { children: () => 'Click me' },
      });
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click me');
    });

    it('applies variant classes correctly', () => {
      const { container } = render(Button, {
        props: {
          variant: 'primary',
          children: () => 'Primary',
        },
      });
      const button = container.querySelector('button');
      expect(button).toHaveClass('mljr-btn-primary');
    });

    it('applies size classes correctly', () => {
      const { container } = render(Button, {
        props: {
          size: 'lg',
          children: () => 'Large',
        },
      });
      const button = container.querySelector('button');
      expect(button).toHaveClass('mljr-btn-lg');
    });

    it('applies block class when block prop is true', () => {
      const { container } = render(Button, {
        props: {
          block: true,
          children: () => 'Block',
        },
      });
      const button = container.querySelector('button');
      expect(button).toHaveClass('mljr-btn-block');
    });

    it('applies custom className', () => {
      const { container } = render(Button, {
        props: {
          class: 'custom-class',
          children: () => 'Custom',
        },
      });
      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Interaction', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(Button, {
        props: {
          onclick: handleClick,
          children: () => 'Click me',
        },
      });
      const button = container.querySelector('button')!;
      await user.click(button);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('does not fire click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(Button, {
        props: {
          disabled: true,
          onclick: handleClick,
          children: () => 'Disabled',
        },
      });
      const button = container.querySelector('button')!;
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not fire click when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(Button, {
        props: {
          loading: true,
          onclick: handleClick,
          children: () => 'Loading',
        },
      });
      const button = container.querySelector('button')!;
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      const { container } = render(Button, {
        props: {
          disabled: true,
          children: () => 'Disabled',
        },
      });
      const button = container.querySelector('button');
      expect(button).toBeDisabled();
    });

    it('is disabled when loading prop is true', () => {
      const { container } = render(Button, {
        props: {
          loading: true,
          children: () => 'Loading',
        },
      });
      const button = container.querySelector('button');
      expect(button).toBeDisabled();
    });

    it('applies loading class when loading', () => {
      const { container } = render(Button, {
        props: {
          loading: true,
          children: () => 'Loading',
        },
      });
      const button = container.querySelector('button');
      expect(button).toHaveClass('mljr-btn-loading');
    });
  });

  describe('Accessibility', () => {
    it('has correct button type by default', () => {
      const { container } = render(Button, {
        props: { children: () => 'Button' },
      });
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('can be keyboard navigated', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(Button, {
        props: {
          onclick: handleClick,
          children: () => 'Keyboard',
        },
      });
      const button = container.querySelector('button')!;
      button.focus();
      expect(button).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
