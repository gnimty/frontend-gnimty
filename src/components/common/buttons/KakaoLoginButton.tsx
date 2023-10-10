import { Button, Text } from '@chakra-ui/react';

import IconKakao from '@/components/icons/IconKakao';

import type { ButtonProps } from '@chakra-ui/react';

export default function KakaoLoginButton(props: ButtonProps) {
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
      {...props}
    >
      <Text textStyle="t2" color="#000000d9">
        카카오 로그인
      </Text>
    </Button>
  );
}
