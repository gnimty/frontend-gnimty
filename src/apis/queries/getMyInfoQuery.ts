import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';
import type { ProfileEntry } from '@/apis/types';

export const enum GET_MY_INFO_ERROR_CODE {
  /** 토큰이 존재하지 않음 또는 토큰이 유효하지 않음 */
  NO_TOKEN = 401,
}

interface GetMyInfoResponse {
  data: ProfileEntry;
}

const getMyInfoQuery = () =>
  queryOptions({
    queryKey: ['community/members/me'],
    async queryFn() {
      const res = await httpRequest.get<GetMyInfoResponse>('/community/members/me');
      return res.data;
    },
    retry(failureCount, error) {
      if (error.response?.data.status.code === GET_MY_INFO_ERROR_CODE.NO_TOKEN) {
        return false;
      }
      return failureCount <= 3;
    },
  });

export default getMyInfoQuery;
