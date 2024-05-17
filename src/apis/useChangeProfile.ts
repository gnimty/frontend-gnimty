import { useMutation } from '@tanstack/react-query';

import httpRequest from './httpRequest';

import type { PreferGameModeEntry, ScheduleEntry, Status } from './types';

interface ChangeProfileOptions {
  status: Status;
  introduction: string;
  preferGameModes: PreferGameModeEntry[];
  schedules: ScheduleEntry[];
}

async function changeProfile(options: ChangeProfileOptions) {
  await httpRequest.patch('/community/members/me', options);
}

export default function useChangeProfile() {
  const mutation = useMutation({
    mutationFn: changeProfile,
  });

  return { ...mutation, changeProfile: mutation.mutate };
}
