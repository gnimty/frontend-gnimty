import { VStack } from '@chakra-ui/react';

import type { BlockedUserCardProps } from '@/components/pages/mypage/blockManagement/BlockedUserCard';
import BlockedUserCard from '@/components/pages/mypage/blockManagement/BlockedUserCard';

export default function BlockManagementTab() {
  const testData: BlockedUserCardProps[] = [
    {
      blockedDate: new Date('2023.09.06'),
      nickname: '테스트 1번',
      status: 'ONLINE',
      reason: '사유 1번',
    },
    {
      blockedDate: new Date('2023.10.01'),
      nickname: '테스트 2번',
      status: 'OFFLINE',
      reason: '사유 2번',
    },
    {
      blockedDate: new Date(),
      nickname: '테스트 3번',
      status: 'AWAY',
      reason:
        '사유가 너무너무 길어요 사유가 너무너무 길어요 사유가 너무너무 길어요 사유가 너무너무 길어요 사유가 너무너무 길어요 사유가 너무너무 길어요',
    },
  ];

  return (
    <VStack w="full">
      {testData.map((data) => (
        <BlockedUserCard
          key={data.nickname}
          blockedDate={data.blockedDate}
          nickname={data.nickname}
          status={data.status}
          reason={data.reason}
        />
      ))}
    </VStack>
  );
}
