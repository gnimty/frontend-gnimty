import type { Tier } from '@/apis/types';

export default function shortTierName(tier: Tier, division?: number) {
  switch (tier) {
    case 'challenger':
      return 'CH';
    case 'grandmaster':
      return 'GM';
    case 'master':
      return 'MA';
    case 'unknown':
      return 'UN';
    default:
      return tier ? `${tier[0].toUpperCase()}${division}` : '';
  }
}
