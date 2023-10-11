import type { ChampionTier } from '@/api/types';

import * as style from './ChampionTierBadge.style';

interface ChampionTierBadgeProps {
  tier: ChampionTier;
  className?: string;
}

export default function ChampionTierBadge(props: ChampionTierBadgeProps) {
  const { tier, ...restProps } = props;

  return (
    <div css={style.badgeRoot({ tier })} {...restProps}>
      {tier}
    </div>
  );
}
