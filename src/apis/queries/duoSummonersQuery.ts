import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { DuoSummonersRequest, RecommendedSummonersEntry } from '../types';

interface DuoSummonersResponse {
  data: {
    recommendedSummoners: RecommendedSummonersEntry[];
  };
}

const duoSummonersQuery = (options: DuoSummonersRequest) =>
  queryOptions({
    queryKey: ['duoSummoners', options],
    async queryFn() {
      const res = await request.get<DuoSummonersResponse>('/community/summoners', {
        params: options,
      });
      return res.data;
    },
    enabled: options.pageSize > 0,
  });

export default duoSummonersQuery;
