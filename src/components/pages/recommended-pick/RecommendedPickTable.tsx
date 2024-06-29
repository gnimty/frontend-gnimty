import {
  Box,
  Grid,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useRadioGroup,
  type StackProps,
} from '@chakra-ui/react';
import { useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import type { RecommendedPicksSortOrder } from '@/apis/queries/recommendedPicksQuery';
import type { ChampionPickDto, ChampionStatsRank, Position, SummonerPlayDto } from '@/apis/types';
import ChampionIcon from '@/components/common/ChampionIcon';
import ChampionTierBadge from '@/components/common/ChampionTierBadge';
import { positionImages } from '@/components/common/position-image/PositionImage';
import PositionRadioCard from '@/components/common/PositionRadioCard';
import Select from '@/components/common/select/Select';
import type { SelectOption } from '@/components/common/select/useSelect';

const sortOrderSelectOptions: SelectOption<RecommendedPicksSortOrder>[] = [
  {
    text: '챔피언 스코어 순',
    value: 'CHAMPION_SCORE',
  },
  {
    text: '시너지 승률순',
    value: 'SYNERGY_WIN_RATE',
  },
  {
    text: '시너지 픽률순',
    value: 'SYNERGY_PICK_RATE',
  },
  {
    text: '내 승률순',
    value: 'MY_WIN_RATE',
  },
  {
    text: '듀오 승률순',
    value: 'DUO_WIN_RATE',
  },
];

const QUEUE_TYPES: Position[] = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];

interface RecommendedPickTableProps {
  recommendedPicks: ChampionPickDto[];
  myPosition: Position;
  onMyPositionChange: (newMyPosition: Position) => void;
  duoPosition: Position;
  onDuoPositionChange: (newDuoPosition: Position) => void;
  sortOrder: RecommendedPicksSortOrder;
  onSortOrderChange: (newSortOrder: RecommendedPicksSortOrder) => void;
  mySummonerName: string;
  myTagLine: string;
  duoSummonerName: string;
  duoTagLine: string;
}

export default function RecommendedPickTable(props: RecommendedPickTableProps) {
  const {
    recommendedPicks,
    myPosition,
    onMyPositionChange,
    duoPosition,
    onDuoPositionChange,
    sortOrder,
    onSortOrderChange,
    mySummonerName,
    myTagLine,
    duoSummonerName,
    duoTagLine,
  } = props;

  const myPositionRadioGroup = useRadioGroup({
    value: myPosition,
    onChange: (newPosition) => {
      onMyPositionChange(newPosition as Position);
    },
  });

  const duoPositionRadioGroup = useRadioGroup({
    value: duoPosition,
    onChange: (newPosition) => {
      onDuoPositionChange(newPosition as Position);
    },
  });

  return (
    <VStack w="full" gap="16px">
      <HStack w="full" justify="space-between">
        <HStack gap="16px">
          <VStack align="start" gap="4px" p="8px" bg="white">
            <Text textStyle="t2" fontWeight="bold" color="gray700">
              내 라인 선택
            </Text>
            <Grid
              gridTemplateColumns={`repeat(${QUEUE_TYPES.length}, 1fr)`}
              w={`calc(40px * ${QUEUE_TYPES.length})`}
              h="40px"
              border="1px solid"
              borderColor="gray200"
              borderRadius="4px"
              bg="white"
              {...myPositionRadioGroup.getRootProps}
            >
              {QUEUE_TYPES.map((position) => (
                <PositionRadioCard
                  key={position}
                  PositionFilterImage={positionImages[position]}
                  {...myPositionRadioGroup.getRadioProps({ value: position })}
                />
              ))}
            </Grid>
          </VStack>
          <VStack align="start" gap="4px" p="8px" bg="white">
            <Text textStyle="t2" fontWeight="bold" color="gray700">
              듀오 라인 선택
            </Text>
            <Grid
              gridTemplateColumns={`repeat(${QUEUE_TYPES.length}, 1fr)`}
              w={`calc(40px * ${QUEUE_TYPES.length})`}
              h="40px"
              border="1px solid"
              borderColor="gray200"
              borderRadius="4px"
              bg="white"
              {...duoPositionRadioGroup.getRootProps}
            >
              {QUEUE_TYPES.map((position) => (
                <PositionRadioCard
                  key={position}
                  PositionFilterImage={positionImages[position]}
                  isDisabled={myPosition === position}
                  {...duoPositionRadioGroup.getRadioProps({ value: position })}
                />
              ))}
            </Grid>
          </VStack>
        </HStack>
        <Select
          options={sortOrderSelectOptions}
          externalValue={sortOrder}
          onChange={onSortOrderChange}
          css={{ width: '142px' }}
        />
      </HStack>
      <Table w="full" bg="white">
        <Thead>
          <Tr
            h="44px"
            display="flex"
            alignItems="center"
            textStyle="t2"
            fontWeight="regular"
            color="gray800"
            borderBottom="1px solid"
            borderColor="gray200"
          >
            <Th w="52px">랭킹</Th>
            <Th flex="1 1 0">챔피언</Th>
            <Th w="144px">시너지 승률</Th>
            <Th w="144px">시너지 픽률</Th>
            <Th w="144px">플레이 수</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recommendedPicks.map((recommendedPick, i) => (
            <RecommendedPickTableRow
              key={i}
              recommendedPick={recommendedPick}
              order={i + 1}
              mySummonerName={mySummonerName}
              myTagLine={myTagLine}
              duoSummonerName={duoSummonerName}
              duoTagLine={duoTagLine}
            />
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}

interface RecommendedPickTableRowProps {
  recommendedPick: ChampionPickDto;
  order: number;
  mySummonerName: string;
  myTagLine: string;
  duoSummonerName: string;
  duoTagLine: string;
}

function RecommendedPickTableRow(props: RecommendedPickTableRowProps) {
  const { recommendedPick, order, mySummonerName, myTagLine, duoSummonerName, duoTagLine } = props;

  const [isDetailVisible, setIsDetailVisible] = useState(false);

  return (
    <>
      <Tr
        onClick={() => {
          setIsDetailVisible((prev) => !prev);
        }}
        h="56px"
        display="flex"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="gray200"
        _hover={{ bg: 'gray100' }}
      >
        <Td w="52px" textStyle="t2" fontWeight="regular" color="gray500" textAlign="center">
          {order}
        </Td>
        <Td flex="1 1 0">
          <HStack gap="8px" textStyle="t2" fontWeight="bold" color="gray800">
            <ChampionIcon
              championEnName={championIdEnNameMap[recommendedPick.firstChampionId]}
              width={32}
              height={32}
              radius={999}
            />
            <ChampionIcon
              championEnName={championIdEnNameMap[recommendedPick.secondChampionId]}
              width={32}
              height={32}
              radius={999}
            />
            <Text>{championIdKrNameMap[recommendedPick.firstChampionId]}</Text>
            <Text>{championIdKrNameMap[recommendedPick.secondChampionId]}</Text>
          </HStack>
        </Td>
        <Td w="168px" textStyle="body" fontWeight="regular" color="gray800" textAlign="center">
          {(recommendedPick.winRate * 100).toFixed(1)}%
        </Td>
        <Td w="144px" textStyle="body" fontWeight="regular" color="gray800" textAlign="center">
          {(recommendedPick.pickRate * 100).toFixed(1)}%
        </Td>
        <Td w="144px" textStyle="body" fontWeight="regular" color="gray800" textAlign="center">
          {Intl.NumberFormat(undefined).format(
            recommendedPick.firstSummonerPlay.totalPlays + recommendedPick.secondSummonerPlay.totalPlays,
          )}
        </Td>
      </Tr>
      <Tr display={isDetailVisible ? 'table-row' : 'none'} borderBottom="1px solid" borderColor="gray200">
        <Td display="flex" gap="12px" p="12px">
          <Card
            championPickStats={recommendedPick.firstChampionPickStats}
            summonerPlay={recommendedPick.firstSummonerPlay}
            summonerName={mySummonerName}
            tagLine={myTagLine}
            bg="red100"
            flex="1 1 0"
          />
          <Card
            championPickStats={recommendedPick.secondChampionPickStats}
            summonerPlay={recommendedPick.secondSummonerPlay}
            summonerName={duoSummonerName}
            tagLine={duoTagLine}
            bg="green100"
            flex="1 1 0"
          />
        </Td>
      </Tr>
    </>
  );
}

interface CardProps extends StackProps {
  championPickStats: ChampionStatsRank;
  summonerPlay: SummonerPlayDto;
  summonerName: string;
  tagLine: string;
}

function Card(props: CardProps) {
  const { championPickStats, summonerPlay, summonerName, tagLine, ...restProps } = props;

  return (
    <HStack p="12px" gap="24px" borderRadius="4px" {...restProps}>
      <ChampionIcon
        championEnName={championIdEnNameMap[championPickStats.championId]}
        width={64}
        height={64}
        radius={999}
      />
      <VStack gap="12px" w="full">
        <HStack gap="12px" pb="12px" borderBottom="1px solid" borderColor="white" w="full">
          <Text display="flex" gap="4px" textStyle="t2" fontWeight="bold" color="gray800">
            <span>{summonerName}</span>
            <span>#{tagLine}</span>
          </Text>
          <HStack flex="1 1 0" gap="8px" justify="center">
            <Text textStyle="caption" fontWeight="regular" color="gray800" textAlign="center">
              {summonerPlay.totalPlays}전 {summonerPlay.totalWin}승 {summonerPlay.totalDefeat}패
            </Text>
            <Text textStyle="body" fontWeight="bold" color="green800" textAlign="center">
              {summonerPlay.perfect ? 'Perfect' : `승률 ${(summonerPlay.winRate * 100).toFixed(0)}%`}
            </Text>
          </HStack>
          <Text w="60px" textStyle="body" fontWeight="regular" color="main" textAlign="center">
            {summonerPlay.avgKda.toFixed(2)} KDA
          </Text>
          <Text w="60px" textStyle="body" fontWeight="regular" color="gray800" textAlign="center">
            {summonerPlay.avgCs.toFixed(0)} ({summonerPlay.avgCsPerMinute.toFixed(1)})
          </Text>
        </HStack>
        <HStack gap="12px" w="full">
          <Text w="125px" textStyle="t2" fontWeight="bold" color="gray800">
            {championIdKrNameMap[championPickStats.championId]}
          </Text>
          <ChampionTierBadge tier={championPickStats.tier} />
          <Text flex="1 1 0" display="flex" justifyContent="center" gap="4px" textStyle="body" fontWeight="regular">
            <Box as="span" color="gray800">
              승률
            </Box>{' '}
            <Box as="span" color="main">
              {(championPickStats.winRate * 100).toFixed(1)}%
            </Box>
          </Text>
          <Text
            flex="1 1 0"
            display="flex"
            justifyContent="center"
            gap="4px"
            textStyle="body"
            fontWeight="regular"
            color="gray800"
          >
            <span>픽률</span> <span>{(championPickStats.pickRate * 100).toFixed(1)}%</span>
          </Text>
          <Text
            flex="1 1 0"
            display="flex"
            justifyContent="center"
            gap="4px"
            textStyle="body"
            fontWeight="regular"
            color="gray800"
          >
            <span>밴률</span> <span>{(championPickStats.banRate * 100).toFixed(1)}%</span>
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
