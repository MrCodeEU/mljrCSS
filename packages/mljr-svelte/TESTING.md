# Testing Guide

This project uses a comprehensive testing approach to ensure component quality, accessibility, and functionality.

## Test Stack

- **Vitest**: Unit and component testing
- **Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing
- **Axe**: Accessibility testing
- **jest-dom**: Enhanced DOM assertions

## Running Tests

### Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Debug E2E tests
pnpm test:e2e:debug
```

## Test Structure

```
src/tests/
├── setup.ts              # Test setup and configuration
├── Button.test.ts        # Button component tests
├── Carousel.test.ts      # Carousel component tests
├── accessibility.test.ts # Accessibility tests
└── e2e/
    └── components.spec.ts # E2E tests
```

## Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import MyComponent from '../lib/components/MyComponent.svelte';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { container } = render(MyComponent, {
      props: { title: 'Test' },
    });
    expect(container).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    const { container } = render(MyComponent);
    const button = container.querySelector('button')!;
    await user.click(button);
    // assertions...
  });
});
```

### Accessibility Tests

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(MyComponent);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### E2E Tests

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('component should be accessible', async ({ page }) => {
  await page.goto('/');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## Coverage Reports

Coverage reports are generated in the `coverage/` directory after running `pnpm test:coverage`.

View the HTML report by opening `coverage/index.html` in your browser.

## CI/CD

Tests run automatically on:
- Every push to `main`
- Every pull request

The CI pipeline includes:
1. **Build**: Ensures packages build successfully
2. **Unit Tests**: Runs all component tests with coverage
3. **E2E Tests**: Runs Playwright tests across browsers
4. **Type Checking**: Validates TypeScript types

## Best Practices

1. **Test user behavior, not implementation details**
2. **Use accessibility queries** (`getByRole`, `getByLabelText`)
3. **Test keyboard navigation and screen reader support**
4. **Maintain high test coverage** (aim for >80%)
5. **Write descriptive test names**
6. **Group related tests** with `describe` blocks

## Debugging

### Unit Tests
```bash
# Run specific test file
pnpm test Button.test.ts

# Debug with browser UI
pnpm test:ui
```

### E2E Tests
```bash
# Run with headed browser
pnpm test:e2e --headed

# Debug mode
pnpm test:e2e:debug
```

## Performance Testing

While not included by default, you can add performance tests using:
- Lighthouse CI for automated performance audits
- Vitest benchmarks for function performance

## Troubleshooting

**Tests timing out?**
- Increase timeout in vitest.config.ts
- Use `waitFor` for async updates

**E2E tests failing?**
- Ensure dev server is running
- Check Playwright browser installation
- Verify selectors in tests

**Coverage not accurate?**
- Check `coverage.exclude` in vitest.config.ts
- Ensure all source files are included
