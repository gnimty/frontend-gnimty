import { css } from '@emotion/react';

import type { Theme } from '@/styles/theme';

export const userCardLandscape = (theme: Theme) =>
  css({
    padding: '16px 20px',
    display: 'flex',
    width: '1080px',
    gap: '24px',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: '4px',
  });

export const summonerInfo = css({
  display: 'flex',
  gap: '12px',
  width: '270px',
});

export const summonerNameWrapper = css({
  display: 'flex',
  flex: '1 0 0',
  alignItems: 'center',
  gap: '4px',
});

export const summonerName = (theme: Theme) =>
  css({
    ...theme.fonts.t1,
    color: theme.colors.gray800,
    maxWidth: '142px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  });

export const copyNameButton = (theme: Theme) =>
  css({
    display: 'flex',
    background: 'none',
    color: theme.colors.gray500,
  });

export const statusWrapper = css({
  width: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const tierInfo = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const tier = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    color: theme.colors.gray800,
  });

export const leaguePoints = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.gray500,
    width: '56px',
  });

export const positionInfo = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  width: '56px',
});

export const positionItem = css({
  display: 'flex',
});

export const champions = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '112px',
});

export const championItem = css({
  display: 'flex',
});

export const championImage = css({
  borderRadius: '9999px',
});

export const introduction = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.gray700,
    width: '322px',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
  });

export const chatButton = (theme: Theme) =>
  css({
    padding: '8px',
    borderRadius: '9999px',
    backgroundColor: theme.colors.gray100,
    color: theme.colors.gray700,
  });
