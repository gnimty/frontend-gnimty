import { Button, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';

import imageRankingError from '@/assets/images/ranking-error.png';
import CustomError from '@/components/pages/error/customError';

export default function CustomRankingError() {
  return (
    <>
      <Head>
        <title>소환사 랭킹</title>
      </Head>
      <CustomError image={imageRankingError}>
        <Flex flexDir="column" alignItems="center">
          <Text fontWeight="700">아직 랭킹 데이터가 없어요.</Text>
          <Text fontWeight="400">시즌 초기화 또는 서버 내부 오류 등으로 소환사 랭킹 데이터가 존재하지 않습니다.</Text>
        </Flex>
        <Button variant="default" size="md" w="80px" bg="gray800" mt="24px">
          문의하기
        </Button>
      </CustomError>
    </>
  );
}
