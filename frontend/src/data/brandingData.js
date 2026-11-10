// Astadasapeetam Central Branding Store (Logo & Favicon Manager)

export const DEFAULT_BRANDING = {
  logoType: 'text_icon', // 'image' | 'text_icon'
  logoUrl: '',
  logoEmoji: '🕉️',
  siteTitle: 'Astadasapeetam.com',
  siteTagline: 'Devotion • Faith • Dharma',
  logoHeight: 44,
  faviconType: 'emoji', // 'image' | 'emoji'
  faviconUrl: '',
  faviconEmoji: '🕉️'
};

const STORAGE_KEY = 'astadasapeetam_branding';

/**
 * Generates an SVG Data URI for an emoji favicon
 */
export function getEmojiFaviconUri(emoji = '🕉️') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="85">${emoji}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Loads current branding settings from localStorage or defaults
 */
export function getStoredBranding() {
  if (typeof window === 'undefined') return DEFAULT_BRANDING;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BRANDING;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_BRANDING, ...parsed };
  } catch (e) {
    console.error('Failed to parse branding data:', e);
    return DEFAULT_BRANDING;
  }
}

/**
 * Directly updates the <link rel="icon"> in browser document head
 */
export function applyFaviconToDocument(branding) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  try {
    let iconUrl = '';
    if (branding.faviconType === 'image' && branding.faviconUrl) {
      iconUrl = branding.faviconUrl;
    } else {
      iconUrl = getEmojiFaviconUri(branding.faviconEmoji || '🕉️');
    }

    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.type = iconUrl.startsWith('data:image/svg+xml') ? 'image/svg+xml' : 'image/x-icon';
    link.href = iconUrl;
  } catch (e) {
    console.error('Failed to apply favicon to document:', e);
  }
}

/**
 * Saves branding settings to localStorage and dispatches global event
 */
export function saveBranding(brandingData) {
  if (typeof window === 'undefined') return false;
  try {
    const merged = { ...DEFAULT_BRANDING, ...brandingData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    applyFaviconToDocument(merged);
    window.dispatchEvent(new CustomEvent('brandingUpdated', { detail: merged }));
    return merged;
  } catch (e) {
    console.error('Failed to save branding:', e);
    return false;
  }
}
