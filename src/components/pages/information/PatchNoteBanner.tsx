import { Box, Heading, Link, VStack } from '@chakra-ui/react';

export default function PatchNoteBanner() {
  const data = {
    version: '13.19.1',
    releaseNoteUrl: 'https://www.leagueoflegends.com/ko-kr/news/game-updates/patch-13-19-notes/',
    releaseNoteImgUrl:
      'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0cfea10deca29f0e/64e7e07cf1ac3dc86df8ff19/2023-Key-Art.jpg',
  };

  const majorMinorVersion = data.version.split('.').slice(0, 2).join('.');

  return (
    <Link
      href={data.releaseNoteUrl}
      display="block"
      w="1080px"
      h="320px"
      pos="relative"
      borderRadius="8px"
      background={`linear-gradient(0deg, rgb(0 0 0 / .4) 0%, rgb(0 0 0 / .4) 100%), url('${data.releaseNoteImgUrl}') no-repeat center/cover, lightgray`}
      textDecor="none"
    >
      <VStack w="full" h="full" gap="12px" justifyContent="center">
        <Heading as="h2" color="white" textStyle="h2" fontWeight="bold">
          {majorMinorVersion} 패치노트
        </Heading>
        <Box
          textStyle="t2"
          fontWeight="bold"
          color="white"
          p="10px 12px"
          border="1px solid"
          borderColor="gray200"
          borderRadius="4px"
        >
          패치노트 보러가기
        </Box>
      </VStack>
    </Link>
  );
}
