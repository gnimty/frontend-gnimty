import { Flex, HStack, RadioGroup } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import useAuth from '@/apis/useAuth';
import useChangeMainRiotAccount from '@/apis/useChangeMainRiotAccount';
import GoogleLoginButton from '@/components/common/buttons/GoogleLoginButton';
import KakaoLoginButton from '@/components/common/buttons/KakaoLoginButton';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';
import UserRiotAccountRadio from '@/components/pages/mypage/userInfo/UserRiotAccountRadio';

export default function UserInfoTab() {
  const { data, status, isAuthenticated } = useAuth();
  const { changeMainRiotAccount } = useChangeMainRiotAccount();
  const router = useRouter();

  // TODO: 후에 status 체크는 삭제
  if (!isAuthenticated || status !== 'success') {
    return;
  }

  const mainAccount = data.data.riotDependentInfo.riotAccounts.find((account) => account.isMain);

  return (
    <Flex direction="column" w="full" gap="24px">
      <ContentsContainer title="소셜 로그인">
        <HStack w="full" spacing="12px">
          <KakaoLoginButton w="full" h="48px" />
          <GoogleLoginButton w="full" h="48px" />
        </HStack>
      </ContentsContainer>
      <ContentsContainer title="계정 연동">
        <RadioGroup
          w="full"
          value={mainAccount?.id.toString()}
          onChange={(toChangeId) => {
            if (confirm('대표 소환사를 변경하시겠습니까?')) {
              changeMainRiotAccount(
                { id: parseInt(toChangeId, 10) },
                {
                  onSuccess() {
                    router.reload();
                  },
                  onError() {
                    alert('대표 소환사 변경을 실패했습니다.');
                  },
                },
              );
            }
          }}
        >
          <Flex direction="column" gap="8px">
            {data.data.riotDependentInfo.riotAccounts.map((account) => (
              <UserRiotAccountRadio
                key={account.id}
                radioProps={{ value: account.id.toString() }}
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
