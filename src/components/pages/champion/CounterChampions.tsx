import championIconUrl from '@/apis/utils/championIconUrl';
import { Box, VStack, Text, HStack } from '@chakra-ui/react';
import Image from 'next/image';

interface CounterChampionsProps {
  counterType: 'easy' | 'hard';
}

export default function CounterChampions({ counterType }: CounterChampionsProps) {
  return (
    <VStack w="full" h="184px" bg="white" borderRadius="4px">
      <Box w="full" h="52px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          상대하기 {counterType === 'easy' ? '쉬운' : '어려운'} 챔피언
        </Text>
      </Box>
      <HStack w="full" h="full" p="20px" gap="12px">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <VStack key={index} h="92px" gap="4px" align="center">
              <Box w="50px" h="50px" borderRadius="99px" overflow="hidden">
                <Image src={championIconUrl('Xerath')} width="50" height="50" alt="Xerath, 제라스" />
              </Box>
              <VStack w="80px" h="38px" gap="0" align="center">
                <Text textStyle="t1" fontWeight="700" color={counterType === 'easy' ? 'blue800' : 'main'}>
                  70%
                </Text>
                <Text textStyle="body" fontWeight="400" color="gray500">
                  8,643게임
                </Text>
              </VStack>
            </VStack>
          );
        })}
      </HStack>
    </VStack>
  );
}
