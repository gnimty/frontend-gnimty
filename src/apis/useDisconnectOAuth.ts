import { useMutation } from '@tanstack/react-query';

import httpRequest from './httpRequest';

import type { OAuthProvider } from './types';

interface DisconnectOAuthOptions {
  provider: OAuthProvider;
}

async function disconnectOAuth(options: DisconnectOAuthOptions) {
  await httpRequest.delete('/community/members/me/oauth', {
    params: { provider: options.provider },
  });
}

export default function useDisconnectOAuth() {
  const mutation = useMutation({
    mutationFn: disconnectOAuth,
  });

  return { ...mutation, disconnectOAuth: mutation.mutate };
}
