import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import React, { useState } from 'react';

import profileIconUrl from '@/apis/utils/profileIconUrl';
import ExitIcon from '@/assets/icons/system/exit.svg';
import StatusIndicator from '@/components/common/StatusIndicator';
import { useChatContext } from '@/contexts/ChatContext';

import type { ChatRoom } from './types';

interface ChatProps extends ChatRoom {
  selected?: boolean;
  handleClick: (chatRoomNo: number) => void;
}

function Chat({ chatRoomNo, otherUser, chats, selected, handleClick }: ChatProps) {
  const theme = useTheme();
  const { exitChatRoom } = useChatContext();
  const [isOnHover, setIsOnHover] = useState(false);
  const { name, iconId, status } = otherUser;

  return (
    <HStack
      role="option"
      position="relative"
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
      <Image src={profileIconUrl(Number(iconId ?? '10'))} alt={name} w="40px" h="40px" borderRadius="50%" />
      <VStack h="40px" gap="4px">
        <HStack h="20px" justify="space-between">
          <Box textStyle="t2" color={selected ? 'white' : 'gray800'}>
            {name}
          </Box>
          {/* <Box textStyle="t2" fontWeight="400" color={selected ? 'gray400' : 'gray600'}>
            {hashtag}
          </Box> */}
          <StatusIndicator status={status} />
        </HStack>
        <VStack h="20px" w="100%">
          {chats && chats.length > 0 && (
            <Box textStyle="body" textAlign="left" w="100%" color={selected ? 'white' : 'gray800'}>
              {chats[chats.length - 1].message}
            </Box>
          )}
        </VStack>
      </VStack>
      {isOnHover && (
        <Box
          position="absolute"
          top="50%"
          right="20px"
          transform="translateY(-50%)"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            exitChatRoom(chatRoomNo);
          }}
          cursor="pointer"
        >
          <ExitIcon width="16px" height="16px" color={theme.colors.gray500} />
        </Box>
      )}
    </HStack>
  );
}

function ChatList() {
  const theme = useTheme();
  const { chatRooms, selectChatRoom, selectedChatRoomNo } = useChatContext();
  const handleChatClick = (chatRoomNo: number) => {
    selectChatRoom(chatRoomNo);
  };
  return (
    <Box w="261px" h="100%" borderRight={`1px solid ${theme.colors.gray100}`}>
      <VStack role="listbox" w="full" h="max-content" overflowY="auto" spacing="1px">
        {chatRooms.map((chatRoom) => (
          <Chat
            key={chatRoom.chatRoomNo}
            {...chatRoom}
            selected={selectedChatRoomNo === chatRoom.chatRoomNo}
            handleClick={handleChatClick}
          />
        ))}
      </VStack>
    </Box>
  );
}

export default ChatList;
