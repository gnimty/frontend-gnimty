import { useEffect, useState } from 'react';
import constate from 'constate';
import { Client } from '@stomp/stompjs';
import { type AuthToken, StorageAuthKey, useAuthContext } from './AuthContext';
import { getStorageItem } from '@/utils/storage';
import type {
  Chat,
  ChatRoom,
  ChatRooms,
  InitChatBody,
  MessageChatRoomResponseType,
  MessageUserResponseType,
  User,
  UserConnStatus,
} from '@/components/chat/types';
import { useDisclosure } from '@chakra-ui/react';

export const [ChatContextProvider, useChatContext] = constate(() => {
  const { isAuthenticated } = useAuthContext();
  const disclosure = useDisclosure();
  const [chatClient, setChatClient] = useState<Client | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRooms>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activateChatUserIds, setActivateChatUserIds] = useState<string[]>([]);
  const [selectedChatRoomNo, setSelectedChatRoomNo] = useState<number | null>(null);

  const selectChatRoom = (chatRoomNo: number) => {
    setSelectedChatRoomNo(chatRoomNo);
  };

  const updateActivateChatUserIds = (userId: string, type: 'ADD' | 'REMOVE') => {
    switch (type) {
      case 'ADD':
        setActivateChatUserIds((prev) => [...prev, userId]);
        chatClient?.subscribe(`/sub/user/${userId}`, (message) => {
          const body = JSON.parse(message.body);
          handleUpdate(body.type, body.data);
        });
        break;
      case 'REMOVE':
        setActivateChatUserIds((prev) => prev.filter((id) => id !== userId));
        break;
      default:
        break;
    }
  };

  const handleUpdate = (type: MessageUserResponseType | MessageChatRoomResponseType, data: unknown) => {
    console.log('Type', type);
    console.log('DATA', data);
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

  const exitChatRoom = (chatRoomNo: number) => {
    chatClient?.publish({
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
    if (isAuthenticated) {
      const token = getStorageItem<AuthToken>({ key: StorageAuthKey, storage: localStorage });
      if (token) {
        const client = new Client({
          brokerURL: 'wss://gnimty.kro.kr/community/chat',
          connectHeaders: {
            'accept-version': '1.2',
            Authorization: `Bearer ${token.accessToken}`,
          },
          onStompError: (frame) => {
            console.log('ON ERROR', frame);
          },
          onConnect: () => {
            const { id } = JSON.parse(atob(token.accessToken.split('.')[1]));
            setCurrentUserId(id);
            console.log('Chat client connected, Current user Id is', id);
            client.subscribe(`/sub/user/${id}`, () => {});
            client.subscribe('/sub/init_chat', async (message) => {
              const chatRoomList = (await JSON.parse(message.body)) as ChatRooms;
              console.log('Init ChatROOMS', chatRoomList);
              setChatRooms(chatRoomList ?? []);
            });
          },
        });
        client.activate();
        setChatClient(client);
      }
    }
  }, [isAuthenticated, activateChatUserIds]);

  return {
    disclosure,
    chatClient,
    chatRooms,
    currentUserId,
    selectedChatRoomNo,
    selectChatRoom,
    exitChatRoom,
    handleUpdate,
    updateActivateChatUserIds,
  };
});
