import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { GameMode, RecommendedSummonersEntry } from '../types';

interface RecommendedSummonersResponse {
  data: {
    recommendedSummoners: RecommendedSummonersEntry[];
  };
}

interface Options {
  gameMode: GameMode;
}

const recommendedSummonersQuery = (options: Options) =>
  queryOptions({
    queryKey: ['recommendedSummoners', options],
    async queryFn() {
      const res = await request.get<RecommendedSummonersResponse>('/community/summoners/main', {
        params: {
          'game-mode': options.gameMode,
        },
      });
      return res.data;
    },
  });

export default recommendedSummonersQuery;
