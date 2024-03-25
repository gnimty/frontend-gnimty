import {
  Box,
  Grid,
  GridItem,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useRadio,
  useRadioGroup,
  VStack,
  type UseRadioProps,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type FC } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import championsTierQuery, { type ChampionsTierQueueType } from '@/apis/queries/championsTierQuery';
import type { PositionFilter, Tier } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import ChampionImagesFiller from '@/components/common/ChampionImagesFiller';
import ChampionTierBadge from '@/components/common/ChampionTierBadge';
import { positionImages } from '@/components/common/position-image/PositionImage';
import type { PositionIconProps } from '@/components/common/position-image/types';
import Unselected from '@/components/common/position-image/Unselected';
import Select from '@/components/common/select/Select';
import TierImage from '@/components/common/TierImage';

const QUEUE_TYPES: PositionFilter[] = [
  // TODO: 임시 비활성화
  // 'ALL',
  'TOP',
  'JUNGLE',
  'MIDDLE',
  'BOTTOM',
  'UTILITY',
];

function rateToPercent(rate: number): string {
  // 소수점 끝이 .0으로 끝나는 걸 없애기 위해 `parseFloat()`으로 다시 변환
  return `${parseFloat((rate * 100).toFixed(1))}%`;
}

interface PositionRadioCardProps extends UseRadioProps {
  PositionFilterImage: FC<PositionIconProps>;
}

function PositionRadioCard(props: PositionRadioCardProps) {
  const { PositionFilterImage, ...useRadioProps } = props;
  const { getInputProps, getRadioProps, state } = useRadio(useRadioProps);

  return (
    <GridItem
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="label"
      borderWidth="0 1px 0 0"
      borderStyle="solid"
      borderColor="gray200"
      cursor="pointer"
      bg={state.isChecked ? 'main' : undefined}
      _first={{
        borderLeftRadius: '4px',
      }}
      _last={{
        borderRightRadius: '4px',
        borderRightWidth: 0,
      }}
    >
      <input {...getInputProps()} />
      {/* FIXME: `getRadioProps()`의 올바른 동작이지만 타입스크립트 이슈가 있음.
       * 아래 링크를 보면 csstype과 관련된 이슈인 거 같은데 package.json에
       * overrides로 csstype의 버전을 아래 버전으로 강제지정해도 해결되지 않음.
       * Chakra UI에 새로운 이슈를 등록해야할듯함.
       * 참고: https://github.com/chakra-ui/chakra-ui/issues/4089#issuecomment-947221479 참조
       */}
      {/* @ts-expect-error 위 코멘트 참고 */}
      <Box {...getRadioProps()} display="flex" alignItems="center" justifyContent="center">
        <PositionFilterImage width={20} height={20} fill={state.isChecked ? '#fff' : undefined} />
      </Box>
    </GridItem>
  );
}

export default function ChampionsRankings() {
  const [queueType, setQueueType] = useState<Extract<ChampionsTierQueueType, 'RANK_SOLO' | 'ARAM'>>('RANK_SOLO');
  const [rankTierFilter, setRankTierFilter] =
    useState<Extract<Tier, 'platinum' | 'emerald' | 'diamond' | 'master'>>('platinum');
  const [rankPositionFilter, setRankPositionFilter] = useState<PositionFilter>('TOP');
  const { getRootProps, getRadioProps } = useRadioGroup({
    value: rankPositionFilter,
    onChange: (newPosition) => {
      setRankPositionFilter(newPosition as PositionFilter);
    },
  });

  const { data, status } = useQuery(
    championsTierQuery({
      tier: rankTierFilter,
      queue_type: queueType,
    }),
  );

  if (status !== 'success') {
    return;
  }

  return (
    <VStack gap="12px" align="start">
      <HStack>
        <Select
          options={[
            { text: '솔로 랭크', value: 'RANK_SOLO' },
            { text: '칼바람 나락', value: 'ARAM' },
          ]}
          externalValue={queueType}
          onChange={(newQueueType) => {
            setQueueType(newQueueType);
          }}
          css={{ width: '136px' }}
        />
        {queueType === 'RANK_SOLO' && (
          <>
            <Select
              options={[
                {
                  text: '플래티넘 이상',
                  value: 'platinum',
                  leftAsset: <TierImage tier="platinum" fill sizes="20px" />,
                },
                { text: '에메랄드 이상', value: 'emerald', leftAsset: <TierImage tier="emerald" fill sizes="20px" /> },
                {
                  text: '다이아 이상',
                  value: 'diamond',
                  leftAsset: <TierImage tier="diamond" fill sizes="20px" />,
                },
                { text: '마스터 이상', value: 'master', leftAsset: <TierImage tier="master" fill sizes="20px" /> },
              ]}
              externalValue={rankTierFilter}
              onChange={(newTier) => setRankTierFilter(newTier)}
              css={{ width: '148px' }}
            />
            <Grid
              gridTemplateColumns={`repeat(${QUEUE_TYPES.length}, 1fr)`}
              w={`calc(40px * ${QUEUE_TYPES.length})`}
              h="40px"
              border="1px solid"
              borderColor="gray200"
              borderRadius="4px"
              bg="white"
              {...getRootProps}
            >
              {QUEUE_TYPES.map((position) => (
                <PositionRadioCard
                  key={position}
                  PositionFilterImage={position === 'ALL' ? Unselected : positionImages[position]}
                  {...getRadioProps({ value: position })}
                />
              ))}
            </Grid>
          </>
        )}
      </HStack>
      <Table bg="white" w="756px">
        <Thead>
          <Tr
            display="flex"
            gap="12px"
            p="12px"
            textStyle="t2"
            fontWeight="regular"
            color="gray800"
            borderBottom="1px solid"
            borderColor="gray200"
          >
            <Th w="28px">순위</Th>
            <Th flex="1 1 0">챔피언</Th>
            <Th w="44px" textAlign="center">
              티어
            </Th>
            <Th w="60px" textAlign="center">
              승률
            </Th>
            <Th w="60px" textAlign="center">
              픽률
            </Th>
            <Th w="60px" textAlign="center">
              밴률
            </Th>
            <Th w="80px" textAlign="center">
              플레이 수
            </Th>
            <Th w="112px" textAlign="center">
              카운터
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.champions[queueType === 'ARAM' ? 'ALL' : rankPositionFilter].map((champion, i) => (
            <Tr
              key={`${champion.championId}${rankPositionFilter}${rankTierFilter}${queueType}`}
              display="flex"
              alignItems="center"
              gap="12px"
              p="10px 12px"
              borderBottom="1px solid"
              borderColor="gray200"
            >
              <Td w="28px" textStyle="t2" fontWeight="regular" color="gray500" textAlign="center">
                {i + 1}
              </Td>
              <Td flex="1 1 0">
                <Link
                  href={`/champions/${championIdKrNameMap[champion.championId]}`}
                  css={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <Image
                    src={championIconUrl(championIdEnNameMap[champion.championId])}
                    alt={championIdKrNameMap[champion.championId]}
                    width={32}
                    height={32}
                    css={{ borderRadius: '999px' }}
                  />
                  <Text textStyle="t2" fontWeight="bold" color="gray800">
                    {championIdKrNameMap[champion.championId]}
                  </Text>
                </Link>
              </Td>
              <Td w="44px" display="flex" justifyContent="center">
                <ChampionTierBadge tier={champion.tier} />
              </Td>
              <Td w="60px" textAlign="center" textStyle="body" fontWeight="regular" color="gray800">
                {rateToPercent(champion.winRate)}
              </Td>
              <Td w="60px" textAlign="center" textStyle="body" fontWeight="regular" color="gray800">
                {rateToPercent(champion.pickRate)}
              </Td>
              <Td w="60px" textAlign="center" textStyle="body" fontWeight="regular" color="gray800">
                {champion.banRate && rateToPercent(champion.banRate)}
              </Td>
              <Td w="80px" textAlign="center" textStyle="body" fontWeight="regular" color="gray800">
                {Intl.NumberFormat().format(champion.plays)}
              </Td>
              <Td w="112px" textAlign="center">
                <ChampionImagesFiller
                  championIds={champion.counters?.slice(0, 3).map((counter) => counter.championId) ?? []}
                  imagesSizePx={32}
                  gap="8px"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}
