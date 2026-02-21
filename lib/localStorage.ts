import { WatchlistItem } from '@/types';

// LocalStorage keys
const WATCHLIST_KEY = 'tareq_cinema_watchlist';
const CONTINUE_WATCHING_KEY = 'tareq_cinema_continue';
const LANGUAGE_KEY = 'tareq_cinema_language';

// Watchlist functions (fallback when not authenticated)
export const localStorageApi = {
  // Watchlist
  getWatchlist: (): WatchlistItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(WATCHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addToWatchlist: (item: WatchlistItem) => {
    if (typeof window === 'undefined') return;
    const watchlist = localStorageApi.getWatchlist();
    const exists = watchlist.find(i => i.id === item.id && i.type === item.type);
    
    if (!exists) {
      watchlist.unshift({ ...item, added_at: new Date().toISOString() });
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    }
  },

  removeFromWatchlist: (id: number, type: 'movie' | 'tv') => {
    if (typeof window === 'undefined') return;
    const watchlist = localStorageApi.getWatchlist();
    const filtered = watchlist.filter(item => !(item.id === id && item.type === type));
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
  },

  isInWatchlist: (id: number, type: 'movie' | 'tv'): boolean => {
    if (typeof window === 'undefined') return false;
    const watchlist = localStorageApi.getWatchlist();
    return watchlist.some(item => item.id === id && item.type === type);
  },

  // Continue watching
  getContinueWatching: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CONTINUE_WATCHING_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveContinueWatching: (item: any) => {
    if (typeof window === 'undefined') return;
    const list = localStorageApi.getContinueWatching();
    const existing = list.findIndex((i: any) => i.id === item.id && i.type === item.type);
    
    if (existing >= 0) {
      list[existing] = { ...item, updated_at: new Date().toISOString() };
    } else {
      list.unshift({ ...item, updated_at: new Date().toISOString() });
    }
    
    // Keep only last 20 items
    const trimmed = list.slice(0, 20);
    localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(trimmed));
  },

  // Language preference
  getLanguage: (): 'ar' | 'en' => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem(LANGUAGE_KEY) as 'ar' | 'en') || 'en';
  },

  setLanguage: (lang: 'ar' | 'en') => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LANGUAGE_KEY, lang);
  },
};
