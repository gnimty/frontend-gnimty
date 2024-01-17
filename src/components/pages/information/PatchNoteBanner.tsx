import { Box, Heading, Link, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import releaseInformationQuery from '@/apis/queries/releaseInformationQuery';

export default function PatchNoteBanner() {
  const { data, status } = useQuery(releaseInformationQuery());

  if (status !== 'success') {
    return;
  }

  const majorMinorVersion = data.data.version.replace(/\.\d+$/, '');

  return (
    <Link
      href={data.data.releaseNoteUrl}
      target="_blank"
      rel="noreferrer noopener"
      display="block"
      w="1080px"
      h="320px"
      pos="relative"
      borderRadius="8px"
      background={`linear-gradient(0deg, rgb(0 0 0 / .4) 0%, rgb(0 0 0 / .4) 100%), url('${data.data.releaseNoteImgUrl}') no-repeat center/cover, lightgray`}
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
