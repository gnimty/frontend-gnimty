import { Flex, Radio } from '@chakra-ui/react';

import StateMessageInput from '@/components/pages/mypage/changeState/StateMessageInput';

import type { RadioProps } from '@chakra-ui/react';

interface StateMessageRadioProps {
  value: string;
  content?: string;
  radioProps?: RadioProps;
}

export default function StateMessageRadio({ value, content, radioProps }: StateMessageRadioProps) {
  return (
    <Radio w="full" value={value} {...radioProps}>
      <Flex w="full" direction="row" alignItems="center">
        <StateMessageInput
          isDisabled={!!content}
          defaultValue={content}
          placeholder="자신을 소개할 수 있는 내용을 작성해 주세요."
          rows={2}
        />
      </Flex>
    </Radio>
  );
}
