import 'dayjs/locale/ko';

import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import memberProfileQuery from '@/apis/queries/memberProfileQuery';
import type { GameMode } from '@/apis/types';

export default function GnimtyInfoTab() {
  const memberId = 1;
  const { data: memberProfileData } = useQuery(memberProfileQuery({ memberId }));

  return (
    <VStack w="720px" gap="24px" align="flex-start">
      {/* 상태 메시지 */}
      <VStack gap="12px" align="flex-start">
        <Text textStyle="t2" fontWeight="700">
          상태 메시지
        </Text>
        <Box w="full" h="60px" borderRadius="4px" p="12px" bgColor="white">
          <Text textStyle="t2" fontWeight="400">
            {memberProfileData?.data.mainIntroduction}
          </Text>
        </Box>
      </VStack>
      {/* 게임 가능 시간 */}
      <VStack gap="12px" align="flex-start">
        <Text textStyle="t2" fontWeight="700">
          게임 가능 시간
        </Text>
        {memberProfileData?.data.schedules.map((schedule) => {
          return (
            <HStack gap="12px" key={schedule.dayOfWeek}>
              <Text textStyle="t2" fontWeight="400">
                {schedule.dayOfWeek}
              </Text>
              <Box h="28px" borderRadius="999px" border="1px solid" borderColor="gray800" p="4px 12px">
                {dayjs().hour(schedule.startTime).format('HH')}시 - {dayjs().hour(schedule.endTime).format('HH')}시
              </Box>
            </HStack>
          );
        })}
      </VStack>
      {/* 선호 게임 타입 */}
      <VStack gap="12px" align="flex-start">
        <Text textStyle="t2" fontWeight="700">
          선호 게임 타입
        </Text>
        <HStack gap="8px">
          {memberProfileData?.data.preferGameModes.map(({ gameMode }) => {
            return (
              <Box key={gameMode} h="28px" borderRadius="999px" border="1px solid" borderColor="gray800" p="4px 12px">
                {gameModeMap[gameMode]}
              </Box>
            );
          })}
        </HStack>
      </VStack>
    </VStack>
  );
}

const gameModeMap: Record<GameMode, string> = {
  RANK_SOLO: '솔로 랭크',
  RANK_FLEX: '자유 랭크',
  BLIND: '칼바람 나락/일반 게임',
};
