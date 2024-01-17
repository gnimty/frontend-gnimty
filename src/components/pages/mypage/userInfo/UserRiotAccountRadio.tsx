import { Button, Flex, Radio } from '@chakra-ui/react';

import UserRiotAccountInput from '@/components/pages/mypage/userInfo/UserRiotAccountInput';

import type { RadioProps } from '@chakra-ui/react';

interface UserRiotAccountRadioProps {
  riotAccountInfo?: { id: number; nickname: string };
  radioProps?: RadioProps;
}

export default function UserRiotAccountRadio({ riotAccountInfo, radioProps }: UserRiotAccountRadioProps) {
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
          <Button w="80px" ml="8px" size="md" variant="line" borderColor="main" color="main">
            연결
          </Button>
        )}
      </Flex>
    </Radio>
  );
}
