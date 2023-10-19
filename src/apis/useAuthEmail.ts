import { useMutation } from '@tanstack/react-query';

import type { BaseResponse } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface UseAuthEmailMutationProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface AuthEmailRequestBody {
  email: string;
}

interface AuthEmailRequest extends AuthEmailRequestBody {}

interface AuthEmailResponse extends BaseResponse {}

async function authEmail({ email }: AuthEmailRequest) {
  const { data } = await httpRequest.post<AuthEmailResponse>('/community/auth/email', { email });
  console.log(data);
  return data;
}

const useAuthEmail = ({ onSuccess, onError }: UseAuthEmailMutationProps) => {
  const mutation = useMutation({
    mutationFn: authEmail,
    onSuccess,
    onError,
  });

  return { isLoading: mutation.isLoading, authEmail: mutation.mutate };
};

export default useAuthEmail;
