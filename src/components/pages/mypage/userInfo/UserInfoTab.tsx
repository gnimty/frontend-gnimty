import { Flex, HStack, RadioGroup, Button, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import useAuth from '@/apis/useAuth';
import useChangeMainRiotAccount from '@/apis/useChangeMainRiotAccount';
import useDisconnectOAuth from '@/apis/useDisconnectOAuth';
import GoogleOAuthButton from '@/components/common/buttons/GoogleOAuthButton';
import KakaoOAuthButton from '@/components/common/buttons/KakaoOAuthButton';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';
import UserRiotAccountRadio from '@/components/pages/mypage/userInfo/UserRiotAccountRadio';

export default function UserInfoTab() {
  const { data, status, isAuthenticated } = useAuth();
  const { changeMainRiotAccount } = useChangeMainRiotAccount();
  const { disconnectOAuth } = useDisconnectOAuth();
  const disclosure = useDisclosure();

  const router = useRouter();

  // TODO: 후에 status 체크는 삭제
  if (!isAuthenticated || status !== 'success') {
    return;
  }

  const mainAccount = data.data.riotDependentInfo.riotAccounts.find((account) => account.isMain);

  const isKakaoOAuthConnected = data.data.oauthInfos.some((info) => info.provider === 'KAKAO');
  const isGoogleOAuthConnected = data.data.oauthInfos.some((info) => info.provider === 'GOOGLE');

  return (
    <Flex direction="column" w="full" gap="24px">
      <ContentsContainer title="소셜 로그인">
        <HStack w="full" spacing="12px">
          <KakaoOAuthButton
            isConnected={isKakaoOAuthConnected}
            w="full"
            h="48px"
            onClick={() => {
              if (isKakaoOAuthConnected) {
                disconnectOAuth(
                  { provider: 'KAKAO' },
                  {
                    onSuccess() {
                      router.reload();
                    },
                    onError(error) {
                      alert(error.response?.data.status.message ?? '연동해제에 실패했습니다.');
                    },
                  },
                );
              } else {
                router.replace(
                  `${
                    process.env.NEXT_PUBLIC_API_BASE_URL
                  }/community/members/me/oauth/kakao/redirect?redirect_uri=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_FRONT_ORIGIN + router.asPath,
                  )}`,
                );
              }
            }}
          />
          <GoogleOAuthButton
            isConnected={isGoogleOAuthConnected}
            w="full"
            h="48px"
            onClick={() => {
              if (isGoogleOAuthConnected) {
                disconnectOAuth(
                  { provider: 'GOOGLE' },
                  {
                    onSuccess() {
                      router.reload();
                    },
                    onError(error) {
                      console.log(error.response?.data);
                      alert(error.response?.data.status.message ?? '연동해제에 실패했습니다.');
                    },
                  },
                );
              } else {
                router.replace(
                  `${
                    process.env.NEXT_PUBLIC_API_BASE_URL
                  }/community/members/me/oauth/google/redirect?redirect_uri=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_FRONT_ORIGIN + router.asPath,
                  )}`,
                );
              }
            }}
          />
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
      <Button type="button">
        <Text textStyle="t2" color="gray700" fontWeight="400">
          회원 탈퇴
        </Text>
      </Button>
    </Flex>
  );
}
