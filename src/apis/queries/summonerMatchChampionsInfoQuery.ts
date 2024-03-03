import { queryOptions } from '@tanstack/react-query';

import httpRequest from '../httpRequest';

import type { SummonerPlayDto, QueueType } from '../types';

interface Options {
  summonerTagName: string;
  brief?: boolean;
  queue_type?: QueueType;
}

interface SummonerMatchChampionsInfoResponse {
  data: {
    summonerPlays: SummonerPlayDto[];
  };
}

const summonerMatchChampionsInfoQuery = ({ summonerTagName, brief = false, queue_type = 'ALL' }: Options) =>
  queryOptions({
    queryKey: ['summonerMatchChampionsInfo', summonerTagName, brief, queue_type],
    async queryFn() {
      const res = await httpRequest.get<SummonerMatchChampionsInfoResponse>(
        `/statistics/summoners/champion/${summonerTagName}`,
        {
          params: {
            brief,
            queue_type,
          },
        },
      );
      return res.data;
    },
    enabled: !!summonerTagName,
  });

export default summonerMatchChampionsInfoQuery;
