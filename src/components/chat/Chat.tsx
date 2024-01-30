import { Box, HStack } from '@chakra-ui/react';

import ChatLeft from '@/assets/icons/system/chatLeft.svg';
import ChatRight from '@/assets/icons/system/chatRight.svg';

import type { Chat as ChatInfo } from './types';

function Chat({ senderId, message, otherUserId }: ChatInfo & { otherUserId: string }) {
  return (
    <HStack
      p="10px 16px"
      bgColor={senderId === otherUserId ? 'gray100' : '#FDF4F5'}
      borderRadius="8px"
      position="relative"
      alignSelf={senderId === otherUserId ? 'start' : 'end'}
    >
      {senderId === otherUserId && (
        <Box position="absolute" top="20%" left="-8px">
          <ChatLeft width="8px" height="11px" />
        </Box>
      )}
      <Box textStyle="t2" color="gray800" fontWeight="400">
        {message}
      </Box>
      {senderId !== otherUserId && (
        <Box position="absolute" top="20%" right="-8px">
          <ChatRight width="8px" height="11px" />
        </Box>
      )}
    </HStack>
  );
}

export default Chat;
