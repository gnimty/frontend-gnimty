import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { SkinSaleRes } from '../types';

interface OnSaleSkinsResponse {
  data: {
    skinSales: SkinSaleRes[];
  };
}

const onSaleSkinsQuery = () =>
  queryOptions({
    queryKey: ['onSaleSkins'],
    async queryFn() {
      const res = await httpRequest.get<OnSaleSkinsResponse>('/asset/sale/skin');
      return res.data;
    },
  });

export default onSaleSkinsQuery;
