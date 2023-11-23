import { ModalBody } from '@chakra-ui/modal';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import bee from '@/assets/images/bee.png';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';

export default function SignupSuccessModalBody() {
  const { onClose } = useAccountModalPageContext();

  return (
    <ModalBody height="604px" display="flex" flexDirection="column" justifyContent="space-between" flex="">
      <Box h="16px" />
      <VStack w="full" alignSelf="center">
        <Image src={bee} alt="" width={160} height={160} />
        <VStack mt="24px" gap="4px" textStyle="h3" fontWeight="bold">
          <Text>회원가입이 완료되었어요!</Text>
          <Text>마지막으로 라이엇 계정을 연동해 주세요.</Text>
        </VStack>
        <Text mt="8px" textStyle="t2" fontWeight="400">
          라이엇 계정 연동 시 더 많은 서비스를 이용할 수 있습니다.
        </Text>
        <Button mt="40px" variant="default" size="lg" w="160px">
          계정 연동하기
        </Button>
      </VStack>
      <Text as="button" textStyle="body" fontWeight={400} color="gray700" onClick={onClose}>
        나중에 하기
      </Text>
    </ModalBody>
  );
}
