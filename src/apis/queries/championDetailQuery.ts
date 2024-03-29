import { queryOptions } from '@tanstack/react-query';

import request, { type BaseResponse } from '../httpRequest';

import type { ChampionAnalysisResponse, PositionFilter, Tier } from '../types';

interface ChampionDetailResponse extends BaseResponse {
  data: ChampionAnalysisResponse;
}

interface Options {
  championEnName: string;
  lane?: PositionFilter | 'UNKNOWN' | '';
  tier?: Tier;
}

const championDetailQuery = ({ championEnName, lane, tier }: Options) =>
  queryOptions({
    queryKey: ['championDetail', championEnName, lane, tier],
    async queryFn() {
      const res = await request.get<ChampionDetailResponse>(`/statistics/champion/stats/detail/${championEnName}`, {
        params: { lane, tier },
      });
      return res.data;
    },
    retry: 0,
  });
export default championDetailQuery;
