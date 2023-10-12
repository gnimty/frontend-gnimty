import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import {
  Box,
  Button,
  Center,
  Checkbox,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import Hide from '@/assets/icons/system/hide.svg';
import View from '@/assets/icons/system/view.svg';
import GoogleLoginButton from '@/components/common/buttons/GoogleLoginButton';
import KakaoLoginButton from '@/components/common/buttons/KakaoLoginButton';
import CheckboxIcon from '@/components/common/CheckboxIcon';

import type { InputProps } from '@chakra-ui/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginInput = (props: InputProps) => {
  return (
    <Input
      color="gray800"
      fontWeight="regular"
      borderWidth="1px"
      borderColor="gray300"
      _placeholder={{
        textStyle: 't2',
        fontWeight: 'regular',
        color: 'gray500',
      }}
      {...props}
    />
  );
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useBoolean(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="480px" pt="60px" pb="84px" backgroundColor="white">
          <ModalCloseButton top="24px" right="24px" />
          <ModalBody>
            <VStack w="full" spacing="40px">
              <VStack spacing="12px">
                <Text textStyle="h2">로그인</Text>
                <HStack spacing="8px">
                  <Text textStyle="t2" fontWeight="regular">
                    그님티가 처음이신가요?
                  </Text>
                  <Text as="button" textStyle="t2" fontWeight="bold" color="main">
                    회원가입 바로가기
                  </Text>
                </HStack>
              </VStack>

              <VStack spacing="20px" w="full">
                <VStack width="100%">
                  <LoginInput
                    type="email"
                    placeholder="이메일 주소를 입력해 주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroup>
                    <LoginInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 입력해 주세요."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <Center as="button" w="20px" h="20px" onClick={setShowPassword.toggle}>
                        {showPassword ? <Hide /> : <View />}
                      </Center>
                    </InputRightElement>
                  </InputGroup>
                </VStack>
                <HStack w="full" justifyContent="space-between">
                  <Checkbox
                    icon={<CheckboxIcon />}
                    colorScheme="main"
                    textStyle="body"
                    fontWeight="bold"
                    color="gray600"
                  >
                    로그인 상태 기억하기
                  </Checkbox>
                  <Text as="button" textStyle="body" fontWeight="bold" color="gray800">
                    비밀번호를 잊으셨나요?
                  </Text>
                </HStack>
                <Button w="full" h="48px" bg={email && password ? 'main' : 'gray200'} borderRadius="4px">
                  <Text textStyle="t2" fontWeight="bold" color={email && password ? 'white' : 'gray500'}>
                    로그인 하기
                  </Text>
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
        </ModalContent>
      </Modal>
    </>
  );
}
