import { useMutation } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';
import { setStorageItem } from '@/utils/storage';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

interface UseGoogleLoginMutationProps {
  onError?: (error: unknown) => void;
}

interface GoogleLoginRequestBody {
  authCode: string;
}

interface GoogleLoginRequest extends GoogleLoginRequestBody {}

async function googleLogin({ authCode }: GoogleLoginRequest) {
  const { data } = await httpRequest.post<AuthToken>('/community/oauth/google', { authCode });
  return data;
}

const useGoogleLogin = ({ onError }: UseGoogleLoginMutationProps) => {
  const mutation = useMutation({
    mutationFn: googleLogin,
    onSuccess: (token) => {
      setStorageItem<AuthToken>('auth', token);
    },
    onError,
  });

  return { isLoading: mutation.isLoading, login: mutation.mutate };
};

export default useGoogleLogin;
