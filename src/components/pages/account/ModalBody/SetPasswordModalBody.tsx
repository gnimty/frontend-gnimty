import { ModalBody, VStack, Text, Button, useBoolean } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { patchPassword } from '@/apis/queries/setPasswordQuery';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';
import { passwordRegex } from '@/utils/regex';

import PasswordForm from './InputForm/PasswordForm';

export default function SetPasswordModalBody() {
  const searchParams = useSearchParams();
  const { onClose } = useAccountModalPageContext();
  const { mutateAsync: patchPasswordAsync } = useMutation({
    mutationFn: patchPassword,
  });
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showPasswordCheck, setShowPasswordCheck] = useBoolean(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const validAndSamePassword =
    passwordRegex.exec(password) && passwordRegex.exec(passwordCheck) && password === passwordCheck;
  const changePassword = async () => {
    const email = searchParams.get('email');
    const uuid = searchParams.get('uuid');
    if (validAndSamePassword && uuid && email) {
      await patchPasswordAsync({ email, password, uuid });
      onClose();
    }
  };
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
