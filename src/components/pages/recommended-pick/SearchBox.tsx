import { Box, HStack, IconButton, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import SearchIcon from '@/assets/icons/system/search.svg';

import SearchList from '../main/search/SearchList';

interface SearchBoxProps {
  selectOtherSummoner: (summonerName: string) => void;
}

export default function SearchBox({ selectOtherSummoner }: SearchBoxProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [autoComplete, setAutoComplete] = useState(false);

  return (
    <Box pos="relative">
      <HStack gap="12px" p="12px 24px" w="420px" bg="white" borderRadius="40px" boxShadow="0 0 0 1px" color="gray200">
        <Box w="38px">
          <Text textStyle="t2" fontWeight="regular" color="gray800">
            KR
          </Text>
        </Box>
        <Box w="1px" h="24px" bg="gray200" />
        <HStack as="form" alignItems="center" gap="12px" flex="1 0 0">
          <Input
            type="search"
            value={searchKeyword}
            onChange={(event) => {
              setSearchKeyword(event.target.value);
              if (event.target.value.length > 0) {
                setAutoComplete(true);
              }
              if (event.target.value.length === 0) {
                setAutoComplete(false);
              }
            }}
            textStyle="t2"
            fontWeight="400"
            p="0"
            css={{
              '::-webkit-search-cancel-button': { display: 'none' },
            }}
          />
          <IconButton type="submit" aria-label="검색" display="inline-flex" color="gray800">
            <SearchIcon width={24} height={24} />
          </IconButton>
        </HStack>
      </HStack>
      <Box
        w="420px"
        pos="absolute"
        top="calc(100% + 4px)"
        bg="white"
        borderRadius="4px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        {autoComplete && <SearchList keyword={searchKeyword} onCustomXButtonClick={selectOtherSummoner} />}
      </Box>
    </Box>
  );
}
