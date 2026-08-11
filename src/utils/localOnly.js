// File: src/utils/localOnly.js
// IELTS Nền Tảng is the owner's private study corner: its media library
// (public/ielts-foundation/, ~8GB) exists only on the owner's machine and is
// gitignored, so the whole section is hidden on the deployed customer site.
// It shows only when the app runs on localhost (dev server or local preview).

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]'];

export const isLocalHost =
  typeof window !== 'undefined' && LOCAL_HOSTNAMES.includes(window.location.hostname);

export const SHOW_IELTS_FOUNDATION = import.meta.env.DEV || isLocalHost;
