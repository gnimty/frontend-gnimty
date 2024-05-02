import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

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
  const { isOpen: isBuildTab, onOpen: onBuildTab, onClose: onBaseInfoTab } = useDisclosure();

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
          bg={isBuildTab ? 'white' : color800}
          borderLeftRadius="inherit"
          onClick={onBaseInfoTab}
        >
          <Text color={isBuildTab ? 'gray600' : 'white'}>기본 정보</Text>
        </Flex>
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="center"
          bg={isBuildTab ? color800 : 'white'}
          borderRightRadius="inherit"
          onClick={onBuildTab}
        >
          <Text color={isBuildTab ? 'white' : 'gray600'}>빌드</Text>
        </Flex>
      </Flex>
      {!isBuildTab ? (
        <MatchHistoryCardExpandInfo participants={participants} teams={teams} gameDuration={gameDuration} />
      ) : (
        <MatchHistoryCardExpandBuild participant={participant} />
      )}
    </Flex>
  );
}

export default MatchHistoryCardExpand;
