import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import type { SummonerPlayWithSummonerDto } from '@/apis/types';
import profileIconUrl from '@/apis/utils/profileIconUrl';

interface SummonerRankProps {
  specialists?: SummonerPlayWithSummonerDto[];
}

export default function SummonerRank({ specialists }: SummonerRankProps) {
  return (
    <VStack w="608px" h="470px" borderRadius="4px" bg="white">
      <Box w="full" h="52px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          소환사 랭킹
        </Text>
      </Box>
      <HStack
        w="full"
        h="44px"
        p="12px 20px"
        gap="12px"
        textStyle="t2"
        fontWeight="400"
        borderBottom="1px solid"
        borderColor="gray200"
      >
        <Text w="28px">순위</Text>
        <Text w="232px">소환사</Text>
        <Text w="80px" textAlign="center">
          승률
        </Text>
        <Text w="100px" textAlign="center">
          승리/패배
        </Text>
        <Text w="80px" textAlign="center">
          플레이 수
        </Text>
      </HStack>
      <VStack w="full" pb="20px">
        {specialists?.map((specialist) => {
          return (
            <HStack w="full" p="20px 20px 0 20px" gap="12px" key={specialist.rank}>
              <Text w="28px" textStyle="t2" fontWeight="400">
                {specialist.rank}
              </Text>
              <Box w="40px" h="40px" borderRadius="50%" overflow="hidden">
                <Image src={profileIconUrl(specialist.summoner.profileIconId)} alt="test" width="40" height="40" />
              </Box>
              <Text w="180px" textStyle="t2" fontWeight="700">
                {specialist.summoner.internalTagName}
              </Text>
              <Text w="80px" textStyle="t1" fontWeight="700" color="blue800" textAlign="center">
                {(specialist.summonerPlay.winRate * 100).toFixed(2)}%
              </Text>
              <Text w="100px" textStyle="body" fontWeight="400" color="gray600" textAlign="center">
                W {specialist.summonerPlay.totalWin} L {specialist.summonerPlay.totalDefeat}
              </Text>
              <Text w="80px" textStyle="body" fontWeight="400" color="gray600" textAlign="center">
                {specialist.summonerPlay.totalPlays.toLocaleString('ko-KR')}게임
              </Text>
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
}
