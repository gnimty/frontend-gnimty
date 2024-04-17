import { Box, Text, VStack, HStack, Button } from '@chakra-ui/react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import type { QueueType, SummonerDto } from '@/apis/types';
import Like from '@/assets/icons/system/like.svg';

import ChampionIcon from '../common/ChampionIcon';
import ProfileImage from '../common/ProfileImage';
import TierImage from '../common/TierImage';

interface SummonerCardProps {
  summoner: SummonerDto;
  queueType: Omit<QueueType, 'BLIND'>;
}

const SummonerCard = ({ summoner, queueType }: SummonerCardProps) => {
  const { summonerName, tagLine, profileIconId, soloTierInfo, flexTierInfo } = summoner;
  return (
    <VStack w="320px" borderRadius="8px" bgColor="white" p="60px 20px 20px 20px" gap="40px">
      <Box w="60px" h="60px" borderRadius="30px" overflow="hidden">
        <ProfileImage iconId={profileIconId} width={60} height={60} />
      </Box>
      <VStack gap="8px" justify="center">
        <Text textStyle="h2" fontWeight="700">
          {summonerName}
        </Text>
        <Text textStyle="h3" fontWeight="400" color="gray600">
          {tagLine}
        </Text>
        <HStack gap="8px">
          {/* queueType이 RANK_FLEX일 경우, 추천된 소환사라면 flexTierInfo가 존재할것이라 가정 */}
          <TierImage tier={queueType === 'RANK_SOLO' ? soloTierInfo.tier : flexTierInfo!.tier} width={28} height={28} />
          <Text textStyle="h3" fontWeight="700">
            {queueType === 'RANK_SOLO' ? soloTierInfo.tier : flexTierInfo?.tier}
          </Text>
          <Text textStyle="h3" fontWeight="400" color="gray500">
            {queueType === 'RANK_SOLO'
              ? soloTierInfo.lp.toLocaleString('ko-KR')
              : flexTierInfo?.lp.toLocaleString('ko-KR')}
            LP
          </Text>
        </HStack>
        <VStack w="180px" gap="12px" p="20px 0 0 0" borderTop="1px solid" borderColor="gray300">
          <HStack gap="8px">
            <Text textStyle="h3" fontWeight="400">
              {queueType === 'RANK_SOLO' ? soloTierInfo.plays : flexTierInfo?.plays}게임
            </Text>
            <Text textStyle="h3" fontWeight="700" color="green800">
              {/* queueType이 RANK_FLEX일 경우, 추천된 소환사라면 flexTierInfo가 존재할것이라 가정 */}
              {queueType === 'RANK_SOLO'
                ? (soloTierInfo.winRate * 100).toFixed(2)
                : (flexTierInfo!.winRate * 100).toFixed(2)}
              %
            </Text>
          </HStack>
          <HStack gap="12px">
            {queueType === 'RANK_SOLO'
              ? soloTierInfo.mostChampionIds.map((championId) => (
                  <ChampionIcon
                    key={championId}
                    championEnName={championIdEnNameMap[championId]}
                    width={32}
                    height={32}
                    radius={16}
                  />
                ))
              : flexTierInfo!.mostChampionIds.map((championId) => (
                  <ChampionIcon
                    key={championId}
                    championEnName={championIdEnNameMap[championId]}
                    width={32}
                    height={32}
                    radius={16}
                  />
                ))}
          </HStack>
        </VStack>
      </VStack>
      <Button
        w="180px"
        h="40px"
        borderRadius="4px"
        p="10px 12px"
        gap="8px"
        bgColor="main"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text textStyle="t2" fontWeight="400">
          소환사 추천하기
        </Text>
        <Like width="20px" height="20px" stroke="#fff" />
      </Button>
    </VStack>
  );
};

export default SummonerCard;
