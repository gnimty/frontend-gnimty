import { Flex } from '@chakra-ui/react';

import type { FlexProps } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

interface TagProps extends FlexProps, PropsWithChildren {
  type: 'level' | 'member';
}
export default function Tag({ type, children, ...props }: TagProps) {
  return type === 'level' ? (
    <Flex
      bg="gray800"
      borderRadius="20px"
      padding="1px 8px"
      textStyle="body"
      fontWeight={400}
      color="white"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Flex>
  ) : (
    <Flex
      bg="transparent"
      borderRadius="4px"
      padding="2px 4px"
      border="1px"
      borderColor="red800"
      textStyle="caption"
      fontWeight={400}
      color="red800"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Flex>
  );
}
