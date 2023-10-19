import { Box, HStack, Input, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react';

import GoogleLoginButton from '@/components/common/buttons/GoogleLoginButton';
import KakaoLoginButton from '@/components/common/buttons/KakaoLoginButton';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';
import UserAccountRadio from '@/components/pages/mypage/userInfo/UserAccountRadio';

export default function UserInfoTab() {
  return (
    <VStack w="full">
      <ContentsContainer title="소셜 로그인">
        <HStack w="full" spacing="12px">
          <KakaoLoginButton w="full" h="48px" />
          <GoogleLoginButton w="full" h="48px" />
        </HStack>
      </ContentsContainer>
      <ContentsContainer title="계정 연동">
        <RadioGroup w="full">
          <Stack direction="column" gap="8px">
            <UserAccountRadio radioProps={{ value: '1', height: '40px' }} />
          </Stack>
        </RadioGroup>
      </ContentsContainer>
    </VStack>
  );
}
