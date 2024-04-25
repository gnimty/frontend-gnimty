import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { QueueType, RecommendedSummonersEntry } from '../types';

interface MainRecommendsResponse {
  data: {
    recommendedSummoners: RecommendedSummonersEntry[];
  };
}

interface Options {
  queueType: Omit<QueueType, 'BLIND'>;
}

const mainRecommendsQuery = ({ queueType }: Options) =>
  queryOptions({
    queryKey: ['mainRecommends', queueType],
    async queryFn() {
      const res = await request.get<MainRecommendsResponse>('/community/summoners/main', {
        params: { 'game-mode': queueType },
      });
      return res.data;
    },
  });

export default mainRecommendsQuery;
