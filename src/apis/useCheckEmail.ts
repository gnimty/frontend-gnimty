import { useMutation } from '@tanstack/react-query';

import type { BaseMutationProps, BaseResponse } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface UseAuthEmailMutationProps extends BaseMutationProps<AuthEmailResponse, AuthEmailRequest> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface AuthEmailRequestBody {
  email: string;
}

interface AuthEmailRequest extends AuthEmailRequestBody {}

interface AuthEmailResponse extends BaseResponse {}

async function checkEmail({ email }: AuthEmailRequest) {
  const { data } = await httpRequest.post<AuthEmailResponse>('/community/auth/email', { email });
  console.log(data);
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
