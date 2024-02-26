import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { GameMode, SummonerRankDto } from '../types';

interface RankTiersResponse {
  data: {
    ranks: SummonerRankDto[];
    next: boolean;
    prev: boolean;
    totalSummoners: number;
  };
}

interface Options {
  /** 1부터 시작하는 페이지 번호로 1페이지당 최대 100명의 소환사 랭킹정보 노출 */
  page: number;
  /**
   * 검색할 큐 타입 정보로,`'RANK_SOLO'` 또는 `'RANK_FLEX'`만 지정 가능
   *
   * API의 기본 값: `'RANK_SOLO'`
   */
  queueType?: Extract<GameMode, 'RANK_SOLO' | 'RANK_FLEX'>;
}

const rankTiersQuery = (options: Options) =>
  queryOptions({
    queryKey: ['rankTiers', options.page, options.queueType],
    async queryFn() {
      const res = await httpRequest.get<RankTiersResponse>(`/statistics/rank/tier?page=${options.page}`, {
        params: {
          queue_type: options.queueType,
        },
      });
      return res.data;
    },
  });

export default rankTiersQuery;
