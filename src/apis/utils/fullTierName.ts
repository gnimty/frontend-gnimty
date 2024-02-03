import type { Tier } from '@/apis/types';

export default function fullTierName(tier: Tier, division?: number) {
  switch (tier) {
    case 'challenger':
      return 'Challenger';
    case 'grandmaster':
      return 'Grand Master';
    case 'master':
      return 'Master';
    case 'UNRANKED':
      return 'Unranked';
    default:
      return `${tier[0].toUpperCase()}${tier.slice(1)} ${division}`;
  }
}
