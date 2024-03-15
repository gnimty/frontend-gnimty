import { Box, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';

import summonerInfoQuery from '@/apis/queries/summonerInfoQuery';
import { useChatContext } from '@/contexts/ChatContext';

import Chat from './Chat';
import ChatInput from './ChatInput';
import UserCard from './UserCard';

function CurrentChat() {
  const { chatRooms, selectedChatRoomNo } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const chats = useMemo(
    () => chatRooms?.find((chatRoom) => chatRoom.chatRoomNo === selectedChatRoomNo)?.chats ?? [],
    [chatRooms, selectedChatRoomNo],
  );
  const otherUser = chatRooms?.find((chatRoom) => chatRoom.chatRoomNo === selectedChatRoomNo)?.otherUser;
  const otherUserId = otherUser?.userId;
  const otherUserName = otherUser?.name;
  const otherUserTagLine = otherUser?.tagLine;
  const { data: summonerInfo } = useQuery(
    summonerInfoQuery({ summonerTagName: `${otherUserName}-${otherUserTagLine}` }),
  );
  const today = new Date();
  const chatsBeforeToday = chats?.filter((chat) => new Date(chat.sendDate) < today);
  const chatsToday = chats?.slice(chatsBeforeToday.length, chats.length);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <VStack w="400px" h="100%" position="relative" justify="flex-start">
      {/* if user exists */}
      <UserCard
        summonerName="TestUserName"
        tagLine="#KR1"
        profileIconId={100}
        soloTierInfo={summonerInfo?.data.summoner?.soloTierInfo}
        flexTierInfo={summonerInfo?.data.summoner?.flexTierInfo}
      />
      {/* if chat exists */}
      <Box overflowY="scroll" w="full" flex="1" mb="70px" ref={scrollRef}>
        {chats && chats.length > 0 && otherUserId && (
          <VStack w="full" spacing="8px" p="0 20px">
            {chatsBeforeToday.map((chatInfo) => (
              <Chat key={chatInfo.sendDate} otherUserId={otherUserId} {...chatInfo} />
            ))}
            {chatsBeforeToday && chatsToday.length > 0 && (
              <HStack w="360px" m="0 auto" justify="space-between" alignItems="center">
                <Box w="full" h="1px" border="0.5px solid gray300" />
                <Box w="52px" textStyle="body" color="gray300" textAlign="center">
                  오늘
                </Box>
                <Box w="full" h="1px" border="0.5px solid gray300" />
              </HStack>
            )}
            {chatsToday.map((chatInfo) => (
              <Chat key={chatInfo.sendDate} otherUserId={otherUserId} {...chatInfo} />
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
      </Box>
      <ChatInput />
    </VStack>
  );
}

export default CurrentChat;
