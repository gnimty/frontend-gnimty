import styled from '@emotion/styled';
import { useState } from 'react';

import ChatIcon from '@/assets/icons/system/chat.svg';

import ChatFrame from './ChatFrame';

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
  const [chatOpen, setChatOpen] = useState(false);
  const closeChat = () => setChatOpen(false);
  return (
    <ChatBubbleContainer $open={chatOpen} onClick={() => setChatOpen((prev) => !prev)}>
      <ChatIcon color="#fff" width="36px" height="36px" />
      {chatOpen && <ChatFrame closeChat={closeChat} />}
    </ChatBubbleContainer>
  );
}

export default ChatBubble;
