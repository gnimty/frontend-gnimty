import { useQuery } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

async function checkToken() {
  const res = await httpRequest.get('/community/check');
  return res.status === 200;
}
const useCheckToken = () => {
  const queryKey = ['community'];
  const status = useQuery<boolean>({
    queryKey,
    queryFn: checkToken,
    retry: 3,
    retryDelay: 500,
    staleTime: 0,
  });

  return !!status.data;
};

export default useCheckToken;
