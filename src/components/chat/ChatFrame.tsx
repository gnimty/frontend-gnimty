import { StackDivider, VStack } from '@chakra-ui/react';

import Body from './Body';
import Header from './Header';

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
      position="absolute"
      right="10%"
      bottom="calc(10% + 52px)"
      boxShadow="0px 4px 8px 0px rgba(17, 17, 17, 0.10)"
    >
      <Header closeChat={props.closeChat} />
      <Body />
    </VStack>
  );
}

export default ChatFrame;
