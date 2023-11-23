import { useMutation } from '@tanstack/react-query';

import type { BaseResponse, BaseMutationProps } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface CheckEmailCodeRequestBody {
  email: string;
  code: string;
}

interface CheckEmailCodeRequest extends CheckEmailCodeRequestBody {}

interface CheckEmailCodeResponse extends BaseResponse {}

interface UseCheckEmailCodeMutationProps
  extends BaseMutationProps<CheckEmailCodeResponse, Error, CheckEmailCodeRequest> {}

async function checkEmailCode({ email, code }: CheckEmailCodeRequest) {
  const { data } = await httpRequest.post<CheckEmailCodeResponse>('/community/auth/email/code', { email, code });
  return data;
}

const useCheckEmailCode = ({ onSuccess, onError }: UseCheckEmailCodeMutationProps) => {
  const mutation = useMutation({
    mutationFn: checkEmailCode,
    onSuccess,
    onError,
  });

  return { isPending: mutation.isPending, checkEmailCode: mutation.mutate };
};

export default useCheckEmailCode;
