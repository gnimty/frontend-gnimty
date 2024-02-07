import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { ChampionDto } from '../types';

interface ChampionsResponse {
  data: {
    champions: ChampionDto[];
  };
}

const championsQuery = () =>
  queryOptions({
    queryKey: ['champions'],
    async queryFn() {
      const res = await request.get<ChampionsResponse>('/asset/champion');
      return res.data;
    },
  });

export default championsQuery;
