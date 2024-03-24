import { Box, HStack, Heading, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import rotationChampionsQuery from '@/apis/queries/rotationChampionsQuery';
import championIconUrl from '@/apis/utils/championIconUrl';
import ChampionIcon from '@/components/common/ChampionIcon';

export default function RotationChampions() {
  const { data, status } = useQuery(rotationChampionsQuery());

  if (status !== 'success') {
    return;
  }

  return (
    <VStack as="article" gap="24px">
      <Heading as="h2" textStyle="t2" fontWeight="bold">
        이번주 로테이션 챔피언
      </Heading>
      <HStack as="ul" gap="16px" w="1040px" flexWrap="wrap" justifyContent="center">
        {data.data.champions.map((champ) => (
          <VStack key={champ.championId} as="li" gap="4px">
            <ChampionIcon championEnName={champ.enName} width={80} height={80} radius={40} />
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
