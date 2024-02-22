import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';

import type { SummonerPlayDto } from '@/apis/types';
import Select from '@/components/common/select/Select';
import Image from 'next/image';
import championIconUrl from '@/apis/utils/championIconUrl';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';

const dummyData: SummonerPlayDto[] = [
  {
    championId: 1,
    championName: championIdKrNameMap[1],
    totalPlays: 10,
    totalWin: 7,
    totalDefeat: 3,
    avgCsPerMinute: 8,
    avgKda: 4,
    avgKill: 5,
    avgDeath: 3,
    avgAssist: 6,
    avgGold: 7777,
    avgDamage: 18000,
    maxKill: 10,
    maxDeath: 5,
    avgCs: 180,
    perfect: false,
  },
  {
    championId: 3,
    championName: championIdKrNameMap[3],
    totalPlays: 10,
    totalWin: 7,
    totalDefeat: 3,
    avgCsPerMinute: 8,
    avgKda: 4,
    avgKill: 5,
    avgDeath: 3,
    avgAssist: 6,
    avgGold: 7777,
    avgDamage: 18000,
    maxKill: 10,
    maxDeath: 5,
    avgCs: 180,
    perfect: false,
  },
];

interface ChampionProps {
  summonerTagName: string;
}

export default function Champion({ summonerTagName }: ChampionProps) {
  return (
    <VStack w="full" gap="12px" pt="12px" align="flex-start">
      <Select
        options={[
          { value: 'ALL', text: '전체' },
          { value: 'RANK_SOLO', text: '솔로랭크' },
          { value: 'RANK_FLEX', text: '자유랭크' },
        ]}
        css={{
          width: '220px',
        }}
      />
      <TableContainer w="full" bgColor="white">
        <Table>
          <Thead>
            <Tr
              textStyle="t2"
              w="full"
              h="44px"
              p="12px"
              display="flex"
              alignItems="center"
              fontWeight="400"
              gap="12px"
              borderBottom="1px solid"
              borderBottomColor="gray200"
            >
              <Th w="24px" textAlign="left">
                #
              </Th>
              <Th w="332px" textAlign="left">
                챔피언
              </Th>
              <Th w="160px" textAlign="center">
                승률
              </Th>
              <Th w="100px" textAlign="center">
                평점
              </Th>
              <Th w="80px" textAlign="center">
                골드
              </Th>
              <Th w="80px" textAlign="center">
                CS
              </Th>
              <Th w="80px" textAlign="center">
                평균 피해량
              </Th>
              <Th w="52px" textAlign="center">
                최대 킬
              </Th>
              <Th w="52px" textAlign="center">
                최대 데스
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {dummyData.map((data, index) => {
              const isLast = index === dummyData.length - 1;
              const winRate = (data.totalWin / data.totalPlays) * 100;
              const defeatRate = (data.totalDefeat / data.totalPlays) * 100;
              return (
                <Tr
                  key={index}
                  textStyle="t2"
                  p="10px 12px"
                  display="flex"
                  gap="12px"
                  alignItems="center"
                  borderBottom={!isLast ? '1px solid' : ''}
                  borderBottomColor="gray200"
                >
                  <Td w="24px" textAlign="center" color="gray500" fontWeight="400">
                    {index}
                  </Td>
                  <Td w="332px" textAlign="left" display="flex" gap="8px" alignItems="center">
                    <Image
                      src={championIconUrl(String(data.championId))}
                      alt={data.championName}
                      width={32}
                      height={32}
                      style={{ borderRadius: '16px' }}
                    />
                    <Text fontWeight="700">{data.championName}</Text>
                  </Td>
                  <Td w="160px" display="flex">
                    <Box w={`${winRate}%`} h="16px" bg="blue800" borderLeftRadius="8px">
                      <Text textStyle="body" color="white" pl="8px">
                        {data.totalWin}승
                      </Text>
                    </Box>
                    {defeatRate > 0 && (
                      <Box w={`${defeatRate}%`} h="16px" bg="red800" borderRightRadius="8px">
                        <Text textStyle="body" color="white" pr="8px" textAlign="right">
                          {data.totalDefeat}패
                        </Text>
                      </Box>
                    )}
                  </Td>
                  <Td w="100px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Text textStyle="body" color="main">
                      {data.avgKda}
                    </Text>
                    <Text textStyle="body">
                      {data.avgKill} / {data.avgDeath} / {data.avgAssist}
                    </Text>
                  </Td>
                  <Td w="80px" display="flex" justifyContent="center" alignItems="center" gap="4px">
                    <Text textStyle="body">{data.avgGold}</Text>
                    <Text textStyle="body" color="gray500">
                      ?
                    </Text>
                  </Td>
                  <Td w="80px" display="flex" justifyContent="center" alignItems="center" gap="4px">
                    <Text textStyle="body">{data.avgCs}</Text>
                    <Text textStyle="body" color="gray500">
                      ({data.avgCsPerMinute})
                    </Text>
                  </Td>
                  <Td w="80px">
                    <Text textStyle="body" textAlign="center">
                      {data.avgDamage}
                    </Text>
                  </Td>
                  <Td w="52px">
                    <Text textStyle="body" textAlign="center">
                      {data.maxKill}
                    </Text>
                  </Td>
                  <Td w="52px">
                    <Text textStyle="body" textAlign="center">
                      {data.maxDeath}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
