import { useQuery } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';
import type { ProfileEntry } from '@/apis/types';

interface GetMyInfoResponse {
  data: ProfileEntry;
}

async function getMyInfo() {
  const { data } = await httpRequest.get<GetMyInfoResponse>('/community/members/me');
  return data;
}

const useGetMyInfo = () => {
  const queryKey = ['community', 'member', 'me'];
  const { data } = useQuery<GetMyInfoResponse>({
    queryKey,
    queryFn: getMyInfo,
    retry: 3,
    retryDelay: 1000,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
  });

  return data?.data;
};

export default useGetMyInfo;
