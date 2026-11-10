// Astadasapeetam Central Branding Store (Logo & Favicon Manager)

export const DEFAULT_BRANDING = {
  logoType: 'image', // Uses official Astadasapeetam Lotus & Diya emblem
  logoUrl: '/images/astadasapeetam_logo.jpg',
  logoEmoji: '🪔',
  siteTitle: 'Astadasapeetam.com',
  siteTagline: 'Devotion • Faith • Dharma',
  logoHeight: 46,
  faviconType: 'image',
  faviconUrl: '/icon.png',
  faviconEmoji: '🪔'
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
    // Enforce official artwork as the favicon across all sessions
    parsed.faviconType = 'image';
    parsed.faviconUrl = '/icon.png?v=3';
    return { ...DEFAULT_BRANDING, ...parsed };
  } catch (e) {
    console.error('Failed to parse branding data:', e);
    return DEFAULT_BRANDING;
  }
}

/**
 * Converts an emoji to a rich crisp PNG Data URI using an offscreen canvas
 * Guarantees 100% instant rendering in Chrome, Edge, Safari & Firefox tab bars
 */
export function getEmojiFaviconPng(emoji = '🕉️') {
  if (typeof document === 'undefined') return '';
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Draw circular devotional badge
    const grad = ctx.createLinearGradient(0, 0, 64, 64);
    grad.addColorStop(0, '#78131e');
    grad.addColorStop(1, '#9e1c2a');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 29, 0, Math.PI * 2);
    ctx.fill();

    // Gold sacred border
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    // Centered sacred emoji symbol
    ctx.font = '34px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 32, 34);

    return canvas.toDataURL('image/png');
  } catch (e) {
    return '';
  }
}

/**
 * Directly updates the <link rel="icon"> in browser document head
 * Forces Chrome to immediately repaint the tab bar icon
 */
export function applyFaviconToDocument() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  try {
    const iconUrl = '/icon.png?v=3';

    // Remove existing favicon links to break browser caching in Chrome
    const existingLinks = document.querySelectorAll("link[rel*='icon']");
    existingLinks.forEach(el => el.parentNode && el.parentNode.removeChild(el));

    // Append fresh link tag with permanent official icon
    const newLink = document.createElement('link');
    newLink.id = 'dynamic-sanctuary-favicon';
    newLink.rel = 'icon';
    newLink.type = 'image/png';
    newLink.href = iconUrl;
    document.getElementsByTagName('head')[0].appendChild(newLink);
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
