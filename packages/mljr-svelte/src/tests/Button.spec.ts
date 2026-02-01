import { test, expect } from '@playwright/experimental-ct-svelte';
import Button from '../lib/components/Button.svelte';

test.describe('Button', () => {
  test.describe('Rendering', () => {
    test('renders with default props', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          children: 'Click me',
        },
      });
      await expect(component).toContainText('Click me');
      await expect(component).toHaveClass(/mljr-btn/);
    });

    test('applies variant classes correctly', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          variant: 'secondary',
          children: 'Secondary',
        },
      });
      await expect(component).toHaveClass(/mljr-btn-secondary/);
    });

    test('applies size classes correctly', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          size: 'lg',
          children: 'Large',
        },
      });
      await expect(component).toHaveClass(/mljr-btn-lg/);
    });

    test('applies block class when block prop is true', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          block: true,
          children: 'Block',
        },
      });
      await expect(component).toHaveClass(/w-full/);
    });

    test('applies custom className', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          class: 'custom-class',
          children: 'Custom',
        },
      });
      await expect(component).toHaveClass(/custom-class/);
    });
  });

  test.describe('Interaction', () => {
    test('handles click events', async ({ mount }) => {
      let clicked = false;
      const component = await mount(Button, {
        props: {
          children: 'Click me',
          onclick: () => {
            clicked = true;
          },
        },
      });
      
      await component.click();
      expect(clicked).toBe(true);
    });

    test('does not fire click when disabled', async ({ mount }) => {
      let clicked = false;
      const component = await mount(Button, {
        props: {
          children: 'Click me',
          disabled: true,
          onclick: () => {
            clicked = true;
          },
        },
      });
      
      await component.click({ force: true });
      expect(clicked).toBe(false);
    });

    test('does not fire click when loading', async ({ mount }) => {
      let clicked = false;
      const component = await mount(Button, {
        props: {
          children: 'Click me',
          loading: true,
          onclick: () => {
            clicked = true;
          },
        },
      });
      
      await component.click({ force: true });
      expect(clicked).toBe(false);
    });
  });

  test.describe('States', () => {
    test('is disabled when disabled prop is true', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          children: 'Disabled',
          disabled: true,
        },
      });
      await expect(component).toBeDisabled();
    });

    test('is disabled when loading prop is true', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          children: 'Loading',
          loading: true,
        },
      });
      await expect(component).toBeDisabled();
    });

    test('applies loading class when loading', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          children: 'Loading',
          loading: true,
        },
      });
      await expect(component).toHaveClass(/mljr-btn-loading/);
    });
  });

  test.describe('Accessibility', () => {
    test('has correct button type by default', async ({ mount }) => {
      const component = await mount(Button, {
        props: {
          children: 'Button',
        },
      });
      await expect(component).toHaveAttribute('type', 'button');
    });

    test('can be keyboard navigated', async ({ mount, page }) => {
      const component = await mount(Button, {
        props: {
          children: 'Keyboard',
        },
      });
      
      await page.keyboard.press('Tab');
      await expect(component).toBeFocused();
    });
  });
});
