import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { ChampionTierDto, Position, PositionFilter, Tier } from '../types';

interface ChampionsTierResponse {
  data: {
    version: string;
    position: Position;
    champions: ChampionTierDto[];
  };
}

interface Options {
  position: PositionFilter;
  tier?: Tier;
  brief?: boolean;
}

const championsTierQuery = (options: Options) =>
  queryOptions({
    queryKey: ['rankTiers', options],
    async queryFn() {
      const res = await request.get<ChampionsTierResponse>('/statistics/champion/stats/tier', {
        params: options,
      });
      return res.data;
    },
  });

export default championsTierQuery;
