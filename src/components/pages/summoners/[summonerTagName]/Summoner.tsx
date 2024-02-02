import { Flex, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';

import summonerMatchesInfoQuery from '@/apis/queries/summonerMatchesInfoQuery';

interface SummonerProps {
  summonerTagName: string;
}

export default function Summoner(props: SummonerProps) {
  const { summonerTagName } = props;

  const { data, status } = useQuery(summonerMatchesInfoQuery({ summonerTagName }));

  if (status !== 'success') {
    return;
  }

  return (
    <>
      <Head>
        <title key="title">{data.data.summoner.summonerName} - 게임 전적</title>
      </Head>
      <VStack gap="40px" w="1080px" m="40px auto 60px">
        <HStack gap="12px" w="full">
          <Flex w="447px" h="264px" bg="white">
            소환사 카드
          </Flex>
          <VStack gap="12px" flex="1">
            <Flex bg="white" h="112px" w="full">
              솔로 랭크 정보 카드
            </Flex>
            <Flex bg="white" h="140px" w="full">
              최근 게임 결과 카드
            </Flex>
          </VStack>
        </HStack>
        <Tabs display="flex" flexDir="column" gap="12px" w="full">
          <TabList pos="relative" gap="30px" boxShadow="inset 0 -1px 0 0" color="gray300">
            <Tab>전적 정보</Tab>
            <Tab>챔피언 정보</Tab>
            <Tab>인게임</Tab>
            <Tab>그님티 정보</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>전적 정보</TabPanel>
            <TabPanel>챔피언 정보</TabPanel>
            <TabPanel>인게임</TabPanel>
            <TabPanel>그님티 정보</TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
}
