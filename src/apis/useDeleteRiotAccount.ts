import { useMutation } from '@tanstack/react-query';

import httpRequest from './httpRequest';

interface DeleteRiotAccountOptions {
  id: number;
}

async function deleteRiotAccount(options: DeleteRiotAccountOptions) {
  await httpRequest.delete('/community/summoners', {
    params: { id: options.id },
  });
}

export default function useDeleteRiotAccount() {
  const mutation = useMutation({
    mutationFn: deleteRiotAccount,
  });

  return { ...mutation, deleteRiotAccount: mutation.mutate };
}
