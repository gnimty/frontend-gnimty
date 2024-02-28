import { useMutation } from '@tanstack/react-query';

import type { BaseMutationProps } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';
import type { AuthToken } from '@/contexts/AuthContext';
import { useAuthContext } from '@/contexts/AuthContext';

interface UseLoginMutationProps extends BaseMutationProps<LoginResponse, Error, LoginRequest> {}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginRequest extends LoginRequestBody {}

interface LoginResponse {
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
    onSuccess: (response, variables, context) => {
      onSuccess?.(response, variables, context);
      setIsAuthenticated(true);
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context);
      setIsAuthenticated(false);
    },
  });

  return { isPending: mutation.isPending, login: mutation.mutate };
};

export default useLogin;
