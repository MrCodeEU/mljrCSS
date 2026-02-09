import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

const THEME_COOKIE_NAME = 'mljr-theme';
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getSystemTheme(): 'light' | 'dark' {
  if (!browser) return 'light';
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getBrowserPreference(): Theme {
  if (!browser) return 'system';
  // Check if user has a system preference
  const hasDarkPreference = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
  const hasLightPreference = globalThis.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (hasDarkPreference) return 'dark';
  if (hasLightPreference) return 'light';
  return 'system';
}

function setCookie(value: string) {
  if (!browser) return;
  document.cookie = `${THEME_COOKIE_NAME}=${value};path=/;max-age=${THEME_COOKIE_MAX_AGE};SameSite=Lax`;
}

function getCookie(): string | null {
  if (!browser) return null;
  const regex = new RegExp(`${THEME_COOKIE_NAME}=([^;]+)`);
  const match = regex.exec(document.cookie);
  return match ? match[1] : null;
}

function deleteCookie() {
  if (!browser) return;
  document.cookie = `${THEME_COOKIE_NAME}=;path=/;max-age=0`;
}

function createThemeStore() {
  let theme = $state<Theme>('system');
  let resolvedTheme = $state<'light' | 'dark'>('light');
  let initialized = $state(false);

  function updateResolvedTheme() {
    resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
  }

  function applyTheme() {
    if (!browser) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.dataset.theme = resolvedTheme;
    
    // Dispatch custom event for other components
    globalThis.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme, resolvedTheme } 
    }));
  }

  function setTheme(newTheme: Theme) {
    theme = newTheme;
    updateResolvedTheme();
    applyTheme();

    if (browser) {
      // Store in localStorage for client-side
      localStorage.setItem(THEME_COOKIE_NAME, newTheme);
      
      // Store in cookie for SSR
      if (newTheme === 'system') {
        deleteCookie();
      } else {
        setCookie(newTheme);
      }
    }
  }

  function toggleTheme() {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function resetToSystem() {
    setTheme('system');
  }

  function initialize(savedTheme?: Theme) {
    if (!browser) {
      // Server-side: use provided theme or default to system
      if (savedTheme) {
        theme = savedTheme;
        updateResolvedTheme();
      }
      return;
    }

    // Client-side: load from storage
    let loadedTheme: Theme | null = null;
    
    // Try cookie first (for SSR consistency)
    const cookieTheme = getCookie();
    if (cookieTheme && ['light', 'dark', 'system'].includes(cookieTheme)) {
      loadedTheme = cookieTheme as Theme;
    }
    
    // Fallback to localStorage
    if (!loadedTheme) {
      const localTheme = localStorage.getItem(THEME_COOKIE_NAME) as Theme | null;
      if (localTheme && ['light', 'dark', 'system'].includes(localTheme)) {
        loadedTheme = localTheme;
      }
    }

    // Fallback to browser preference
    if (!loadedTheme) {
      loadedTheme = getBrowserPreference();
    }

    theme = loadedTheme;
    updateResolvedTheme();
    applyTheme();
    initialized = true;

    // Listen for system theme changes
    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (theme === 'system') {
        updateResolvedTheme();
        applyTheme();
      }
    });

    // Listen for storage changes (multi-tab support)
    globalThis.addEventListener('storage', (e) => {
      if (e.key === THEME_COOKIE_NAME && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme !== theme && ['light', 'dark', 'system'].includes(newTheme)) {
          theme = newTheme;
          updateResolvedTheme();
          applyTheme();
        }
      }
    });
  }

  return {
    get theme() { return theme; },
    get resolvedTheme() { return resolvedTheme; },
    get isDark() { return resolvedTheme === 'dark'; },
    get isSystem() { return theme === 'system'; },
    get initialized() { return initialized; },
    setTheme,
    toggleTheme,
    resetToSystem,
    initialize,
  };
}

export const themeStore = createThemeStore();

// Utility to parse theme from cookie string (for SSR)
export function parseThemeFromCookie(cookieHeader: string | null): Theme | null {
  if (!cookieHeader) return null;
  const regex = new RegExp(`${THEME_COOKIE_NAME}=([^;]+)`);
  const match = regex.exec(cookieHeader);
  const theme = match ? match[1] : null;
  if (theme && ['light', 'dark', 'system'].includes(theme)) {
    return theme as Theme;
  }
  return null;
}
