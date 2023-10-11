import { css } from '@emotion/react';

import type { ChampionTier } from '@/api/types';
import type { Theme } from '@/styles/theme/emotionTheme';

const tierBackground = (theme: Theme): Record<ChampionTier, string> => ({
  '1': theme.colors.red800,
  '2': theme.colors.orange800,
  '3': theme.colors.yellow800,
  '4': theme.colors.green800,
  '5': theme.colors.blue800,
  OP: '',
  RIP: '',
});

export const badgeRoot = (options: { tier: ChampionTier }) => (theme: Theme) => {
  return css({
    ...theme.fonts.body,
    fontWeight: 700,
    color: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    width: '28px',
    borderRadius: '4px',
    background: tierBackground(theme)[options.tier],
  });
};
