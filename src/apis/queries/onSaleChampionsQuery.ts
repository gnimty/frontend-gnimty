import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { ChampionSaleRes } from '../types';

interface OnSaleChampionsResponse {
  data: {
    championSales: ChampionSaleRes[];
  };
}

const onSaleChampionsQuery = () =>
  queryOptions({
    queryKey: ['onSaleChampions'],
    async queryFn() {
      const res = await httpRequest.get<OnSaleChampionsResponse>('/asset/sale/champion');
      return res.data;
    },
  });

export default onSaleChampionsQuery;
