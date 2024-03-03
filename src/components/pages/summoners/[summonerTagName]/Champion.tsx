import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import summonerMatchChampionsInfoQuery from '@/apis/queries/summonerMatchChampionsInfoQuery';
import type { QueueType } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import Select from '@/components/common/select/Select';

interface ChampionProps {
  summonerTagName: string;
}

export default function Champion({ summonerTagName }: ChampionProps) {
  const [options, setOptions] = useState<{ summonerTagName: string; brief: boolean; queue_type: QueueType }>({
    summonerTagName,
    brief: false,
    queue_type: 'ALL',
  });
  const { data: championsData } = useQuery(summonerMatchChampionsInfoQuery(options));
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
        onChange={(v: QueueType) => setOptions({ ...options, queue_type: v })}
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
            {championsData?.data.summonerPlays.map((champion, index, currentArray) => {
              const isLast = index === currentArray.length - 1;
              const winRate = (champion.totalWin / champion.totalPlays) * 100;
              const defeatRate = (champion.totalDefeat / champion.totalPlays) * 100;
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
                    {index + 1}
                  </Td>
                  <Td w="332px" textAlign="left" display="flex" gap="8px" alignItems="center">
                    <Image
                      src={championIconUrl(championIdEnNameMap[champion.championId])}
                      alt={champion.championName}
                      width={32}
                      height={32}
                      style={{ borderRadius: '16px' }}
                    />
                    <Text fontWeight="700">{championIdKrNameMap[champion.championId]}</Text>
                  </Td>
                  <Td w="160px" display="flex">
                    <Box
                      w={`${winRate}%`}
                      h="16px"
                      bg="blue800"
                      borderLeftRadius="8px"
                      borderRightRadius={defeatRate === 0 ? '8px' : '0'}
                    >
                      <Text textStyle="body" color="white" pl="8px">
                        {champion.totalWin}승
                      </Text>
                    </Box>
                    {defeatRate > 0 && (
                      <Box
                        w={`${defeatRate}%`}
                        h="16px"
                        bg="red800"
                        borderRightRadius="8px"
                        borderLeftRadius={winRate === 0 ? '8px' : '0'}
                      >
                        <Text textStyle="body" color="white" pr="8px" textAlign="right">
                          {champion.totalDefeat}패
                        </Text>
                      </Box>
                    )}
                  </Td>
                  <Td w="100px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Text textStyle="body" color="main">
                      {!champion.perfect ? `${champion.avgKda}:1` : 'Perfect'}
                    </Text>
                    <Text textStyle="body">
                      {champion.avgKill} / {champion.avgDeath} / {champion.avgAssist}
                    </Text>
                  </Td>
                  <Td w="80px" display="flex" justifyContent="center" alignItems="center" gap="4px">
                    <Text textStyle="body">{champion.avgGold}</Text>
                  </Td>
                  <Td w="80px" display="flex" justifyContent="center" alignItems="center" gap="4px">
                    <Text textStyle="body">{champion.avgCs}</Text>
                    <Text textStyle="body" color="gray500">
                      ({champion.avgCsPerMinute})
                    </Text>
                  </Td>
                  <Td w="80px">
                    <Text textStyle="body" textAlign="center">
                      {champion.avgDamage}
                    </Text>
                  </Td>
                  <Td w="52px">
                    <Text textStyle="body" textAlign="center">
                      {champion.maxKill}
                    </Text>
                  </Td>
                  <Td w="52px">
                    <Text textStyle="body" textAlign="center">
                      {champion.maxDeath}
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
