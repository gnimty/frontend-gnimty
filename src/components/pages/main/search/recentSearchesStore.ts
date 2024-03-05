import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import createSSRStore from '@/utils/createSSRStore';

import type { SearchPopRowItem } from './SearchPopRow';

/*
 * TODO: 아래 링크 참고해서 storage 이벤트 연결하기
 * https://docs.pmnd.rs/zustand/integrations/persisting-store-data#how-can-i-rehydrate-on-storage-event
 */

const RECENT_SEARCHES_MAX = 10;

interface RecentSearchesState {
  recentSearches: SearchPopRowItem[];
}

interface RecentSearchesActions {
  addRecentSearch: (newRecentSearch: SearchPopRowItem) => void;
  removeRecentSearch: (puuidToRemove: string) => void;
}

export type RecentSearchesStore = RecentSearchesState & RecentSearchesActions;

const defaultInitState: RecentSearchesState = {
  recentSearches: [],
};

const createRecentSearchesStore = (initState: RecentSearchesState = defaultInitState) =>
  createStore<RecentSearchesStore>()(
    persist(
      (set) => ({
        ...initState,
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

const [RecentSearchesStoreProvider, useRecentSearchesStore] = createSSRStore(createRecentSearchesStore);

export { RecentSearchesStoreProvider, useRecentSearchesStore };
