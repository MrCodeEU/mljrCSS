import { test, expect } from '@playwright/experimental-ct-svelte';
import Carousel from '../lib/components/Carousel.svelte';

test.describe('Carousel', () => {
  test.describe('Rendering', () => {
    test('renders all slides', async ({ mount }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          `,
        },
      });
      await expect(component).toContainText('Slide 1');
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 1');
    });

    test('renders navigation buttons by default', async ({ mount }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      await expect(component.getByRole('button', { name: 'Previous slide' })).toBeVisible();
      await expect(component.getByRole('button', { name: 'Next slide' })).toBeVisible();
    });

    test('hides navigation buttons when showControls is false', async ({ mount }) => {
      const component = await mount(Carousel, {
        props: {
          showControls: false,
        },
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      await expect(component.getByRole('button', { name: 'Previous slide' })).not.toBeVisible();
      await expect(component.getByRole('button', { name: 'Next slide' })).not.toBeVisible();
    });

    test('renders indicators by default', async ({ mount }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          `,
        },
      });
      const indicators = component.locator('.mljr-carousel-indicator');
      await expect(indicators).toHaveCount(3);
    });

    test('hides indicators when showIndicators is false', async ({ mount }) => {
      const component = await mount(Carousel, {
        props: {
          showIndicators: false,
        },
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      const indicators = component.locator('.mljr-carousel-indicator');
      await expect(indicators).toHaveCount(0);
    });

    test('applies variant classes', async ({ mount }) => {
      const component = await mount(Carousel, {
        props: {
          variant: 'fade',
        },
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      await expect(component).toHaveClass(/mljr-carousel-fade/);
    });
  });

  test.describe('Navigation', () => {
    test('moves to next slide on next button click', async ({ mount }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          `,
        },
      });
      
      await component.getByRole('button', { name: 'Next slide' }).click();
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 2');
    });

    test('moves to previous slide on prev button click', async ({ mount }) => {
      const component = await mount(Carousel, {
        props: {
          loop: true,
        },
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          `,
        },
      });
      
      await component.getByRole('button', { name: 'Previous slide' }).click();
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 3');
    });

    test('navigates to specific slide via indicator', async ({ mount }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          `,
        },
      });
      
      const indicators = component.locator('.mljr-carousel-indicator');
      await indicators.nth(2).click();
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 3');
    });

    test('loops to first slide when at end and loop is true', async ({ mount }) => {
      const component = await mount(Carousel, {
        props: {
          loop: true,
        },
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      
      await component.getByRole('button', { name: 'Next slide' }).click();
      await component.getByRole('button', { name: 'Next slide' }).click();
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 1');
    });

    test('does not loop when loop is false', async ({ mount }) => {
      const component = await mount(Carousel, {
        props: {
          loop: false,
        },
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      
      await component.getByRole('button', { name: 'Next slide' }).click();
      await component.getByRole('button', { name: 'Next slide' }).click();
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 2');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('navigates with arrow keys', async ({ mount, page }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          `,
        },
      });
      
      await component.click();
      await page.keyboard.press('ArrowRight');
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 2');
      
      await page.keyboard.press('ArrowLeft');
      await expect(component.locator('[aria-hidden="false"]')).toContainText('Slide 1');
    });
  });

  test.describe('Accessibility', () => {
    test('has proper ARIA labels', async ({ mount }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      
      await expect(component.getByRole('button', { name: 'Previous slide' })).toBeVisible();
      await expect(component.getByRole('button', { name: 'Next slide' })).toBeVisible();
    });

    test('has focusable container for keyboard navigation', async ({ mount, page }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
          `,
        },
      });
      
      await page.keyboard.press('Tab');
      await expect(component).toBeFocused();
    });

    test('marks non-active slides as hidden', async ({ mount }) => {
      const component = await mount(Carousel, {
        slots: {
          default: `
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          `,
        },
      });
      
      const slides = component.locator('.mljr-carousel-item');
      await expect(slides.nth(0)).toHaveAttribute('aria-hidden', 'false');
      await expect(slides.nth(1)).toHaveAttribute('aria-hidden', 'true');
      await expect(slides.nth(2)).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
