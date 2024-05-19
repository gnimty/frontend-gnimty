import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { BlockEntry } from '../types';

interface ListBlockedUsersResponse {
  data: {
    blocks: BlockEntry[];
  };
}

const listBlockedUsersQuery = () =>
  queryOptions({
    queryKey: ['GET /community/members/me/block'],
    async queryFn() {
      const res = await httpRequest.get<ListBlockedUsersResponse>(`/community/members/me/block`);
      return res.data;
    },
  });

export default listBlockedUsersQuery;
