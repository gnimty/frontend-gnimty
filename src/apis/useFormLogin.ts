import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import httpRequest from '@/apis/httpRequest';

interface FormLoginOptions {
  email: string;
  password: string;
  rememberLogin: boolean;
}

async function formLogin(options: FormLoginOptions) {
  await httpRequest.post('/community/auth/login', options);
}

const useFormLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: formLogin,
    onSuccess: () => {
      router.reload();
    },
  });

  return { ...mutation, formLogin: mutation.mutate };
};

export default useFormLogin;
