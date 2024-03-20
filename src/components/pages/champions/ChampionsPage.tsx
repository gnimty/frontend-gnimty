import { HStack } from '@chakra-ui/react';

import ChampionsRankings from './ChampionsRankings';
import ChampionsSummaryTabs from './ChampionsSummaryTabs';

export default function ChampionsPage() {
  return (
    <HStack w="1080px" gap="12px" m="40px auto 68px" align="start">
      <ChampionsSummaryTabs />
      <ChampionsRankings />
    </HStack>
  );
}
