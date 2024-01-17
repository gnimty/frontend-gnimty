import constate from 'constate';
import { useState } from 'react';

export type TermsType = {
  id: string;
  title: string;
  required?: boolean;
  contents: string;
};

type AccountPage = 'LOGIN' | 'SIGNUP' | 'FIND_PW' | 'TERMS' | 'SUCCESS' | 'SET_PW';

export type AuthStateType =
  | 'PREPARE' // 이메일 입력 전
  | 'READY' // 이메일 입력 완료
  | 'WAITING' // 인증번호 발송 후 입력 대기
  | 'AUTH_FAIL' // 인증번호 불일치
  | 'SUCCESS'; // 인증 완료

export interface AuthEmailFormData {
  email: string;
  authCode: string;
  authState: AuthStateType;
}

export interface SignupFormData {
  authEmailFormData: AuthEmailFormData;
  password: string;
  checkedItems: boolean[];
}

type CurrentPageType = {
  page: AccountPage;
};

export const [AccountModalPageProvider, useAccountModalPageContext] = constate((props: { onClose: () => void }) => {
  const [currentPage, setCurrentPage] = useState<CurrentPageType>({ page: 'LOGIN' });
  const [signupFormData, setSignupFormData] = useState<SignupFormData>();
  const [termsData, setTermsData] = useState<TermsType>();

  return {
    onClose: props.onClose,
    currentPage,
    setCurrentPage,
    signupFormData,
    setSignupFormData,
    termsData,
    setTermsData,
  };
});
