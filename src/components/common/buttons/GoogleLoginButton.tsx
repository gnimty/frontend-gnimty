import { Button, Text } from '@chakra-ui/react';
import { Roboto } from 'next/font/google';

import IconGoogle from '@/components/icons/IconGoogle';

import type { ButtonProps } from '@chakra-ui/react';

const roboto = Roboto({
  preload: false,
  weight: ['500'],
  variable: '--roboto',
});

export default function GoogleLoginButton(props: ButtonProps) {
  return (
    <Button
      className={roboto.className}
      bg="white"
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
      <Text fontSize="14px" fontWeight="500" color="#0000008a">
        Google 계정으로 로그인
      </Text>
    </Button>
  );
}
