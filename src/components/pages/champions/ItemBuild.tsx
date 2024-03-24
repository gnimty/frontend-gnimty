import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import dataDragonVersion from '@/apis/constants/dataDragonVersion';
import type { ItemBuildComponentStat } from '@/apis/types';

interface ItemBuildProps {
  itemBuilds?: ItemBuildComponentStat[];
}

export default function ItemBuild({ itemBuilds }: ItemBuildProps) {
  return (
    <VStack w="460px" h="470px" borderRadius="4px" bg="white">
      <Box w="full" h="46px" p="12px 24px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          아이템 빌드
        </Text>
      </Box>
      <HStack
        w="full"
        h="44px"
        p="12px 24px"
        justify="space-between"
        textStyle="t2"
        fontWeight="400"
        borderBottom="1px solid"
        borderColor="gray200"
      >
        <Text>아이템</Text>
        <HStack w="264px" gap="12px">
          <Text w="80px" textAlign="center">
            승률
          </Text>
          <Text w="80px" textAlign="center">
            픽률
          </Text>
          <Text w="80px" textAlign="center">
            플레이 수
          </Text>
        </HStack>
      </HStack>
      <VStack w="full" pb="20px">
        {itemBuilds?.map((itemBuild, index) => {
          return (
            <HStack w="full" p="20px 20px 0 20px" justify="space-between" key={index}>
              <HStack gap="8px">
                {itemBuild.itemBuild.map((item) => {
                  return (
                    <Box key={item} w="40px" h="40px" borderRadius="4px" overflow="hidden">
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/item/${item}.png`}
                        alt={item.toString()}
                        width="40"
                        height="40"
                      />
                    </Box>
                  );
                })}
              </HStack>
              <HStack w="256px" gap="8px">
                <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
                  {(itemBuild.winRate * 100).toFixed(2)}%
                </Text>
                <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
                  {(itemBuild.pickRate * 100).toFixed(2)}%
                </Text>
                <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
                  {itemBuild.plays.toLocaleString('ko-KR')}게임
                </Text>
              </HStack>
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
}
