import { StackDivider, VStack } from '@chakra-ui/react';
import Header from './Header';
import Body from './Body';

interface ChatFrameProps {
  closeChat: () => void;
}

function ChatFrame(props: ChatFrameProps) {
  return (
    <VStack
      w="660px"
      h="520px"
      borderRadius="8px"
      divider={<StackDivider borderColor="gray100" />}
      spacing="1px"
      bgColor="white"
    >
      <Header closeChat={props.closeChat} />
      <Body />
    </VStack>
  );
}

export default ChatFrame;
