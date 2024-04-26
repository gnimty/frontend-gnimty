import { Box, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import { postMemberLike } from '@/apis/queries/memberLikeQuery';
import type { RecentlySummonersEntry } from '@/apis/types';
import fullTierName from '@/apis/utils/fullTierName';

import ChampionIcon from '../common/ChampionIcon';
import ProfileImage from '../common/ProfileImage';
import TierImage from '../common/TierImage';

import LikeIcon from './LikeIcon';

import type { AxiosError } from 'axios';
interface SummonerCardProps {
  summoner: RecentlySummonersEntry;
}

const SummonerCard = ({ summoner }: SummonerCardProps) => {
  const {
    memberId,
    name,
    tagLine,
    iconId,
    tier,
    lp,
    division,
    totalPlay,
    winRate,
    frequentChampionId1,
    frequentChampionId2,
    frequentChampionId3,
  } = summoner;
  const championIds = [frequentChampionId1, frequentChampionId2, frequentChampionId3];
  const [memberLiked, setMemberLiked] = useState(false);
  const { mutateAsync: memberLikeAsync } = useMutation({
    mutationFn: postMemberLike,
    onSuccess: () => {
      setMemberLiked(!memberLiked);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        // 이미 좋아요를 누른 경우
        // alert("이미 추천한 소환사입니다.")
        setMemberLiked(true);
      }
      if (error.response?.status === 404) {
        // 좋아요 기록이 없는 경우
        setMemberLiked(false);
      }
    },
  });
  const handleMemberLike = async (targetMemberId: number) => {
    if (memberLiked) {
      // 이미 좋아요를 누른 경우
      if (confirm('좋아요를 취소하시겠습니까?')) {
        await memberLikeAsync({ targetMemberId, cancel: true });
      }
      return;
    }
    if (!memberLiked) {
      await memberLikeAsync({ targetMemberId, cancel: false });
    }
  };

  // 좋아요 상태 확인
  useEffect(() => {
    async () => {
      await memberLikeAsync({ targetMemberId: memberId, cancel: false });
    };
  }, [memberLikeAsync, memberId]);

  return (
    <VStack w="320px" borderRadius="8px" bgColor="white" p="60px 20px 20px 20px" gap="40px">
      <Box w="60px" h="60px" borderRadius="30px" overflow="hidden">
        <ProfileImage iconId={iconId} width={60} height={60} />
      </Box>
      <VStack gap="8px" justify="center">
        <Text textStyle="h2" fontWeight="700">
          {name}
        </Text>
        <Text textStyle="h3" fontWeight="400" color="gray600">
          #{tagLine}
        </Text>
        <HStack gap="8px">
          <TierImage tier={tier} width={28} height={28} />
          {tier && (
            <Text textStyle="h3" fontWeight="700">
              {fullTierName(tier, division)}
            </Text>
          )}
          {lp && (
            <Text textStyle="h3" fontWeight="400" color="gray500">
              {lp.toLocaleString('ko-KR') + 'LP'}
            </Text>
          )}
        </HStack>
        <VStack w="180px" gap="12px" p="20px 0 0 0" borderTop="1px solid" borderColor="gray300">
          <HStack gap="8px">
            <Text textStyle="h3" fontWeight="400">
              {totalPlay && totalPlay}게임
            </Text>
            <Text textStyle="h3" fontWeight="700" color="green800">
              {winRate && (winRate * 100).toFixed(0)}%
            </Text>
          </HStack>
          <HStack gap="12px">
            {championIds.map(
              (championId) =>
                championId !== null && (
                  <ChampionIcon
                    key={championId}
                    championEnName={championIdEnNameMap[championId]}
                    width={32}
                    height={32}
                    radius={16}
                  />
                ),
            )}
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
        onClick={async () => handleMemberLike(memberId)}
      >
        <Text textStyle="t2" fontWeight="400">
          소환사 추천하기
        </Text>
        <LikeIcon width="20px" height="20px" stroke="#fff" like={memberLiked} />
      </Button>
    </VStack>
  );
};

export default SummonerCard;
