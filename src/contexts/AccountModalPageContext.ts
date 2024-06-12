import constate from 'constate';
import { useState } from 'react';

export type TermsType = {
  id: string;
  title: string;
  required?: boolean;
  contents: string;
};

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
  uuid?: string;
}

export interface SignupFormData {
  authEmailFormData: AuthEmailFormData;
  password: string;
  checkedItems: boolean[];
}

// TODO: 후에 리팩터링 필요 아래는 리팩터링 방식에 대한 아이디어
// 우선 termsData는 useState로 관리하는 게 아니라 각 term마다 뷰를 만드는 게 좋을듯
// 그 외의 리팩터링은 상황에 따라 갈리는데
// 1. 만약 뷰를 전환해도 뷰별 입력받은 값을 사라지게 하지 않으려면 이 context를 accountModalStore에 통합.
// 2. 만약 뷰별 입력받은 값이 사라져도 된다면 이 context를 필요한 곳에 인라인
export const [AccountModalPageProvider, useAccountModalPageContext] = constate(() => {
  const [signupFormData, setSignupFormData] = useState<SignupFormData>();
  const [termsData, setTermsData] = useState<TermsType>();

  return {
    signupFormData,
    setSignupFormData,
    termsData,
    setTermsData,
  };
});
