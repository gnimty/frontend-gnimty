import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { ChampionPickDto, PositionFilter } from '../types';

interface RecommendedPicksResponse {
  data: {
    recommends: ChampionPickDto[];
  };
}

export type RecommendedPicksSortOrder =
  | 'CHAMPION_SCORE'
  | 'SYNERGY_WIN_RATE'
  | 'SYNERGY_PICK_RATE'
  | 'MY_WIN_RATE'
  | 'DUO_WIN_RATE';

interface Options {
  /** 첫 번째 소환사 puuid */
  puuid1: string;
  /** 두 번째 소환사 puuid */
  puuid2: string;
  /**
   * 첫 번째 소환사 라인 선택 정보
   *
   * API 기본 값: 'ALL'
   */
  lane1?: PositionFilter;
  /**
   * 두 번째 소환사 라인 선택 정보
   *
   * API 기본 값: 'ALL'
   */
  lane2?: PositionFilter;
  /**
   * 정렬 방식
   *
   * API 기본 값: 'CHAMPION_SCORE'
   */
  sort?: RecommendedPicksSortOrder;
}

const recommendedPicksQuery = (options: Options) =>
  queryOptions({
    queryKey: ['GET /statistics/champion/recommend/{puuid1}/{puuid2}', options],
    async queryFn() {
      const res = await request.get<RecommendedPicksResponse>(
        `/statistics/champion/recommend/${options.puuid1}/${options.puuid2}`,
        {
          params: {
            lane1: options.lane1,
            lane2: options.lane2,
            sort: options.sort,
          },
        },
      );
      return res.data;
    },
  });

export default recommendedPicksQuery;
