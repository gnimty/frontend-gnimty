import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';

import ChatIcon from '@/assets/icons/system/chat.svg';

import ChatFrame from './ChatFrame';
import { AuthToken, useAuthContext } from '@/contexts/AuthContext';
import { getStorageItem } from '@/utils/storage';
import { Client } from '@stomp/stompjs';

const ChatBubbleContainer = styled.div<{ $open: boolean }>`
  position: fixed;
  right: 10%;
  bottom: 10%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ theme, $open }) => ($open ? theme.colors.gray800 : theme.colors.red800)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function ChatBubble() {
  const { isAuthenticated } = useAuthContext();
  const { isOpen, onClose, onToggle } = useDisclosure();

  useEffect(() => {
    if (isAuthenticated) {
      const token = getStorageItem<AuthToken>({ key: 'auth', storage: localStorage });
      if (token) {
        const chatClient = new Client({
          brokerURL: 'wss://gnimty.kro.kr/community/chat',
          connectHeaders: {
            'accept-version': '1.0,1.1,1.2',
            Authorization: `Bearer ${token.accessToken}`,
          },
          onConnect: () => {
            console.log('Client Connected!');
          },
        });
        chatClient.activate();
      }
    }
  }, [isAuthenticated]);

  return (
    <ChatBubbleContainer $open={isOpen}>
      <ChatIcon color="#fff" width="36px" height="36px" onClick={onToggle} />
      {isOpen && <ChatFrame closeChat={onClose} />}
    </ChatBubbleContainer>
  );
}

export default ChatBubble;
