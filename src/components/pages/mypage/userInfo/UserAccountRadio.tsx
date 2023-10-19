import { Button, Radio } from '@chakra-ui/react';

import type { SelectProps } from '@/components/common/select/Select';
import Select from '@/components/common/select/Select';
import type { SelectOption } from '@/components/common/select/useSelect';

import type { RadioProps } from '@chakra-ui/react';

interface UserAccountRadioProps {
  radioProps?: RadioProps;
  selectProps?: Partial<SelectProps>;
}

export default function UserAccountRadio({ radioProps, selectProps }: UserAccountRadioProps) {
  const testOptions: SelectOption[] = [
    { value: '1', text: '잔나긔여워' },
    { value: '2', text: '힝구리퐁퐁퐁퐁' },
  ];

  return (
    <Radio {...radioProps}>
      <Select options={testOptions} css={{ width: '600px' }} {...selectProps} />
      <Button w="80px" ml="8px" size="md" variant="default">
        연결
      </Button>
    </Radio>
  );
}
