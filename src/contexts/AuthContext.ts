import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import constate from 'constate';
import { useEffect, useState } from 'react';

import httpRequest from '@/apis/httpRequest';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export const StorageAuthKey = 'auth';

export const [AuthContextProvider, useAuthContext] = constate(() => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /*useEffect(() => {
    const responseInterceptor = httpRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          try {
            const originReq = error.config;
            if (originReq) {
              const res = await httpRequest.get('/community/auth/refresh');
              if (res.status === 401) {
                setIsAuthenticated(false);
                queryClient.clear();
                return Promise.reject(error);
              }

              return await httpRequest.request(originReq);
            }
          } catch (error) {
            setIsAuthenticated(false);
            queryClient.clear();
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      httpRequest.interceptors.response.eject(responseInterceptor);
    };
  }, [isAuthenticated, queryClient]);*/

  return { isAuthenticated, setIsAuthenticated };
});
