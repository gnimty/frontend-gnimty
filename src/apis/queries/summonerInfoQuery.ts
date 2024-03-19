import { queryOptions } from '@tanstack/react-query';

import httpRequest from '../httpRequest';

import type { SummonerDto } from '../types';
import type { AxiosError } from 'axios';

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
    retry(failureCount, error: AxiosError) {
      if (error.response?.status === 404) return false;
      if (failureCount < 3) return true;
      return false;
    },
  });

export default summonerInfoQuery;
