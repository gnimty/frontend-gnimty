import { Box, HStack, IconButton, Input, Text } from '@chakra-ui/react';

import SearchIcon from '@/assets/icons/system/search.svg';

import type { BoxProps } from '@chakra-ui/react';
import type { FormEventHandler } from 'react';

export interface SearchProps extends Omit<BoxProps, 'children'> {}

export default function Search(props: SearchProps) {
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <HStack
      gap="12px"
      p="12px 24px"
      w="420px"
      bg="white"
      borderRadius="40px"
      border="1px solid"
      borderColor="gray200"
      {...props}
    >
      <Box w="38px" h="20px">
        <Text textStyle="t2" fontWeight="regular" color="gray800">
          KR
        </Text>
      </Box>
      <Box w="1px" h="24px" bg="gray200" />
      <HStack as="form" onSubmit={handleSubmit} alignItems="center" gap="12px" flex="1 0 0">
        <Input
          type="search"
          textStyle="t2"
          fontWeight="regular"
          p={0}
          css={{ '::-webkit-search-cancel-button': { display: 'none' } }}
        />
        <IconButton type="submit" aria-label="검색" display="inline-flex">
          <SearchIcon width={24} height={24} />
        </IconButton>
      </HStack>
    </HStack>
  );
}
