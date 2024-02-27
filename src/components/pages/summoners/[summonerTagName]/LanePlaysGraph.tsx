import { Box, HStack, VStack } from '@chakra-ui/react';

import PositionImage from '@/components/common/position-image/PositionImage';
import proportionalValue from '@/utils/proportionalValue';

export default function LanePlaysGraph() {
  return (
    <VStack gap={0}>
      <HStack gap="20px">
        {/* TODO: 이 부분 백엔드에서 라인별 데이터 보내달라고 해야 함 */}
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box w="full" bg="red800" h={`${proportionalValue(100, 0.5 * 100, 48)}px`} pos="absolute" bottom="0" />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box w="full" bg="red800" h={`${proportionalValue(100, 0.2 * 100, 48)}px`} pos="absolute" bottom="0" />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box w="full" bg="red800" h={`${proportionalValue(100, 0.9 * 100, 48)}px`} pos="absolute" bottom="0" />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box w="full" bg="red800" h={`${proportionalValue(100, 0.4 * 100, 48)}px`} pos="absolute" bottom="0" />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box w="full" bg="red800" h={`${proportionalValue(100, 0.01 * 100, 48)}px`} pos="absolute" bottom="0" />
        </Box>
      </HStack>
      <HStack gap="16px" pt="4px" px="8px" borderTop="1px solid" borderColor="gray500">
        <PositionImage position="TOP" width={16} height={16} />
        <PositionImage position="JUNGLE" width={16} height={16} />
        <PositionImage position="MIDDLE" width={16} height={16} />
        <PositionImage position="BOTTOM" width={16} height={16} />
        <PositionImage position="UTILITY" width={16} height={16} />
      </HStack>
    </VStack>
  );
}
