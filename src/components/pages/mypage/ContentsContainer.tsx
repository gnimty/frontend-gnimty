import { Text, VStack } from '@chakra-ui/react';

import type { PropsWithChildren } from 'react';

interface ContentsContainerProps extends PropsWithChildren {
  title: string;
}

export default function ContentsContainer({ title, children }: ContentsContainerProps) {
  return (
    <VStack className="contents-container" w="full" alignItems="center" mt="24px">
      <Text textStyle="t2" fontWeight="bold" alignSelf="flex-start" mb="12px">
        {title}
      </Text>
      {children}
    </VStack>
  );
}
