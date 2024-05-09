import { Flex, HStack, RadioGroup } from '@chakra-ui/react';

import useAuth from '@/apis/useAuth';
import GoogleLoginButton from '@/components/common/buttons/GoogleLoginButton';
import KakaoLoginButton from '@/components/common/buttons/KakaoLoginButton';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';
import UserRiotAccountRadio from '@/components/pages/mypage/userInfo/UserRiotAccountRadio';

export default function UserInfoTab() {
  const { data, status, isAuthenticated } = useAuth();

  // TODO: 후에 status 체크는 삭제
  if (!isAuthenticated || status !== 'success') {
    return;
  }

  return (
    <Flex direction="column" w="full" gap="24px">
      <ContentsContainer title="소셜 로그인">
        <HStack w="full" spacing="12px">
          <KakaoLoginButton w="full" h="48px" />
          <GoogleLoginButton w="full" h="48px" />
        </HStack>
      </ContentsContainer>
      <ContentsContainer title="계정 연동">
        <RadioGroup w="full">
          <Flex direction="column" gap="8px">
            {data.data.riotDependentInfo.riotAccounts.map((account) => (
              <UserRiotAccountRadio
                key={account.id}
                radioProps={{ value: account.name }}
                riotAccountInfo={{ id: account.id, nickname: account.name }}
              />
            ))}
            <UserRiotAccountRadio key="_empty" radioProps={{ value: '_custom' }} />
          </Flex>
        </RadioGroup>
      </ContentsContainer>
    </Flex>
  );
}
