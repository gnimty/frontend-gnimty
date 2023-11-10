import { VStack } from '@chakra-ui/react';
import ChatInput from './ChatInput';

function CurrentChat() {
  return (
    <VStack w="100%" h="100%" justify="space-between">
      {/* if user exists */}

      <ChatInput />
    </VStack>
  );
}

export default CurrentChat;
