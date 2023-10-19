import { ModalBody } from '@chakra-ui/modal';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';

import useAuthEmail from '@/apis/useAuthEmail';
import useCheckAuthCode from '@/apis/useCheckAuthCode';
import useSignUp from '@/apis/useSignUp';
import Check from '@/assets/icons/system/check.svg';
import Hide from '@/assets/icons/system/hide.svg';
import View from '@/assets/icons/system/view.svg';
import IconGoogle from '@/components/icons/IconGoogle';
import IconKakao from '@/components/icons/IconKakao';
import AccountInput from '@/components/pages/account/AccountInput';
import { PageContext } from '@/components/pages/account/AccountModal';
import { termsList } from '@/constants/termsList';
import { useTimer } from '@/hooks/useTimer';
import { authCodeRegex, emailRegex, passwordRegex } from '@/utils/regex';

import type { CheckboxProps } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';

import submit = Simulate.submit;

const TermsCheckbox = (props: CheckboxProps) => {
  return (
    <Checkbox
      icon={<Check />}
      w="full"
      h="40px"
      p="8px 12px"
      justifyContent="space-between"
      flexDirection="row-reverse"
      {...props}
    />
  );
};

export type AuthStateType =
  | 'PREPARE' // 이메일 입력 전
  | 'READY' // 이메일 입력 완료
  | 'WAITING' // 인증번호 발송 후 입력 대기
  | 'AUTH_FAIL' // 인증번호 불일치
  | 'SUCCESS'; // 인증 완료

export interface SignupFormData {
  email: string;
  authCode: string;
  authState: AuthStateType;
  password: string;
  checkedItems: boolean[];
}

export const secondsFormatter = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

const MAIL_SEND_CHECK_TIME = 170 as const;

export default function SignupModalBody() {
  const pageContext = useContext(PageContext);
  const { currentPage, setCurrentPage } = pageContext;

  const [showPassword, setShowPassword] = useBoolean(false);
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authState, setAuthState] = useState<AuthStateType>('PREPARE');
  const [password, setPassword] = useState('');
  const [checkedItems, setCheckedItems] = useState(termsList.map(() => false));

  const allChecked = checkedItems.every(Boolean);

  useEffect(() => {
    setEmail(currentPage.signupFormData?.email ?? '');
    setAuthCode(currentPage.signupFormData?.authCode ?? '');
    setAuthState(currentPage.signupFormData?.authState ?? 'PREPARE');
    setPassword(currentPage.signupFormData?.password ?? '');
    setCheckedItems(currentPage.signupFormData?.checkedItems ?? termsList.map(() => false));
  }, [currentPage.page, currentPage.signupFormData]);

  const authTimeout = () => {
    console.log('auth timeout');
  };

  const { seconds, start, reset, running, stop } = useTimer({ initialSeconds: 180, callback: authTimeout });

  useEffect(() => {
    setAuthState(emailRegex.exec(email) ? 'READY' : 'PREPARE');
  }, [email]);

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

  const { checkAuthCode } = useCheckAuthCode({
    onSuccess: (response) => {
      setAuthState('SUCCESS');
    },
    onError: (error) => {
      setAuthState('AUTH_FAIL');
    },
  });
  const onChangeAuthCode = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);

    if (!emailRegex.exec(email) || !authCodeRegex.exec(e.target.value)) return;
    checkAuthCode({
      email,
      code: e.target.value,
    });
  };

  const { signUp } = useSignUp({
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const formCheck =
    authState === 'SUCCESS' &&
    emailRegex.exec(email) &&
    passwordRegex.exec(password) &&
    authCodeRegex.exec(authCode) &&
    checkedItems.every(Boolean);

  const submitForm = () => {
    if (!formCheck) return;

    signUp({
      email,
      password,
      agreeTerms: checkedItems.every(Boolean),
    });
  };

  return (
    <ModalBody>
      <VStack w="full" gap="40px">
        <VStack gap="12px">
          <Text textStyle="h2" color="gray800">
            회원가입
          </Text>
          <HStack gap="8px">
            <Text textStyle="t2" fontWeight="400">
              이미 회원이신가요?
            </Text>
            <Text
              as="button"
              textStyle="t2"
              fontWeight="bold"
              color="main"
              onClick={() => setCurrentPage({ page: 'LOGIN' })}
            >
              로그인 바로가기
            </Text>
          </HStack>
        </VStack>
        <VStack w="full" gap="24px">
          <VStack w="full" gap="8px">
            <AccountInput
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              value={email}
              isDisabled={authState === 'SUCCESS'}
              isInvalid={email === '' || !emailRegex.exec(email)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <HStack w="full" gap="8px">
              <AccountInput
                w="full"
                placeholder="인증번호를 입력해 주세요."
                value={authCode}
                maxLength={6}
                isDisabled={authState !== 'WAITING' && authState !== 'AUTH_FAIL'}
                isInvalid={(authState === 'WAITING' && !authCodeRegex.exec(authCode)) || authState === 'AUTH_FAIL'}
                onChange={onChangeAuthCode}
              />
              <Button
                variant="default"
                size="lg"
                minW="160px"
                isDisabled={authState !== 'READY'}
                bg={authState !== 'SUCCESS' ? 'main' : 'blue800 !important'}
                onClick={onAuthEmail}
              >
                <Text color={authState === 'SUCCESS' ? 'white' : 'inherit'}>
                  {authState === 'PREPARE' || authState === 'READY'
                    ? '인증하기'
                    : authState === 'WAITING' || authState === 'AUTH_FAIL'
                    ? secondsFormatter(seconds)
                    : '인증완료'}
                </Text>
              </Button>
            </HStack>
            <HStack w="full" gap="4px" textStyle="body">
              {authState === 'WAITING' && seconds < MAIL_SEND_CHECK_TIME && (
                <>
                  <Text fontWeight="400" color="gray700">
                    메일이 오지 않았나요?
                  </Text>
                  <Text as="button" fontWeight="700" color="gray800">
                    인증메일 재발송
                  </Text>
                </>
              )}
              {authState === 'AUTH_FAIL' && (
                <>
                  <Text fontWeight="400" color="gray700">
                    인증번호가 일치하지 않습니다.
                  </Text>
                  <Text as="button" fontWeight="700" color="gray800">
                    인증메일 재발송
                  </Text>
                </>
              )}
              {authState === 'SUCCESS' && (
                <Text textStyle="body" fontWeight="400" color="blue800">
                  인증이 완료되었습니다!
                </Text>
              )}
            </HStack>
          </VStack>
          <VStack w="full" gap="8px">
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
            <Text
              alignSelf="flex-start"
              textStyle="body"
              color={!password || passwordRegex.exec(password) ? 'gray500' : 'main'}
              fontWeight={!password || passwordRegex.exec(password) ? '400' : '700'}
            >
              8자 이상의 영문, 숫자, 특수문자
            </Text>
          </VStack>
          <Box w="full" border="1px solid" borderRadius="4px" borderColor="gray300">
            <CheckboxGroup>
              <VStack gap={0}>
                <TermsCheckbox
                  isChecked={allChecked}
                  onChange={(e) => setCheckedItems(termsList.map(() => e.target.checked))}
                >
                  <HStack gap="4px">
                    <Text textStyle="t2" fontWeight="bold" color="gray800">
                      전체동의
                    </Text>
                    <Text textStyle="t2" fontWeight="bold" color="main">
                      *
                    </Text>
                  </HStack>
                </TermsCheckbox>
                <Box w="full" height="1px" bg="gray300" />
                {termsList.map((terms, index) => (
                  <TermsCheckbox
                    key={terms.id}
                    isChecked={checkedItems[index]}
                    onChange={(e) =>
                      setCheckedItems([
                        ...checkedItems.slice(0, index),
                        e.target.checked,
                        ...checkedItems.slice(index + 1),
                      ])
                    }
                  >
                    <HStack gap="4px" textStyle="t2" fontWeight="regular">
                      <Text color="gray800">{terms.title}</Text>
                      <Text
                        as="button"
                        color="gray500"
                        onClick={() =>
                          setCurrentPage({
                            page: 'POLICY',
                            termsData: terms,
                            signupFormData: {
                              email,
                              authCode: authCode,
                              authState,
                              password,
                              checkedItems,
                            },
                          })
                        }
                      >
                        보기
                      </Text>
                    </HStack>
                  </TermsCheckbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </Box>
          <Button size="lg" variant="default" w="full" isDisabled={!formCheck} onClick={submitForm}>
            <Text>다 음</Text>
          </Button>

          <HStack gap="12px">
            <IconButton w="28px" h="28px" aria-label="Singup Kakao" icon={<IconKakao w="20px" h="19px" />} />
            <IconButton w="28px" h="28px" aria-label="Signup Google" icon={<IconGoogle w="20px" h="20px" />} />
          </HStack>
        </VStack>
      </VStack>
    </ModalBody>
  );
}
