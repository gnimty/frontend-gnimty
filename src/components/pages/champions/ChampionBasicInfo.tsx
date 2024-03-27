import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';

import champions from '@/apis/constants/champions';
import type { ChampionTierDto, LaneSelectDto, PositionFilter } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import ChampionTierBadge from '@/components/common/ChampionTierBadge';
import PositionImage from '@/components/common/position-image/PositionImage';

interface ChampionBasicInfoProps {
  championTier: ChampionTierDto;
  laneSelectRates?: LaneSelectDto[];
  lane: PositionFilter | 'UNKNOWN' | '';
  handleUpdateLane: (lane: PositionFilter) => void;
}

export default function ChampionBasicInfo({
  championTier,
  laneSelectRates,
  lane,
  handleUpdateLane,
}: ChampionBasicInfoProps) {
  const theme = useTheme();
  return (
    <HStack w="full" h="160px" p="0 20px" gap="12px" align="flex-start">
      <Box w="100px" h="100px" borderRadius="99px" overflow="hidden">
        <Image
          src={championIconUrl(championTier?.championName)}
          alt={championTier?.championName}
          width="100"
          height="100"
        />
      </Box>
      <VStack w="328px" h="148px" gap="16px" align="flex-start" justify="space-between">
        <HStack>
          <Text textStyle="h2" fontWeight="700">
            {champions.filter((champion) => champion.enName === championTier.championName)[0].krName}
          </Text>
          <ChampionTierBadge tier="1" />
        </HStack>
        <HStack w="328px" h="40px" p="0 20px" gap="24px" justify="space-between">
          <VStack w="80px" p="0 24px 0 0" borderRight="1px solid" borderRightColor="gray300">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              승률
            </Text>
            <Text textStyle="t2" fontWeight="700" color="gray800">
              {(championTier.winRate * 100).toFixed(2)}%
            </Text>
          </VStack>
          <VStack w="80px" p="0 24px 0 0" borderRight="1px solid" borderRightColor="gray300">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              픽률
            </Text>
            <Text textStyle="t2" fontWeight="700" color="gray800">
              {(championTier.pickRate * 100).toFixed(2)}%
            </Text>
          </VStack>
          <VStack w="80px" p="0 24px 0 0">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              밴률
            </Text>
            <Text textStyle="t2" fontWeight="700" color="gray800">
              {championTier.banRate && (championTier.banRate * 100).toFixed(2)}%
            </Text>
          </VStack>
        </HStack>
        <HStack w="max-content" h="40px" borderRadius="4px" gap="0">
          {laneSelectRates?.map((laneSelectRate, index, currentArray) => {
            let selectedLane;
            if (['UNKNOWN', 'ALL', ''].includes(lane)) {
              selectedLane = index === 0;
            }
            if (!['UNKNOWN', 'ALL', ''].includes(lane)) {
              selectedLane = laneSelectRate.lane === lane;
            }
            return (
              <Box
                key={laneSelectRate.lane}
                w="88px"
                h="full"
                p="10px 12px"
                borderLeftRadius={index === 0 ? '4px' : 'none'}
                borderRightRadius={index === currentArray.length - 1 ? '4px' : 'none'}
                borderRight={index !== currentArray.length - 1 ? '1px solid' : 'none'}
                borderColor="gray200"
                aria-selected={selectedLane}
                color="gray700"
                bgColor="white"
                gap="4px"
                display="flex"
                align-items="center"
                justifyContent="space-between"
                cursor="pointer"
                _selected={{
                  bg: theme.colors.main,
                  color: theme.colors.white,
                  svg: {
                    fill: theme.colors.white,
                  },
                }}
                onClick={() => handleUpdateLane(laneSelectRate.lane)}
              >
                <PositionImage position={laneSelectRate.lane} width="20px" height="20px" />
                <Text minW="30px" textStyle="t2">
                  {(laneSelectRate.pickRate * 100).toFixed(0)}%
                </Text>
              </Box>
            );
          })}
        </HStack>
      </VStack>
    </HStack>
  );
}
