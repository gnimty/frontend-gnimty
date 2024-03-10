import { Box, HStack, IconButton, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, type FormEventHandler } from 'react';

import SearchIcon from '@/assets/icons/system/search.svg';

import FavoriteSummonersTab from './FavoriteSummonersTab';
import RecentSearchTab from './RecentSearchesTab';
import SearchList from './SearchList';

import type { BoxProps } from '@chakra-ui/react';

export interface SearchProps extends Omit<BoxProps, 'children'> {}

export default function Search(props: SearchProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchPopState, setSearchPopState] = useState<'hidden' | 'recent-favorite' | 'search'>('hidden');

  const router = useRouter();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    router.push(`/summoners/${encodeURIComponent(searchKeyword.replaceAll('#', '-'))}`);
  };

  return (
    <Box
      pos="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setSearchPopState('hidden');
        }
      }}
    >
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
            value={searchKeyword}
            onChange={(event) => {
              setSearchKeyword(event.target.value);
              if (event.target.value.length > 0) {
                setSearchPopState('search');
              } else {
                setSearchPopState('recent-favorite');
              }
            }}
            onFocus={(event) => {
              if (event.target.value.length > 0) {
                setSearchPopState('search');
              } else {
                setSearchPopState('recent-favorite');
              }
            }}
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
      <Box
        w="420px"
        pos="absolute"
        top="calc(100% + 4px)"
        left="0"
        zIndex="dropdown"
        bg="white"
        boxShadow="0px 4px 6px 0px rgb(17 17 17 / .1)"
        borderRadius="8px"
      >
        {searchPopState === 'recent-favorite' && (
          <Tabs variant="mainSearch">
            <TabList>
              <Tab w="210px">최근 검색</Tab>
              <Tab w="210px">즐겨찾기</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RecentSearchTab />
              </TabPanel>
              <TabPanel>
                <FavoriteSummonersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        {searchPopState === 'search' && <SearchList keyword={searchKeyword} />}
      </Box>
    </Box>
  );
}
