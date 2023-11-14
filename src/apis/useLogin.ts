import { useMutation } from '@tanstack/react-query';

import type { BaseMutationProps, BaseResponse } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';
import type { AuthToken } from '@/contexts/AuthContext';
import { StorageAuthKey, useAuthContext } from '@/contexts/AuthContext';
import { setStorageItem } from '@/utils/storage';

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
  const { setIsAuthenticated } = useAuthContext();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      onSuccess?.(response);
      setStorageItem<AuthToken>(StorageAuthKey, {
        accessToken: response.data.accessToken.slice(7),
        refreshToken: response.data.refreshToken.slice(7),
      });
      setIsAuthenticated(true);
    },
    onError: (error) => {
      onError?.(error);
      setIsAuthenticated(false);
    },
  });

  return { isPending: mutation.isPending, login: mutation.mutate };
};

export default useLogin;
