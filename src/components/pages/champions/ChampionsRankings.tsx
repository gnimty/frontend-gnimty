import { Grid, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, useRadioGroup, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import championsTierQuery, { type ChampionsTierQueueType } from '@/apis/queries/championsTierQuery';
import type { PositionFilter, Tier } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import ChampionImagesFiller from '@/components/common/ChampionImagesFiller';
import ChampionTierBadge from '@/components/common/ChampionTierBadge';
import { positionImages } from '@/components/common/position-image/PositionImage';
import Unselected from '@/components/common/position-image/Unselected';
import PositionRadioCard from '@/components/common/PositionRadioCard';
import Select from '@/components/common/select/Select';
import TierImage from '@/components/common/TierImage';
import gnimtyChampionUrl from '@/utils/gnimtyChampionUrl';

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

interface RankOptions {
  tier: Extract<Tier, 'platinum' | 'emerald' | 'diamond' | 'master'>;
  position: PositionFilter;
}

interface AramOptions {
  position: 'ALL';
}

type Options = ({ queueType: 'RANK_SOLO' } & RankOptions) | ({ queueType: 'ARAM' } & AramOptions);

export default function ChampionsRankings() {
  const [queueType, setQueueType] = useState<Extract<ChampionsTierQueueType, 'RANK_SOLO' | 'ARAM'>>('RANK_SOLO');
  const [rankOptions, setRankOptions] = useState<RankOptions>({
    tier: 'platinum',
    position: 'TOP',
  });
  const options = {
    queueType,
    ...(queueType === 'RANK_SOLO'
      ? rankOptions
      : {
          position: 'ALL',
        }),
  } as Options;

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: rankOptions.position,
    onChange: (newPosition) => {
      setRankOptions((prev) => ({ ...prev, position: newPosition as PositionFilter }));
    },
  });

  const { data, status } = useQuery(
    championsTierQuery({
      queue_type: options.queueType,
      tier: options.queueType === 'RANK_SOLO' ? options.tier : undefined,
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
        {options.queueType === 'RANK_SOLO' && (
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
              externalValue={options.tier}
              onChange={(newTier) => {
                setRankOptions((prev) => ({ ...prev, tier: newTier }));
              }}
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
          {data.data.champions[options.position].map((champion, i) => (
            <Tr
              key={`${champion.championId}${options.queueType}${options.position}${options.queueType === 'RANK_SOLO' ? options.tier : ''}`}
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
                  href={gnimtyChampionUrl(champion.championName, options.position)}
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
