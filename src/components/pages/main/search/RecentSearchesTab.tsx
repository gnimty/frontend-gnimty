import { useRecentSearchesStore } from './recentSearchesStore';
import SearchPopBody from './SearchPopBody';

export default function RecentSearchTab() {
  const recentSearches = useRecentSearchesStore((state) => state.recentSearches);
  const removeRecentSearch = useRecentSearchesStore((state) => state.removeRecentSearch);

  return (
    <SearchPopBody
      textWhenEmpty="아직 검색한 내용이 없어요!"
      items={recentSearches}
      onXButtonClick={(puuid) => {
        removeRecentSearch(puuid);
      }}
    />
  );
}
