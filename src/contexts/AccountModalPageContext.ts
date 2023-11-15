import constate from 'constate';
import { useState } from 'react';

export type TermsType = {
  id: string;
  title: string;
  required?: boolean;
  contents: string;
};

type AccountPage = 'LOGIN' | 'SIGNUP' | 'FIND_PW' | 'POLICY' | 'SUCCESS' | 'SET_PW';

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

type CurrentPageType = {
  page: AccountPage;
  signupFormData?: SignupFormData;
  termsData?: TermsType;
};

export const [AccountModalPageProvider, useAccountModalPageContext] = constate((props: { onClose: () => void }) => {
  const [currentPage, setCurrentPage] = useState<CurrentPageType>({ page: 'LOGIN' });

  return { currentPage, setCurrentPage, onClose: props.onClose };
});
