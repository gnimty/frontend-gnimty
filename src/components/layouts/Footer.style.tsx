import { css } from '@emotion/react';

import type { Theme } from '@/styles/theme';

export const footerRoot = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 0',
  gap: '24px',
  width: '1080px',
  margin: '0 auto',
});

export const footerTop = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingBottom: '24px',
    borderBottom: `1px solid ${theme.colors.gray300}`,
  });

export const logo = (theme: Theme) =>
  css({
    color: theme.colors.gray600,
  });

export const nav = css({
  display: 'flex',
  gap: '24px',
});

export const link = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    textDecoration: 'none',
    color: theme.colors.gray700,
    display: 'flex',
  });

export const riotPolicies = (theme: Theme) =>
  css({
    ...theme.fonts.body,
    color: theme.colors.gray500,
    whiteSpace: 'pre-line',
  });
