import { Grid, useDisclosure, VStack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useInfiniteDuoSummonersQuery } from '@/apis/queries/duoSummonersQuery';
import type { RecommendedSummonersEntry, DuoSummonersRequest } from '@/apis/types';
import NotFound from '@/assets/images/duo-not-found.png';
import DetailDrawer from '@/components/duo/DetailDrawer';
import Filter from '@/components/duo/Filter';
import SummonerCard from '@/components/duo/SummonerCard';

type SummonerCardItem = {
  open: boolean;
} & RecommendedSummonersEntry;

export const defaultDuoSummonersRequest: DuoSummonersRequest = {
  gameMode: 'RANK_SOLO',
  status: 'ONLINE',
  sortBy: 'RECOMMEND',
  tier: 'unknown',
  lanes: [],
  lastSummonerId: null,
  lastName: null,
  lastSummonerUpCount: null,
  lastSummonerMmr: null,
  pageSize: 18,
};

export default function Duo() {
  const drawerDisclosure = useDisclosure();
  const [requestParams, setRequestParams] = useState<DuoSummonersRequest>(defaultDuoSummonersRequest);
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteDuoSummonersQuery(requestParams ?? defaultDuoSummonersRequest);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastSummonerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage().then(() => {
            observer.current?.disconnect();
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage],
  );
  const updateRequestParams = useCallback(
    (toUpdate: Record<string, DuoSummonersRequest[keyof DuoSummonersRequest]>) => {
      setRequestParams((prev) => ({ ...prev, ...toUpdate }));
    },
    [],
  );

  const [summoners, setSummoners] = useState<SummonerCardItem[]>([]);
  const [allOpen, setAllOpen] = useState(false);
  const toggleAll = () => {
    setAllOpen((prev) => !prev);
  };

  useEffect(() => {
    setSummoners(() => {
      if (!infiniteData) return [];
      return infiniteData.pages
        .map((page) => page.data.recommendedSummoners?.map((summoner) => ({ ...summoner, open: false })))
        .flat();
    });
  }, [infiniteData]);

  useEffect(() => {
    setSummoners((prev) => prev.map((summoner) => ({ ...summoner, open: allOpen })));
  }, [allOpen]);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>듀오 찾기</title>
      </Head>
      <DetailDrawer disclosure={drawerDisclosure} updateParams={updateRequestParams} />
      <VStack maxW="1080px" spacing="16px" m="0 auto" pt="40px">
        <Filter
          disclosure={drawerDisclosure}
          allOpen={allOpen}
          toggleAll={toggleAll}
          requestParams={requestParams}
          updateParams={updateRequestParams}
        />
        <Grid templateColumns="repeat(3, 350px)" gap="12px">
          {summoners?.map((summoner, idx, summonersArray) => {
            return (
              <SummonerCard
                // key={summoner.id} - 중복되는 key가 있어서 주석처리
                key={idx}
                summoner={summoner}
                open={summoner.open}
                toggle={() =>
                  setSummoners((prev) => prev.map((s) => (s.id === summoner.id ? { ...s, open: !s.open } : s)))
                }
                refObject={summonersArray.length - 1 === idx ? lastSummonerRef : undefined}
              />
            );
          })}
        </Grid>
        {summoners.length === 0 && (
          <VStack pt="120px" gap="24px" justify="center">
            <Image src={NotFound} alt="검색 결과가 없습니다." priority />
            <VStack gap="4px">
              <Text textStyle="t1" color="gray500" fontWeight="700">
                검색 조건에 맞는 소환사가 없어요.
              </Text>
              <Text textStyle="t1" color="gray500" fontWeight="400">
                다른 소환사를 찾아보는 것은 어떨까요?
              </Text>
            </VStack>
          </VStack>
        )}
      </VStack>
    </>
  );
}
