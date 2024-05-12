import { useMutation } from '@tanstack/react-query';

import httpRequest from './httpRequest';

interface ChangeMainRiotAccountOptions {
  id: number;
}

async function changeMainRiotAccount(options: ChangeMainRiotAccountOptions) {
  await httpRequest.patch('/community/summoners/rso', undefined, {
    params: { id: options.id },
  });
}

export default function useChangeMainRiotAccount() {
  const mutation = useMutation({
    mutationFn: changeMainRiotAccount,
  });

  return { ...mutation, changeMainRiotAccount: mutation.mutate };
}
