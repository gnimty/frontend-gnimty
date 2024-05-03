import { Flex } from '@chakra-ui/react';

import type { MatchBriefRes } from '@/apis/types';
import MatchHistoryCard from '@/components/pages/summoners/[summonerTagName]/MatchHistoryInfoTab/MatchHistoryCard';

interface MatchHistoryInfoTabProps {
  matches: MatchBriefRes[];
}

export default function MatchHistoryInfoTab({ matches }: MatchHistoryInfoTabProps) {
  return (
    <Flex direction="column" w="full" gap="4px">
      {matches.map((match) => (
        <MatchHistoryCard key={match.matchInfo.matchId} match={match} />
      ))}
    </Flex>
  );
}
