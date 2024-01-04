import { Flex, HStack, RadioGroup } from '@chakra-ui/react';

import GoogleLoginButton from '@/components/common/buttons/GoogleLoginButton';
import KakaoLoginButton from '@/components/common/buttons/KakaoLoginButton';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';
import UserRiotAccountRadio from '@/components/pages/mypage/userInfo/UserRiotAccountRadio';

export default function UserInfoTab() {
  const _testAccount = ['잔나긔여워', '힝구리퐁퐁퐁퐁'];
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
            {_testAccount.map((account, index) => (
              <UserRiotAccountRadio
                key={index}
                radioProps={{ value: account }}
                riotAccountInfo={{ id: 0, nickname: account }}
              />
            ))}
            <UserRiotAccountRadio key="_empty" radioProps={{ value: '_custom' }} />
          </Flex>
        </RadioGroup>
      </ContentsContainer>
    </Flex>
  );
}
