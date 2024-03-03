import { useInfiniteQuery } from '@tanstack/react-query';

import request from '../httpRequest';

import type { DuoSummonersRequest, RecommendedSummonersEntry } from '../types';

interface DuoSummonersResponse {
  data: {
    recommendedSummoners: RecommendedSummonersEntry[];
  };
}

export const useInfiniteDuoSummonersQuery = (options: DuoSummonersRequest) =>
  useInfiniteQuery({
    queryKey: ['duoSummoners', Object.values(options)],
    queryFn: async ({ pageParam = {} }) => {
      const res = await request.get<DuoSummonersResponse>('/community/summoners', {
        params: { ...options, ...pageParam },
      });
      return res.data;
    },
    initialPageParam: options,
    getNextPageParam: (lastPage) => {
      const lastSummoner = lastPage.data.recommendedSummoners?.slice(-1)[0] ?? [];
      if (!lastSummoner) return undefined;
      return {
        ...options,
        lastSummonerId: lastSummoner.id,
        lastName: lastSummoner.name,
        lastSummonerMmr: lastSummoner.mmr,
        lastSummonerUpCount: lastSummoner.upCount,
      };
    },
  });
