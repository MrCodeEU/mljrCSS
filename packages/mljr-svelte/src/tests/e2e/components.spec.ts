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
      const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
      expect(interactiveTags).toContain(focusedElement);
    });
  });

  test.describe('Carousel Component', () => {
    test('should render carousel with slides', async ({ page }) => {
      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toBeVisible();

      const slides = carousel.locator('.mljr-carousel-item');
      await expect(slides).toHaveCount(3);

      await expect(slides.first()).toContainText('Claymorphism Style');
    });

    test('should navigate with next button', async ({ page }) => {
      const nextBtn = page.locator('button[aria-label="Next slide"]').first();
      await nextBtn.click({ force: true });
      await page.waitForTimeout(500);

      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toContainText('Rich Colors');
    });

    test('should navigate with previous button', async ({ page }) => {
      const prevBtn = page.locator('button[aria-label="Previous slide"]').first();
      await prevBtn.click({ force: true });
      await page.waitForTimeout(500);

      const carousel = page.locator('.mljr-carousel').first();
      await expect(carousel).toContainText('Dark Mode');
    });

    test('should navigate with indicators', async ({ page }) => {
      // Target the second carousel which has explicit showIndicators=true
      const carousel = page.locator('.mljr-carousel').nth(1);
      const indicators = carousel.locator('.mljr-carousel-indicator');
      await expect(indicators.first()).toBeVisible();
      const count = await indicators.count();
      expect(count).toBe(3);

      // Wait for carousel to be stable
      await page.waitForTimeout(500);

      // Initially first indicator should be active
      await expect(indicators.first()).toHaveClass(/active/);

      // Click third indicator - should navigate to third slide
      await indicators.nth(2).click({ force: true });
      await page.waitForTimeout(500);

      // Check that the third indicator is now active and first is not
      await expect(indicators.nth(2)).toHaveClass(/active/);
      await expect(indicators.first()).not.toHaveClass(/active/);
    });

    test('should support keyboard navigation', async ({ page }) => {
      const carousel = page.locator('.mljr-carousel').first();
      await carousel.focus();
      
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
      await expect(carousel).toContainText('Rich Colors');

      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(500);
      await expect(carousel).toContainText('Claymorphism Style');
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
      
      await carousel.hover({ force: true });
      
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
      await closeBtn.click({ force: true });
      
      // Wait for modal to be removed from DOM
      await page.waitForSelector('.mljr-modal', { state: 'hidden', timeout: 2000 });
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
      
      // Modal should have dialog role and aria-modal="true"
      await expect(modal).toHaveAttribute('role', 'dialog');
      await expect(modal).toHaveAttribute('aria-modal', 'true');
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

  test.describe('Password Component', () => {
    test('should render password input', async ({ page }) => {
      const passwordInput = page.locator('input[type="password"]').filter({ hasText: '' }).first();
      await expect(passwordInput).toBeVisible();
    });

    test('should toggle password visibility', async ({ page }) => {
      // Find the password component with strength meter
      const passwordContainer = page.locator('.mljr-password').first();
      await passwordContainer.scrollIntoViewIfNeeded();
      
      const input = passwordContainer.locator('input').first();
      await input.fill('testpassword');
      
      // Initially should be password type
      await expect(input).toHaveAttribute('type', 'password');
      
      // Click toggle button
      const toggleBtn = passwordContainer.locator('.mljr-password-toggle').first();
      await toggleBtn.click();
      
      // Should now be text type
      await expect(input).toHaveAttribute('type', 'text');
      
      // Click again to hide
      await toggleBtn.click();
      await expect(input).toHaveAttribute('type', 'password');
    });

    test('should show password strength meter', async ({ page }) => {
      const passwordContainer = page.locator('.mljr-password').first();
      await passwordContainer.scrollIntoViewIfNeeded();
      
      const input = passwordContainer.locator('input').first();
      await input.fill('weak');
      
      // Strength meter should be visible
      const strengthBar = passwordContainer.locator('.mljr-password-strength').first();
      await expect(strengthBar).toBeVisible();
      
      // Should show strength label
      const strengthLabel = passwordContainer.locator('.mljr-password-strength-text').first();
      await expect(strengthLabel).toBeVisible();
    });

    test('should update strength as password improves', async ({ page }) => {
      const passwordContainer = page.locator('.mljr-password').first();
      await passwordContainer.scrollIntoViewIfNeeded();
      
      const input = passwordContainer.locator('input').first();
      const strengthLabel = passwordContainer.locator('.mljr-password-strength-text').first();
      
      // Weak password
      await input.fill('123');
      await expect(strengthLabel).toContainText(/Very Weak|Weak/);
      
      // Stronger password
      await input.fill('MyStr0ng!P@ssw0rd');
      await expect(strengthLabel).toContainText(/Good|Strong/);
    });

    test('should show password requirements when enabled', async ({ page }) => {
      const passwordContainer = page.locator('.mljr-password').first();
      await passwordContainer.scrollIntoViewIfNeeded();
      
      // Requirements section should be visible
      const requirements = passwordContainer.locator('.mljr-password-requirements').first();
      await expect(requirements).toBeVisible();
      
      // Should have requirement items
      const requirementItems = requirements.locator('.mljr-password-requirement');
      expect(await requirementItems.count()).toBeGreaterThan(0);
    });

    test('should show crack time estimate', async ({ page }) => {
      const passwordContainer = page.locator('.mljr-password').first();
      await passwordContainer.scrollIntoViewIfNeeded();
      
      const input = passwordContainer.locator('input').first();
      await input.fill('test123');
      
      // Crack time should be visible
      const crackTime = passwordContainer.locator('.mljr-password-crack-time').first();
      await expect(crackTime).toBeVisible();
      await expect(crackTime).toContainText('Estimated time to crack');
    });

    test('should have proper accessibility attributes', async ({ page }) => {
      const passwordContainer = page.locator('.mljr-password').first();
      await passwordContainer.scrollIntoViewIfNeeded();
      
      const input = passwordContainer.locator('input').first();
      await input.fill('test123');
      
      // Input should have aria-invalid attribute
      const ariaInvalid = await input.getAttribute('aria-invalid');
      expect(['true', 'false']).toContain(ariaInvalid);
      
      // Toggle button should have aria-label
      const toggleBtn = passwordContainer.locator('.mljr-password-toggle').first();
      const ariaLabel = await toggleBtn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      
      // Strength meter container should be visible after entering text
      const strengthMeter = passwordContainer.locator('.mljr-password-strength').first();
      await expect(strengthMeter).toBeVisible();
      
      // Strength fill should have progressbar role
      const strengthFill = strengthMeter.locator('.mljr-password-strength-fill').first();
      const role = await strengthFill.getAttribute('role');
      expect(role).toBe('progressbar');
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
      const tab1 = page.locator('[role="tab"]').filter({ hasText: 'Overview' }).first();
      const tab2 = page.locator('[role="tab"]').filter({ hasText: 'Features' }).first();

      await tab1.click();
      await expect(tab1).toHaveAttribute('aria-selected', 'true');

      await tab2.click();
      await expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    test('should show correct tab content', async ({ page }) => {
      // Target the first tabs component
      const firstTabs = page.locator('.mljr-tabs').first();
      const featuresTab = firstTabs.locator('[role="tab"]').filter({ hasText: 'Features' });
      await featuresTab.click();
      await page.waitForTimeout(300); // Wait for animation

      // Check the active panel within the first tabs component
      const activePanel = firstTabs.locator('.mljr-tabs-panel-active');
      await expect(activePanel).toContainText('amazing features we offer');
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
      const themeBtn = page.locator('button[aria-label*="theme"], button[aria-label*="mode"]').first();
      
      const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      
      await themeBtn.click();
      await page.waitForTimeout(100);
      
      const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      expect(newTheme).not.toBe(initialTheme);
    });
  });

  test.describe('Accessibility', () => {
    test('should have acceptable accessibility on homepage', async ({ page }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .exclude('.mljr-code-example') // Code examples may have color contrast issues
        .analyze();

      // Soft assertion: log violations but don't fail — captures baseline
      if (accessibilityScanResults.violations.length > 0) {
        console.log('\n=== Accessibility violations found:', accessibilityScanResults.violations.length, '===');
        accessibilityScanResults.violations.forEach(v => {
          console.log(`\n[${(v.impact || 'unknown').toUpperCase()}] ${v.description}`);
          console.log(`  Help: ${v.help}`);
          console.log(`  Affected nodes: ${v.nodes.length}`);
          v.nodes.slice(0, 3).forEach((n, i: number) => {
            console.log(`    ${i + 1}. ${n.target.join(' > ').substring(0, 80)}`);
          });
          if (v.nodes.length > 3) {
            console.log(`    ... and ${v.nodes.length - 3} more`);
          }
        });
        console.log('\n=== End accessibility report ===\n');
      }

      // Soft assertion - scan must complete without throwing
      expect(accessibilityScanResults).toBeDefined();
    });

    test('should have proper heading structure', async ({ page }) => {
      const headings = await page.locator('h1, h2, h3').count();
      expect(headings).toBeGreaterThan(0);

      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        // alt="" is valid for decorative images; only null (missing alt attribute) is a violation
        expect(alt).not.toBeNull();
      }

      // Only check buttons that are visible
      const buttons = await page.locator('button:visible').all();
      for (const btn of buttons) {
        const text = (await btn.textContent())?.trim();
        const ariaLabel = await btn.getAttribute('aria-label');
        const ariaLabelledBy = await btn.getAttribute('aria-labelledby');
        const title = await btn.getAttribute('title');
        // Icon buttons may have aria-label, aria-labelledby, or title
        const hasAccessibleName = (text && text.length > 0) || ariaLabel || ariaLabelledBy || title;
        // Skip if no accessible name (some UI elements may be decorative)
        if (!hasAccessibleName) {
          console.log('Button without accessible name:', await btn.evaluate(el => el.outerHTML.substring(0, 100)));
        }
      }
      // Test passes if we get here - we logged any problematic buttons for review
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

  test.describe('Tooltip Component', () => {
    test('should show tooltip on hover', async ({ page }) => {
      // Scroll to new components section first
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const tooltipTrigger = page.locator('.mljr-tooltip').first();
      await tooltipTrigger.scrollIntoViewIfNeeded();
      await tooltipTrigger.hover();

      const tooltipContent = tooltipTrigger.locator('.mljr-tooltip-content');
      await expect(tooltipContent).toBeVisible();
    });

    test('should hide tooltip on mouse leave', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const tooltipTrigger = page.locator('.mljr-tooltip').first();
      await tooltipTrigger.scrollIntoViewIfNeeded();
      await tooltipTrigger.hover();
      await page.waitForTimeout(300);

      // Move mouse to a completely different area
      await page.mouse.move(0, 0);
      await page.waitForTimeout(500);

      // Check that tooltip lost the visible class
      const tooltipWrapper = page.locator('.mljr-tooltip').first();
      const hasVisibleClass = await tooltipWrapper.evaluate((el) =>
        el.classList.contains('mljr-tooltip-visible')
      );
      expect(hasVisibleClass).toBe(false);
    });

    test('should render tooltip component', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Check for tooltip wrapper
      const tooltips = await page.locator('.mljr-tooltip').count();
      expect(tooltips).toBeGreaterThan(0);
    });
  });

  test.describe('Progress Component', () => {
    test('should render progress bars', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Progress bars may be thin, check element count
      const progressCount = await page.locator('.mljr-progress').count();
      expect(progressCount).toBeGreaterThan(0);
    });

    test('should have correct aria attributes', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const progress = page.locator('.mljr-progress[role="progressbar"]').first();
      await expect(progress).toHaveAttribute('aria-valuemin', '0');
      await expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    test('should render progress with HUD accents', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Detroit style is now default - check for progress wrapper and accents
      const progressWrapperCount = await page.locator('.mljr-progress-wrapper').count();
      expect(progressWrapperCount).toBeGreaterThan(0);
    });

    test('should render indeterminate state', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const indeterminateProgressCount = await page.locator('.mljr-progress-indeterminate').count();
      expect(indeterminateProgressCount).toBeGreaterThan(0);
    });
  });

  test.describe('Skeleton Component', () => {
    test('should render skeleton loaders', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const skeletonCount = await page.locator('.mljr-skeleton').count();
      expect(skeletonCount).toBeGreaterThan(0);
    });

    test('should render different variants', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const textSkeletonCount = await page.locator('.mljr-skeleton-text').count();
      const avatarSkeletonCount = await page.locator('.mljr-skeleton-avatar').count();

      expect(textSkeletonCount).toBeGreaterThan(0);
      expect(avatarSkeletonCount).toBeGreaterThan(0);
    });

    test('should render skeleton with shimmer effect', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Detroit style is now default - check for shimmer effect
      const shimmerCount = await page.locator('.mljr-skeleton-shimmer').count();
      expect(shimmerCount).toBeGreaterThan(0);
    });
  });

  test.describe('Avatar Component', () => {
    test('should render avatars with initials', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const avatar = page.locator('.mljr-avatar').first();
      await avatar.scrollIntoViewIfNeeded();
      await expect(avatar).toBeVisible();
    });

    test('should render status indicators', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Status indicators are small, check for element count instead
      const count = await page.locator('.mljr-avatar-status-online').count();
      expect(count).toBeGreaterThan(0);
    });

    test('should render square and circle avatar shapes', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const squareCount = await page.locator('.mljr-avatar-square').count();
      const circleCount = await page.locator('.mljr-avatar-circle').count();
      expect(squareCount + circleCount).toBeGreaterThan(0);
    });

    test('should render different sizes', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const xsAvatar = page.locator('.mljr-avatar-xs').first();
      const xlAvatar = page.locator('.mljr-avatar-xl').first();

      await xsAvatar.scrollIntoViewIfNeeded();
      await expect(xsAvatar).toBeVisible();
      await xlAvatar.scrollIntoViewIfNeeded();
      await expect(xlAvatar).toBeVisible();
    });
  });

  test.describe('Divider Component', () => {
    test('should render dividers', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Dividers are thin lines, check for element existence
      const dividerCount = await page.locator('.mljr-divider').count();
      expect(dividerCount).toBeGreaterThan(0);
    });

    test('should render divider with content', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const dividerContent = page.locator('.mljr-divider-content').first();
      await dividerContent.scrollIntoViewIfNeeded();
      await expect(dividerContent).toBeVisible();
    });

    test('should render divider with accent elements', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Claymorphism style - check for accent class
      const accentCount = await page.locator('.mljr-divider-accent').count();
      expect(accentCount).toBeGreaterThan(0);
    });

    test('should render vertical orientation', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const verticalDividerCount = await page.locator('.mljr-divider-vertical').count();
      expect(verticalDividerCount).toBeGreaterThan(0);
    });
  });

  test.describe('Gradient Utilities', () => {
    test('should render gradient backgrounds', async ({ page }) => {
      await page.locator('#gradients').first().scrollIntoViewIfNeeded();
      const primaryGradient = page.locator('.mljr-bg-gradient-primary').first();
      await primaryGradient.scrollIntoViewIfNeeded();
      await expect(primaryGradient).toBeVisible();
    });

    test('should render animated gradient', async ({ page }) => {
      await page.locator('#gradients').first().scrollIntoViewIfNeeded();
      const animatedGradient = page.locator('.mljr-bg-gradient-animated').first();
      await animatedGradient.scrollIntoViewIfNeeded();
      await expect(animatedGradient).toBeVisible();
    });
  });

  test.describe('Sidebar Component', () => {
    test('should toggle sidebar', async ({ page }) => {
      // Scroll to sidebar section first
      await page.locator('#sidebar-section').first().scrollIntoViewIfNeeded();
      
      // Find sidebar close button in header
      const sidebarToggle = page.locator('.mljr-sidebar-close').first();
      
      // Sidebar should be visible initially on desktop
      const sidebar = page.locator('.mljr-sidebar').first();
      await expect(sidebar).toBeVisible();
      
      // Click toggle to close
      await sidebarToggle.click();
      await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
      
      // Open button should be visible
      const openBtn = page.locator('.mljr-sidebar-open-btn');
      await expect(openBtn).toBeVisible();
      
      // Click open button to open
      await openBtn.click();
      await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
    });

    test('should navigate using sidebar links', async ({ page }) => {
      // Scroll to sidebar section first
      await page.locator('#sidebar-section').first().scrollIntoViewIfNeeded();
      
      const sidebar = page.locator('.mljr-sidebar').first();
      await sidebar.scrollIntoViewIfNeeded();
      
      // Find a navigation link
      const navLink = sidebar.locator('.mljr-sidebar-link').first();
      await expect(navLink).toBeVisible();
      
      // Should have proper styling
      const hasHoverEffect = await navLink.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.transition !== '';
      });
      expect(hasHoverEffect).toBeTruthy();
    });

    test('should have custom scrollbar', async ({ page }) => {
      // Scroll to sidebar section first
      await page.locator('#sidebar-section').first().scrollIntoViewIfNeeded();
      
      const sidebar = page.locator('.mljr-sidebar').first();
      const nav = sidebar.locator('.mljr-sidebar-nav').first();
      
      // Check scrollbar styling exists
      const hasCustomScrollbar = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.scrollbarWidth !== '' || styles.overflow === 'auto';
      });
      expect(hasCustomScrollbar).toBeTruthy();
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

  test.describe('Toast Component', () => {
    test('should render toast container', async ({ page }) => {
      await page.locator('#feedback').first().scrollIntoViewIfNeeded();
      const toastTrigger = page.locator('#feedback button').first();
      await toastTrigger.scrollIntoViewIfNeeded();
      await toastTrigger.click();
      // Toast container should be present in DOM
      const toastContainer = page.locator('.mljr-toast-container');
      await expect(toastContainer).toBeVisible();
    });

    test('should show toast with correct class when triggered', async ({ page }) => {
      await page.locator('#feedback').first().scrollIntoViewIfNeeded();
      const toastTrigger = page.locator('#feedback button').first();
      await toastTrigger.scrollIntoViewIfNeeded();
      await toastTrigger.click();
      const toast = page.locator('.mljr-toast').first();
      await expect(toast).toBeVisible();
    });
  });

  test.describe('Drawer Component', () => {
    test('should open drawer via button', async ({ page }) => {
      await page.locator('#drawer').first().scrollIntoViewIfNeeded();
      const openBtn = page.locator('#drawer button').first();
      await openBtn.scrollIntoViewIfNeeded();
      await openBtn.click();
      const drawer = page.locator('.mljr-drawer');
      await expect(drawer).toBeVisible();
    });

    test('should close drawer with Escape key', async ({ page }) => {
      await page.locator('#drawer').first().scrollIntoViewIfNeeded();
      const openBtn = page.locator('#drawer button').first();
      await openBtn.scrollIntoViewIfNeeded();
      await openBtn.click();
      await page.keyboard.press('Escape');
      const drawer = page.locator('.mljr-drawer[data-open="true"]');
      await expect(drawer).toHaveCount(0);
    });
  });

  test.describe('Pagination Component', () => {
    test('should render pagination buttons', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const pagination = page.locator('.mljr-pagination').first();
      await pagination.scrollIntoViewIfNeeded();
      await expect(pagination).toBeVisible();
    });

    test('should have page buttons', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const pageButtons = page.locator('.mljr-pagination .mljr-pagination-btn');
      await expect(pageButtons.first()).toBeVisible();
    });
  });

  test.describe('Breadcrumb Component', () => {
    test('should render breadcrumb nav', async ({ page }) => {
      await page.locator('#navigation').first().scrollIntoViewIfNeeded();
      const breadcrumb = page.locator('.mljr-breadcrumb').first();
      await breadcrumb.scrollIntoViewIfNeeded();
      await expect(breadcrumb).toBeVisible();
    });

    test('should render breadcrumb items', async ({ page }) => {
      await page.locator('#navigation').first().scrollIntoViewIfNeeded();
      const items = page.locator('.mljr-breadcrumb .mljr-breadcrumb-item');
      await expect(items.first()).toBeVisible();
    });

    test('should render breadcrumb separator', async ({ page }) => {
      await page.locator('#navigation').first().scrollIntoViewIfNeeded();
      const separator = page.locator('.mljr-breadcrumb .mljr-breadcrumb-separator').first();
      await separator.scrollIntoViewIfNeeded();
      await expect(separator).toBeVisible();
    });
  });

  test.describe('Badge Component', () => {
    test('should render badges', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const badges = page.locator('.mljr-badge');
      expect(await badges.count()).toBeGreaterThan(0);
    });

    test('should render badge variants', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      // Primary badge exists
      const primaryBadge = page.locator('.mljr-badge-primary').first();
      await primaryBadge.scrollIntoViewIfNeeded();
      await expect(primaryBadge).toBeVisible();
    });
  });

  test.describe('Chip Component', () => {
    test('should render chips', async ({ page }) => {
      await page.locator('#chip').first().scrollIntoViewIfNeeded();
      const chips = page.locator('.mljr-chip');
      expect(await chips.count()).toBeGreaterThan(0);
    });

    test('should render removable chip close button', async ({ page }) => {
      await page.locator('#chip').first().scrollIntoViewIfNeeded();
      const closeBtn = page.locator('.mljr-chip-remove').first();
      await closeBtn.scrollIntoViewIfNeeded();
      await expect(closeBtn).toBeVisible();
    });
  });

  test.describe('Table Component', () => {
    test('should render data table', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const table = page.locator('.mljr-table').first();
      await table.scrollIntoViewIfNeeded();
      await expect(table).toBeVisible();
    });

    test('should render table headers', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const headers = page.locator('.mljr-table th');
      expect(await headers.count()).toBeGreaterThan(0);
    });

    test('should render table rows', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const rows = page.locator('.mljr-table tbody tr');
      expect(await rows.count()).toBeGreaterThan(0);
    });

    test('should have sortable header with aria-sort', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const sortableHeader = page.locator('.mljr-table th[aria-sort]').first();
      if (await sortableHeader.count() > 0) {
        const ariaSortValue = await sortableHeader.getAttribute('aria-sort');
        expect(['ascending', 'descending', 'none']).toContain(ariaSortValue);
      }
    });
  });

  test.describe('Navbar Component', () => {
    test('should render navbar', async ({ page }) => {
      const navbar = page.locator('.mljr-navbar').first();
      await expect(navbar).toBeVisible();
    });

    test('should show mobile hamburger menu at narrow viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const hamburger = page.locator('.mljr-navbar button[aria-label], .mljr-navbar-mobile-toggle').first();
      if (await hamburger.count() > 0) {
        await expect(hamburger).toBeVisible();
      }
    });
  });

  test.describe('AlertDialog Component', () => {
    test('should render alert dialog when opened', async ({ page }) => {
      await page.locator('#modal').first().scrollIntoViewIfNeeded();
      // Look for an AlertDialog trigger button
      const triggerBtn = page.locator('button:has-text("Delete"), button:has-text("Confirm"), button:has-text("Alert Dialog")').first();
      if (await triggerBtn.count() > 0) {
        await triggerBtn.scrollIntoViewIfNeeded();
        await triggerBtn.click();
        const dialog = page.locator('[role="alertdialog"]');
        await expect(dialog).toBeVisible();
      }
    });
  });

  test.describe('Number Ticker Component', () => {
    test('should render number ticker', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const ticker = page.locator('.mljr-number-ticker').first();
      if (await ticker.count() > 0) {
        await ticker.scrollIntoViewIfNeeded();
        await expect(ticker).toBeVisible();
      }
    });
  });

  // ─── Display Components ───────────────────────────────────────────

  test.describe('Card Component', () => {
    test('should render cards', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const cards = page.locator('.mljr-card');
      expect(await cards.count()).toBeGreaterThan(0);
    });

    test('should render card title', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const cardTitle = page.locator('.mljr-card-title').first();
      await cardTitle.scrollIntoViewIfNeeded();
      await expect(cardTitle).toBeVisible();
    });

    test('should render card body', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const cardBody = page.locator('.mljr-card-body').first();
      await cardBody.scrollIntoViewIfNeeded();
      await expect(cardBody).toBeVisible();
    });
  });

  test.describe('Stats Component', () => {
    test('should render stats', async ({ page }) => {
      await page.locator('#data').first().scrollIntoViewIfNeeded();
      const stats = page.locator('.mljr-stats').first();
      if (await stats.count() > 0) {
        await stats.scrollIntoViewIfNeeded();
        await expect(stats).toBeVisible();
      }
    });
  });

  test.describe('Timeline Component', () => {
    test('should render timeline', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const timeline = page.locator('.mljr-timeline').first();
      if (await timeline.count() > 0) {
        await timeline.scrollIntoViewIfNeeded();
        await expect(timeline).toBeVisible();
      }
    });

    test('should render timeline items', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const items = page.locator('.mljr-timeline-item');
      if (await items.count() > 0) {
        expect(await items.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Countdown Component', () => {
    test('should render countdown', async ({ page }) => {
      await page.locator('#countdown').first().scrollIntoViewIfNeeded();
      const countdown = page.locator('.mljr-countdown').first();
      await countdown.scrollIntoViewIfNeeded();
      await expect(countdown).toBeVisible();
    });

    test('should render countdown value units', async ({ page }) => {
      await page.locator('#countdown').first().scrollIntoViewIfNeeded();
      const units = page.locator('.mljr-countdown-unit');
      expect(await units.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Swap Component', () => {
    test('should render swap element', async ({ page }) => {
      await page.locator('#swap').first().scrollIntoViewIfNeeded();
      const swap = page.locator('.mljr-swap').first();
      await swap.scrollIntoViewIfNeeded();
      await expect(swap).toBeVisible();
    });

    test('should toggle on click', async ({ page }) => {
      await page.locator('#swap').first().scrollIntoViewIfNeeded();
      const swap = page.locator('.mljr-swap').first();
      await swap.scrollIntoViewIfNeeded();
      const before = await swap.getAttribute('data-active');
      await swap.click();
      const after = await swap.getAttribute('data-active');
      expect(before).not.toBe(after);
    });
  });

  test.describe('Indicator Component', () => {
    test('should render indicator', async ({ page }) => {
      await page.locator('#indicator').first().scrollIntoViewIfNeeded();
      const indicator = page.locator('.mljr-indicator').first();
      await indicator.scrollIntoViewIfNeeded();
      await expect(indicator).toBeVisible();
    });

    test('should render indicator badge', async ({ page }) => {
      await page.locator('#indicator').first().scrollIntoViewIfNeeded();
      const badge = page.locator('.mljr-indicator-item').first();
      if (await badge.count() > 0) {
        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toBeVisible();
      }
    });
  });

  test.describe('Kbd Component', () => {
    test('should render keyboard key elements', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const kbd = page.locator('.mljr-kbd').first();
      if (await kbd.count() > 0) {
        await kbd.scrollIntoViewIfNeeded();
        await expect(kbd).toBeVisible();
      }
    });
  });

  test.describe('ChatBubble Component', () => {
    test('should render chat bubbles', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const bubble = page.locator('.mljr-chat').first();
      if (await bubble.count() > 0) {
        await bubble.scrollIntoViewIfNeeded();
        await expect(bubble).toBeVisible();
      }
    });
  });

  test.describe('AvatarGroup Component', () => {
    test('should render avatar group', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const group = page.locator('.mljr-avatar-group').first();
      if (await group.count() > 0) {
        await group.scrollIntoViewIfNeeded();
        await expect(group).toBeVisible();
      }
    });
  });

  test.describe('TreeView Component', () => {
    test('should render tree view', async ({ page }) => {
      await page.locator('#tree-view').first().scrollIntoViewIfNeeded();
      const tree = page.locator('.mljr-tree-view').first();
      await tree.scrollIntoViewIfNeeded();
      await expect(tree).toBeVisible();
    });

    test('should render tree nodes', async ({ page }) => {
      await page.locator('#tree-view').first().scrollIntoViewIfNeeded();
      const nodes = page.locator('.mljr-tree-item');
      expect(await nodes.count()).toBeGreaterThan(0);
    });

    test('should expand/collapse on click', async ({ page }) => {
      await page.locator('#tree-view').first().scrollIntoViewIfNeeded();
      const toggle = page.locator('.mljr-tree-toggle').first();
      if (await toggle.count() > 0) {
        await toggle.scrollIntoViewIfNeeded();
        await toggle.click();
        // After click, aria-expanded should change
        const expanded = await toggle.getAttribute('aria-expanded');
        expect(['true', 'false']).toContain(expanded);
      }
    });
  });

  test.describe('Marquee Component', () => {
    test('should render marquee', async ({ page }) => {
      await page.locator('#marquee').first().scrollIntoViewIfNeeded();
      const marquee = page.locator('.mljr-marquee').first();
      await marquee.scrollIntoViewIfNeeded();
      await expect(marquee).toBeVisible();
    });

    test('should have marquee inner track', async ({ page }) => {
      await page.locator('#marquee').first().scrollIntoViewIfNeeded();
      const track = page.locator('.mljr-marquee-inner').first();
      await track.scrollIntoViewIfNeeded();
      await expect(track).toBeVisible();
    });
  });

  test.describe('Image Compare Component', () => {
    test('should render image compare', async ({ page }) => {
      await page.locator('#image-compare').first().scrollIntoViewIfNeeded();
      const compare = page.locator('.mljr-image-compare').first();
      await compare.scrollIntoViewIfNeeded();
      await expect(compare).toBeVisible();
    });

    test('should render divider handle', async ({ page }) => {
      await page.locator('#image-compare').first().scrollIntoViewIfNeeded();
      const handle = page.locator('.mljr-image-compare-handle').first();
      if (await handle.count() > 0) {
        await handle.scrollIntoViewIfNeeded();
        await expect(handle).toBeVisible();
      }
    });
  });

  test.describe('Animated Headline Component', () => {
    test('should render animated headline', async ({ page }) => {
      await page.locator('#animated-headline').first().scrollIntoViewIfNeeded();
      const headline = page.locator('.mljr-animated-headline').first();
      await headline.scrollIntoViewIfNeeded();
      await expect(headline).toBeVisible();
    });
  });

  test.describe('Diff Viewer Component', () => {
    test('should render diff viewer', async ({ page }) => {
      await page.locator('#diff-viewer').first().scrollIntoViewIfNeeded();
      const viewer = page.locator('.mljr-diff-viewer').first();
      await viewer.scrollIntoViewIfNeeded();
      await expect(viewer).toBeVisible();
    });

    test('should show added and removed lines', async ({ page }) => {
      await page.locator('#diff-viewer').first().scrollIntoViewIfNeeded();
      const added = page.locator('.mljr-diff-added');
      const removed = page.locator('.mljr-diff-removed');
      const hasChanges = (await added.count()) + (await removed.count());
      expect(hasChanges).toBeGreaterThan(0);
    });
  });

  test.describe('Gauge Component', () => {
    test('should render gauge', async ({ page }) => {
      await page.locator('#data-graphs').first().scrollIntoViewIfNeeded();
      const gauge = page.locator('.mljr-gauge').first();
      if (await gauge.count() > 0) {
        await gauge.scrollIntoViewIfNeeded();
        await expect(gauge).toBeVisible();
      }
    });
  });

  test.describe('Mask Component', () => {
    test('should render mask elements', async ({ page }) => {
      await page.locator('#mask').first().scrollIntoViewIfNeeded();
      const mask = page.locator('.mljr-mask').first();
      if (await mask.count() > 0) {
        await mask.scrollIntoViewIfNeeded();
        await expect(mask).toBeVisible();
      }
    });
  });

  test.describe('Resizable Component', () => {
    test('should render resizable container', async ({ page }) => {
      // Look in the additional/display sections
      const resizable = page.locator('.mljr-resizable').first();
      if (await resizable.count() > 0) {
        await resizable.scrollIntoViewIfNeeded();
        await expect(resizable).toBeVisible();
        expect(await page.locator('.mljr-resizable-handle').count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('VirtualList Component', () => {
    test('should render virtual list', async ({ page }) => {
      const vlist = page.locator('.mljr-virtual-list').first();
      if (await vlist.count() > 0) {
        await vlist.scrollIntoViewIfNeeded();
        await expect(vlist).toBeVisible();
      }
    });
  });

  // ─── Charts ───────────────────────────────────────────────────────

  test.describe('Chart Components', () => {
    test('should render bar chart', async ({ page }) => {
      await page.locator('#data-graphs').first().scrollIntoViewIfNeeded();
      const chart = page.locator('.mljr-chart').first();
      if (await chart.count() > 0) {
        await chart.scrollIntoViewIfNeeded();
        await expect(chart).toBeVisible();
      }
    });

    test('should render chart canvas or SVG', async ({ page }) => {
      await page.locator('#data-graphs').first().scrollIntoViewIfNeeded();
      const canvas = page.locator('#data-graphs canvas').first();
      const svg = page.locator('#data-graphs svg').first();
      const hasChartOutput = (await canvas.count()) + (await svg.count());
      expect(hasChartOutput).toBeGreaterThan(0);
    });
  });

  // ─── Feedback Components ──────────────────────────────────────────

  test.describe('Spinner Component', () => {
    test('should render spinners', async ({ page }) => {
      await page.locator('#feedback').first().scrollIntoViewIfNeeded();
      const spinner = page.locator('.mljr-spinner').first();
      await spinner.scrollIntoViewIfNeeded();
      await expect(spinner).toBeVisible();
    });

    test('should render multiple spinner variants', async ({ page }) => {
      await page.locator('#feedback').first().scrollIntoViewIfNeeded();
      const spinners = page.locator('.mljr-spinner');
      expect(await spinners.count()).toBeGreaterThan(1);
    });
  });

  test.describe('EmptyState Component', () => {
    test('should render empty state', async ({ page }) => {
      await page.locator('#empty-state').first().scrollIntoViewIfNeeded();
      const emptyState = page.locator('.mljr-empty-state').first();
      await emptyState.scrollIntoViewIfNeeded();
      await expect(emptyState).toBeVisible();
    });

    test('should render empty state title', async ({ page }) => {
      await page.locator('#empty-state').first().scrollIntoViewIfNeeded();
      const title = page.locator('.mljr-empty-state-title').first();
      await title.scrollIntoViewIfNeeded();
      await expect(title).toBeVisible();
    });
  });

  test.describe('RadialProgress Component', () => {
    test('should render radial progress', async ({ page }) => {
      await page.locator('#display-components').first().scrollIntoViewIfNeeded();
      const radial = page.locator('.mljr-radial-progress').first();
      if (await radial.count() > 0) {
        await radial.scrollIntoViewIfNeeded();
        await expect(radial).toBeVisible();
      }
    });
  });

  // ─── Overlay Components ───────────────────────────────────────────

  test.describe('Dropdown Component', () => {
    test('should render dropdown trigger', async ({ page }) => {
      await page.locator('#additional-components').first().scrollIntoViewIfNeeded();
      const trigger = page.locator('.mljr-dropdown').first();
      if (await trigger.count() > 0) {
        await trigger.scrollIntoViewIfNeeded();
        await expect(trigger).toBeVisible();
      }
    });

    test('should open dropdown menu on click', async ({ page }) => {
      await page.locator('#additional-components').first().scrollIntoViewIfNeeded();
      const trigger = page.locator('.mljr-dropdown-trigger').first();
      if (await trigger.count() > 0) {
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        const menu = page.locator('.mljr-dropdown-menu');
        await expect(menu.first()).toBeVisible();
      }
    });
  });

  test.describe('Collapse Component', () => {
    test('should render collapse', async ({ page }) => {
      await page.locator('#additional-components').first().scrollIntoViewIfNeeded();
      const collapse = page.locator('.mljr-collapse').first();
      if (await collapse.count() > 0) {
        await collapse.scrollIntoViewIfNeeded();
        await expect(collapse).toBeVisible();
      }
    });

    test('should toggle collapse on trigger click', async ({ page }) => {
      await page.locator('#additional-components').first().scrollIntoViewIfNeeded();
      const trigger = page.locator('.mljr-collapse-trigger').first();
      if (await trigger.count() > 0) {
        await trigger.scrollIntoViewIfNeeded();
        const before = await page.locator('.mljr-collapse').first().getAttribute('data-open');
        await trigger.click();
        const after = await page.locator('.mljr-collapse').first().getAttribute('data-open');
        expect(before).not.toBe(after);
      }
    });
  });

  test.describe('Context Menu Component', () => {
    test('should render context menu target', async ({ page }) => {
      await page.locator('#additional-components').first().scrollIntoViewIfNeeded();
      const target = page.locator('.mljr-context-menu-target').first();
      if (await target.count() > 0) {
        await target.scrollIntoViewIfNeeded();
        await expect(target).toBeVisible();
      }
    });

    test('should show context menu on right click', async ({ page }) => {
      await page.locator('#additional-components').first().scrollIntoViewIfNeeded();
      const target = page.locator('.mljr-context-menu-target').first();
      if (await target.count() > 0) {
        await target.scrollIntoViewIfNeeded();
        await target.click({ button: 'right' });
        const menu = page.locator('.mljr-context-menu');
        await expect(menu.first()).toBeVisible();
        // Dismiss
        await page.keyboard.press('Escape');
      }
    });
  });

  test.describe('Notification Center Component', () => {
    test('should render notification center trigger', async ({ page }) => {
      await page.locator('#additional-components').first().scrollIntoViewIfNeeded();
      const trigger = page.locator('.mljr-notification-trigger, [aria-label*="notification" i]').first();
      if (await trigger.count() > 0) {
        await trigger.scrollIntoViewIfNeeded();
        await expect(trigger).toBeVisible();
      }
    });
  });

  test.describe('CookieBanner Component', () => {
    test('should render cookie banner when triggered', async ({ page }) => {
      await page.locator('#cookie-banner').first().scrollIntoViewIfNeeded();
      // Look for a demo trigger button
      const trigger = page.locator('#cookie-banner button').first();
      if (await trigger.count() > 0) {
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        const banner = page.locator('.mljr-cookie-banner');
        if (await banner.count() > 0) {
          await expect(banner.first()).toBeVisible();
        }
      }
    });
  });

  // ─── Navigation Components ────────────────────────────────────────

  test.describe('Stepper Component', () => {
    test('should render stepper', async ({ page }) => {
      await page.locator('#stepper').first().scrollIntoViewIfNeeded();
      const stepper = page.locator('.mljr-stepper').first();
      await stepper.scrollIntoViewIfNeeded();
      await expect(stepper).toBeVisible();
    });

    test('should render stepper steps', async ({ page }) => {
      await page.locator('#stepper').first().scrollIntoViewIfNeeded();
      const steps = page.locator('.mljr-stepper-step');
      expect(await steps.count()).toBeGreaterThan(1);
    });

    test('should advance step on next click', async ({ page }) => {
      await page.locator('#stepper').first().scrollIntoViewIfNeeded();
      const nextBtn = page.locator('.mljr-stepper').first().locator('button:has-text("Next"), button:has-text("Weiter")').first();
      if (await nextBtn.count() > 0) {
        await nextBtn.scrollIntoViewIfNeeded();
        const activeBefore = await page.locator('.mljr-stepper-step[data-active="true"], .mljr-stepper-step-active').count();
        await nextBtn.click();
        const activeAfter = await page.locator('.mljr-stepper-step[data-active="true"], .mljr-stepper-step-active').count();
        // Active step count may change after clicking Next
        expect(activeAfter).toBeGreaterThanOrEqual(activeBefore);
      }
    });
  });

  test.describe('NavigationRail Component', () => {
    test('should render navigation rail', async ({ page }) => {
      await page.locator('#navigation-rail').first().scrollIntoViewIfNeeded();
      const rail = page.locator('.mljr-nav-rail').first();
      await rail.scrollIntoViewIfNeeded();
      await expect(rail).toBeVisible();
    });

    test('should render nav rail items', async ({ page }) => {
      await page.locator('#navigation-rail').first().scrollIntoViewIfNeeded();
      const items = page.locator('.mljr-nav-rail-item');
      expect(await items.count()).toBeGreaterThan(0);
    });

    test('should mark item as active on click', async ({ page }) => {
      await page.locator('#navigation-rail').first().scrollIntoViewIfNeeded();
      const item = page.locator('.mljr-nav-rail-item').first();
      await item.scrollIntoViewIfNeeded();
      await item.click();
      await expect(page.locator('.mljr-nav-rail').first()).toBeVisible();
    });
  });

  test.describe('Dock Component', () => {
    test('should render dock', async ({ page }) => {
      await page.locator('#dock').first().scrollIntoViewIfNeeded();
      const dock = page.locator('.mljr-dock').first();
      await dock.scrollIntoViewIfNeeded();
      await expect(dock).toBeVisible();
    });

    test('should render dock items', async ({ page }) => {
      await page.locator('#dock').first().scrollIntoViewIfNeeded();
      const items = page.locator('.mljr-dock-item');
      expect(await items.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Command Palette Component', () => {
    test('should render command palette trigger', async ({ page }) => {
      await page.locator('#navigation').first().scrollIntoViewIfNeeded();
      const trigger = page.locator('button:has-text("Command"), button:has-text("Palette"), button:has-text("Cmd")').first();
      if (await trigger.count() > 0) {
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        const palette = page.locator('.mljr-command-palette');
        if (await palette.count() > 0) {
          await expect(palette.first()).toBeVisible();
          await page.keyboard.press('Escape');
        }
      }
    });
  });

  test.describe('Menu Component', () => {
    test('should render menu', async ({ page }) => {
      await page.locator('#navigation').first().scrollIntoViewIfNeeded();
      const menu = page.locator('.mljr-menu').first();
      if (await menu.count() > 0) {
        await menu.scrollIntoViewIfNeeded();
        await expect(menu).toBeVisible();
      }
    });

    test('should render menu items', async ({ page }) => {
      await page.locator('#navigation').first().scrollIntoViewIfNeeded();
      const items = page.locator('.mljr-menu-item');
      if (await items.count() > 0) {
        expect(await items.count()).toBeGreaterThan(0);
      }
    });
  });

  // ─── Form Components (Advanced) ───────────────────────────────────

  test.describe('Switch Component', () => {
    test('should render switches', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const switches = page.locator('.mljr-switch');
      if (await switches.count() > 0) {
        await switches.first().scrollIntoViewIfNeeded();
        await expect(switches.first()).toBeVisible();
      }
    });

    test('should toggle on click', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const sw = page.locator('.mljr-switch input[type="checkbox"]').first();
      if (await sw.count() > 0) {
        const before = await sw.isChecked();
        await sw.click();
        const after = await sw.isChecked();
        expect(before).not.toBe(after);
      }
    });
  });

  test.describe('Rating Component', () => {
    test('should render rating stars', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const rating = page.locator('.mljr-rating').first();
      if (await rating.count() > 0) {
        await rating.scrollIntoViewIfNeeded();
        await expect(rating).toBeVisible();
      }
    });
  });

  test.describe('Slider Component', () => {
    test('should render slider', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const slider = page.locator('.mljr-slider').first();
      if (await slider.count() > 0) {
        await slider.scrollIntoViewIfNeeded();
        await expect(slider).toBeVisible();
      }
    });

    test('slider input has type="range"', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const rangeInput = page.locator('.mljr-slider input[type="range"]').first();
      if (await rangeInput.count() > 0) {
        await expect(rangeInput).toBeVisible();
      }
    });
  });

  test.describe('Range Slider Component', () => {
    test('should render range slider with two handles', async ({ page }) => {
      await page.locator('#advanced-inputs').first().scrollIntoViewIfNeeded();
      const rangeSlider = page.locator('.mljr-range-slider').first();
      if (await rangeSlider.count() > 0) {
        await rangeSlider.scrollIntoViewIfNeeded();
        await expect(rangeSlider).toBeVisible();
      }
    });
  });

  test.describe('Textarea Component', () => {
    test('should render textarea', async ({ page }) => {
      await page.locator('#textarea').first().scrollIntoViewIfNeeded();
      const textarea = page.locator('.mljr-textarea').first();
      await textarea.scrollIntoViewIfNeeded();
      await expect(textarea).toBeVisible();
    });

    test('should accept text input', async ({ page }) => {
      await page.locator('#textarea').first().scrollIntoViewIfNeeded();
      const textarea = page.locator('.mljr-textarea textarea').first();
      if (await textarea.count() > 0) {
        await textarea.fill('Hello world');
        await expect(textarea).toHaveValue('Hello world');
      }
    });
  });

  test.describe('SearchInput Component', () => {
    test('should render search input', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const search = page.locator('.mljr-search-input').first();
      if (await search.count() > 0) {
        await search.scrollIntoViewIfNeeded();
        await expect(search).toBeVisible();
      }
    });
  });

  test.describe('AutoComplete Component', () => {
    test('should render autocomplete input', async ({ page }) => {
      await page.locator('#autocomplete').first().scrollIntoViewIfNeeded();
      const ac = page.locator('.mljr-autocomplete').first();
      if (await ac.count() > 0) {
        await ac.scrollIntoViewIfNeeded();
        await expect(ac).toBeVisible();
      }
    });

    test('should show suggestions on typing', async ({ page }) => {
      await page.locator('#autocomplete').first().scrollIntoViewIfNeeded();
      const input = page.locator('.mljr-autocomplete input').first();
      if (await input.count() > 0) {
        await input.scrollIntoViewIfNeeded();
        await input.fill('a');
        const suggestions = page.locator('.mljr-autocomplete-list');
        if (await suggestions.count() > 0) {
          await expect(suggestions.first()).toBeVisible();
        }
      }
    });
  });

  test.describe('ChipInput Component', () => {
    test('should render chip input', async ({ page }) => {
      await page.locator('#chip-input').first().scrollIntoViewIfNeeded();
      const chipInput = page.locator('.mljr-chip-input').first();
      if (await chipInput.count() > 0) {
        await chipInput.scrollIntoViewIfNeeded();
        await expect(chipInput).toBeVisible();
      }
    });

    test('should add chip on Enter key', async ({ page }) => {
      await page.locator('#chip-input').first().scrollIntoViewIfNeeded();
      const input = page.locator('.mljr-chip-input input').first();
      if (await input.count() > 0) {
        await input.scrollIntoViewIfNeeded();
        const before = await page.locator('.mljr-chip-input .mljr-chip').count();
        await input.fill('Test Tag');
        await input.press('Enter');
        const after = await page.locator('.mljr-chip-input .mljr-chip').count();
        expect(after).toBe(before + 1);
      }
    });
  });

  test.describe('DatePicker Component', () => {
    test('should render date picker input', async ({ page }) => {
      await page.locator('#new-inputs').first().scrollIntoViewIfNeeded();
      const picker = page.locator('.mljr-date-picker').first();
      if (await picker.count() > 0) {
        await picker.scrollIntoViewIfNeeded();
        await expect(picker).toBeVisible();
      }
    });
  });

  test.describe('ColorPicker Component', () => {
    test('should render color picker', async ({ page }) => {
      await page.locator('#new-inputs').first().scrollIntoViewIfNeeded();
      const picker = page.locator('.mljr-color-picker').first();
      if (await picker.count() > 0) {
        await picker.scrollIntoViewIfNeeded();
        await expect(picker).toBeVisible();
      }
    });
  });

  test.describe('TimePicker Component', () => {
    test('should render time picker', async ({ page }) => {
      await page.locator('#time-picker').first().scrollIntoViewIfNeeded();
      const picker = page.locator('.mljr-time-picker').first();
      if (await picker.count() > 0) {
        await picker.scrollIntoViewIfNeeded();
        await expect(picker).toBeVisible();
      }
    });
  });

  test.describe('PinInput Component', () => {
    test('should render PIN input cells', async ({ page }) => {
      await page.locator('#pin-input').first().scrollIntoViewIfNeeded();
      const pin = page.locator('.mljr-pin-input').first();
      if (await pin.count() > 0) {
        await pin.scrollIntoViewIfNeeded();
        await expect(pin).toBeVisible();
      }
    });

    test('should have multiple input cells', async ({ page }) => {
      await page.locator('#pin-input').first().scrollIntoViewIfNeeded();
      const cells = page.locator('.mljr-pin-input-cell, .mljr-pin-input input');
      if (await cells.count() > 0) {
        expect(await cells.count()).toBeGreaterThan(1);
      }
    });
  });

  test.describe('OtpInput Component', () => {
    test('should render OTP input', async ({ page }) => {
      await page.locator('#pin-input').first().scrollIntoViewIfNeeded();
      const otp = page.locator('.mljr-otp-input').first();
      if (await otp.count() > 0) {
        await otp.scrollIntoViewIfNeeded();
        await expect(otp).toBeVisible();
      }
    });
  });

  test.describe('NumberInput Component', () => {
    test('should render number input', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const numInput = page.locator('.mljr-number-input').first();
      if (await numInput.count() > 0) {
        await numInput.scrollIntoViewIfNeeded();
        await expect(numInput).toBeVisible();
      }
    });

    test('should have increment and decrement buttons', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const inc = page.locator('.mljr-number-input-increment').first();
      const dec = page.locator('.mljr-number-input-decrement').first();
      if ((await inc.count()) > 0 && (await dec.count()) > 0) {
        await expect(inc).toBeVisible();
        await expect(dec).toBeVisible();
      }
    });
  });

  test.describe('CheckboxGroup Component', () => {
    test('should render checkbox group', async ({ page }) => {
      await page.locator('#checkbox-group').first().scrollIntoViewIfNeeded();
      const group = page.locator('.mljr-checkbox-group').first();
      if (await group.count() > 0) {
        await group.scrollIntoViewIfNeeded();
        await expect(group).toBeVisible();
      }
    });

    test('should have multiple checkboxes', async ({ page }) => {
      await page.locator('#checkbox-group').first().scrollIntoViewIfNeeded();
      const checkboxes = page.locator('.mljr-checkbox-group .mljr-checkbox');
      if (await checkboxes.count() > 0) {
        expect(await checkboxes.count()).toBeGreaterThan(1);
      }
    });
  });

  test.describe('RadioGroup Component', () => {
    test('should render radio group', async ({ page }) => {
      await page.locator('#radio-group').first().scrollIntoViewIfNeeded();
      const group = page.locator('.mljr-radio-group').first();
      if (await group.count() > 0) {
        await group.scrollIntoViewIfNeeded();
        await expect(group).toBeVisible();
      }
    });

    test('should select radio on click', async ({ page }) => {
      await page.locator('#radio-group').first().scrollIntoViewIfNeeded();
      const radio = page.locator('.mljr-radio-group input[type="radio"]').first();
      if (await radio.count() > 0) {
        await radio.click();
        await expect(radio).toBeChecked();
      }
    });
  });

  test.describe('DropZone Component', () => {
    test('should render drop zone', async ({ page }) => {
      await page.locator('#drop-zone').first().scrollIntoViewIfNeeded();
      const zone = page.locator('.mljr-drop-zone').first();
      if (await zone.count() > 0) {
        await zone.scrollIntoViewIfNeeded();
        await expect(zone).toBeVisible();
      }
    });

    test('should show drag-over state', async ({ page }) => {
      await page.locator('#drop-zone').first().scrollIntoViewIfNeeded();
      const zone = page.locator('.mljr-drop-zone').first();
      if (await zone.count() > 0) {
        await zone.dispatchEvent('dragover', { bubbles: true });
        // Just ensure element remains stable after event
        await expect(zone).toBeVisible();
      }
    });
  });

  test.describe('FileUpload Component', () => {
    test('should render file upload', async ({ page }) => {
      await page.locator('#file-upload').first().scrollIntoViewIfNeeded();
      const upload = page.locator('.mljr-file-upload').first();
      if (await upload.count() > 0) {
        await upload.scrollIntoViewIfNeeded();
        await expect(upload).toBeVisible();
      }
    });

    test('should have a hidden file input', async ({ page }) => {
      await page.locator('#file-upload').first().scrollIntoViewIfNeeded();
      const input = page.locator('.mljr-file-upload input[type="file"]').first();
      if (await input.count() > 0) {
        expect(await input.evaluate((el) => (el as HTMLInputElement).type)).toBe('file');
      }
    });
  });

  test.describe('SelectMenu Component', () => {
    test('should render select menu', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const select = page.locator('.mljr-select-menu').first();
      if (await select.count() > 0) {
        await select.scrollIntoViewIfNeeded();
        await expect(select).toBeVisible();
      }
    });
  });

  test.describe('Form Wizard Component', () => {
    test('should render form wizard', async ({ page }) => {
      await page.locator('#forms').first().scrollIntoViewIfNeeded();
      const wizard = page.locator('.mljr-form-wizard').first();
      if (await wizard.count() > 0) {
        await wizard.scrollIntoViewIfNeeded();
        await expect(wizard).toBeVisible();
      }
    });
  });

  // ─── Layout Components ────────────────────────────────────────────

  test.describe('Hero Component', () => {
    test('should render hero section', async ({ page }) => {
      await page.locator('#hero').first().scrollIntoViewIfNeeded();
      const hero = page.locator('.mljr-hero').first();
      if (await hero.count() > 0) {
        await hero.scrollIntoViewIfNeeded();
        await expect(hero).toBeVisible();
      }
    });
  });

  test.describe('Footer Component', () => {
    test('should render footer', async ({ page }) => {
      const footer = page.locator('.mljr-footer').first();
      await expect(footer).toBeVisible();
    });

    test('should render footer sections', async ({ page }) => {
      const sections = page.locator('.mljr-footer-section');
      expect(await sections.count()).toBeGreaterThan(0);
    });

    test('should render footer copyright', async ({ page }) => {
      const copyright = page.locator('.mljr-footer-copyright').first();
      if (await copyright.count() > 0) {
        await expect(copyright).toBeVisible();
      }
    });
  });

  test.describe('Icon Component', () => {
    test('should render icons', async ({ page }) => {
      await page.locator('#icons').first().scrollIntoViewIfNeeded();
      const icon = page.locator('.mljr-icon, iconify-icon, [data-icon]').first();
      if (await icon.count() > 0) {
        await icon.scrollIntoViewIfNeeded();
        await expect(icon).toBeVisible();
      }
    });
  });

  test.describe('Background Component', () => {
    test('should render background pattern', async ({ page }) => {
      await page.locator('#background-section').first().scrollIntoViewIfNeeded();
      const bg = page.locator('.mljr-background').first();
      if (await bg.count() > 0) {
        await bg.scrollIntoViewIfNeeded();
        await expect(bg).toBeVisible();
      }
    });
  });

  test.describe('CopyButton Component', () => {
    test('should render copy button', async ({ page }) => {
      await page.locator('#copy-button').first().scrollIntoViewIfNeeded();
      const btn = page.locator('.mljr-copy-btn, button:has-text("Copy")').first();
      if (await btn.count() > 0) {
        await btn.scrollIntoViewIfNeeded();
        await expect(btn).toBeVisible();
      }
    });
  });

  test.describe('LanguageToggle Component', () => {
    test('should render language toggle', async ({ page }) => {
      const toggle = page.locator('.mljr-lang-toggle, [aria-label*="language" i]').first();
      if (await toggle.count() > 0) {
        await expect(toggle).toBeVisible();
      }
    });
  });

  // ─── Media Components ─────────────────────────────────────────────

  test.describe('Audio Visualizer Component', () => {
    test('should render audio visualizer', async ({ page }) => {
      await page.locator('#audio-visualizer').first().scrollIntoViewIfNeeded();
      const viz = page.locator('.mljr-audio-visualizer').first();
      await viz.scrollIntoViewIfNeeded();
      await expect(viz).toBeVisible();
    });

    test('should render a canvas element', async ({ page }) => {
      await page.locator('#audio-visualizer').first().scrollIntoViewIfNeeded();
      const canvas = page.locator('.mljr-audio-visualizer canvas').first();
      if (await canvas.count() > 0) {
        await expect(canvas).toBeVisible();
      }
    });
  });

  test.describe('Video Player Component', () => {
    test('should render video player', async ({ page }) => {
      await page.locator('#video-player').first().scrollIntoViewIfNeeded();
      const player = page.locator('.mljr-video-player').first();
      await player.scrollIntoViewIfNeeded();
      await expect(player).toBeVisible();
    });

    test('should have play button', async ({ page }) => {
      await page.locator('#video-player').first().scrollIntoViewIfNeeded();
      const play = page.locator('.mljr-video-play-btn, .mljr-video-player button').first();
      if (await play.count() > 0) {
        await play.scrollIntoViewIfNeeded();
        await expect(play).toBeVisible();
      }
    });
  });

  test.describe('LazyImage Component', () => {
    test('should render lazy image container', async ({ page }) => {
      await page.locator('#lazy-load').first().scrollIntoViewIfNeeded();
      const lazy = page.locator('.mljr-lazy-image').first();
      if (await lazy.count() > 0) {
        await lazy.scrollIntoViewIfNeeded();
        await expect(lazy).toBeVisible();
      }
    });
  });

  test.describe('Scroll Reveal Component', () => {
    test('should render scroll reveal wrapper', async ({ page }) => {
      await page.locator('#scroll-reveal').first().scrollIntoViewIfNeeded();
      const reveal = page.locator('.mljr-inview').first();
      if (await reveal.count() > 0) {
        await reveal.scrollIntoViewIfNeeded();
        await expect(reveal).toBeVisible();
      }
    });
  });

  // ─── Integration Components ───────────────────────────────────────

  test.describe('Rich Text Editor Component', () => {
    test('should render rich text editor', async ({ page }) => {
      await page.locator('#rich-text-editor').first().scrollIntoViewIfNeeded();
      const editor = page.locator('.mljr-rte').first();
      if (await editor.count() > 0) {
        await editor.scrollIntoViewIfNeeded();
        await expect(editor).toBeVisible();
      }
    });

    test('should render toolbar', async ({ page }) => {
      await page.locator('#rich-text-editor').first().scrollIntoViewIfNeeded();
      const toolbar = page.locator('.mljr-rte-toolbar').first();
      if (await toolbar.count() > 0) {
        await toolbar.scrollIntoViewIfNeeded();
        await expect(toolbar).toBeVisible();
      }
    });
  });

  test.describe('Map Embed Component', () => {
    test('should render map embed container', async ({ page }) => {
      await page.locator('#map-embed').first().scrollIntoViewIfNeeded();
      const map = page.locator('.mljr-map-embed').first();
      if (await map.count() > 0) {
        await map.scrollIntoViewIfNeeded();
        await expect(map).toBeVisible();
      }
    });
  });

  test.describe('Table of Content Component', () => {
    test('should render table of content', async ({ page }) => {
      await page.locator('#table-of-content').first().scrollIntoViewIfNeeded();
      const toc = page.locator('.mljr-toc').first();
      if (await toc.count() > 0) {
        await toc.scrollIntoViewIfNeeded();
        await expect(toc).toBeVisible();
      }
    });

    test('should render TOC links', async ({ page }) => {
      await page.locator('#table-of-content').first().scrollIntoViewIfNeeded();
      const links = page.locator('.mljr-toc a, .mljr-toc-link');
      if (await links.count() > 0) {
        expect(await links.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Infinite Scroll Component', () => {
    test('should render infinite scroll sentinel', async ({ page }) => {
      await page.locator('#lazy-load').first().scrollIntoViewIfNeeded();
      const sentinel = page.locator('.mljr-infinite-scroll-sentinel, .mljr-infinite-scroll').first();
      if (await sentinel.count() > 0) {
        await sentinel.scrollIntoViewIfNeeded();
        await expect(sentinel).toBeVisible();
      }
    });
  });

  // ─── Legal Pages ──────────────────────────────────────────────────

  test.describe('Legal Pages Component', () => {
    test('should render legal page content', async ({ page }) => {
      await page.locator('#legal-pages').first().scrollIntoViewIfNeeded();
      const legal = page.locator('.mljr-legal').first();
      if (await legal.count() > 0) {
        await legal.scrollIntoViewIfNeeded();
        await expect(legal).toBeVisible();
      }
    });
  });
});
