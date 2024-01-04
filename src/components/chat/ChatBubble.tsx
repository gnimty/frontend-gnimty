import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';

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
  const { isOpen, onClose, onToggle } = useDisclosure();
  return (
    <ChatBubbleContainer $open={isOpen}>
      <ChatIcon color="#fff" width="36px" height="36px" onClick={onToggle} />
      {isOpen && <ChatFrame closeChat={onClose} />}
    </ChatBubbleContainer>
  );
}

export default ChatBubble;
