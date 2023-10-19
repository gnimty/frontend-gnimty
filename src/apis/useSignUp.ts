import { useMutation } from '@tanstack/react-query';

import type { BaseMutationProps } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface UseSignUpMutationProps<TData> extends BaseMutationProps<TData> {}

interface SignUpRequestBody {
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface SignUpRequest extends SignUpRequestBody {}

interface SignUpResponse {
  status:
    | {
        message: string;
        code: 201 | 401 | 409;
      }
    | {
        message: string;
        code: 400;
        field: keyof SignUpRequest;
      };
}

async function signUp({ email, password, agreeTerms }: SignUpRequest) {
  const { data } = await httpRequest.post<SignUpResponse>('/community/auth/signup', {
    email,
    password,
    agreeTerms,
  });
  return data;
}

const useSignUp = ({ onSuccess, onError }: UseSignUpMutationProps<SignUpResponse>) => {
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess,
    onError,
  });

  return { isLoading: mutation.isLoading, signUp: mutation.mutate };
};

export default useSignUp;
