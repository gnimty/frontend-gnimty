import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { PatchVersion } from '../types';

interface ReleaseInformationResponse {
  data: PatchVersion;
}

const releaseInformationQuery = () =>
  queryOptions({
    queryKey: ['releaseInformation'],
    async queryFn() {
      const res = await httpRequest.get<ReleaseInformationResponse>('/asset/version');
      return res.data;
    },
  });

export default releaseInformationQuery;
