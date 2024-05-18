import { IconButton, InputGroup, InputRightElement, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

import Message from '@/assets/icons/system/message.svg';

import type { TextareaProps } from '@chakra-ui/react';

export default function StateMessageInput(props: TextareaProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <InputGroup>
      <Textarea isDisabled={isDisabled} flex={1} variant="default" size="sm" pr="40px" {...props} />
      <InputRightElement p="10px">
        <IconButton
          width="20px"
          height="20px"
          aria-label="hide"
          color="gray600"
          icon={<Message />}
          onClick={() => {
            setIsDisabled(false);
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
}
