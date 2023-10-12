import styled from '@emotion/styled';

import useLogin from '@/apis/useLogin';
import useSignUp from '@/apis/useSignUp';

const MainWrapper = styled.div``;

export default function Home() {
  const { signUp } = useSignUp({
    onSuccess: (data) => {
      console.log('success ', data);
    },
    onError: (error) => {
      console.log('error ', error);
    },
  });

  const testSignUp = () => {
    signUp({
      email: 'test@test.com',
      password: 'Password13!@$ab',
      agreeTerms: true,
    });
  };

  return (
    <MainWrapper>
      메인페이지
      <button style={{ backgroundColor: 'red' }} onClick={testSignUp}>
        API 테스트
      </button>
    </MainWrapper>
  );
}
