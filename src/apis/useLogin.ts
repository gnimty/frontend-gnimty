import { useMutation } from '@tanstack/react-query';

import type { BaseMutationProps } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';
import { useAuthContext } from '@/contexts/AuthContext';

interface UseLoginMutationProps extends BaseMutationProps<unknown, Error, LoginRequest> {}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginRequest extends LoginRequestBody {}

async function login({ email, password }: LoginRequest) {
  return await httpRequest.post('/community/auth/login', { email, password });
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
