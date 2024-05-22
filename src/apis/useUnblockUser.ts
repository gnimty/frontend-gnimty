import { useMutation } from '@tanstack/react-query';

import httpRequest from './httpRequest';

interface UnblockUserOptions {
  /** 차단 해제할 "차단 정보 id" */
  id: number;
}

async function unblockUser(options: UnblockUserOptions) {
  await httpRequest.delete('/community/members/me/block', { data: options });
}

export default function useUnblockUser() {
  const mutation = useMutation({
    mutationFn: unblockUser,
  });

  return { ...mutation, unblockUser: mutation.mutate };
}
