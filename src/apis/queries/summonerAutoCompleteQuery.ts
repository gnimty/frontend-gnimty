import { queryOptions } from '@tanstack/react-query';

import httpRequest from '../httpRequest';

import type { SummonerDto } from '../types';

export interface SummonerAutoCompleteResponse {
  data: {
    keyword: string;
    matched: number;
    summoners: SummonerDto[];
  };
}

interface Options {
  keyword: string;
}

const summonerAutoCompleteQuery = (options: Options) =>
  queryOptions({
    queryKey: ['summonerAutoComplete', options],
    async queryFn() {
      const res = await httpRequest.get<SummonerAutoCompleteResponse>('/statistics/summoners/autocomplete', {
        params: {
          keyword: options.keyword,
        },
      });
      return res.data;
    },
  });

export default summonerAutoCompleteQuery;
