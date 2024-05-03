import { Box, Center, Flex, Grid, Text } from '@chakra-ui/react';
import { Fragment } from 'react';

import type { ParticipantDto, Position, TeamDto } from '@/apis/types';
import PositionImage from '@/components/common/position-image/PositionImage';
import MatchHistoryCardExpandInfoParts from '@/components/pages/summoners/[summonerTagName]/MatchHistoryInfoTab/MatchHistoryCardExpandInfoPartsProps';

interface MatchHistoryCardExpandInfoProps {
  participants: ParticipantDto[];
  teams: TeamDto[];
  gameDuration: number;
}

function MatchHistoryCardExpandInfo({ participants, teams, gameDuration }: MatchHistoryCardExpandInfoProps) {
  const winParticipants = participants.filter((p) => p.win).sort((a, b) => a.participantId - b.participantId);
  const loseParticipants = participants.filter((p) => !p.win).sort((a, b) => a.participantId - b.participantId);

  const maxDamage = participants.reduce((max, cur) => Math.max(max, cur.totalDamageDealtToChampions), 0);

  return (
    <Flex direction="column">
      <Flex
        width="full"
        padding="8px 24px"
        justifyContent="space-between"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray200"
      >
        <Flex gap="24px">
          <Text textStyle="t1" fontWeight={700} color="blue800">
            WIN
          </Text>
          <Text textStyle="t2" fontWeight={400} color="gray800">
            {teams.find((p) => p.win)?.teamId === 100 ? '블루' : '레드'}팀
          </Text>
        </Flex>
        <Flex gap="24px">
          <Text textStyle="t1" fontWeight={700} color="main">
            LOSE
          </Text>
          <Text textStyle="t2" fontWeight={400} color="gray800">
            {teams.find((p) => p.win)?.teamId !== 100 ? '블루' : '레드'}팀
          </Text>
        </Flex>
      </Flex>
      <Grid gridTemplateColumns="repeat(3, auto)">
        <Flex alignItems="center" textStyle="body" color="gray600" fontWeight={700} bg="white" gap="20px" pl="12px">
          <Center w="108px">아이템</Center>
          <Center w="60px">KDA/CS</Center>
          <Center w="48px">딜량</Center>
        </Flex>
        <Center textStyle="body" color="gray600" fontWeight={700} bg="white" py="12px">
          <Center textStyle="body" color="gray600" fontWeight={700}>
            라인
          </Center>
        </Center>
        <Flex
          direction="row-reverse"
          alignItems="center"
          textStyle="body"
          color="gray600"
          fontWeight={700}
          bg="white"
          gap="20px"
          pr="12px"
        >
          <Center w="108px">아이템</Center>
          <Center w="60px">KDA/CS</Center>
          <Center w="48px">딜량</Center>
        </Flex>
        {Array.from({ length: 5 }, (_, index) => index).map((i, index) => {
          const winnerDealRatio =
            winParticipants[i].totalDamageDealtToChampions /
            (winParticipants[i].totalDamageDealtToChampions + loseParticipants[i].totalDamageDealtToChampions);

          return (
            <Fragment key={i * 100 + index}>
              <MatchHistoryCardExpandInfoParts
                participant={winParticipants[i]}
                isVictory={true}
                gameDuration={gameDuration}
                maxDamage={maxDamage}
              />
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                bg="linear-gradient(to right, #EBF3FE, #FDE7EA)"
              >
                {winParticipants[i].lane !== 'UNKNOWN' && (
                  <PositionImage position={winParticipants[i].lane as Position} width={24} height={24} />
                )}
                <Flex w="80px" h="10px" borderRadius="12px">
                  <Box flex={winnerDealRatio} bg="blue" borderLeftRadius="inherit" />
                  <Box flex={1 - winnerDealRatio} bg="red" borderRightRadius="inherit" />
                </Flex>
                <Text textStyle="caption" fontWeight={400} color="gray600">
                  {(winnerDealRatio * 10).toFixed(1)}:{((1 - winnerDealRatio) * 10).toFixed(1)}
                </Text>
              </Flex>
              <MatchHistoryCardExpandInfoParts
                direction="row-reverse"
                participant={loseParticipants[i]}
                isVictory={false}
                gameDuration={gameDuration}
                maxDamage={maxDamage}
              />
            </Fragment>
          );
        })}
      </Grid>
    </Flex>
  );
}

export default MatchHistoryCardExpandInfo;
