import { ModalBody } from '@chakra-ui/modal';
import { Text, VStack } from '@chakra-ui/react';

export default function SignupSuccessModalBody() {
  return (
    <ModalBody>
      <VStack w="full">
        <Text>회원가입이 완료되었어요!</Text>
        <Text>마지막으로 라이엇 계정을 연동해 주세요.</Text>
        <Text>라이엇 계정 연동 시 더 많은 서비스를 이용할 수 있습니다.</Text>
      </VStack>
    </ModalBody>
  );
}
