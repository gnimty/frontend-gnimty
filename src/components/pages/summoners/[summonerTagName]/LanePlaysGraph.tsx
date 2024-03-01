import { Box, HStack, VStack } from '@chakra-ui/react';
import { createContext, useContext } from 'react';

import type { LaneSummaryDto } from '@/apis/types';
import PositionImage from '@/components/common/position-image/PositionImage';
import proportionalValue from '@/utils/proportionalValue';

const VERTICAL_BAR_HEIGHT_PX = 48;

const TotalLanePlaysContext = createContext<number>(0);

interface VerticalBarProps {
  lanePlays: number;
}

function VerticalBar(props: VerticalBarProps) {
  const { lanePlays } = props;

  const totalLanePlays = useContext(TotalLanePlaysContext);

  return (
    <Box w="12px" h={`${VERTICAL_BAR_HEIGHT_PX}px`} bg="gray200" pos="relative">
      <Box
        w="full"
        bg="red800"
        h={`${proportionalValue(totalLanePlays, lanePlays, VERTICAL_BAR_HEIGHT_PX)}px`}
        pos="absolute"
        bottom="0"
      />
    </Box>
  );
}

interface LanePlaysGraphProps {
  laneSummary: LaneSummaryDto;
}

export default function LanePlaysGraph(props: LanePlaysGraphProps) {
  const { laneSummary } = props;

  const totalLanePlays = Object.values(laneSummary).reduce((count, sum) => count + sum);

  return (
    <VStack gap={0}>
      <HStack gap="20px">
        <TotalLanePlaysContext.Provider value={totalLanePlays}>
          <VerticalBar lanePlays={laneSummary.TOP} />
          <VerticalBar lanePlays={laneSummary.JUNGLE} />
          <VerticalBar lanePlays={laneSummary.MIDDLE} />
          <VerticalBar lanePlays={laneSummary.BOTTOM} />
          <VerticalBar lanePlays={laneSummary.UTILITY} />
        </TotalLanePlaysContext.Provider>
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
