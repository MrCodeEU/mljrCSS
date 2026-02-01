import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Component Integration Tests', () => {
  test('homepage should be accessible', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('carousel should navigate correctly', async ({ page }) => {
    await page.goto('/');
    
    // Assuming carousel exists on homepage
    const carousel = page.locator('.mljr-carousel');
    await expect(carousel).toBeVisible();

    // Click next button
    const nextBtn = page.locator('.mljr-carousel-btn-next');
    await nextBtn.click();

    // Verify slide changed
    const secondIndicator = page.locator('.mljr-carousel-indicator').nth(1);
    await expect(secondIndicator).toHaveClass(/active/);
  });

  test('modal should open and close', async ({ page }) => {
    await page.goto('/');
    
    // Find and click modal trigger (adjust selector as needed)
    const modalTrigger = page.getByRole('button', { name: /open modal/i });
    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();

      // Check modal is visible
      const modal = page.locator('.mljr-modal');
      await expect(modal).toBeVisible();

      // Close modal
      const closeBtn = page.locator('.mljr-modal-close');
      await closeBtn.click();
      await expect(modal).not.toBeVisible();
    }
  });

  test('keyboard navigation should work', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const firstFocusable = page.locator(':focus');
    await expect(firstFocusable).toBeVisible();
  });
});
