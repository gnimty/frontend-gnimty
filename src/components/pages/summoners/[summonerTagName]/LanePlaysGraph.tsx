import { Box, HStack, VStack } from '@chakra-ui/react';

import type { LaneSummaryDto } from '@/apis/types';
import PositionImage from '@/components/common/position-image/PositionImage';
import proportionalValue from '@/utils/proportionalValue';

interface LanePlaysGraphProps {
  laneSummary: LaneSummaryDto;
}

export default function LanePlaysGraph(props: LanePlaysGraphProps) {
  const { laneSummary } = props;

  const totalLanePlays = Object.values(laneSummary).reduce((count, sum) => count + sum);

  return (
    <VStack gap={0}>
      <HStack gap="20px">
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box
            w="full"
            bg="red800"
            h={`${proportionalValue(totalLanePlays, laneSummary.TOP, 48)}px`}
            pos="absolute"
            bottom="0"
          />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box
            w="full"
            bg="red800"
            h={`${proportionalValue(totalLanePlays, laneSummary.JUNGLE, 48)}px`}
            pos="absolute"
            bottom="0"
          />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box
            w="full"
            bg="red800"
            h={`${proportionalValue(totalLanePlays, laneSummary.MIDDLE, 48)}px`}
            pos="absolute"
            bottom="0"
          />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box
            w="full"
            bg="red800"
            h={`${proportionalValue(totalLanePlays, laneSummary.BOTTOM, 48)}px`}
            pos="absolute"
            bottom="0"
          />
        </Box>
        <Box w="12px" h="48px" bg="gray200" pos="relative">
          <Box
            w="full"
            bg="red800"
            h={`${proportionalValue(totalLanePlays, laneSummary.UTILITY, 48)}px`}
            pos="absolute"
            bottom="0"
          />
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
