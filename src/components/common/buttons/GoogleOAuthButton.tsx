import { Button, Text } from '@chakra-ui/react';
import { Roboto } from 'next/font/google';

import IconGoogle from '@/components/icons/IconGoogle';

import type { ButtonProps } from '@chakra-ui/react';

interface GoogleOAuthButtonProps extends ButtonProps {
  isConnected?: boolean;
}

const roboto = Roboto({
  preload: false,
  weight: ['500'],
  variable: '--roboto',
});

export default function GoogleOAuthButton(props: GoogleOAuthButtonProps) {
  const { isConnected = false } = props;

  return (
    <Button
      className={roboto.className}
      bg={isConnected ? 'gray200' : 'white'}
      w="full"
      variant="outline"
      border="1px"
      borderColor="gray200"
      leftIcon={<IconGoogle width="20px" height="20px" />}
      iconSpacing="8px"
      _hover={{ bg: '' }}
      _active={{ bg: '' }}
      _focus={{
        bg: '',
        boxShadow: '',
      }}
      {...props}
    >
      <Text textStyle="t2" fontWeight="bold" color="gray700">
        {isConnected ? 'Google 계정 연동 해제' : 'Google 계정으로 로그인'}
      </Text>
    </Button>
  );
}
