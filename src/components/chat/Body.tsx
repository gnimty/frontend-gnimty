import { HStack, StackDivider } from '@chakra-ui/react';
import ChatList from './ChatList';
import CurrentChat from './CurrentChat';

function Body() {
  return (
    <HStack
      w="100%"
      h="100%"
      justify="space-between"
      gap="0"
      divider={<StackDivider borderColor="gray100" />}
      spacing="1px"
    >
      <ChatList />
      <CurrentChat />
    </HStack>
  );
}

export default Body;
