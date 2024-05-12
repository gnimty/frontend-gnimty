import { queryOptions } from '@tanstack/react-query';

import httpRequest, { type BaseResponse } from '../httpRequest';

import type { OtherProfileEntry } from '../types';

interface MemberProfileResponse extends BaseResponse {
  data: OtherProfileEntry;
}

interface Options {
  puuid?: string;
}

const memberProfileQuery = (options: Options) =>
  queryOptions({
    queryKey: ['memberProfile', options],
    async queryFn() {
      const res = await httpRequest.get<MemberProfileResponse>(`/community/members/${options.puuid}`);
      return res.data;
    },
    retry(failureCount, error) {
      if (error.response?.data.status.code === 404) {
        return false;
      }
      return failureCount <= 2;
    },
    enabled: !!options.puuid,
  });

export default memberProfileQuery;
