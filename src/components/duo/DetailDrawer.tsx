import React, { useRef, useState } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  type UseDisclosureReturn,
  Input,
  useTheme,
  Grid,
  Checkbox,
  Flex,
  Button,
} from '@chakra-ui/react';

import type { ChampionDto } from '@/apis/types';
import ResetIcon from '@/assets/icons/system/reset.svg';
import SearchIcon from '@/assets/icons/system/search.svg';
import champions from '@/apis/constants/champions';
import Radio from '@/components/common/Radio';

import Champion from './Champion';

type ChampionType = {
  selected: boolean;
} & ChampionDto;

interface DetailDrawerProps {
  disclosure: UseDisclosureReturn;
}

const DetailDrawer = ({ disclosure }: DetailDrawerProps) => {
  const theme = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [filteredChampions, setFilteredChampions] = useState<ChampionType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resetFilter = () => {
    inputRef.current?.value && (inputRef.current.value = '');
    setFilteredChampions([]);
  };
  const handleChampionSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      return setFilteredChampions([]);
    }
    const searchedChampions = champions.filter((championInfo) => championInfo.krName.includes(value));
    setFilteredChampions(searchedChampions.map((championInfo) => ({ ...championInfo, selected: false })));
  };
  const handleChampionClick = (championName: string) => {
    setFilteredChampions((prev) => {
      if (prev.filter(({ selected }) => selected).length >= 7) {
        return prev;
      }
      return prev.map((championInfo) => {
        if (championInfo.krName === championName) {
          return { ...championInfo, selected: !championInfo.selected };
        }
        return championInfo;
      });
    });
  };

  return (
    <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <form
          ref={formRef}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            console.log(Object.fromEntries(formData));
          }}
        >
          <DrawerHeader borderBottomWidth="1px" alignItems="center">
            <Box textStyle="t1" color="gray800" fontWeight="700">
              상세 필터
            </Box>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody p="20px" display="flex" flexDirection="column" gap="20px">
            <VStack spacing="12px">
              <HStack w="full" justify="space-between">
                <HStack textStyle="body">
                  <Text color="gray800" fontWeight="700">
                    선호 챔피언
                  </Text>
                  <Text color="gray600">최대 3개</Text>
                </HStack>
                <Box cursor="pointer" onClick={resetFilter}>
                  <ResetIcon width="20px" />
                </Box>
              </HStack>
              <Box
                h="40px"
                w="full"
                borderRadius="40px"
                border="1px solid"
                borderColor="gray200"
                p="12px 20px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Input
                  w="full"
                  h="20px"
                  p="0"
                  flex="1"
                  placeholder="챔피언을 검색하세요"
                  textStyle="t2"
                  css={{
                    '&::placeholder': {
                      color: theme.colors.gray500,
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                    },
                  }}
                  onChange={handleChampionSearch}
                  ref={inputRef}
                />
                <Box cursor="pointer">
                  <SearchIcon width="24px" />
                </Box>
              </Box>
              {filteredChampions.length > 0 && (
                <VStack w="full" spacing="12px">
                  {filteredChampions.filter(({ selected }) => !selected).length > 0 && (
                    <Grid templateColumns="repeat(8, 1fr)" gap="8px" h="max-content" minH="60px">
                      {filteredChampions
                        .filter(({ selected }) => !selected)
                        .map(({ krName }) => (
                          <Champion key={krName} championName={krName} onClick={handleChampionClick} />
                        ))}
                    </Grid>
                  )}
                  {filteredChampions.filter(({ selected }) => selected).length > 0 && (
                    <Grid templateColumns="repeat(8, 1fr)" gap="8px">
                      {filteredChampions
                        .filter(({ selected }) => selected)
                        .map(({ krName, selected }) => (
                          <Champion
                            key={krName}
                            championName={krName}
                            onClick={handleChampionClick}
                            selected={selected}
                          />
                        ))}
                    </Grid>
                  )}
                  <input
                    type="hidden"
                    name="preferenceChampions"
                    value={filteredChampions.filter(({ selected }) => selected).map(({ krName }) => krName)}
                  />
                </VStack>
              )}
            </VStack>
            <VStack spacing="12px" w="full" alignItems="start">
              <Text textStyle="body" color="gray800" fontWeight="700">
                정렬 기준
              </Text>
              <HStack spacing="12px" h="40px">
                <Radio name="sortType" width="88px" height="2.5rem" label="추천순" />
                <Radio name="sortType" width="88px" height="2.5rem" label="티어순" />
                <Radio name="sortType" width="88px" height="2.5rem" label="A-Z순" />
              </HStack>
            </VStack>
            <VStack spacing="12px" w="full" alignItems="flex-start" gap="12px">
              <VStack textStyle="body" alignItems="flex-start" gap="4px">
                <Text color="gray800" fontWeight="700">
                  듀오 가능 여부
                </Text>
                <Text color="gray500">듀오 플레이가 가능한 티어인지 확인해 드려요!</Text>
              </VStack>
              <Box w="full">
                <Checkbox
                  colorScheme="red"
                  size="md"
                  textStyle="t2"
                  fontWeight="400"
                  id="duoAvailable"
                  name="duoAvailable"
                  value="true"
                >
                  듀오 가능한 유저만 보기
                </Checkbox>
              </Box>
            </VStack>
            <VStack spacing="12px" w="full" alignItems="flex-start" gap="12px">
              <VStack textStyle="body" alignItems="flex-start" gap="4px">
                <Text color="gray800" fontWeight="700">
                  게임 가능 시간
                </Text>
                <Text color="gray500">자신이 설정해놓은 시간에 맞는 유저를 찾아드려요!</Text>
              </VStack>
              <Box w="full">
                <Checkbox
                  colorScheme="red"
                  size="md"
                  textStyle="t2"
                  fontWeight="400"
                  id="timeAvailable"
                  name="timeAvailable"
                  value="true"
                >
                  게임 가능한 유저만 보기
                </Checkbox>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Flex w="full" gap="12px">
              <Button
                w="69px"
                h="48px"
                type="button"
                borderRadius="4px"
                padding="0 16px"
                border="1px solid"
                borderColor="gray200"
                textStyle="t2"
                color="gray500"
                fontWeight="400"
              >
                초기화
              </Button>
              <Button
                w="full"
                h="48px"
                type="submit"
                borderRadius="4px"
                padding="14px 12px"
                color="white"
                bg="main"
                textStyle="t2"
                fontWeight="700"
              >
                저장
              </Button>
            </Flex>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailDrawer;
