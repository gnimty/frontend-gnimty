import { VStack } from '@chakra-ui/react';

import type { ProfileEntry } from '@/apis/types';

export interface RecommendedPickSelectSummonerProps {
  myProfile: ProfileEntry;
  // TODO: unknown을 구체적 타입으로 변경
  onSummonerChange: (newSummoner: unknown) => void;
}

export default function RecommendedPickSelectSummoner(props: RecommendedPickSelectSummonerProps) {
  // TODO: use onSummonerChange
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { myProfile, onSummonerChange } = props;

  return <VStack w="full">{myProfile.email}</VStack>;
}
