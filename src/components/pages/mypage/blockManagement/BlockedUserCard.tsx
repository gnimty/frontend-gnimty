import { Button, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import type { Status } from '@/apis/types';
import useUnblockUser from '@/apis/useUnblockUser';
import ProfileImage from '@/components/common/ProfileImage';
import StatusIndicator from '@/components/common/StatusIndicator';

export interface BlockedUserCardProps {
  blockedDate: string;
  nickname: string;
  status: Status;
  memo: string;
  blockEntryId: number;
  profileIconId: number;
}

export default function BlockedUserCard(props: BlockedUserCardProps) {
  const { blockedDate, profileIconId, nickname, status, memo, blockEntryId } = props;

  const { unblockUser } = useUnblockUser();

  const router = useRouter();

  return (
    <Flex w="full" h="64px" bg="white" gap="12px" padding="12px 20px" alignItems="center">
      <Text width="57px" textStyle="t2" fontWeight={400} color="gray500">
        {dayjs(blockedDate).format('YY.MM.DD')}
      </Text>

      <Flex alignItems="center" w="240px" gap="12px">
        <ProfileImage iconId={profileIconId} width={28} height={28} />
        <Text textStyle="t1" fontWeight={700}>
          {nickname}
        </Text>
        <StatusIndicator status={status} />
      </Flex>
      <Text w="227px" textStyle="t2" fontWeight={400} noOfLines={2}>
        {memo}
      </Text>
      <Button
        size="md"
        w="116px"
        border="1px solid"
        borderColor="main"
        color="main"
        onClick={() => {
          unblockUser(
            { id: blockEntryId },
            {
              onSuccess() {
                router.reload();
                alert('성공적으로 차단을 해제했습니다.');
              },
              onError() {
                alert('차단 해제에 실패했습니다.');
              },
            },
          );
        }}
      >
        차단 해제
      </Button>
    </Flex>
  );
}
