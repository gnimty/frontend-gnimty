import { useMutation } from '@tanstack/react-query';

import type { BaseResponse, BaseMutationProps } from '@/apis/httpRequest';
import httpRequest from '@/apis/httpRequest';

interface CheckAuthCodeRequestBody {
  email: string;
  code: string;
}

interface CheckAuthCodeRequest extends CheckAuthCodeRequestBody {}

interface CheckAuthCodeResponse extends BaseResponse {}

interface UseCheckAuthCodeMutationProps extends BaseMutationProps<CheckAuthCodeResponse> {}

async function checkAuthCode({ email, code }: CheckAuthCodeRequest) {
  const { data } = await httpRequest.post<CheckAuthCodeResponse>('/community/auth/email/code', { email, code });
  return data;
}

const useCheckAuthCode = ({ onSuccess, onError }: UseCheckAuthCodeMutationProps) => {
  const mutation = useMutation({
    mutationFn: checkAuthCode,
    onSuccess,
    onError,
  });

  return { isLoading: mutation.isLoading, checkAuthCode: mutation.mutate };
};

export default useCheckAuthCode;
