import { Button, Flex, Radio } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import UserRiotAccountInput from '@/components/pages/mypage/userInfo/UserRiotAccountInput';

import type { RadioProps } from '@chakra-ui/react';

interface UserRiotAccountRadioProps {
  riotAccountInfo?: { id: number; nickname: string };
  radioProps?: RadioProps;
}

export default function UserRiotAccountRadio({ riotAccountInfo, radioProps }: UserRiotAccountRadioProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const params = useSearchParams().toString();

  const redirectUrl = pathname !== '/' && params !== '' ? `${pathname}?${params}` : '/';

  const data = {
    redirectUrl,
    target: 'riot',
  };

  const targetUrl = `/oauth/riot/${encodeURIComponent(JSON.stringify(data))}`;

  return (
    <Radio w="full" {...radioProps}>
      <Flex w="full" direction="row" alignItems="center">
        <UserRiotAccountInput
          isDisabled={!!riotAccountInfo}
          defaultValue={riotAccountInfo?.nickname}
          placeholder={!riotAccountInfo ? '계정을 연결해 주세요.' : ''}
        />
        {riotAccountInfo ? (
          <Button w="80px" ml="8px" size="md" variant="line" onClick={() => console.log('hi')}>
            연결 해제
          </Button>
        ) : (
          <Button
            w="80px"
            ml="8px"
            size="md"
            variant="line"
            borderColor="main"
            color="main"
            onClick={async () => router.replace(targetUrl)}
          >
            연결
          </Button>
        )}
      </Flex>
    </Radio>
  );
}
