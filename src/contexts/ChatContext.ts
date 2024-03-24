import { useDisclosure } from '@chakra-ui/react';
import { Client } from '@stomp/stompjs';
import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';

import useGetMyInfo from '@/apis/useGetMyInfo';
import type { Chat, ChatRoom, ChatRooms, DataType, UpdateActions, User, UserConnStatus } from '@/components/chat/types';

export const [ChatContextProvider, useChatContext] = constate(() => {
  const myInfo = useGetMyInfo();
  const disclosure = useDisclosure();
  const [chatClient, setChatClient] = useState<Client | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRooms>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [activateChatUserIds, setActivateChatUserIds] = useState<number[]>([]);
  const [selectedChatRoomNo, setSelectedChatRoomNo] = useState<number | null>(null);

  const updateActivateChatUserIds = (userId: number, type: 'ADD' | 'REMOVE') => {
    switch (type) {
      case 'ADD':
        setActivateChatUserIds((prev) => [...prev, userId]);
        break;
      case 'REMOVE':
        setActivateChatUserIds((prev) => prev.filter((id) => id !== userId));
        break;
      default:
        break;
    }
  };

  const handleUpdate = useCallback(
    <T extends UpdateActions>(type: T, data: DataType<T>) => {
      switch (type) {
        case 'READ_CHATS':
          setChatRooms((prev) => {
            const index = prev.findIndex((chatRoom) => chatRoom.otherUser.userId === (data as string));
            if (index === -1) return prev;
            const newChatRooms = [...prev];
            newChatRooms[index].chats = newChatRooms[index].chats.map((chat) => ({ ...chat, readCount: 0 }));
            return newChatRooms;
          });
          break;
        case 'CHATROOM_INFO':
          setChatRooms((prev) => {
            const index = prev.findIndex((chatRoom) => chatRoom.chatRoomNo === (data as ChatRoom).chatRoomNo);
            const newChatRooms = [...prev];
            if (index === -1) {
              newChatRooms.push(data as ChatRoom);
            } else {
              newChatRooms[index] = data as ChatRoom;
            }
            return newChatRooms;
          });
          break;
        case 'USER_INFO':
          setChatRooms((prev) => {
            const index = prev.findIndex((chatRoom) => chatRoom.otherUser.userId === (data as User).userId);
            if (index === -1) return prev;
            const newChatRooms = [...prev];
            newChatRooms[index].otherUser = data as User;
            return newChatRooms;
          });
          break;
        case 'CONNECT_STATUS':
          setChatRooms((prev) => {
            const index = prev.findIndex((chatRoom) => chatRoom.otherUser.userId === (data as UserConnStatus).userId);
            if (index === -1) return prev;
            const newChatRooms = [...prev];
            newChatRooms[index].otherUser.status = (data as UserConnStatus).connStatus;
            return newChatRooms;
          });
          break;
        case 'CHAT_MESSAGE':
          setChatRooms((prev) => {
            const currentChatRoomNo = selectedChatRoomNo;
            if (currentChatRoomNo === null) return prev;
            const index = prev.findIndex((chatRoom) => chatRoom.chatRoomNo === currentChatRoomNo);
            if (index === -1) return prev;
            const newChatRooms = [...prev];
            if (newChatRooms[index].chats.some((chat) => chat.sendDate === (data as Chat).sendDate)) return prev;
            newChatRooms[index].chats = [...newChatRooms[index].chats, data as Chat];
            return newChatRooms;
          });
      }
    },
    [selectedChatRoomNo],
  );

  const selectChatRoom = (chatRoomNo: number) => {
    setSelectedChatRoomNo(chatRoomNo);
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
    setChatRooms((prev) => prev.filter((chatRoom) => chatRoom.chatRoomNo !== chatRoomNo));
    setSelectedChatRoomNo(null);
  };

  useEffect(() => {
    if (myInfo === undefined) {
      return;
    }
    if (myInfo !== undefined) {
      const currentUserId = myInfo.id;
      if (currentUserId) {
        const client = new Client({
          brokerURL: 'wss://gnimty.kro.kr/community/chat',
          connectHeaders: {
            'accept-version': '1.2',
          },
          onStompError: (frame) => {
            console.log('ON ERROR', frame);
          },
          onConnect: () => {
            setCurrentUserId(currentUserId);
            console.log('Chat client connected, Current user Id is', currentUserId);
            client.subscribe(`/sub/user/${currentUserId}`, () => {});
            client.subscribe('/sub/init_chat', (message) => {
              const chatRoomList = JSON.parse(message.body) as ChatRooms;
              console.log('Init ChatROOMS', chatRoomList);
              setChatRooms(chatRoomList ?? []);
            });
          },
        });
        client.activate();
        setChatClient(client);

        return () => {
          client.deactivate();
          setChatClient(null);
        };
      }
    }
  }, [myInfo]);

  useEffect(() => {
    if (myInfo === undefined && chatClient) {
      chatClient.deactivate();
      setChatClient(null);
    }
  }, [myInfo, chatClient]);

  useEffect(() => {
    activateChatUserIds.forEach((userId) => {
      chatClient?.subscribe(`/sub/user/${userId}`, (message) => {
        const body = JSON.parse(message.body) as { type: UpdateActions; data: DataType<UpdateActions> };
        handleUpdate(body.type, body.data);
      });
    });
  }, [activateChatUserIds, chatClient, handleUpdate]);

  useEffect(() => {
    if (selectedChatRoomNo !== null) {
      chatClient?.publish({
        destination: `/pub/chatRoom/${selectedChatRoomNo}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'READ',
        }),
      });
      chatClient?.subscribe(`/sub/chatRoom/${selectedChatRoomNo}`, (message) => {
        const body = JSON.parse(message.body) as { type: UpdateActions; data: DataType<UpdateActions> };
        handleUpdate(body.type, body.data);
      });
    }
  }, [selectedChatRoomNo, chatClient, handleUpdate]);

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
