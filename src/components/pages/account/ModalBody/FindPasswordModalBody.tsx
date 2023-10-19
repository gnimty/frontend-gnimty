import { ModalBody } from '@chakra-ui/modal';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import useAuthEmail from '@/apis/useAuthEmail';
import AccountInput from '@/components/pages/account/AccountInput';
import type { AuthStateType } from '@/components/pages/account/ModalBody/SignupModalBody';
import { secondsFormatter } from '@/components/pages/account/ModalBody/SignupModalBody';
import { useTimer } from '@/hooks/useTimer';
import { emailRegex } from '@/utils/regex';

export default function FindPasswordModalBody() {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authState, setAuthState] = useState<AuthStateType>('PREPARE');

  const { seconds, start, reset, running, stop } = useTimer({ initialSeconds: 10, callback: () => alert('hi') });

  const { authEmail } = useAuthEmail({
    onSuccess: () => {
      setAuthState('WAITING');
      if (running) stop();
      reset();
      start();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onAuthEmail = () => {
    if (!email) return;
    if (!emailRegex.exec(email)) return;
    authEmail({
      email,
    });
  };

  return (
    <ModalBody>
      <VStack w="full" gap="40px">
        <Text textStyle="h2" color="gray800">
          비밀번호 찾기
        </Text>
        <VStack w="full" gap="24px">
          <VStack w="full" gap="8px">
            <AccountInput
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              value={email}
              isInvalid={email === '' || !emailRegex.exec(email)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <HStack w="full" gap="8px">
              <AccountInput
                w="full"
                placeholder="인증번호를 입력해 주세요."
                isDisabled={authState != 'WAITING'}
                value={authCode}
                isInvalid={authState == 'WAITING' && authCode == ''}
                onChange={(e) => setAuthCode(e.target.value)}
              />
              {authState == 'PREPARE' && (
                <Button size="lg" minW="160px" h="48px" borderRadius="4px" bg="gray200">
                  <Text>인증하기</Text>
                </Button>
              )}
              {authState == 'READY' && (
                <Button minW="160px" h="48px" borderRadius="4px" bg="main" onClick={onAuthEmail}>
                  <Text textStyle="t2" fontWeight="bold" color="white">
                    인증하기
                  </Text>
                </Button>
              )}
              {authState == 'WAITING' && (
                <Button minW="160px" h="48px" borderRadius="4px" bg="gray200">
                  <Text textStyle="t2" fontWeight="bold" color="gray500">
                    {secondsFormatter(seconds)}
                  </Text>
                </Button>
              )}
              {authState == 'SUCCESS' && (
                <Button minW="160px" h="48px" borderRadius="4px" bg="blue800">
                  <Text textStyle="t2" fontWeight="bold" color="white">
                    인증완료
                  </Text>
                </Button>
              )}
            </HStack>
            <HStack w="full" gap="4px" textStyle="body">
              <Text fontWeight="400" color="gray700">
                메일이 오지 않았나요?
              </Text>
              <Text as="button" fontWeight="700" color="gray800">
                인증메일 재발송
              </Text>
            </HStack>
          </VStack>
          <VStack>
            <Button>다음</Button>
          </VStack>
        </VStack>
      </VStack>
    </ModalBody>
  );
}
