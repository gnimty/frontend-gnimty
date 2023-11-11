import { queryOptions } from '@tanstack/react-query';

import request from '../request';

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
      const res = await request.get<OnSaleChampionsResponse>('/asset/sale/champion');
      return res.data;
    },
  });

export default onSaleChampionsQuery;
