import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

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
      const res = await httpRequest.get<RotationChampionsResponse>('/asset/rotation');
      return res.data;
    },
  });

export default rotationChampionsQuery;
