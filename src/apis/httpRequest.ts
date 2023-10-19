import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
httpRequest.interceptors.request.use(function (config) {
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
