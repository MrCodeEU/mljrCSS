import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('MLJR Component Library E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Button Component', () => {
    test('should render all button variants', async ({ page }) => {
      const primaryBtn = page.locator('button:has-text("Primary")').first();
      const secondaryBtn = page.locator('button:has-text("Secondary")').first();
      const successBtn = page.locator('button:has-text("Success")').first();

      await expect(primaryBtn).toBeVisible();
      await expect(secondaryBtn).toBeVisible();
      await expect(successBtn).toBeVisible();

      await expect(primaryBtn).toHaveClass(/mljr-btn-primary/);
      await expect(secondaryBtn).toHaveClass(/mljr-btn-secondary/);
      await expect(successBtn).toHaveClass(/mljr-btn-success/);
    });

    test('should handle button clicks', async ({ page }) => {
      const primaryBtn = page.locator('button:has-text("Primary")').first();
      await primaryBtn.click();
      await expect(primaryBtn).toBeEnabled();
    });

    test('should show disabled state', async ({ page }) => {
      const disabledBtn = page.locator('button:has-text("Disabled")').first();
      await expect(disabledBtn).toBeDisabled();
    });

    test('should show loading state', async ({ page }) => {
      const loadingBtn = page.locator('button:has-text("Loading")').first();
      await expect(loadingBtn).toBeDisabled();
      await expect(loadingBtn).toHaveClass(/mljr-btn-loading/);
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['BUTTON', 'A']).toContain(focusedElement);
    });
  });

  test.describe('Carousel Component', () => {
    test('should render carousel with slides', async ({ page }) => {
      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toBeVisible();

      const slides = carousel.locator('.mljr-carousel-item');
      await expect(slides).toHaveCount(3);

      await expect(slides.first()).toContainText('Detroit Style');
    });

    test('should navigate with next button', async ({ page }) => {
      const nextBtn = page.locator('button[aria-label="Next slide"]').first();
      await nextBtn.click();
      await page.waitForTimeout(500);

      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toContainText('Rich Colors');
    });

    test('should navigate with previous button', async ({ page }) => {
      const prevBtn = page.locator('button[aria-label="Previous slide"]').first();
      await prevBtn.click();
      await page.waitForTimeout(500);

      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toContainText('Dark Mode');
    });

    test('should navigate with indicators', async ({ page }) => {
      const indicators = page.locator('.mljr-carousel-indicator');
      await expect(indicators.first()).toBeVisible();
      const count = await indicators.count();
      expect(count).toBe(3);

      // Wait for carousel to be stable
      await page.waitForTimeout(500);

      // Click third indicator
      await indicators.nth(2).click({ force: true });
      await page.waitForTimeout(500);

      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toContainText('Dark Mode');
    });

    test('should support keyboard navigation', async ({ page }) => {
      const carousel = page.locator('.mljr-carousel').first();
      await carousel.focus();
      
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
      await expect(carousel).toContainText('Rich Colors');

      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(500);
      await expect(carousel).toContainText('Detroit Style');
    });

    test('should auto-advance slides', async ({ page }) => {
      const carousel = page.locator('.mljr-carousel').first();
      const initialSlide = carousel.locator('.mljr-carousel-item').first();
      
      // Get initial transform value
      const initialTransform = await carousel.locator('.mljr-carousel-inner').evaluate((el: HTMLElement) => el.style.transform);
      
      // Wait for autoplay
      await page.waitForTimeout(3500);
      
      // Check transform has changed
      const newTransform = await carousel.locator('.mljr-carousel-inner').evaluate((el: HTMLElement) => el.style.transform);
      expect(newTransform).not.toBe(initialTransform);
    });

    test('should pause on hover', async ({ page }) => {
      const carousel = page.locator('.mljr-carousel').first();
      
      await carousel.hover();
      
      const initialContent = await carousel.textContent();
      
      await page.waitForTimeout(4000);
      
      const currentContent = await carousel.textContent();
      expect(currentContent).toBe(initialContent);
    });
  });

  test.describe('Modal Component', () => {
    test('should open and close modal', async ({ page }) => {
      const openBtn = page.locator('button:has-text("Small Modal")').first();
      await openBtn.click();

      const modal = page.locator('.mljr-modal');
      await expect(modal).toBeVisible();

      const closeBtn = modal.locator('button[aria-label="Close"]');
      await closeBtn.click();

      await expect(modal).not.toBeVisible();
    });

    test('should close modal with Escape key', async ({ page }) => {
      const openBtn = page.locator('button:has-text("Medium Modal")').first();
      await openBtn.click();

      const modal = page.locator('.mljr-modal');
      await expect(modal).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });

    test('should have modal dialog role', async ({ page }) => {
      const openBtn = page.locator('button:has-text("Large Modal")').first();
      await openBtn.click();

      const modal = page.locator('.mljr-modal');
      await expect(modal).toBeVisible();
      
      const dialog = page.locator('[role="dialog"]');
      await expect(dialog).toBeVisible();
    });
  });

  test.describe('Form Components', () => {
    test('should handle input changes', async ({ page }) => {
      const input = page.locator('input[placeholder="Enter your username"]').first();
      await input.fill('Test input');
      await expect(input).toHaveValue('Test input');
    });

    test('should handle select changes', async ({ page }) => {
      const select = page.locator('select').first();
      await select.selectOption('us');
      await expect(select).toHaveValue('us');
    });

    test('should toggle checkbox', async ({ page }) => {
      const checkbox = page.locator('input[type="checkbox"]').first();
      const initialState = await checkbox.isChecked();
      
      await checkbox.click();
      const newState = await checkbox.isChecked();
      
      expect(newState).toBe(!initialState);
    });

    test('should toggle switch', async ({ page }) => {
      const switchInput = page.locator('input[type="checkbox"][role="switch"]').first();
      const initialState = await switchInput.isChecked();
      
      await switchInput.click();
      const newState = await switchInput.isChecked();
      
      expect(newState).toBe(!initialState);
    });
  });

  test.describe('Alert Component', () => {
    test('should render different alert variants', async ({ page }) => {
      const infoAlert = page.locator('.mljr-alert').filter({ hasText: 'Information' }).first();
      const successAlert = page.locator('.mljr-alert').filter({ hasText: 'Success' }).first();
      const warningAlert = page.locator('.mljr-alert').filter({ hasText: 'Warning' }).first();
      const errorAlert = page.locator('.mljr-alert').filter({ hasText: 'Error' }).first();

      await expect(infoAlert).toBeVisible();
      await expect(successAlert).toBeVisible();
      await expect(warningAlert).toBeVisible();
      await expect(errorAlert).toBeVisible();
    });

    test('should dismiss alert', async ({ page }) => {
      const dismissibleAlert = page.locator('.mljr-alert').filter({ hasText: 'This alert can be dismissed' }).first();
      const closeBtn = dismissibleAlert.locator('button[aria-label="Close"]');
      
      await expect(dismissibleAlert).toBeVisible();
      await closeBtn.click();
      await expect(dismissibleAlert).not.toBeVisible();
    });
  });

  test.describe('Tabs Component', () => {
    test('should switch between tabs', async ({ page }) => {
      const tab1 = page.locator('button[role="tab"]').filter({ hasText: 'Overview' }).first();
      const tab2 = page.locator('button[role="tab"]').filter({ hasText: 'Features' }).first();

      await tab1.click();
      await expect(tab1).toHaveAttribute('aria-selected', 'true');

      await tab2.click();
      await expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    test('should show correct tab content', async ({ page }) => {
      const featuresTab = page.locator('button[role="tab"]').filter({ hasText: 'Features' }).first();
      await featuresTab.click();

      const tabpanel = page.locator('[role="tabpanel"]').first();
      await expect(tabpanel).toContainText('amazing features');
    });
  });

  test.describe('Accordion Component', () => {
    test('should expand and collapse accordion items', async ({ page }) => {
      const accordionBtn = page.locator('button').filter({ hasText: 'What is MLJR CSS?' }).first();
      
      await accordionBtn.click();
      const expandedState = await accordionBtn.getAttribute('aria-expanded');
      expect(expandedState).toBe('true');

      await accordionBtn.click();
      const collapsedState = await accordionBtn.getAttribute('aria-expanded');
      expect(collapsedState).toBe('false');
    });
  });

  test.describe('Theme Toggle', () => {
    test('should toggle between light and dark theme', async ({ page }) => {
      const themeBtn = page.locator('button[aria-label*="theme"]').first();
      
      const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      
      await themeBtn.click();
      await page.waitForTimeout(100);
      
      const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      expect(newTheme).not.toBe(initialTheme);
    });
  });

  test.describe('Accessibility', () => {
    test('should have no accessibility violations on homepage', async ({ page }) => {
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have proper heading structure', async ({ page }) => {
      const headings = await page.locator('h1, h2, h3').count();
      expect(headings).toBeGreaterThan(0);

      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }

      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = (await btn.textContent())?.trim();
        const ariaLabel = await btn.getAttribute('aria-label');
        // Icon buttons may have aria-label only
        const hasAccessibleName = (text && text.length > 0) || ariaLabel;
        expect(hasAccessibleName).toBeTruthy();
      }
    });

    test('should support keyboard navigation throughout page', async ({ page }) => {
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? {
            tag: el.tagName,
            role: el.getAttribute('role'),
            type: el.getAttribute('type')
          } : null;
        });
        
        const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
        expect(interactiveTags).toContain(focusedElement?.tag);
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const header = page.locator('header').first();
      await expect(header).toBeVisible();

      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toBeVisible();
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      const header = page.locator('header').first();
      await expect(header).toBeVisible();
    });

    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const header = page.locator('header').first();
      await expect(header).toBeVisible();
    });
  });
});
