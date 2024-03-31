import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';

import image500 from '@/assets/images/500.png';
import CustomError from '@/components/pages/error/customError';

interface PageProps {
  error: unknown;
}
export default function Custom500({ error }: PageProps) {
  console.log(error);
  return (
    <>
      <Head>
        <title>500 Internal Server Error</title>
      </Head>
      <CustomError image={image500}>
        <Flex flexDir="column" alignItems="center">
          <Text fontWeight="700">페이지 접근에 문제가 발생했어요.</Text>
          <Text fontWeight="400">죄송합니다.</Text>
          <Text fontWeight="400">일부 데이터의 오류나 업데이트로 인해 페이지에 접근할 수 없습니다.</Text>
        </Flex>
      </CustomError>
    </>
  );
}
