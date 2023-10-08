import Image from 'next/image';

import type { Tier } from '@/api/types';
import tiers from '@/assets/images/tiers/index';

import type { ImageProps } from 'next/image';

const alts: Record<Tier, string> = {
  UNRANKED: '언랭크',
  iron: '아이언',
  bronze: '브론즈',
  silver: '실버',
  gold: '골드',
  platinum: '플래티넘',
  emerald: '에메랄드',
  diamond: '다이아몬드',
  grandmaster: '그랜드마스터',
  master: '마스터',
  challenger: '챌린저',
};

interface TierProps extends Omit<ImageProps, 'src' | 'alt'> {
  tier: Tier;
}

export default function Tier(props: TierProps) {
  const { tier, ...restProps } = props;

  return <Image src={tiers[tier]} alt={alts[tier]} {...restProps} />;
}
