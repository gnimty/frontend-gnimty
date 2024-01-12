import { HStack } from '@chakra-ui/react';

import ChatList from './ChatList';
import CurrentChat from './CurrentChat';

function Body() {
  return (
    <HStack w="full" h="464px" justify="space-between" spacing="0">
      <ChatList />
      <CurrentChat />
    </HStack>
  );
}

export default Body;
