import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { ChampionTierDto, Position, Tier } from '../types';

interface ChampionsTierResponse {
  data: {
    results: { position: Position; champions: ChampionTierDto[] }[];
    version: string;
  };
}

interface Options {
  /** 검색하려는 티어대 정보,만약 master를 선택할 경우, 마스터 이상에서 이루어진 게임 정보를 바탕으로 한 챔피언 요약 정보 조회 */
  tier?: Tier;
  /** true로 지정할 경우에 포지션 내에서 score가 가장 높은 상위 5개의 챔피언 티어 정보만 조회 */
  brief?: boolean;
}

const championsTierQuery = (options: Options) =>
  queryOptions({
    queryKey: ['rankTiers', options],
    async queryFn() {
      const res = await request.get<ChampionsTierResponse>('/statistics/champion/stats', {
        params: options,
      });
      return res.data;
    },
  });

export default championsTierQuery;
