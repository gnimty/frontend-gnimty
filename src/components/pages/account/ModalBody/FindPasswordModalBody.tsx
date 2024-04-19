import { ModalBody, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

import { type AuthEmailFormData, useAccountModalPageContext } from '@/contexts/AccountModalPageContext';

import AuthEmailForm from './InputForm/AuthEmailForm';

export default function FindPasswordModalBody() {
  const { setCurrentPage, onClose } = useAccountModalPageContext();
  const [emailFormData, setEmailFormData] = useState<AuthEmailFormData>({
    email: '',
    authCode: '',
    authState: 'PREPARE',
  });
  const handleNext = () => {
    setCurrentPage({ page: 'SET_PW' });
  };
  return (
    <ModalBody>
      <VStack w="full" gap="40px">
        <VStack gap="12px">
          <Text textStyle="h2" fontWeight="700">
            비밀번호 찾기
          </Text>
          <HStack gap="8px">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              그님티가 처음이신가요?
            </Text>
            <Text
              as="button"
              textStyle="t2"
              fontWeight="700"
              color="main"
              onClick={() => setCurrentPage({ page: 'SIGNUP' })}
            >
              회원가입 바로가기
            </Text>
          </HStack>
        </VStack>
        <VStack w="full" gap="24px">
          <AuthEmailForm type="FIND_PW" formData={emailFormData} setFormData={setEmailFormData} />
          <VStack w="full" gap="12px">
            <Button
              size="lg"
              variant="default"
              w="full"
              isDisabled={emailFormData.authState !== 'SUCCESS'}
              onClick={handleNext}
            >
              <Text>다 음</Text>
            </Button>
            <Button size="lg" variant="unstyled" w="full" border="1px solid" borderColor="gray200" onClick={onClose}>
              <Text>취소</Text>
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </ModalBody>
  );
}
