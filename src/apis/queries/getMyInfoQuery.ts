import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';
import type { ProfileEntry } from '@/apis/types';

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
  });

export default getMyInfoQuery;
