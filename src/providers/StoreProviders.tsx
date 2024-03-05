import { FavoriteSummonerMapStoreProvider } from '@/components/pages/main/search/favoriteSummonerMapStore';
import { RecentSearchesStoreProvider } from '@/components/pages/main/search/recentSearchesStore';

import type { ReactNode } from 'react';

interface StoreProvidersProps {
  children?: ReactNode;
}

export default function StoreProviders(props: StoreProvidersProps) {
  const { children } = props;

  return (
    <RecentSearchesStoreProvider>
      <FavoriteSummonerMapStoreProvider>{children}</FavoriteSummonerMapStoreProvider>
    </RecentSearchesStoreProvider>
  );
}
