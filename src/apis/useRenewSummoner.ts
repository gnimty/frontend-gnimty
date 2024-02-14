import { useMutation } from '@tanstack/react-query';

import httpRequest from './httpRequest';

import type { ApiStatus } from './types';

interface RenewSummonerOptions {
  /** 갱신할 소환사 PUUID */
  puuid: string;
}

interface RenewSummonerResponse {
  status: ApiStatus;
}

async function renewSummoner(options: RenewSummonerOptions) {
  const res = await httpRequest.post<RenewSummonerResponse>(`/statistics/summoners/${options.puuid}`);
  return res.data;
}

export default function useRenewSummoner() {
  const mutation = useMutation({
    mutationFn: renewSummoner,
  });

  return { ...mutation, renewSummoner: mutation.mutate };
}
