import { useMutation } from '@tanstack/react-query';

import type { BaseMutationProps, BaseResponse } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';
import { setStorageItem } from '@/utils/storage';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

interface UseLoginMutationProps extends BaseMutationProps<LoginResponse> {}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginRequest extends LoginRequestBody {}

interface LoginResponse extends BaseResponse {
  data: AuthToken;
}

async function login({ email, password }: LoginRequest) {
  const { data } = await httpRequest.post<LoginResponse>('/community/auth/login', { email, password });
  return data;
}

const useLogin = ({ onSuccess, onError }: UseLoginMutationProps) => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      onSuccess?.(response);
      setStorageItem<AuthToken>('auth', {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    },
    onError,
  });

  return { isLoading: mutation.isLoading, login: mutation.mutate };
};

export default useLogin;
