import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const recentMatchesRoot = (theme: Theme) =>
  css({
    width: '528px',
    backgroundColor: theme.colors.white,
  });

export const recentMatchesHeader = (theme: Theme) =>
  css({
    padding: '16px 20px',
    borderBottom: `1px solid ${theme.colors.gray200}`,
  });

export const recentMatchesTitle = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    color: theme.colors.gray800,
  });

export const recentMatchesContent = (options: { isLoggedIn: boolean }) =>
  css(
    {
      height: '320px',
      display: 'grid',
    },
    options.isLoggedIn
      ? {
          gap: '20px',
          padding: '20px',
        }
      : {
          gap: '12px',
          alignContent: 'center',
          justifyItems: 'center',
        },
  );

export const riotLinkSuggestionText = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.gray800,
    textAlign: 'center',
    whiteSpace: 'pre-line',
  });

export const riotLinkButton = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    color: theme.colors.white,
    minWidth: '160px',
    padding: '14px 12px',
    backgroundColor: theme.colors.main,
    borderRadius: '4px',
  });

export const summonerAndInGameInfo = css({
  display: 'flex',
  gap: '12px',
});

export const profileImageWrapper = css({
  position: 'relative',
  width: '78px',
  height: '78px',
  display: 'flex',
  justifyContent: 'center',
});

export const tag = (theme: Theme) =>
  css({
    ...theme.fonts.body,
    color: theme.colors.white,
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.colors.gray800,
    borderRadius: '20px',
    padding: '1px 8px',
  });

export const summonerAndInGameRight = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  flex: '1 0 0',
});

export const summonerInfo = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const summonerInfoLeft = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const summonerName = (theme: Theme) =>
  css({
    ...theme.fonts.h2,
    color: theme.colors.gray800,
  });

export const editIcon = (theme: Theme) =>
  css({
    color: theme.colors.gray500,
  });

export const likeBadge = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px 4px 8px',
    borderRadius: '20px',
    border: `1px solid ${theme.colors.gray400}`,
  });

export const likeIcon = (theme: Theme) =>
  css({
    color: theme.colors.gray600,
  });

export const likeCount = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.gray700,
  });

export const inGameInfo = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const rank = (theme: Theme) =>
  css({
    ...theme.fonts.h3,
    color: theme.colors.gray800,
    width: '36px',
    textAlign: 'center',
  });

export const leaguePoints = (theme: Theme) =>
  css({
    ...theme.fonts.h3,
    fontWeight: 400,
    color: theme.colors.gray500,
  });

export const recentMatchesAndChampions = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: theme.colors.gray100,
    borderRadius: '8px',
  });

export const recentMatchesColumn = css({
  display: 'flex',
  gap: '20px',
});

export const recentMatchesScore = (theme: Theme) =>
  css({
    ...theme.fonts.t1,
    color: theme.colors.gray700,
  });

export const recentMatchesAverage = (theme: Theme) =>
  css({
    ...theme.fonts.t1,
    color: theme.colors.green800,
  });

export const mostChampions = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export const mostChampion = css({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

export const mostChampionImage = css({
  borderRadius: '9999px',
});

export const mostChampionText = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const championWinPercentage = (theme: Theme) =>
  css({
    ...theme.fonts.t1,
    color: theme.colors.gray800,
    width: '48px',
  });

export const championWinAverage = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.orange800,
    width: '60px',
  });

export const buttons = css({
  display: 'flex',
  gap: '12px',
});

export const refreshButton = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    color: theme.colors.gray700,
    width: '48px',
    height: '48px',
    border: `1px solid ${theme.colors.gray200}`,
    borderRadius: '4px',
  });

export const moreButton = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    color: theme.colors.white,
    backgroundColor: theme.colors.gray800,
    padding: '14px 12px',
    flex: '1 0 0',
    borderRadius: '4px',
  });
