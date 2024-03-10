import { type ReactNode } from 'react';

import {
  FavoriteSummonerMapStoreContext,
  FavoriteSummonerMapStoreProvider,
} from '@/components/pages/main/search/favoriteSummonerMapStore';
import {
  RecentSearchesStoreContext,
  RecentSearchesStoreProvider,
} from '@/components/pages/main/search/recentSearchesStore';

import PersistStoreStorageProvider from './PersistStoreStorageProvider';

interface StoreProvidersProps {
  children?: ReactNode;
}

export default function StoreProviders(props: StoreProvidersProps) {
  const { children } = props;

  return (
    <RecentSearchesStoreProvider>
      <FavoriteSummonerMapStoreProvider>
        {/* FIXME */}
        {/* @ts-expect-error 나중에 createSSRStore() 수정 혹은 다른 방법을 통해 타이핑 작동하게 하기 */}
        <PersistStoreStorageProvider StoreContext={RecentSearchesStoreContext}>
          {/* FIXME */}
          {/* @ts-expect-error 나중에 createSSRStore() 수정 혹은 다른 방법을 통해 타이핑 작동하게 하기 */}
          <PersistStoreStorageProvider StoreContext={FavoriteSummonerMapStoreContext}>
            {children}
          </PersistStoreStorageProvider>
        </PersistStoreStorageProvider>
      </FavoriteSummonerMapStoreProvider>
    </RecentSearchesStoreProvider>
  );
}
