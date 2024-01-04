import { Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import type { Status } from '@/apis/types';
import summonerDefaultProfile from '@/assets/images/summoner-default-profile.png';
import StatusIndicator from '@/components/common/StatusIndicator';

export interface BlockedUserCardProps {
  blockedDate: Date;
  profileImage?: string;
  nickname: string;
  status: Status;
  reason: string;
}

export default function BlockedUserCard({ blockedDate, profileImage, nickname, status, reason }: BlockedUserCardProps) {
  return (
    <Flex w="full" h="64px" bg="white" gap="12px" padding="12px 20px" alignItems="center">
      <Text width="57px" textStyle="t2" fontWeight={400} color="gray500">
        {blockedDate
          .toLocaleDateString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/(\s+)|(\.$)/g, '')}
      </Text>

      <Flex alignItems="center" w="240px" gap="12px">
        <Image src={profileImage ?? summonerDefaultProfile} width={28} height={28} alt="" />
        <Text textStyle="t1" fontWeight={700}>
          {nickname}
        </Text>
        <StatusIndicator status={status} />
      </Flex>
      <Text w="227px" textStyle="t2" fontWeight={400} noOfLines={2}>
        {reason}
      </Text>
      <Button size="md" w="116px" border="1px solid" borderColor="main" color="main">
        차단 해제
      </Button>
    </Flex>
  );
}
