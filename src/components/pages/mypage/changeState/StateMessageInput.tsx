import { IconButton, InputGroup, InputRightElement, Textarea } from '@chakra-ui/react';

import Message from '@/assets/icons/system/message.svg';

import type { TextareaProps } from '@chakra-ui/react';

export default function StateMessageInput(props: TextareaProps) {
  return (
    <InputGroup>
      <Textarea
        flex={1}
        variant="default"
        size="sm"
        pr="40px"
        onClick={(e) => {
          e.currentTarget.focus();
        }}
        {...props}
      />
      <InputRightElement p="10px">
        <IconButton width="20px" height="20px" aria-label="hide" color="gray600" icon={<Message />} />
      </InputRightElement>
    </InputGroup>
  );
}
