import { Input } from '@chakra-ui/react';

import type { InputProps } from '@chakra-ui/react';

export default function UserRiotAccountInput(props: InputProps) {
  return (
    <Input
      flex={1}
      variant="default"
      size="sm"
      onClick={(e) => {
        e.currentTarget.focus();
      }}
      {...props}
    />
  );
}
