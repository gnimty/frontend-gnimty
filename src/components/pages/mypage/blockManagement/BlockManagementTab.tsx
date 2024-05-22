import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import listBlockedUsersQuery from '@/apis/queries/listBlockedUsersQuery';
import BlockedUserCard from '@/components/pages/mypage/blockManagement/BlockedUserCard';

export default function BlockManagementTab() {
  const { data, status } = useQuery(listBlockedUsersQuery());

  if (status !== 'success') {
    return;
  }

  return (
    <Flex direction="column" w="full" gap="12px">
      {data.data.blocks.map((blockEntry) => (
        <BlockedUserCard
          key={blockEntry.id}
          blockedDate={blockEntry.date}
          nickname={blockEntry.nickname}
          status={blockEntry.status}
          profileIconId={blockEntry.profileIconId}
          memo={blockEntry.memo ?? ''}
          blockEntryId={blockEntry.id}
        />
      ))}
    </Flex>
  );
}
