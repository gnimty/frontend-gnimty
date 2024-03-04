import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { SearchPopRowItem } from './SearchPopRow';

const RECENT_SEARCHES_MAX = 10;

interface RecentSearchesState {
  recentSearches: SearchPopRowItem[];
  addRecentSearch: (newRecentSearch: SearchPopRowItem) => void;
  removeRecentSearch: (puuidToRemove: string) => void;
}

const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addRecentSearch: (newRecentSearch) => {
        set((state) => ({
          recentSearches: [
            newRecentSearch,
            ...state.recentSearches.filter((prevRecentSearch) => prevRecentSearch.puuid !== newRecentSearch.puuid),
          ].slice(0, RECENT_SEARCHES_MAX),
        }));
      },
      removeRecentSearch: (puuidToRemove) => {
        set((state) => ({
          recentSearches: state.recentSearches.filter((recentSearch) => recentSearch.puuid !== puuidToRemove),
        }));
      },
    }),
    {
      name: 'GNIMTY_RECENT_SEARCHES',
    },
  ),
);

export default useRecentSearchesStore;
