import { Box, VStack } from '@chakra-ui/react';

import Chat from './Chat';
import ChatInput from './ChatInput';
import UserCard from './UserCard';

export interface ChatInfo {
  type: 'incoming' | 'outgoing';
  message: string;
  date: string;
}

function CurrentChat() {
  const chats: ChatInfo[] = [
    {
      type: 'incoming',
      message: '하이하이',
      date: '2021-10-01',
    },
    {
      type: 'outgoing',
      message: 'ㅎㅇㅎㅇ!',
      date: '2023-12-18',
    },
  ];
  return (
    <VStack w="100%" h="100%" justify="space-between" position="relative">
      {/* if user exists */}
      <UserCard
        username="TestUserName"
        hashtag="#KR1"
        avatarUrl="#"
        soloRankInfo={{
          tier: 'challenger',
          division: 1,
          lp: 1000,
          mainPosition: 'MIDDLE',
          subPosition: 'TOP',
        }}
        flexRankInfo={{
          tier: 'master',
          division: 1,
          lp: 200,
          mainPosition: 'MIDDLE',
          subPosition: 'TOP',
        }}
      />
      {/* if chat exists */}
      {/* TODO: 날짜별 혹은 '오늘'의 경우 divider 추가 */}
      {chats.length > 0 && (
        <VStack w="full" h="full" spacing="8px" overflowY="auto" p="0 20px">
          {chats.map((chatInfo) => (
            <Chat key={chatInfo.date} {...chatInfo} />
          ))}
        </VStack>
      )}
      {/* if chat not exists */}
      {chats.length === 0 && (
        <VStack w="full" h="full" align="center" justify="center">
          <Box textStyle="t2" color="gray500" fontWeight="400" textAlign="center">
            같이 플레이하고 싶은 소환사에게
            <br />
            메세지를 보내보세요!
          </Box>
        </VStack>
      )}
      <ChatInput />
    </VStack>
  );
}

export default CurrentChat;
