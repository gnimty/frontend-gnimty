import type { SoloTierDto } from '../types';

export default function shortTierName(soloTier: SoloTierDto) {
  const { tier, division } = soloTier;

  switch (tier) {
    case 'challenger':
      return 'CH';
    case 'grandmaster':
      return 'GM';
    case 'master':
      return 'MA';
    case 'UNRANKED':
      return 'UN';
    default:
      return `${tier[0].toUpperCase()}${division}`;
  }
}
