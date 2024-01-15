import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useContext, useEffect, useState } from 'react';

import ExitIcon from '@/assets/icons/system/exit.svg';
import StatusIndicator from '@/components/common/StatusIndicator';

import { ChatContext } from './ChatBubble';
import type { ChatRoom } from './types';

interface ChatProps extends ChatRoom {
  selected?: boolean;
  handleClick: (chatRoomNo: number) => void;
}

function Chat({ chatRoomNo, otherUser, chats, selected, handleClick }: ChatProps) {
  const theme = useTheme();
  const chatContext = useContext(ChatContext);
  const [isOnHover, setIsOnHover] = useState(false);
  const { summonerName, iconId, status } = otherUser;
  const exitChat = () => {
    chatContext.chatClient?.publish({
      destination: `/pub/chatRoom/${chatRoomNo}`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'EXIT',
      }),
    });
  };

  useEffect(() => {
    if (selected) {
      chatContext.chatClient?.subscribe(`/sub/chatRoom/${chatRoomNo}`, (message) => {
        const body = JSON.parse(message.body);
        chatContext.handleUpdate(body.type, body.data);
      });
      chatContext.chatClient?.publish({
        destination: `/pub/chatRoom/${chatRoomNo}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'READ_CHATS',
        }),
      });
    }
  }, [chatContext.chatClient, selected]);

  return (
    <HStack
      role="option"
      aria-selected={selected}
      w="260px"
      h="64px"
      bgColor="white"
      p="12px 20px"
      gap="12px"
      _hover={{
        bg: 'gray100',
      }}
      _selected={{
        bg: 'main',
      }}
      onClick={() => handleClick(chatRoomNo)}
      onMouseEnter={() => setIsOnHover(true)}
      onMouseLeave={() => setIsOnHover(false)}
      borderBottom={`1px solid ${theme.colors.gray100}`}
    >
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${iconId}.png`}
        alt={summonerName}
        w="40px"
        h="40px"
        borderRadius="50%"
      />
      <VStack h="40px" gap="4px">
        <HStack h="20px" justify="space-between">
          <Box textStyle="t2" color={selected ? 'white' : 'gray800'}>
            {summonerName}
          </Box>
          {/* <Box textStyle="t2" fontWeight="400" color={selected ? 'gray400' : 'gray600'}>
            {hashtag}
          </Box> */}
          <StatusIndicator status={status} />
        </HStack>
        <VStack h="20px" w="100%">
          {chats.length > 0 && (
            <Box textStyle="body" textAlign="left" w="100%" color={selected ? 'white' : 'gray800'}>
              {chats[chats.length - 1].message}
            </Box>
          )}
        </VStack>
      </VStack>
      {isOnHover && <ExitIcon width="16px" height="16px" color={theme.colors.gray500} onClick={exitChat} />}
    </HStack>
  );
}

function ChatList() {
  const theme = useTheme();
  const chatContext = useContext(ChatContext);
  const handleChatClick = (chatRoomNo: number) => {
    chatContext.selectChatRoom(chatRoomNo);
  };
  return (
    <Box w="260px" h="100%" borderRight={`1px solid ${theme.colors.gray100}`}>
      <VStack role="listbox" w="full" h="max-content" overflowY="auto" spacing="1px">
        {chatContext.chatRooms.map((chatRoom) => (
          <Chat
            key={chatRoom.chatRoomNo}
            {...chatRoom}
            selected={chatContext.selectedChatRoomNo === chatRoom.chatRoomNo}
            handleClick={handleChatClick}
          />
        ))}
      </VStack>
    </Box>
  );
}

export default ChatList;
