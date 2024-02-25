import { Button, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import IconKakao from '@/components/icons/IconKakao';

import type { ButtonProps } from '@chakra-ui/react';

export default function KakaoLoginButton(props: ButtonProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const params = useSearchParams().toString();

  const redirectUrl = pathname !== '/' && params !== '' ? `${pathname}?${params}` : '/';

  const data = {
    redirectUrl,
    target: 'kakao',
  };
  const targetUrl = `/oauth/kakao/${encodeURIComponent(JSON.stringify(data))}`;

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
      onClick={async () => router.replace(targetUrl)}
      {...props}
    >
      <Text textStyle="t2" color="gray800">
        카카오 로그인
      </Text>
    </Button>
  );
}
