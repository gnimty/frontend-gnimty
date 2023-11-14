import { VStack, type StackProps } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import recommendedSummonersQuery from '@/apis/queries/recommendedSummonersQuery';
import type { GameMode } from '@/apis/types';

import UserCardLandscape from './UserCardLandscape';

interface RecommendedSummonersSectionProps extends StackProps {
  gameMode: GameMode;
}

export default function RecommendedSummonersSection(props: RecommendedSummonersSectionProps) {
  const { gameMode, ...restProps } = props;
  const { data, status } = useQuery(recommendedSummonersQuery({ gameMode }));

  if (status !== 'success') {
    return;
  }

  return (
    <VStack gap="12px" {...restProps}>
      {data.data.recommendedSummoners.map((summoner) => (
        <UserCardLandscape key={summoner.id} summoner={summoner} />
      ))}
    </VStack>
  );
}
