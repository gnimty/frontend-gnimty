// types for chat
import type { Status, Tier } from '@/apis/types';

export type MessageUserResponseType = 'READ_CHATS' | 'CHATROOM_INFO';

export type MessageChatRoomResponseType = 'USER_INFO' | 'CONNECT_STATUS' | 'CHAT_MESSAGE';

export type MessageRequestType = 'CHAT' | 'EXIT' | 'READ';

export type ChatRooms = ChatRoom[];

export interface User {
  userId: string;
  summonerName: string;
  tier: Tier;
  division: number;
  iconId: string;
  status: Status;
}

export interface UserConnStatus {
  userId: string;
  connStatus: Status;
}

export interface ChatRoom {
  chatRoomNo: number;
  lastModified: string; // date
  otherUser: User;
  chats: Chat[];
}

export interface Chat {
  senderId: string;
  message: string;
  sendDate: string; // date
  readCount: 0 | 1;
}

// /sub/init_chat - 채팅방 목록 가져오기
export interface InitChatBody {
  chatRoomList: Array<ChatRoom>;
}
