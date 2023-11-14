import { Input } from '@chakra-ui/react';

import type { InputProps } from '@chakra-ui/react';

export default function AccountInput(props: InputProps) {
  return (
    <Input
      variant="outline"
      color="gray800"
      fontWeight="regular"
      borderWidth="1px"
      borderColor="gray300"
      errorBorderColor="red800"
      boxShadow="none"
      _placeholder={{
        textStyle: 't2',
        fontWeight: 'regular',
        color: 'gray500',
      }}
      {...props}
    />
  );
}
