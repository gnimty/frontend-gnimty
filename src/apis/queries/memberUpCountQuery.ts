import { queryOptions } from '@tanstack/react-query';

import type { BaseResponse } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface MemberUpCountResponse extends BaseResponse {
  data: {
    upCount: number;
    liked: boolean;
  };
}

interface Options {
  puuid: string;
}

const memberUpCountQuery = (options?: Options) =>
  queryOptions({
    queryKey: ['memberProfile', options, 'like'],
    async queryFn() {
      const res = await httpRequest.get<MemberUpCountResponse>('/community/members/up-count', {
        params: {
          puuid: options?.puuid,
        },
      });
      return res.data;
    },
    retry(failureCount, error) {
      if (error.response?.data.status.code === 404) {
        return false;
      }
      return failureCount <= 2;
    },
    enabled: options !== undefined,
  });

export default memberUpCountQuery;
