import { Flex, Text } from '@chakra-ui/react';

import type { StackProps } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

interface ContentsContainerProps extends PropsWithChildren, StackProps {
  title: string;
}

export default function ContentsContainer({ title, children, ...props }: ContentsContainerProps) {
  return (
    <Flex direction="column" w="full" alignItems="center" position="relative" {...props}>
      <Text textStyle="t2" fontWeight="bold" alignSelf="flex-start" mb="12px">
        {title}
      </Text>
      {children}
    </Flex>
  );
}
