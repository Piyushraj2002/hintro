// Client-side localStorage utilities
const isBrowser = typeof window !== 'undefined';

export const storage = {
  getItem: (key: string): string | null => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      console.error(`Error reading from localStorage: ${key}`);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      console.error(`Error writing to localStorage: ${key}`);
    }
  },

  removeItem: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      console.error(`Error removing from localStorage: ${key}`);
    }
  },

  clear: (): void => {
    if (!isBrowser) return;
    try {
      localStorage.clear();
    } catch {
      console.error('Error clearing localStorage');
    }
  },

  getJSON: <T,>(key: string): T | null => {
    const item = storage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      console.error(`Error parsing JSON from localStorage: ${key}`);
      return null;
    }
  },

  setJSON: <T,>(key: string, value: T): void => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Error stringifying JSON for localStorage: ${key}`);
    }
  },
};
