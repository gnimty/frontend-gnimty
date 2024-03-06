import { HStack, Text, VStack } from '@chakra-ui/react';

import type { SummonerTierDto } from '@/apis/types';
import fullTierName from '@/apis/utils/fullTierName';
import TierImage from '@/components/common/TierImage';

interface RankCardProps {
  tierType: 'solo' | 'flex';
  tierInfo: SummonerTierDto | null;
}

export default function RankCard(props: RankCardProps) {
  const { tierType, tierInfo } = props;
  const { tier = 'unknown', division, lp } = tierInfo ?? {};

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
          {tier === 'unknown' ? (
            <Text textStyle="body" fontWeight="regular" color="gray500">
              -
            </Text>
          ) : (
            <HStack gap="8px">
              <Text textStyle="body" fontWeight="regular" color="gray500">
                {lp}LP
              </Text>
              <Text textStyle="body" fontWeight="regular" color="gray500">
                {/* TODO: API에 순위 정보가 추가 되면 같이 업데이트 필요 */}
                랭크 {1}위
              </Text>
            </HStack>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
}
