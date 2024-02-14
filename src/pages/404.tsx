import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';

import image404 from '@/assets/images/404.png';
import CustomError from '@/components/pages/error/customError';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <CustomError image={image404}>
        <Flex flexDir="column" alignItems="center">
          <Text fontWeight="700">소환사님이 찾고 있는 페이지가 아니에요.</Text>
          <Text fontWeight="400">올바른 URL을 입력하였는지 확인해 주세요.</Text>
          <Text fontWeight="400">자세한 내용은 그님티 팀으로 문의하시기 바랍니다.</Text>
        </Flex>
      </CustomError>
    </>
  );
}
