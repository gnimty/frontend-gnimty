import { Box, Flex, IconButton, Input } from '@chakra-ui/react';

import SearchIcon from '@/assets/icons/system/search.svg';

import type { BoxProps } from '@chakra-ui/react';
import type { FormEventHandler } from 'react';

export interface SearchProps extends Omit<BoxProps, 'children'> {}

export default function Search(props: SearchProps) {
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Flex p="12px 24px" w="420px" bg="white" borderRadius="40px" border="1px solid" borderColor="gray200" {...props}>
      <Flex h="24px" alignItems="center" w="full">
        <Box textStyle="t2" fontWeight={400} color="gray800">
          KR
        </Box>
        <Box ml="32px" mr="12px" w="1px" h="full" bg="gray200" />
        <Flex as="form" onSubmit={handleSubmit} flex="1 0 0" h="full" alignItems="center">
          <Input
            type="search"
            css={{ '::webkit-search-cancel-button': { display: 'none' } }}
            h="full"
            outline="none"
            flex="1 0 0"
          />
          <IconButton type="submit" aria-label="검색" ml="12px">
            <SearchIcon width={24} height={24} />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
}
