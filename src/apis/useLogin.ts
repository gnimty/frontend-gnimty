import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import type { BaseMutationProps } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface UseLoginMutationProps extends BaseMutationProps<void, Error, LoginRequest> {}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginRequest extends LoginRequestBody {}

async function login({ email, password }: LoginRequest): Promise<void> {
  await httpRequest.post('/community/auth/login', { email, password });
}

const useLogin = ({ onSuccess, onError }: UseLoginMutationProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response, variables, context) => {
      onSuccess?.(response, variables, context);
      router.reload();
    },
    onError,
  });

  return { isPending: mutation.isPending, login: mutation.mutate };
};

export default useLogin;
