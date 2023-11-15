import axios from 'axios';

import type { AuthToken } from '@/contexts/AuthContext';
import { StorageAuthKey } from '@/contexts/AuthContext';
import { getStorageItem } from '@/utils/storage';

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

httpRequest.interceptors.request.use(function (config) {
  const token = getStorageItem<AuthToken>({ key: StorageAuthKey, storage: localStorage });
  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return config;
});

export interface BaseResponse {
  status: {
    message: string;
    code: number;
  };
}

export interface BaseMutationProps<TData = undefined> {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
}

export default httpRequest;
