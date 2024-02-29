import { HStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import rankTiersQuery from '@/apis/queries/rankTiersQuery';
import type { GameMode } from '@/apis/types';

import TopThreeCard from './TopThreeCard';

import type { StackProps } from '@chakra-ui/react';

interface TopThreeSectionProps extends StackProps {
  queueType: Extract<GameMode, 'RANK_SOLO' | 'RANK_FLEX'>;
}

export default function TopThreeSection(props: TopThreeSectionProps) {
  const { queueType, ...restProps } = props;

  const { data: summonerRanks } = useSuspenseQuery({
    ...rankTiersQuery({ page: 1, queueType }),
    select: (data) => data.data.ranks.slice(0, 3),
  });

  return (
    <HStack gap="12px" {...restProps}>
      {summonerRanks.map((summonerRank) => (
        <TopThreeCard key={summonerRank.rank} summonerRank={summonerRank} />
      ))}
    </HStack>
  );
}
