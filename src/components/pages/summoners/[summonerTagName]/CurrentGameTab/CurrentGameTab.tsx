import { Box, HStack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import summonerCurrentGameInfoQuery from '@/apis/queries/summonerCurrentGameInfoQuery';
import type { CurrentGameParticipantDto } from '@/apis/types';
import useStopWatch from '@/hooks/useStopwatch';

import CurrentGameRow from './CurrentGameRow';

interface CurrentGameTabProps {
  summonerTagName: string;
}

export default function CurrentGameTab(props: CurrentGameTabProps) {
  const { summonerTagName } = props;

  const { data, status } = useQuery(summonerCurrentGameInfoQuery({ summonerTagName }));

  const { elapsedSeconds, start, isRunning } = useStopWatch();

  if (status !== 'success') {
    return;
  }

  /**
   * 최대한 정확한 시간 체크를 위해 인게임 정보를 받아온 후(`status === 'success'`)에
   * 타이머를 시작
   */
  if (!isRunning) {
    start();
  }

  const gameElapsedSeconds = data.data.gameLength + elapsedSeconds;

  const participantsByTeam = data.data.participants.reduce(
    (team, participant) => {
      if (participant.teamId === 200) {
        team.red.push(participant);
      } else {
        team.blue.push(participant);
      }
      return team;
    },
    { red: [] as CurrentGameParticipantDto[], blue: [] as CurrentGameParticipantDto[] },
  );

  return (
    <Box w="1080px" bg="black">
      <HStack justifyContent="space-between" p="8px 24px">
        <Text textStyle="t1" fontWeight="regular" color="white">
          {data.data.queueInfo.name}
        </Text>
        <HStack gap="8px" fontSize="14px" fontWeight="regular" color="red200">
          <Text>플레이 시간</Text>
          <Text>{dayjs.duration(gameElapsedSeconds, 's').format('mm:ss')}</Text>
        </HStack>
      </HStack>
      <HStack bg="linear-gradient(270deg, #FDE7EA 44.32%, #EBF3FE 55.1%)" gap={0}>
        <CurrentGameRow team="blue" participants={participantsByTeam.blue} />
        <CurrentGameRow team="red" participants={participantsByTeam.red} />
      </HStack>
    </Box>
  );
}
