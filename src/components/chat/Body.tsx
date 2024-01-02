import { HStack } from '@chakra-ui/react';

import ChatList from './ChatList';
import CurrentChat from './CurrentChat';

function Body() {
  return (
    <HStack w="100%" h="100%" justify="space-between">
      <ChatList />
      <CurrentChat />
    </HStack>
  );
}

export default Body;
