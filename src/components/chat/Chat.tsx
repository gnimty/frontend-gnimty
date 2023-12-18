import { Box, HStack } from '@chakra-ui/react';

import ChatLeft from '@/assets/icons/system/chatLeft.svg';
import ChatRight from '@/assets/icons/system/chatRight.svg';

import { type ChatInfo } from './CurrentChat';

function Chat({ type, message }: ChatInfo) {
  return (
    <HStack
      p="10px 16px"
      bgColor={type === 'incoming' ? 'gray100' : '#FDF4F5'}
      borderRadius="8px"
      position="relative"
      alignSelf={type === 'incoming' ? 'start' : 'end'}
    >
      {type === 'incoming' && (
        <Box position="absolute" top="20%" left="-8px">
          <ChatLeft width="8px" height="11px" />
        </Box>
      )}
      <Box textStyle="t2" color="gray800" fontWeight="400">
        {message}
      </Box>
      {type === 'outgoing' && (
        <Box position="absolute" top="20%" right="-8px">
          <ChatRight width="8px" height="11px" />
        </Box>
      )}
    </HStack>
  );
}

export default Chat;
