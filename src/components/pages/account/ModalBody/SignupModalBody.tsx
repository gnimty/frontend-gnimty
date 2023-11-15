import { ModalBody } from '@chakra-ui/modal';
import { Box, Button, Checkbox, CheckboxGroup, HStack, IconButton, Text, useBoolean, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import useSignUp from '@/apis/useSignUp';
import Check from '@/assets/icons/system/check.svg';
import IconGoogle from '@/components/icons/IconGoogle';
import IconKakao from '@/components/icons/IconKakao';
import AuthEmailForm from '@/components/pages/account/ModalBody/InputForm/AuthEmailForm';
import PasswordForm from '@/components/pages/account/ModalBody/InputForm/PasswordForm';
import { termsList } from '@/constants/termsList';
import type { AuthEmailFormData } from '@/contexts/AccountModalPageContext';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';
import { authCodeRegex, emailRegex, passwordRegex } from '@/utils/regex';

import type { CheckboxProps } from '@chakra-ui/react';

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

export default function SignupModalBody() {
  const { setCurrentPage, signupFormData, setSignupFormData, setTermsData } = useAccountModalPageContext();

  const [showPassword, setShowPassword] = useBoolean(false);
  const [authEmailFormData, setAuthEmailFormData] = useState<AuthEmailFormData>({
    email: '',
    authCode: '',
    authState: 'PREPARE',
  });
  const [password, setPassword] = useState('');
  const [checkedItems, setCheckedItems] = useState(termsList.map(() => false));

  const allChecked = checkedItems.every(Boolean);

  useEffect(() => {
    if (signupFormData) {
      setPassword(signupFormData.password);
      setCheckedItems(signupFormData.checkedItems);
      setAuthEmailFormData(signupFormData.authEmailFormData);
      setSignupFormData(undefined);
    }
  }, [setSignupFormData, signupFormData]);

  const { signUp } = useSignUp({
    onSuccess: () => {
      setCurrentPage({ page: 'SUCCESS' });
    },
    onError: () => {},
  });

  const formCheck =
    authEmailFormData.authState === 'SUCCESS' &&
    emailRegex.exec(authEmailFormData.email) &&
    passwordRegex.exec(password) &&
    authCodeRegex.exec(authEmailFormData.authCode) &&
    checkedItems.every(Boolean);

  const submitForm = () => {
    if (!formCheck) return;

    signUp({
      email: authEmailFormData.email,
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
          <AuthEmailForm formData={authEmailFormData} setFormData={setAuthEmailFormData} />
          <PasswordForm
            password={password}
            setPassword={setPassword}
            placeholder="비밀번호를 입력해 주세요."
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
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
                        onClick={() => {
                          setSignupFormData({
                            authEmailFormData,
                            password,
                            checkedItems,
                          });
                          setTermsData(terms);
                          setCurrentPage({
                            page: 'TERMS',
                          });
                        }}
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

          <HStack gap="12px" mb="24px">
            <IconButton w="28px" h="28px" aria-label="Singup Kakao" icon={<IconKakao w="20px" h="19px" />} />
            <IconButton w="28px" h="28px" aria-label="Signup Google" icon={<IconGoogle w="20px" h="20px" />} />
          </HStack>
        </VStack>
      </VStack>
    </ModalBody>
  );
}
