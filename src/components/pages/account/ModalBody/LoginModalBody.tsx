import { ModalBody } from '@chakra-ui/modal';
import {
  Box,
  Button,
  Checkbox,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';

import useLogin from '@/apis/useLogin';
import Check from '@/assets/icons/system/check.svg';
import Hide from '@/assets/icons/system/hide.svg';
import View from '@/assets/icons/system/view.svg';
import GoogleLoginButton from '@/components/common/buttons/GoogleLoginButton';
import KakaoLoginButton from '@/components/common/buttons/KakaoLoginButton';
import AccountInput from '@/components/pages/account/AccountInput';
import { PageContext } from '@/components/pages/account/AccountModal';
import { emailRegex } from '@/utils/regex';

export default function LoginModalBody() {
  const [showPassword, setShowPassword] = useBoolean(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const pageContext = useContext(PageContext);
  const { setCurrentPage } = pageContext;

  const { login } = useLogin({
    onSuccess: (response) => {
      console.log(response);
      console.log(response.data.accessToken);
    },
    onError: (error) => {},
  });

  const onLogin = () => {
    if (!emailRegex.exec(email)) return;
    login({
      email,
      password,
    });
  };

  return (
    <ModalBody>
      <VStack w="full" spacing="40px">
        <VStack spacing="12px">
          <Text textStyle="h2" color="gray800">
            로그인
          </Text>
          <HStack spacing="8px">
            <Text textStyle="t2" fontWeight="regular">
              그님티가 처음이신가요?
            </Text>
            <Text
              as="button"
              textStyle="t2"
              fontWeight="bold"
              color="main"
              onClick={() => setCurrentPage({ page: 'SIGNUP' })}
            >
              회원가입 바로가기
            </Text>
          </HStack>
        </VStack>

        <VStack spacing="20px" w="full">
          <VStack width="100%">
            <AccountInput
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup variant="outline">
              <AccountInput
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  w="20px"
                  h="20px"
                  onClick={setShowPassword.toggle}
                  aria-label="hide"
                  color="gray600"
                  icon={showPassword ? <Hide /> : <View />}
                />
              </InputRightElement>
            </InputGroup>
          </VStack>
          <HStack w="full" justifyContent="space-between">
            <Checkbox icon={<Check />} colorScheme="main" textStyle="body" fontWeight="bold" color="gray600">
              로그인 상태 기억하기
            </Checkbox>
            <Text
              as="button"
              textStyle="body"
              fontWeight="bold"
              color="gray800"
              onClick={() => setCurrentPage({ page: 'FIND_PW' })}
            >
              비밀번호를 잊으셨나요?
            </Text>
          </HStack>
          <Button
            variant="default"
            size="lg"
            w="full"
            isDisabled={!emailRegex.exec(email) || password == ''}
            onClick={onLogin}
          >
            <Text>로그인 하기</Text>
          </Button>
        </VStack>

        <HStack gap="12px" justifyContent="space-between">
          <Box width="162px" height="1px" bg="gray300" />
          <Text width="52px" align="center" textStyle="body" fontWeight="regular" color="gray400">
            또는
          </Text>
          <Box width="162px" height="1px" bg="gray300" />
        </HStack>

        <VStack w="full" spacing="12px">
          <KakaoLoginButton w="full" h="48px" />
          <GoogleLoginButton w="full" h="48px" />
        </VStack>
      </VStack>
    </ModalBody>
  );
}
