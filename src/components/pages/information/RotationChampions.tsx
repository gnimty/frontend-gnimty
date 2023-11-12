import { Box, HStack, Heading, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import champions from '@/apis/mocks/champions';

export default function RotationChampions() {
  const rotationChamps = champions.slice(0, 10);

  return (
    <VStack as="article" gap="24px">
      <Heading as="h2" textStyle="t2" fontWeight="bold">
        이번주 로테이션 챔피언
      </Heading>
      <HStack as="ul" gap="16px">
        {rotationChamps.map((champ) => (
          <VStack key={champ.championId} as="li" gap="4px">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champ.enName}.png`}
              alt=""
              width={80}
              height={80}
              css={{ borderRadius: '9999px' }}
            />
            <Box
              w="80px"
              textStyle="t2"
              fontWeight="normal"
              textAlign="center"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {champ.krName}
            </Box>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
