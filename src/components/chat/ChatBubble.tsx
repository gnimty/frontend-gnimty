import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Client } from '@stomp/stompjs';
import { createContext, useEffect, useState } from 'react';

import ChatIcon from '@/assets/icons/system/chat.svg';
import type { AuthToken } from '@/contexts/AuthContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { getStorageItem } from '@/utils/storage';

import ChatFrame from './ChatFrame';

import type {
  ChatRooms,
  InitChatBody,
  MessageChatRoomResponseType,
  MessageUserResponseType,
  User,
  UserConnStatus,
  ChatRoom,
  Chat,
} from './types';

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

export const ChatContext = createContext<{
  currentUserId?: string;
  chatClient: Client | null;
  chatRooms: ChatRooms;
  selectedChatRoomNo?: number;
  selectChatRoom: (chatRoomNo: number) => void;
  handleUpdate: (type: MessageUserResponseType | MessageChatRoomResponseType, body: string) => void;
}>({
  chatClient: null,
  chatRooms: [],
  selectChatRoom: () => null,
  handleUpdate: () => null,
});

function ChatBubble() {
  const [currentUserId, setCurrentUserId] = useState<string>();
  const [chatClient, setChatClient] = useState<Client | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRooms>([]);
  const [selectedChatRoomNo, setSelectedChatRoomNo] = useState<number>();
  const { isAuthenticated } = useAuthContext();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleUpdate = (type: MessageUserResponseType | MessageChatRoomResponseType, data: unknown) => {
    switch (type) {
      case 'READ_CHATS':
        const userId = data as string;
        setChatRooms((prev) => {
          const index = prev.findIndex((chatRoom) => chatRoom.otherUser.userId === userId);
          if (index === -1) return prev;
          const newChatRooms = [...prev];
          newChatRooms[index].chats = newChatRooms[index].chats.map((chat) => ({ ...chat, readCount: 0 }));
          return newChatRooms;
        });
        break;
      case 'CHATROOM_INFO':
        const chatRoomInfo = data as ChatRoom;
        setChatRooms((prev) => {
          const index = prev.findIndex((chatRoom) => chatRoom.chatRoomNo === chatRoomInfo.chatRoomNo);
          if (index === -1) return prev;
          const newChatRooms = [...prev];
          newChatRooms[index] = chatRoomInfo;
          return newChatRooms;
        });
        break;
      case 'USER_INFO':
        const userInfo = data as User;
        setChatRooms((prev) => {
          const index = prev.findIndex((chatRoom) => chatRoom.otherUser.userId === userInfo.userId);
          if (index === -1) return prev;
          const newChatRooms = [...prev];
          newChatRooms[index].otherUser = userInfo;
          return newChatRooms;
        });
        break;
      case 'CONNECT_STATUS':
        const userConnStatus = data as UserConnStatus;
        setChatRooms((prev) => {
          const index = prev.findIndex((chatRoom) => chatRoom.otherUser.userId === userConnStatus.userId);
          if (index === -1) return prev;
          const newChatRooms = [...prev];
          newChatRooms[index].otherUser.status = userConnStatus.connStatus;
          return newChatRooms;
        });
        break;
      case 'CHAT_MESSAGE':
        const chatMessage = data as Chat;
        setChatRooms((prev) => {
          const index = prev.findIndex((chatRoom) => chatRoom.otherUser.userId === chatMessage.senderId);
          if (index === -1) return prev;
          const newChatRooms = [...prev];
          newChatRooms[index].chats.push(chatMessage);
          return newChatRooms;
        });
        break;
    }
  };

  const selectChatRoom = (chatRoomNo: number) => {
    setSelectedChatRoomNo(chatRoomNo);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const token = getStorageItem<AuthToken>({ key: 'auth', storage: localStorage });
      if (token) {
        const client = new Client({
          brokerURL: 'wss://gnimty.kro.kr/community/chat',
          connectHeaders: {
            'accept-version': '1.0,1.1,1.2',
            Authorization: `Bearer ${token.accessToken}`,
          },
          onConnect: () => {
            const { id } = JSON.parse(atob(token.accessToken.split('.')[1]));
            setCurrentUserId(id);
            console.log('Chat client connected');
            client.subscribe(`/sub/user/${id}`, () => {
              console.log('Connected');
              client.subscribe('/sub/init_chat', (message) => {
                console.log('Init Chat', message.body);
                const { chatRoomList } = JSON.parse(message.body) as InitChatBody;
                setChatRooms(chatRoomList);
              });
            });
          },
        });
        client.activate();
        setChatClient(client);
      }
    }
  }, [isAuthenticated]);

  return (
    <ChatBubbleContainer $open={isOpen}>
      <ChatIcon color="#fff" width="36px" height="36px" onClick={onToggle} />
      {isOpen && (
        <ChatContext.Provider
          value={{ currentUserId, chatClient, chatRooms, selectedChatRoomNo, selectChatRoom, handleUpdate }}
        >
          <ChatFrame closeChat={onClose} />
        </ChatContext.Provider>
      )}
    </ChatBubbleContainer>
  );
}

export default ChatBubble;
