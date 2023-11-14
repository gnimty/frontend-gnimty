import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import constate from 'constate';
import { useEffect, useState } from 'react';

import httpRequest from '@/apis/httpRequest';
import { getStorageItem, removeStorageItem, setStorageItem } from '@/utils/storage';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export const StorageAuthKey = 'auth';

export const [AuthContextProvider, useAuthContext] = constate(() => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getStorageItem<AuthToken>(StorageAuthKey);
    setIsAuthenticated(!!token);

    const responseInterceptor = httpRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof AxiosError && error.response?.status === 400) {
          try {
            const originReq = error.config;
            if (originReq && !!token) {
              const { data } = await httpRequest.post<AuthToken>(
                '/community/auth/refresh',
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token.refreshToken}`,
                  },
                },
              );
              setStorageItem<AuthToken>(StorageAuthKey, data);
              originReq.headers.Authorization = `Bearer ${data.accessToken}`;
              return await httpRequest.request(originReq);
            }
          } catch (error) {
            removeStorageItem(StorageAuthKey);
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
  });

  return { isAuthenticated, setIsAuthenticated };
});
