import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
  let theme = $state<Theme>('system');
  let resolvedTheme = $state<'light' | 'dark'>('light');

  function getSystemTheme(): 'light' | 'dark' {
    if (!browser) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateResolvedTheme() {
    resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
  }

  function applyTheme() {
    if (!browser) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.setAttribute('data-theme', resolvedTheme);
  }

  function setTheme(newTheme: Theme) {
    theme = newTheme;
    updateResolvedTheme();
    applyTheme();

    if (browser) {
      localStorage.setItem('mljr-theme', newTheme);
    }
  }

  function toggleTheme() {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function initialize() {
    if (!browser) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('mljr-theme') as Theme | null;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      theme = savedTheme;
    }

    updateResolvedTheme();
    applyTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (theme === 'system') {
        updateResolvedTheme();
        applyTheme();
      }
    });
  }

  return {
    get theme() { return theme; },
    get resolvedTheme() { return resolvedTheme; },
    get isDark() { return resolvedTheme === 'dark'; },
    setTheme,
    toggleTheme,
    initialize,
  };
}

export const themeStore = createThemeStore();
