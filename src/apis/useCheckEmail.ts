import { useMutation } from '@tanstack/react-query';

import type { BaseMutationProps, BaseResponse } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface UseAuthEmailMutationProps extends BaseMutationProps<AuthEmailResponse, AuthEmailRequest> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface AuthEmailRequestBody {
  type?: 'SIGNUP' | 'FIND_PW';
  email: string;
}

interface AuthEmailRequest extends AuthEmailRequestBody {}

interface AuthEmailResponse extends BaseResponse {}

async function checkEmail({ type, email }: AuthEmailRequest) {
  const apiUrl = type === 'FIND_PW' ? '/community/members/password/email' : '/community/auth/email';
  const { data } = await httpRequest.post<AuthEmailResponse>(apiUrl, { email });
  return data;
}

const useCheckEmail = ({ onSuccess, onError }: UseAuthEmailMutationProps) => {
  const mutation = useMutation({
    mutationFn: checkEmail,
    onSuccess,
    onError,
  });

  return { isPending: mutation.isPending, checkEmail: mutation.mutate };
};

export default useCheckEmail;
