import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import summonerMatchDetailInfoQuery from '@/apis/queries/summonerMatchDetailInfoQuery';
import type { ParticipantDto } from '@/apis/types';
import MatchHistoryCardExpandBuild from '@/components/pages/summoners/[summonerTagName]/MatchHistoryInfoTab/MatchHistoryCardExpandBuild';
import MatchHistoryCardExpandInfo from '@/components/pages/summoners/[summonerTagName]/MatchHistoryInfoTab/MatchHistoryCardExpandInfo';

interface MatchHistoryCardExpandProps {
  matchId: string;
  participant: ParticipantDto;
}

function MatchHistoryCardExpand({ matchId, participant }: MatchHistoryCardExpandProps) {
  const { data, status } = useQuery(summonerMatchDetailInfoQuery({ matchId }));
  const [isBuildOpen, setIsBuildOpen] = useState(false);

  const color800 = participant.win ? 'blue800' : 'main';

  if (status !== 'success') {
    return;
  }

  const { participants, teams, gameDuration } = data.data;

  return (
    <Flex width="full" gap="8px" direction="column">
      <Flex width="full" height="44px" textStyle="t2" fontWeight={700} borderRadius="4px">
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="center"
          bg={isBuildOpen ? 'white' : color800}
          borderLeftRadius="inherit"
          onClick={() => setIsBuildOpen(false)}
        >
          <Text color={isBuildOpen ? 'gray600' : 'white'}>기본 정보</Text>
        </Flex>
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="center"
          bg={isBuildOpen ? color800 : 'white'}
          borderRightRadius="inherit"
          onClick={() => setIsBuildOpen(true)}
        >
          <Text color={isBuildOpen ? 'white' : 'gray600'}>빌드</Text>
        </Flex>
      </Flex>
      {isBuildOpen ? (
        <MatchHistoryCardExpandBuild participant={participant} />
      ) : (
        <MatchHistoryCardExpandInfo participants={participants} teams={teams} gameDuration={gameDuration} />
      )}
    </Flex>
  );
}

export default MatchHistoryCardExpand;
