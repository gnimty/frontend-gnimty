import { useMutation } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';
import { setStorageItem } from '@/utils/storage';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

interface UseLoginMutationProps {
  onError?: (error: unknown) => void;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginRequest extends LoginRequestBody {}

async function login({ email, password }: LoginRequest) {
  const { data } = await httpRequest.post<AuthToken>('/community/auth/login', { email, password });
  return data;
}

const useLogin = ({ onError }: UseLoginMutationProps) => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      setStorageItem<AuthToken>('auth', token);
    },
    onError,
  });

  return { isLoading: mutation.isLoading, login: mutation.mutate };
};

export default useLogin;
