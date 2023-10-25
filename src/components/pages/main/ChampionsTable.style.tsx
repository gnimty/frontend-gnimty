import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const championsRoot = (theme: Theme) =>
  css({
    width: '528px',
    backgroundColor: theme.colors.white,
  });

export const championsHeader = (theme: Theme) =>
  css({
    padding: '16px 20px',
    borderBottom: `1px solid ${theme.colors.gray200}`,
    position: 'relative',
  });

export const championsTitle = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    color: theme.colors.gray800,
  });

export const championsTable = css({
  width: '100%',
  height: '320px',
  padding: '20px',
  display: 'grid',
  rowGap: '20px',
});

export const tableHeadBody = css({
  display: 'grid',
  rowGap: '20px',
});

export const tableRow = css({
  display: 'grid',
  gridTemplateColumns: '24px 196px 44px 80px 80px',
  columnGap: '16px',
  alignItems: 'center',
});

export const tableHeader = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.gray500,
  });

export const championRanking = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.gray600,
    textAlign: 'left',
  });

export const championNameAndImage = css({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

export const championImage = css({
  borderRadius: '9999px',
});

export const championName = (theme: Theme) =>
  css({
    ...theme.fonts.t1,
    color: theme.colors.gray800,
  });

export const championTier = css({
  display: 'flex',
  justifyContent: 'center',
});

export const percent = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    color: theme.colors.gray700,
    textAlign: 'center',
  });

export const textLeft = css({
  textAlign: 'left',
});

export const textCenter = css({
  textAlign: 'center',
});
