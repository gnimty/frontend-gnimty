import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import type { StaticImageData } from 'next/image';
import type { PropsWithChildren } from 'react';

interface CustomErrorProps extends PropsWithChildren {
  image: StaticImageData;
}
export default function CustomError({ image, children }: CustomErrorProps) {
  return (
    <Flex m="160px auto" w="1080px" flexDir="column" gap="40px" alignItems="center">
      <Image src={image} alt="404" />
      <Flex flexDir="column" mt="24px" textStyle="t1" color="gray500" lineHeight="22px" alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
}
