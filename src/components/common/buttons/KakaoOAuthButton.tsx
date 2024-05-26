import { Button, Text } from '@chakra-ui/react';

import IconKakao from '@/components/icons/IconKakao';

import type { ButtonProps } from '@chakra-ui/react';

interface KakaoOAuthButtonProps extends ButtonProps {
  isConnected?: boolean;
}

export default function KakaoOAuthButton(props: KakaoOAuthButtonProps) {
  const { isConnected = false, ...restProps } = props;

  return (
    <Button
      bg={isConnected ? 'gray200' : 'kakao'}
      variant="solid"
      leftIcon={<IconKakao width="20px" height="19px" />}
      iconSpacing="8px"
      _hover={{ bg: '' }}
      _active={{ bg: '' }}
      _focus={{
        bg: '',
        boxShadow: '',
      }}
      {...restProps}
    >
      <Text textStyle="t2" fontWeight="bold" color="gray800">
        {isConnected ? '카카오 연동 해제' : '카카오 로그인'}
      </Text>
    </Button>
  );
}
