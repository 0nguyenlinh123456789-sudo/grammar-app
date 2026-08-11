// Bring-your-own-key storage for the Gemini API.
//
// The product no longer ships a shared provider credential: every learner pastes
// their own Google AI Studio key, it stays in that browser's localStorage and is
// forwarded per request to /api/ai, which uses it once and never persists it.

const STORAGE_KEY = 'grammarGeminiKeyV1';
const CHANGE_EVENT = 'grammar:ai-key-changed';
const OPEN_EVENT = 'grammar:open-ai-key';

// Google AI Studio keys are URL-safe base64-ish strings (currently `AIza...`,
// 39 chars). Keep the charset strict — the server interpolates the key into an
// upstream query string, so anything outside this set is rejected on both ends.
export const GEMINI_KEY_PATTERN = /^[A-Za-z0-9_-]{20,120}$/;

// Lower-case on purpose: it matches the header name the Node/Workers runtimes
// expose on the server, so client and server share one spelling.
export const AI_KEY_HEADER = 'x-gemini-key';

export function normalizeGeminiKey(value) {
  return String(value ?? '').trim();
}

export function isValidGeminiKey(value) {
  return GEMINI_KEY_PATTERN.test(normalizeGeminiKey(value));
}

function storage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    // Safari in private mode throws on access rather than returning null.
    return null;
  }
}

export function getGeminiKey() {
  try {
    const value = normalizeGeminiKey(storage()?.getItem(STORAGE_KEY));
    return isValidGeminiKey(value) ? value : '';
  } catch {
    return '';
  }
}

export function hasGeminiKey() {
  return getGeminiKey() !== '';
}

export function saveGeminiKey(value) {
  const key = normalizeGeminiKey(value);
  if (!isValidGeminiKey(key)) throw new Error('invalid-gemini-key');
  storage()?.setItem(STORAGE_KEY, key);
  notifyKeyChanged();
  return key;
}

export function clearGeminiKey() {
  storage()?.removeItem(STORAGE_KEY);
  notifyKeyChanged();
}

/** `AIzaSy…` → `AIzaSy••••••••wXyZ` for read-only display. */
export function maskGeminiKey(value) {
  const key = normalizeGeminiKey(value);
  if (key.length <= 10) return key ? '••••••••' : '';
  return `${key.slice(0, 6)}${'•'.repeat(8)}${key.slice(-4)}`;
}

function notifyKeyChanged() {
  globalThis.dispatchEvent?.(new CustomEvent(CHANGE_EVENT));
}

/** Subscribe to key changes made in this tab or another one. */
export function subscribeGeminiKey(listener) {
  const onStorage = (event) => { if (!event.key || event.key === STORAGE_KEY) listener(); };
  globalThis.addEventListener?.(CHANGE_EVENT, listener);
  globalThis.addEventListener?.('storage', onStorage);
  return () => {
    globalThis.removeEventListener?.(CHANGE_EVENT, listener);
    globalThis.removeEventListener?.('storage', onStorage);
  };
}

/** Any screen can ask the layout to open the API-key dialog. */
export function openAiKeySettings() {
  globalThis.dispatchEvent?.(new CustomEvent(OPEN_EVENT));
}

export function subscribeOpenAiKeySettings(listener) {
  globalThis.addEventListener?.(OPEN_EVENT, listener);
  return () => globalThis.removeEventListener?.(OPEN_EVENT, listener);
}
