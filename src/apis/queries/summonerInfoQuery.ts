import { queryOptions } from '@tanstack/react-query';

import httpRequest from '../httpRequest';

import type { SummonerDto } from '../types';

interface Options {
  summonerTagName: string;
}

interface SummonerInfoResponse {
  data: {
    summoner: SummonerDto;
  };
}

const summonerInfoQuery = ({ summonerTagName }: Options) =>
  queryOptions({
    queryKey: ['summonerInfo', summonerTagName],
    async queryFn() {
      const res = await httpRequest.get<SummonerInfoResponse>(`/statistics/summoners/${summonerTagName}`);
      return res.data;
    },
    enabled: !!summonerTagName,
  });

export default summonerInfoQuery;
