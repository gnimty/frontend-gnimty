import { Grid, useDisclosure, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import duoSummonersQuery from '@/apis/queries/duoSummonersQuery';
import type { RecommendedSummonersEntry, DuoSummonersRequest } from '@/apis/types';
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
  lastSummonerId: 0,
  lastSummonerUpCount: 0,
  pageSize: 18,
};

export default function Duo() {
  const drawerDisclosure = useDisclosure();
  const [requestParams, setRequestParams] = useState<DuoSummonersRequest>(defaultDuoSummonersRequest);
  const { data } = useQuery(duoSummonersQuery(requestParams));
  const updateRequestParams = (toUpdate: Record<string, DuoSummonersRequest[keyof DuoSummonersRequest]>) =>
    setRequestParams((prev) => ({ ...prev, ...toUpdate }));

  const [summoners, setSummoners] = useState<SummonerCardItem[]>([]);
  const [allOpen, setAllOpen] = useState(false);
  const toggleAll = () => {
    setAllOpen((prev) => !prev);
  };

  useEffect(() => {
    setSummoners(() => {
      if (!data) return [];
      return data?.data?.recommendedSummoners.map((summoner) => ({ ...summoner, open: false }));
    });
  }, [data]);

  useEffect(() => {
    setSummoners((prev) => prev.map((summoner) => ({ ...summoner, open: allOpen })));
  }, [allOpen]);

  return (
    <>
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
          {summoners?.map((summoner) => {
            return (
              <SummonerCard
                key={summoner.id}
                summoner={summoner}
                open={summoner.open}
                toggle={() =>
                  setSummoners((prev) => prev.map((s) => (s.id === summoner.id ? { ...s, open: !s.open } : s)))
                }
              />
            );
          })}
        </Grid>
      </VStack>
    </>
  );
}
