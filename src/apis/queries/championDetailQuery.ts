import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { ChampionAnalysisResponse, Position, Tier } from '../types';

interface ChampionDetailResponse {
  data: ChampionAnalysisResponse;
}

interface Options {
  championEnName: string;
  lane?: Position | 'UNKNOWN' | 'ALL';
  tier?: Tier;
}

const championDetailQuery = ({ championEnName, lane, tier }: Options) =>
  queryOptions({
    queryKey: ['championDetail', championEnName, lane, tier],
    async queryFn() {
      const res = await request.get<ChampionDetailResponse>(`/statistics/champion/detail/${championEnName}`, {
        params: { lane, tier },
      });
      return res.data;
    },
  });

export default championDetailQuery;
