import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import createSSRStore from '@/utils/createSSRStore';

import type { SearchPopRowItem } from './SearchPopRow';

interface FavoriteSummonerMapState {
  // `useRecentSearches` 배열의 북마크 여부를 확인할 때 성능 이슈가 우려되어
  // 배열이 아닌 오브젝트 형식으로 설계함
  favoriteSummonerMap: Record<string, SearchPopRowItem>;
}

interface FavoriteSummonerMapActions {
  toggleFavoriteSummoner: (summonerToToggle: SearchPopRowItem) => void;
}

export type FavoriteSummonerMapStore = FavoriteSummonerMapState & FavoriteSummonerMapActions;

const defaultInitState: FavoriteSummonerMapState = {
  favoriteSummonerMap: {},
};

const createFavoriteSummonerMapStore = (initState: FavoriteSummonerMapState = defaultInitState) =>
  createStore<FavoriteSummonerMapStore>()(
    persist(
      (set) => ({
        ...initState,
        toggleFavoriteSummoner: (summonerToToggle) => {
          set((state) => {
            if (!Object.hasOwn(state.favoriteSummonerMap, summonerToToggle.puuid)) {
              return {
                favoriteSummonerMap: { ...state.favoriteSummonerMap, [summonerToToggle.puuid]: summonerToToggle },
              };
            } else {
              const newFavoriteSummonerMap = { ...state.favoriteSummonerMap };
              delete newFavoriteSummonerMap[summonerToToggle.puuid];
              return { favoriteSummonerMap: newFavoriteSummonerMap };
            }
          });
        },
      }),
      {
        name: 'GNIMTY_FAVORITE_SUMMONER_MAP',
      },
    ),
  );

const [FavoriteSummonerMapStoreProvider, useFavoriteSummonerMapStore, FavoriteSummonerMapStoreContext] =
  createSSRStore(createFavoriteSummonerMapStore);

export { FavoriteSummonerMapStoreContext, FavoriteSummonerMapStoreProvider, useFavoriteSummonerMapStore };
