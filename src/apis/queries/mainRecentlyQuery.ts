import { queryOptions } from '@tanstack/react-query';

import httpRequest from '../httpRequest';

interface MainRecentlyResponse {
  data: {
    recentlySummoners?: [];
    recentlySummonersFlex?: [];
  };
}

export const mainRecentlyQuery = () =>
  queryOptions({
    queryKey: ['mainRecently'],
    async queryFn() {
      const res = await httpRequest.get<MainRecentlyResponse>('/community/summoners/recently');
      return res.data;
    },
  });
