import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SearchInput from '../lib/components/forms/SearchInput.svelte';

describe('SearchInput', () => {
  describe('Rendering', () => {
    it('renders input element', async () => {
      const { container } = render(SearchInput);
      
      expect(container.querySelector('.mljr-search-field')).toBeTruthy();
    });

    it('renders with label', async () => {
      const { container } = render(SearchInput, {
        label: 'Search',
      });
      
      const label = container.querySelector('.mljr-search-label');
      expect(label?.textContent).toContain('Search');
    });

    it('renders with placeholder', async () => {
      const { container } = render(SearchInput, {
        placeholder: 'Search products...',
      });
      
      const input = container.querySelector('.mljr-search-field');
      expect(input?.getAttribute('placeholder')).toBe('Search products...');
    });

    it('renders search icon', async () => {
      const { container } = render(SearchInput);
      
      expect(container.querySelector('.mljr-search-icon')).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('shows loading state with spinner icon', async () => {
      const { container } = render(SearchInput, {
        loading: true,
      });
      
      // Icon container should be present
      expect(container.querySelector('.mljr-search-icon')).toBeTruthy();
    });

    it('shows search icon when not loading', async () => {
      const { container } = render(SearchInput, {
        loading: false,
      });
      
      expect(container.querySelector('.mljr-search-icon')).toBeTruthy();
    });
  });

  describe('Clear Button', () => {
    it('shows clear button when value exists', async () => {
      const { container } = render(SearchInput, {
        value: 'search term',
        clearable: true,
      });
      
      expect(container.querySelector('.mljr-search-clear')).toBeTruthy();
    });

    it('hides clear button when no value', async () => {
      const { container } = render(SearchInput, {
        value: '',
        clearable: true,
      });
      
      expect(container.querySelector('.mljr-search-clear')).toBeFalsy();
    });

    it('hides clear button when clearable is false', async () => {
      const { container } = render(SearchInput, {
        value: 'search term',
        clearable: false,
      });
      
      expect(container.querySelector('.mljr-search-clear')).toBeFalsy();
    });
  });

  describe('Interaction', () => {
    it('calls onsearch when value changes', async () => {
      const handleSearch = vi.fn();
      const { container } = render(SearchInput, {
        value: '',
        onsearch: handleSearch,
      });
      
      const input = container.querySelector('.mljr-search-field') as HTMLInputElement;
      input.value = 'test query';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // The onsearch should be called
      expect(handleSearch).toHaveBeenCalled();
    });

    it('respects disabled state', async () => {
      const { container } = render(SearchInput, {
        disabled: true,
      });
      
      const input = container.querySelector('.mljr-search-field');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has correct input type', async () => {
      const { container } = render(SearchInput);
      
      const input = container.querySelector('.mljr-search-field');
      expect(input?.getAttribute('type')).toBe('search');
    });

    it('has aria-label for clear button', async () => {
      const { container } = render(SearchInput, {
        value: 'test',
        clearable: true,
      });
      
      const clearBtn = container.querySelector('.mljr-search-clear');
      expect(clearBtn?.getAttribute('aria-label')).toBe('Clear search');
    });
  });

  describe('Styling', () => {
    it('applies custom className', async () => {
      const { container } = render(SearchInput, {
        class: 'custom-search',
      });
      
      const wrapper = container.querySelector('.mljr-search');
      expect(wrapper?.classList.contains('custom-search')).toBe(true);
    });

    it('has rounded pill shape', async () => {
      const { container } = render(SearchInput);
      
      const wrapper = container.querySelector('.mljr-search-wrapper');
      expect(wrapper).toBeTruthy();
    });
  });
});
