import { useQuery } from '@tanstack/react-query';

import getMyInfoQuery from './queries/getMyInfoQuery';

// TODO: 유니온으로 타이핑 작성하기
export default function useAuth() {
  const query = useQuery(getMyInfoQuery());

  const isAuthenticated = query.status === 'success';

  return { ...query, isAuthenticated };
}
