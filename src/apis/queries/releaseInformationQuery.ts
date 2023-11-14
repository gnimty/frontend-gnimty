import { queryOptions } from '@tanstack/react-query';

import request from '../request';

import type { PatchVersion } from '../types';

interface ReleaseInformationResponse {
  data: PatchVersion;
}

const releaseInformationQuery = () =>
  queryOptions({
    queryKey: ['releaseInformation'],
    async queryFn() {
      const res = await request.get<ReleaseInformationResponse>('/asset/version');
      return res.data;
    },
  });

export default releaseInformationQuery;
