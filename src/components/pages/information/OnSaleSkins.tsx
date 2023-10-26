import { Box, Center, Flex, Grid, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import skinSales from '@/api/mocks/skinSales';
import Rp from '@/assets/images/rp.svg';

export default function OnSaleSkins() {
  const onSaleSkins = skinSales;

  return (
    <Grid as="ul" gap="12px" templateColumns="repeat(3, 352px)">
      {onSaleSkins.map((skin) => (
        <VStack key={skin.skinName} as="li" gap="12px">
          <Box pos="relative" w="352px" h="200px">
            <Image src={skin.skinImgUrl} fill alt="" css={{ borderRadius: '8px' }} />
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
              -{skin.discountedRate}%
            </Center>
          </Box>
          <HStack w="352px" px="12px" justifyContent="space-between" gap="12px">
            <Box textStyle="t1" fontWeight="bold">
              {skin.skinName}
            </Box>
            <HStack gap="8px">
              <Box textStyle="t2" fontWeight="regular" color="gray500" textDecor="line-through">
                {skin.originRp}
              </Box>
              <HStack gap="4px">
                <Flex color="rp">
                  <Rp width={22} height={22} />
                </Flex>
                <Box textStyle="t1" fontWeight="bold" color="gray800">
                  {skin.discountedRp}
                </Box>
              </HStack>
            </HStack>
          </HStack>
        </VStack>
      ))}
    </Grid>
  );
}
