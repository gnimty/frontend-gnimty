import { useQuery } from '@tanstack/react-query';
import constate from 'constate';

import getMyInfoQuery from '@/apis/queries/getMyInfoQuery';

export const [AuthContextProvider, useAuthContext] = constate(() => {
  const { status } = useQuery(getMyInfoQuery());
  const isAuthenticated = status === 'success';

  return { isAuthenticated };
});
