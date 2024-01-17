import { Button, HStack, Text, VStack } from '@chakra-ui/react';

import useCheckEmail from '@/apis/useCheckEmail';
import useCheckEmailCode from '@/apis/useCheckEmailCode';
import AccountInput from '@/components/pages/account/AccountInput';
import { MAIL_CODE_CHECK_TIME, MAIL_SEND_CHECK_TIME } from '@/components/pages/account/AccountModal';
import type { AuthEmailFormData } from '@/contexts/AccountModalPageContext';
import { secondsFormatter, useTimer } from '@/hooks/useTimer';
import { authCodeRegex, emailRegex } from '@/utils/regex';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface AuthEmailFormProps {
  formData: AuthEmailFormData;
  setFormData: Dispatch<SetStateAction<AuthEmailFormData>>;
}
export default function AuthEmailForm({ formData, setFormData }: AuthEmailFormProps) {
  const { seconds, start, reset, running, stop } = useTimer({
    initialSeconds: MAIL_CODE_CHECK_TIME,
  });

  const { checkEmail } = useCheckEmail({
    onSuccess: () => {
      setFormData((data) => {
        return { ...data, authState: 'WAITING' };
      });
      if (running) stop();
      reset();
      start();
    },
    onError: () => {
      // ERROR 처리
    },
  });
  const onAuthEmail = () => {
    if (!formData.email) return;
    if (!emailRegex.exec(formData.email)) return;
    checkEmail({
      email: formData.email,
    });
  };

  const { checkEmailCode } = useCheckEmailCode({
    onSuccess: (_, variables) => {
      setFormData({ authState: 'SUCCESS', email: variables.email, authCode: variables.code });
    },
    onError: () => {
      setFormData((data) => {
        return { ...data, authState: 'AUTH_FAIL' };
      });
    },
  });

  const onChangeAuthCode = (e: ChangeEvent<HTMLInputElement>) => {
    if (!emailRegex.exec(formData.email) || !authCodeRegex.exec(e.target.value)) return;
    checkEmailCode({
      email: formData.email,
      code: e.target.value,
    });
  };

  return (
    <VStack w="full" gap="8px">
      <AccountInput
        type="email"
        placeholder="이메일 주소를 입력해 주세요."
        value={formData.email}
        isDisabled={formData.authState === 'SUCCESS'}
        isInvalid={formData.email === '' || !emailRegex.exec(formData.email)}
        onChange={(e) =>
          setFormData({
            email: e.target.value,
            authCode: '',
            authState: emailRegex.exec(e.target.value) ? 'READY' : 'PREPARE',
          })
        }
      />
      <HStack w="full" gap="8px">
        <AccountInput
          w="full"
          placeholder="인증번호를 입력해 주세요."
          defaultValue={formData.authCode}
          maxLength={6}
          isDisabled={formData.authState !== 'WAITING' && formData.authState !== 'AUTH_FAIL'}
          isInvalid={
            (formData.authState === 'WAITING' && !authCodeRegex.exec(formData.authCode)) ||
            formData.authState === 'AUTH_FAIL'
          }
          onChange={onChangeAuthCode}
        />
        <Button
          variant="default"
          size="lg"
          minW="160px"
          isDisabled={formData.authState !== 'READY'}
          bg={formData.authState !== 'SUCCESS' ? 'main' : 'blue800 !important'}
          onClick={onAuthEmail}
        >
          <Text color={formData.authState === 'SUCCESS' ? 'white' : 'inherit'}>
            {formData.authState === 'PREPARE' || formData.authState === 'READY'
              ? '인증하기'
              : formData.authState === 'WAITING' || formData.authState === 'AUTH_FAIL'
                ? secondsFormatter(seconds)
                : '인증완료'}
          </Text>
        </Button>
      </HStack>
      <HStack w="full" gap="4px" textStyle="body">
        {formData.authState === 'WAITING' && seconds < MAIL_SEND_CHECK_TIME && (
          <>
            <Text fontWeight="400" color="gray700">
              메일이 오지 않았나요?
            </Text>
            <Text as="button" fontWeight="700" color="gray800" onClick={onAuthEmail}>
              인증메일 재발송
            </Text>
          </>
        )}
        {formData.authState === 'AUTH_FAIL' && (
          <>
            <Text fontWeight="400" color="gray700">
              인증번호가 일치하지 않습니다.
            </Text>
            <Text as="button" fontWeight="700" color="gray800" onClick={onAuthEmail}>
              인증메일 재발송
            </Text>
          </>
        )}
        {formData.authState === 'SUCCESS' && (
          <Text textStyle="body" fontWeight="400" color="blue800">
            인증이 완료되었습니다!
          </Text>
        )}
      </HStack>
    </VStack>
  );
}
