import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';

import championIconUrl from '@/apis/utils/championIconUrl';
import ChampionTierBadge from '@/components/common/ChampionTierBadge';
import PositionImage from '@/components/common/position-image/PositionImage';

// interface ChampionBasicInfoProps {}

export default function ChampionBasicInfo() {
  const theme = useTheme();
  return (
    <HStack w="full" h="160px" p="0 20px" gap="12px" align="flex-start">
      <Box w="100px" h="100px" borderRadius="99px" overflow="hidden">
        <Image src={championIconUrl('Jhin')} alt="Jhin" width="100" height="100" />
      </Box>
      <VStack w="328px" h="148px" gap="16px" align="flex-start" justify="space-between">
        <HStack>
          <Text textStyle="h2" fontWeight="700">
            진
          </Text>
          <ChampionTierBadge tier="1" />
        </HStack>
        <HStack w="328px" h="40px" p="0 20px" gap="24px" justify="space-between">
          <VStack w="80px" p="0 24px 0 0" borderRight="1px solid" borderRightColor="gray300">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              승률
            </Text>
            <Text textStyle="t2" fontWeight="700" color="gray800">
              50.94%
            </Text>
          </VStack>
          <VStack w="80px" p="0 24px 0 0" borderRight="1px solid" borderRightColor="gray300">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              픽률
            </Text>
            <Text textStyle="t2" fontWeight="700" color="gray800">
              50.94%
            </Text>
          </VStack>
          <VStack w="80px" p="0 24px 0 0">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              밴률
            </Text>
            <Text textStyle="t2" fontWeight="700" color="gray800">
              50.94%
            </Text>
          </VStack>
        </HStack>
        <HStack w="156px" h="40px" borderRadius="4px" border="1px solid" borderColor="gray200" gap="0">
          <Box
            w="78px"
            h="full"
            p="10px 12px"
            borderRight="1px solid"
            borderColor="gray200"
            aria-selected="true"
            bgColor="white"
            gap="4px"
            display="flex"
            align-items="center"
            justifyContent="center"
            cursor="pointer"
            _selected={{
              bg: theme.colors.main,
              color: theme.colors.white,
              svg: {
                fill: theme.colors.white,
              },
            }}
          >
            <PositionImage position="BOTTOM" width="20px" height="20px" fill="white" />
            <Text textStyle="t2" color="white">
              98%
            </Text>
          </Box>
          <Box
            w="78px"
            h="full"
            p="10px 12px"
            borderRight="1px solid"
            borderColor="gray200"
            aria-selected="false"
            bgColor="white"
            gap="4px"
            display="flex"
            align-items="center"
            justifyContent="center"
            cursor="pointer"
            _selected={{
              bg: theme.colors.main,
              color: theme.colors.white,
              svg: {
                fill: theme.colors.white,
              },
            }}
          >
            <PositionImage position="MIDDLE" width="20px" height="20px" />
            <Text textStyle="t2" color="gray700">
              98%
            </Text>
          </Box>
        </HStack>
      </VStack>
    </HStack>
  );
}
