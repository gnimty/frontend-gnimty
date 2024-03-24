import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import championIconUrl from '@/apis/utils/championIconUrl';

interface EarlyStageInfoProps {
  type: 'summoner-spell' | 'start-item' | 'first-return' | 'shoes';
}

const TITLE = {
  'summoner-spell': '소환사 주문',
  'start-item': '시작 아이템',
  'first-return': '첫 귀환',
  shoes: '신발',
};

export default function EarlyStageInfo({ type }: EarlyStageInfoProps) {
  return (
    <VStack w="full" bg="white" borderRadius="4px">
      <Box w="full" h="54px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          {TITLE[type]}
        </Text>
      </Box>
      {Array.from({ length: 2 }).map((_, index) => {
        return (
          <HStack key={index} w="full" p={index === 0 ? '20px' : '0 20px 20px 20px'} justify="space-between">
            <HStack gap="8px">
              <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
                <Image src={championIconUrl('Aatrox')} width="40" height="40" alt={type} />
              </Box>
              <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
                <Image src={championIconUrl('Aatrox')} width="40" height="40" alt={type} />
              </Box>
            </HStack>
            <HStack gap="8px">
              <Text textStyle="t1" fontWeight="700" color="blue800">
                70%
              </Text>
              <Text textStyle="body" fontWeight="400" color="gray500">
                8,643게임
              </Text>
            </HStack>
          </HStack>
        );
      })}
    </VStack>
  );
}
