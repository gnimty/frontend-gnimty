import { ModalBody, VStack, Text, Button, useBoolean } from '@chakra-ui/react';
import { useState } from 'react';

import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';
import { passwordRegex } from '@/utils/regex';

import PasswordForm from './InputForm/PasswordForm';

export default function SetPasswordModalBody() {
  const { onClose } = useAccountModalPageContext();
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showPasswordCheck, setShowPasswordCheck] = useBoolean(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const validAndSamePassword =
    passwordRegex.exec(password) && passwordRegex.exec(passwordCheck) && password === passwordCheck;
  //   TODO: 비밀번호 변경 api 변경 요청 - 현재 비밀번호 + 신규 비밀번호가 아닌 신규 + 신규 확인
  const changePassword = () => {};
  return (
    <ModalBody>
      <VStack w="full" gap="40px">
        <VStack gap="12px">
          <Text textStyle="h2" fontWeight="700">
            비밀번호 찾기
          </Text>
        </VStack>
        <VStack w="full" gap="24px">
          <PasswordForm
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <PasswordForm
            password={passwordCheck}
            setPassword={setPasswordCheck}
            showPassword={showPasswordCheck}
            setShowPassword={setShowPasswordCheck}
            placeholder="비밀번호를 다시 입력해 주세요."
          />
          <Button
            size="lg"
            variant="default"
            w="full"
            isDisabled={validAndSamePassword !== true}
            onClick={changePassword}
          >
            <Text>확인</Text>
          </Button>
          <Button size="lg" variant="unstyled" w="full" border="1px solid" borderColor="gray200" onClick={onClose}>
            <Text>취소</Text>
          </Button>
        </VStack>
      </VStack>
    </ModalBody>
  );
}
