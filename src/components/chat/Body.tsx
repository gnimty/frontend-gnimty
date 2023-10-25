import { HStack } from '@chakra-ui/react';
import ChatList from './ChatList';

function Body() {
  return (
    <HStack w="100%" h="100%" justify="space-between">
      <ChatList />
    </HStack>
  );
}

export default Body;
