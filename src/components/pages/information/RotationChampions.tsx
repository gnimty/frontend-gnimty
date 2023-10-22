import { Box, HStack, Heading, VStack } from '@chakra-ui/react';
import Image from 'next/image';

export default function RotationChampions() {
  const champions: { image: string; name: string }[] = [
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Ahri.png',
      name: '아리',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/TwistedFate.png',
      name: '트위스티드 페이트',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/MasterYi.png',
      name: '마스터 이',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Nunu.png',
      name: '누누와 윌럼프',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/AurelionSol.png',
      name: '아우렐리온 솔',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Shen.png',
      name: '쉔',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/JarvanIV.png',
      name: '자르반 4세',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Tryndamere.png',
      name: '트린다미어',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/XinZhao.png',
      name: '신 짜오',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Nasus.png',
      name: '나서스',
    },
  ];

  return (
    <VStack as="article" gap="24px">
      <Heading as="h2" textStyle="t2" fontWeight="bold">
        이번주 로테이션 챔피언
      </Heading>
      <HStack as="ul" gap="16px">
        {champions.map((champ) => (
          <VStack key={champ.name} as="li" gap="4px">
            <Image src={champ.image} alt="" width={80} height={80} css={{ borderRadius: '9999px' }} />
            <Box w="80px" textStyle="t2" fontWeight="normal" textAlign="center">
              {champ.name}
            </Box>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
