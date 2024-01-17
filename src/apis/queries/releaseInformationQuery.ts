import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { PatchVersion } from '../types';

interface ReleaseInformationResponse {
  data: PatchVersion;
}

export async function getReleaseInformation() {
  const res = await httpRequest.get<ReleaseInformationResponse>('/asset/version');
  return res.data;
}

const releaseInformationQuery = () =>
  queryOptions({
    queryKey: ['releaseInformation'],
    queryFn: getReleaseInformation,
  });

export default releaseInformationQuery;
