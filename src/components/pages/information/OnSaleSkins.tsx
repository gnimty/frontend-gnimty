import { Box, Center, Grid, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import type { SkinSaleRes } from '@/api/types';
import Rp from '@/assets/images/rp.svg';

export default function OnSaleSkins() {
  const onSaleSkins: SkinSaleRes[] = [
    {
      skinName: '전투사관학교 그레이브즈 교수님',
      originRp: 1350,
      discountedRp: 877,
      discountedRate: 35,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/104025.jpg',
    },
    {
      skinName: '필트오버 커스텀 블리츠크랭크',
      originRp: 1350,
      discountedRp: 975,
      discountedRate: 27,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/53004.jpg',
    },
    {
      skinName: '먹그림자 카이사',
      originRp: 1350,
      discountedRp: 975,
      discountedRate: 27,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/145048.jpg',
    },
    {
      skinName: '시바견 유미',
      originRp: 1350,
      discountedRp: 975,
      discountedRate: 27,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/350039.jpg',
    },
    {
      skinName: '깨진 언약 라칸',
      originRp: 1350,
      discountedRp: 975,
      discountedRate: 27,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/497027.jpg',
    },
    {
      skinName: '우주의 지배자 카사딘',
      originRp: 1350,
      discountedRp: 540,
      discountedRate: 60,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/38005.jpg',
    },
    {
      skinName: '범죄 도시 그레이브즈',
      originRp: 975,
      discountedRp: 390,
      discountedRate: 60,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/104003.jpg',
    },
    {
      skinName: '특수 부대 갱플랭크',
      originRp: 975,
      discountedRp: 487,
      discountedRate: 50,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/41005.jpg',
    },
    {
      skinName: '용 사냥꾼 올라프',
      originRp: 1350,
      discountedRp: 742,
      discountedRate: 45,
      skinImgUrl: 'https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/2016.jpg',
    },
  ];

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
                <Rp width={22} height={22} color="#c79a3b" />
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
