import { HStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import rankTiersQuery from '@/api/queries/rankTiersQuery';

import TopThreeCard from './TopThreeCard';

import type { StackProps } from '@chakra-ui/react';

interface TopThreeSectionProps extends StackProps {}

export default function TopThreeSection(props: TopThreeSectionProps) {
  const { data: summonerRanks } = useSuspenseQuery({
    ...rankTiersQuery({ page: 1 }),
    select: (data) => data.data.ranks.slice(0, 3),
  });

  return (
    <HStack gap="12px" {...props}>
      {summonerRanks.map((summonerRank) => (
        <TopThreeCard key={summonerRank.rank} summonerRank={summonerRank} />
      ))}
    </HStack>
  );
}
