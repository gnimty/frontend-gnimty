import { Center, Text, VStack } from '@chakra-ui/react';

import SearchPopRow from './SearchPopRow';
import useRecentSearchesStore from './useRecentSearchesStore';

export default function RecentSearchTab() {
  const recentSearches = useRecentSearchesStore((state) => state.recentSearches);
  const removeRecentSearch = useRecentSearchesStore((state) => state.removeRecentSearch);

  if (recentSearches.length === 0) {
    return (
      <Center h="180px">
        <Text textStyle="t2" fontWeight="regular" color="gray500">
          아직 검색한 내용이 없어요!
        </Text>
      </Center>
    );
  }

  return (
    <VStack gap="16px" p="20px">
      {recentSearches.map((recentSearch) => (
        <SearchPopRow
          key={recentSearch.puuid}
          searchPopRowItem={recentSearch}
          onXButtonClick={() => removeRecentSearch(recentSearch.puuid)}
        />
      ))}
    </VStack>
  );
}
