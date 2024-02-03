import { HStack, Text, VStack } from '@chakra-ui/react';

import type { Tier } from '@/apis/types';
import fullTierName from '@/apis/utils/fullTierName';
import TierImage from '@/components/common/TierImage';

interface RankCardProps {
  tierType: 'solo' | 'flex';
  tier: Tier;
  division: number;
  lp: number;
  rank: number;
}

export default function RankCard(props: RankCardProps) {
  const { tierType, tier, division, lp, rank } = props;

  return (
    <VStack alignItems="normal" bg="white" flex="1 1 0" p="20px" borderRadius="4px" gap="12px">
      <Text textStyle="t2" fontWeight="regular" color="gray700">
        {tierType === 'solo' ? '솔로' : '자유'} 랭크
      </Text>
      <HStack gap="20px">
        <TierImage tier={tier} width={40} height={40} />
        <VStack alignItems="normal" gap="2px">
          <Text textStyle="t1" fontWeight="bold" color="gray800">
            {fullTierName(tier, division)}
          </Text>
          <HStack gap="8px">
            <Text textStyle="body" fontWeight="regular" color="gray500">
              {lp}LP
            </Text>
            <Text textStyle="body" fontWeight="regular" color="gray500">
              랭크 {rank}위
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
