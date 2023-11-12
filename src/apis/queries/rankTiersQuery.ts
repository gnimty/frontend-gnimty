import { queryOptions } from '@tanstack/react-query';

import request from '../request';

import type { SummonerRankDto } from '../types';

interface RankTiersResponse {
  data: {
    ranks: SummonerRankDto[];
    next: boolean;
    prev: boolean;
    totalSummoners: number;
  };
}

interface Options {
  page: number;
}

const rankTiersQuery = (options: Options) =>
  queryOptions({
    queryKey: ['rankTiers', options.page],
    async queryFn() {
      const res = await request.get<RankTiersResponse>(`/statistics/rank/tier?page=${options.page}`);
      return res.data;
    },
  });

export default rankTiersQuery;
