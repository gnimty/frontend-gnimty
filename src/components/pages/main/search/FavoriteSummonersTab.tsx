import { Center, Text, VStack } from '@chakra-ui/react';

import SearchPopRow from './SearchPopRow';
import useFavoriteSummonerMapStore from './useFavoriteSummonerMapStore';

export default function FavoriteSummonersTab() {
  const favoriteSummonerMap = useFavoriteSummonerMapStore((state) => state.favoriteSummonerMap);
  const favoriteSummoners = Object.values(favoriteSummonerMap);

  if (favoriteSummoners.length === 0) {
    return (
      <Center h="180px">
        <Text textStyle="t2" fontWeight="regular" color="gray500">
          즐겨찾기한 소환사가 없어요!
        </Text>
      </Center>
    );
  }

  return (
    <VStack gap="16px" p="20px">
      {favoriteSummoners.map((favoriteSummoner) => (
        <SearchPopRow key={favoriteSummoner.puuid} searchPopRowItem={favoriteSummoner} />
      ))}
    </VStack>
  );
}
