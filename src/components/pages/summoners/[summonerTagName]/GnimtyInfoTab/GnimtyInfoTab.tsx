import { Box, HStack, Text, VStack } from '@chakra-ui/react';

import dayOfWeekEnumKrMap from '@/apis/constants/dayOfWeekEnumKrMap';
import type { GameMode, OtherProfileEntry } from '@/apis/types';
import TimeBadge from '@/components/common/TimeBadge';

interface GnimtyInfoTabProps {
  memberProfileData: OtherProfileEntry;
}

export default function GnimtyInfoTab({ memberProfileData }: GnimtyInfoTabProps) {
  return (
    <VStack w="720px" gap="24px" align="flex-start">
      {/* 상태 메시지 */}
      <VStack w="full" gap="12px" align="flex-start">
        <Text w="full" textStyle="t2" fontWeight="700">
          상태 메시지
        </Text>
        <Box w="full" minH="60px" borderRadius="4px" p="12px" bgColor="white">
          <Text textStyle="t2" fontWeight="400">
            {memberProfileData.mainIntroduction ?? '상태 메시지가 없습니다.'}
          </Text>
        </Box>
      </VStack>
      {/* 게임 가능 시간 */}
      <VStack gap="12px" align="flex-start">
        <Text textStyle="t2" fontWeight="700">
          게임 가능 시간
        </Text>
        {memberProfileData.schedules?.map((schedule) => (
          <HStack key={schedule.dayOfWeek} gap="12px">
            <Text textStyle="t2" fontWeight="400">
              {dayOfWeekEnumKrMap[schedule.dayOfWeek]}
            </Text>
            {schedule.times.map((time) => (
              <TimeBadge key={`${time.startTime}-${time.endTime}`} startTime={time.startTime} endTime={time.endTime} />
            ))}
          </HStack>
        ))}
      </VStack>
      {/* 선호 게임 타입 */}
      <VStack gap="12px" align="flex-start">
        <Text textStyle="t2" fontWeight="700">
          선호 게임 타입
        </Text>
        <HStack gap="8px">
          {memberProfileData.preferGameModes?.map(({ gameMode }) => {
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
