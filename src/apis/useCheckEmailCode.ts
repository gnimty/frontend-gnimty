import { useMutation } from '@tanstack/react-query';

import type { BaseResponse, BaseMutationProps } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface CheckEmailCodeRequestBody {
  type?: 'SIGNUP' | 'FIND_PW';
  email: string;
  code: string;
}

interface CheckEmailCodeRequest extends CheckEmailCodeRequestBody {}

interface CheckEmailCodeResponse extends BaseResponse {
  // type이 FIND_PW인 경우 data 포함
  data?: {
    uuid: string;
  };
}

interface UseCheckEmailCodeMutationProps
  extends BaseMutationProps<CheckEmailCodeResponse, Error, CheckEmailCodeRequest> {}

async function checkEmailCode({ type, email, code }: CheckEmailCodeRequest) {
  const apiUrl = type === 'FIND_PW' ? '/community/members/password/email/code' : '/community/auth/email/code';
  const { data } = await httpRequest.post<CheckEmailCodeResponse>(apiUrl, { email, code });
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
