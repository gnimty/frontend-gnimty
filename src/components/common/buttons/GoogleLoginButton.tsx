import { Button, Text } from '@chakra-ui/react';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';

import IconGoogle from '@/components/icons/IconGoogle';

import type { ButtonProps } from '@chakra-ui/react';

const roboto = Roboto({
  preload: false,
  weight: ['500'],
  variable: '--roboto',
});

export default function GoogleLoginButton(props: ButtonProps) {
  const router = useRouter();

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
      onClick={() => {
        router.replace(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }/community/oauth/google/redirect?redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_FRONT_ORIGIN + router.asPath)}`,
        );
      }}
      {...props}
    >
      <Text fontSize="14px" fontWeight="500" color="#0000008a">
        Google 계정으로 로그인
      </Text>
    </Button>
  );
}
