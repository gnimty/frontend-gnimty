import { HStack } from '@chakra-ui/react';

import { useChatContext } from '@/contexts/ChatContext';

import ChatList from './ChatList';
import CurrentChat from './CurrentChat';

function Body() {
  const { selectedChatRoomNo } = useChatContext();
  return (
    <HStack w="full" h="464px" justify="space-between" spacing="0">
      <ChatList />
      {selectedChatRoomNo && <CurrentChat />}
      {/* if not selected */}
    </HStack>
  );
}

export default Body;
