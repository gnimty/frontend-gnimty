import type { PositionFilter } from '@/apis/types';

export default function gnimtyChampionUrl(championEnId: string, position?: PositionFilter): string {
  const retUrl = `/champions/${championEnId}`;
  if (position === undefined || position === 'ALL') {
    return retUrl;
  }
  return retUrl + `?lane=${position}`;
}
