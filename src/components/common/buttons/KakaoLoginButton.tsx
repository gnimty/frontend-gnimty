import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import IconKakao from '@/components/icons/IconKakao';

import type { ButtonProps } from '@chakra-ui/react';

export default function KakaoLoginButton(props: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      bg="kakao"
      variant="solid"
      leftIcon={<IconKakao width="20px" height="19px" />}
      iconSpacing="8px"
      _hover={{ bg: '' }}
      _active={{ bg: '' }}
      _focus={{
        bg: '',
        boxShadow: '',
      }}
      onClick={() => {
        router.replace(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/oauth/kakao/redirect?redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_FRONT_ORIGIN + router.asPath)}`,
        );
      }}
      {...props}
    >
      <Text textStyle="t2" color="gray800">
        카카오 로그인
      </Text>
    </Button>
  );
}
