import { queryOptions } from '@tanstack/react-query';

import httpRequest from '../httpRequest';

import type { RecentlySummonersEntry } from '../types';

interface MainRecentlyResponse {
  data: {
    recentlySummoners?: RecentlySummonersEntry[];
    recentlySummonersFlex?: RecentlySummonersEntry[];
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
