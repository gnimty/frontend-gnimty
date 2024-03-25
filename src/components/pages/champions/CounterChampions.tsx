import { Box, VStack, Text, HStack } from '@chakra-ui/react';
import Image from 'next/image';

import champions from '@/apis/constants/champions';
import type { CounterStat } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';

interface CounterChampionsProps {
  counterType: 'easy' | 'hard';
  counterChampions?: CounterStat[];
}

export default function CounterChampions({ counterType, counterChampions }: CounterChampionsProps) {
  return (
    <VStack
      w="full"
      h="max-content"
      bg="white"
      borderRadius="4px"
      overflowX="scroll"
      align="flex-start"
      css={{
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundClip: 'padding-box',
          border: '3px solid #ccc',
          borderRadius: '999px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f2f2f2',
        },
      }}
    >
      <Box w="full" h="52px" p="16px 20px">
        <Text textStyle="t2" fontWeight="700">
          상대하기 {counterType === 'easy' ? '쉬운' : '어려운'} 챔피언
        </Text>
      </Box>
      <HStack minW="700px" h="full" p="20px" gap="12px" borderTop="1px solid" borderColor="gray200">
        {counterChampions?.map((counterChampion) => {
          const championName = champions?.find(
            (champion) => champion.championId === counterChampion.championId,
          )?.enName;
          if (!championName) return;
          return (
            <VStack key={counterChampion.championId} h="92px" gap="4px" align="center">
              <Box w="50px" h="50px" borderRadius="99px" overflow="hidden">
                <Image src={championIconUrl(championName)} width="50" height="50" alt={championName} />
              </Box>
              <VStack w="80px" h="38px" gap="0" align="center">
                <Text textStyle="t1" fontWeight="700" color={counterType === 'easy' ? 'blue800' : 'main'}>
                  {(counterChampion.winRate * 100).toFixed(2)}%
                </Text>
                <Text textStyle="body" fontWeight="400" color="gray500">
                  {counterChampion.plays}게임
                </Text>
              </VStack>
            </VStack>
          );
        })}
      </HStack>
    </VStack>
  );
}
