const browser = typeof window !== 'undefined';

export interface CookieCookieDetail {
  name: string;
  duration: string;
  provider: string;
  purpose: string;
}

export interface CookieCategory {
  id: string;
  name: string | { en: string; de: string };
  description: string | { en: string; de: string };
  required?: boolean;
  cookies?: CookieCookieDetail[];
}

export interface CookieConsent {
  version: number;
  timestamp: number;
  /** Map of category id → accepted boolean */
  preferences: Record<string, boolean>;
}

const STORAGE_KEY = 'mljr-cookie-consent';
const CONSENT_VERSION = 1;

let _hasConsented = $state(false);
let _showBanner = $state(false);
let _preferences = $state<Record<string, boolean>>({});
let _initialized = $state(false);

function loadFromStorage(): CookieConsent | null {
  if (!browser) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(prefs: Record<string, boolean>) {
  if (!browser) return;
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    timestamp: Date.now(),
    preferences: prefs,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

/**
 * Initialize the cookie store. Call once on app mount (e.g., in +layout.svelte).
 * Loads persisted preferences; shows the banner if no prior consent.
 */
function initialize() {
  if (_initialized) return;
  _initialized = true;

  if (!browser) return;

  const stored = loadFromStorage();
  if (stored) {
    _preferences = stored.preferences;
    _hasConsented = true;
    _showBanner = false;
  } else {
    _showBanner = true;
  }
}

/**
 * Accept all categories (including optional ones).
 * @param ids - all category ids (required + optional)
 */
function acceptAll(ids: string[]) {
  const prefs: Record<string, boolean> = {};
  for (const id of ids) {
    prefs[id] = true;
  }
  _preferences = prefs;
  _hasConsented = true;
  _showBanner = false;
  saveToStorage(prefs);
}

/**
 * Deny all optional categories; keep required ones as true.
 * @param ids - all category ids
 * @param requiredIds - ids that must stay true
 */
function denyAll(ids: string[], requiredIds: string[]) {
  const prefs: Record<string, boolean> = {};
  for (const id of ids) {
    prefs[id] = requiredIds.includes(id);
  }
  _preferences = prefs;
  _hasConsented = true;
  _showBanner = false;
  saveToStorage(prefs);
}

/**
 * Save user-selected preferences.
 */
function savePreferences(prefs: Record<string, boolean>) {
  _preferences = { ...prefs };
  _hasConsented = true;
  _showBanner = false;
  saveToStorage(_preferences);
}

/** Re-open the cookie banner/settings modal. */
function openBanner() {
  _showBanner = true;
}

/** Reset all consent data and re-show the banner. */
function resetConsent() {
  if (browser) {
    localStorage.removeItem(STORAGE_KEY);
  }
  _preferences = {};
  _hasConsented = false;
  _showBanner = true;
}

/** Returns true if the given category id has been accepted. */
function isAllowed(id: string): boolean {
  return _preferences[id] === true;
}

/** Returns true if the given category id has been explicitly denied. */
function isDenied(id: string): boolean {
  return _hasConsented && _preferences[id] === false;
}

export const cookieStore = {
  get hasConsented() { return _hasConsented; },
  get showBanner() { return _showBanner; },
  get preferences() { return _preferences; },
  get initialized() { return _initialized; },
  initialize,
  acceptAll,
  denyAll,
  savePreferences,
  openBanner,
  resetConsent,
  isAllowed,
  isDenied,
};
