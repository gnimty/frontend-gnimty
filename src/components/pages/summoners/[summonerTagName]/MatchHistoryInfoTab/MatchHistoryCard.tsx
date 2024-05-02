import { Box, Center, Flex, Grid, Text, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import type { MatchBriefRes } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import ArrowDown from '@/assets/icons/system/down.svg';
import IconImage from '@/components/common/IconImage';
import ItemImage from '@/components/common/ItemImage';
import PerkImage from '@/components/common/PerkImage';
import PerkStyleImage from '@/components/common/PerkStyleImage';
import SpellImage from '@/components/common/SpellImage';
import Tag from '@/components/common/Tag';
import MatchHistoryCardExpand from '@/components/pages/summoners/[summonerTagName]/MatchHistoryInfoTab/MatchHistoryCardExpand';

dayjs.locale('ko');
dayjs.extend(duration);
dayjs.extend(relativeTime);

interface MatchHistoryCardProps {
  match: MatchBriefRes;
}

export default function MatchHistoryCard({ match }: MatchHistoryCardProps) {
  const { matchInfo, participant, allParticipants } = match;
  const { isOpen, onToggle } = useDisclosure();

  const isVictory = participant.win;

  const color800 = isVictory ? 'blue800' : 'main';
  const color500 = isVictory ? 'blue500' : 'red500';
  const color300 = isVictory ? 'blue300' : 'red300';

  return (
    <Flex direction="column" gap="8px">
      <Flex w="full" h="120px" borderRadius="4px" bg="white">
        <Box
          w="12px"
          h="100%"
          bg={color800}
          borderTopLeftRadius="inherit"
          borderBottomLeftRadius="inherit"
          marginRight="12px"
        />
        <Flex flex={1} paddingY="12px" gap="20px">
          <Flex h="100%" borderRadius="inherit" gap="12px">
            <Flex width="120px" direction="column" color={color500} gap="14px" textStyle="t2">
              <Flex direction="column">
                <Text color={color800} fontWeight={700} textStyle="t1">
                  {matchInfo.queueInfo.name}
                </Text>
                <Text fontWeight={400}>{dayjs(matchInfo.gameEndAt).from(dayjs())}</Text>
              </Flex>
              <Flex direction="column">
                <Text fontWeight={700}>{isVictory ? '승리' : '패배'}</Text>
                <Text fontWeight={400}>
                  {(matchInfo.gameDuration / 60).toFixed(0)}분 {matchInfo.gameDuration % 60}초
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex flex={1} h="100%">
            <Flex direction="column" gap="16px">
              <Center gap="8px">
                <Box position="relative" pb="8px">
                  <IconImage
                    src={championIconUrl(championIdEnNameMap[participant.championId])}
                    width={48}
                    height={48}
                    alt="champion-icon"
                  />
                  <Tag
                    type="level"
                    position="absolute"
                    bottom="8px"
                    left="50%"
                    transform="translate(-50%, 50%)"
                    w="27px"
                    h="16px"
                  >
                    {participant.totalChampionLevel}
                  </Tag>
                </Box>
                <Grid gridTemplateColumns="1fr 1fr" gap="4px">
                  <SpellImage spellId={participant.spellDId} width={24} height={24} />
                  <PerkImage perkId={participant.perks.styles[0].selections[0].perk} width={24} height={24} />
                  <SpellImage spellId={participant.spellFId} width={24} height={24} />
                  <PerkStyleImage perkStyleId={participant.perks.styles[1].style} width={24} height={24} />
                </Grid>
                <Flex direction="column">
                  <Text
                    textStyle="t1"
                    color="gray800"
                  >{`${participant.kill} / ${participant.death} / ${participant.assist}`}</Text>
                  <Text textStyle="t2" color="gray600" fontWeight={400}>
                    {participant.kda.toFixed(2)}:1 평점
                  </Text>
                </Flex>
              </Center>
              <Flex gap="4px">
                {participant.items.map((itemId, index) =>
                  itemId ? (
                    <ItemImage key={itemId} itemId={itemId} width={24} height={24} css={{ borderRadius: '4px' }} />
                  ) : (
                    <Box key={`${itemId}-${index}`} width="24px" height="24px" bg={color300} borderRadius="4px" />
                  ),
                )}
                {participant.accessory ? (
                  <ItemImage itemId={participant.accessory} width={24} height={24} css={{ borderRadius: '100%' }} />
                ) : (
                  <Box key="accessory-empty" width="24px" height="24px" bg={color300} borderRadius="100%" />
                )}
              </Flex>
            </Flex>
            <Flex direction="column">
              <Flex
                direction="column"
                textStyle="caption"
                fontWeight={400}
                color="gray600"
                borderLeft="1px"
                borderColor="main"
                paddingLeft="8px"
                marginLeft="32px"
              >
                <Text textStyle="body" fontWeight={700} color="main">
                  킬관여 {(participant.killParticipation * 100).toFixed(0)}%
                </Text>
                <Text>제어 와드 {participant.wardPlaced}</Text>
                <Text>
                  CS {participant.cs} ({((participant.cs / matchInfo.gameDuration) * 60).toFixed(1)})
                </Text>
                <Text>
                  {matchInfo.avgTier} {matchInfo.avgDivision}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Grid
            gridTemplateColumns="repeat(2, 100px)"
            gridTemplateRows="repeat(5, 1fr)"
            columnGap="20px"
            rowGap="4px"
            gridAutoFlow="column"
          >
            {allParticipants
              .sort((a, b) => a.participantId - b.participantId)
              .map((p) => (
                <Flex key={p.puuid} gap="4px" alignItems="center">
                  <IconImage
                    src={championIconUrl(championIdEnNameMap[p.championId])}
                    width={16}
                    height={16}
                    alt="champion-icon"
                  />
                  <Text textStyle="body" fontWeight={400} color="gray800" noOfLines={1}>
                    {p.summonerName}
                  </Text>
                </Flex>
              ))}
          </Grid>
        </Flex>
        <Flex
          w="40px"
          h="100%"
          bg={color300}
          borderTopRightRadius="inherit"
          borderBottomRightRadius="inherit"
          marginLeft="20px"
          color={color800}
          justifyContent="center"
        >
          <Box alignSelf="end" marginBottom="8px" onClick={onToggle} cursor="pointer">
            <ArrowDown width="24px" height="24px" />
          </Box>
        </Flex>
      </Flex>
      {isOpen && <MatchHistoryCardExpand matchId={match.matchInfo.matchId} participant={participant} />}
    </Flex>
  );
}
