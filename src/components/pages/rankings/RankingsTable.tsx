import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Image from 'next/image';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import type { SummonerRankDto } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import shortTierName from '@/apis/utils/shortTierName';
import PositionImage from '@/components/common/position-image/PositionImage';
import TierImage from '@/components/common/TierImage';

import type { TableProps } from '@chakra-ui/react';

interface RankingsTableProps extends TableProps {
  ranks: SummonerRankDto[];
}

export default function RankingsTable(props: RankingsTableProps) {
  const { ranks, ...restProps } = props;

  return (
    <Table {...restProps}>
      <Thead>
        <Tr
          display="flex"
          gap="40px"
          w="1080px"
          p="12px 20px"
          textStyle="t2"
          fontWeight="regular"
          color="gray800"
          bg="gray200"
          borderBottom="1px solid"
          borderColor="gray300"
        >
          <Th w="36px" textAlign="center">
            순위
          </Th>
          <Th flex="1 1 0" textAlign="left">
            소환사명
          </Th>
          <Th w="80px" textAlign="center">
            주 포지션
          </Th>
          <Th w="140px" textAlign="center">
            티어
          </Th>
          <Th w="200px" textAlign="center">
            승률
          </Th>
          <Th w="112px" textAlign="center">
            모스트 챔피언
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {ranks.map((rank) => {
          const winPercentage = Math.floor(rank.winRate * 100);

          return (
            <Tr key={rank.rank} display="flex" alignItems="center" gap="40px" w="1080px" p="8px 20px">
              <Td w="36px" textAlign="center" textStyle="t2" fontWeight="regular" color="gray800">
                {rank.rank}
              </Td>
              <Td flex="1 1 0" display="flex" alignItems="center" gap="12px">
                <Image
                  src={profileIconUrl(rank.summoner.profileIconId)}
                  alt=""
                  width={40}
                  height={40}
                  css={{
                    borderRadius: '999px',
                  }}
                />
                <Text
                  w="220px"
                  textStyle="t1"
                  fontWeight="bold"
                  color="gray800"
                  textOverflow="ellipsis"
                  overflowX="hidden"
                  whiteSpace="nowrap"
                >
                  {rank.summoner.summonerName}
                </Text>
              </Td>
              <Td w="80px" display="flex" gap="8px" justifyContent="center">
                {rank.mostLanes.slice(0, 2).map((position) => (
                  <PositionImage key={position} position={position} width={24} height={24} />
                ))}
              </Td>
              <Td w="140px" display="flex" gap="8px" alignItems="center" justifyContent="center">
                <TierImage tier={rank.summoner.soloTierInfo.tier} width={24} height={24} />
                <Box w="24px" textStyle="t2" fontWeight="bold" color="gray800" textAlign="center">
                  {shortTierName(rank.summoner.soloTierInfo.tier, rank.summoner.soloTierInfo.division)}
                </Box>
                <Box w="56px" textStyle="t2" fontWeight="regular" color="gray500">
                  {Intl.NumberFormat().format(rank.summoner.soloTierInfo.lp)}LP
                </Box>
              </Td>
              <Td w="200px" display="flex" gap="8px" alignItems="center">
                <Flex gap="4px" textStyle="t2" fontWeight="regular" color="gray600">
                  <Flex gap="2px">
                    <Box>W</Box>
                    <Box w="28px">{rank.totalWin}</Box>
                  </Flex>
                  <Flex gap="2px">
                    <Box>L</Box>
                    <Box w="28px">{rank.totalDefeat}</Box>
                  </Flex>
                </Flex>
                <Box textStyle="t1" fontWeight="bold" color="gray800">
                  {winPercentage}%
                </Box>
                <Flex h="8px" w="60px">
                  <Box w={`${winPercentage}%`} bg="blue800" />
                  <Box flex="1 1 0" bg="red800" />
                </Flex>
              </Td>
              <Td w="112px" display="flex" gap="8px">
                {rank.mostPlayedChampionIds.map((id) => (
                  <Image
                    key={id}
                    src={championIconUrl(championIdEnNameMap[id])}
                    width={32}
                    height={32}
                    alt={championIdKrNameMap[id]}
                    css={{ borderRadius: '9999px' }}
                  />
                ))}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
