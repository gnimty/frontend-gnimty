import { queryOptions } from '@tanstack/react-query';

import request from '../request';

import type { ChampionDto } from '../types';

interface RotationChampionsResponse {
  data: {
    champions: ChampionDto[];
  };
}

const rotationChampionsQuery = () =>
  queryOptions({
    queryKey: ['rotationChampions'],
    async queryFn() {
      const res = await request.get<RotationChampionsResponse>('/asset/rotation');
      return res.data;
    },
  });

export default rotationChampionsQuery;
