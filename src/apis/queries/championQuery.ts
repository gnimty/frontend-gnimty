import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { ChampionDto } from '../types';

interface ChampionsResponse {
  data: {
    champions: ChampionDto[];
  };
}

export async function getChampions() {
  const res = await request.get<ChampionsResponse>('/asset/champion');
  return res.data;
}

const championsQuery = () =>
  queryOptions({
    queryKey: ['champions'],
    queryFn: getChampions,
    staleTime: 1000 * 60 * 60 * 24,
  });

export default championsQuery;
