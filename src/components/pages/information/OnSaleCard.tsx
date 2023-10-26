import { Box, Center, Flex, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import Ip from '@/assets/images/ip.svg';
import Rp from '@/assets/images/rp.svg';

import type { StackProps } from '@chakra-ui/react';

interface OnSaleCardProps extends StackProps {
  name: string;
  imgUrl: string;
  originRp: number;
  discountedRp: number;
  discountedRate: number;
  originIp?: number;
}

export default function OnSaleCard(props: OnSaleCardProps) {
  const { name, imgUrl, originRp, discountedRp, discountedRate, originIp, ...restProps } = props;

  return (
    <VStack gap="12px" {...restProps}>
      <Box pos="relative" w="352px" h="200px">
        <Image src={imgUrl} fill alt="" css={{ borderRadius: '8px' }} />
        <Center
          pos="absolute"
          top="12px"
          right="12px"
          w="48px"
          h="48px"
          bg="rgb(222 46 57 / .6)"
          border="1px solid"
          borderColor="main"
          borderRadius="9999px"
          textStyle="t2"
          fontWeight="bold"
          color="white"
        >
          -{discountedRate}%
        </Center>
      </Box>
      <HStack w="352px" px="12px" justifyContent="space-between" gap="12px">
        <Box textStyle="t1" fontWeight="bold">
          {name}
        </Box>
        <HStack gap="8px">
          <Box textStyle="t2" fontWeight="regular" color="gray500" textDecor="line-through">
            {originRp}
          </Box>
          <HStack gap="4px">
            <Flex color="rp">
              <Rp width={22} height={22} />
            </Flex>
            <Box textStyle="t1" fontWeight="bold" color="gray800">
              {discountedRp}
            </Box>
          </HStack>
          {originIp !== undefined ? (
            <HStack gap="4px">
              <Flex color="ip">
                <Ip width={22} height={22} />
              </Flex>
              <Box textStyle="t1" fontWeight="bold" color="gray800">
                {originIp}
              </Box>
            </HStack>
          ) : null}
        </HStack>
      </HStack>
    </VStack>
  );
}
