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
});

export const linkWrapper = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',

    '&:not(:last-of-type)::after': {
      content: '""',
      display: 'block',
      width: '1px',
      height: '16px',
      background: theme.colors.gray300,
      margin: '0 24px',
    },
  });

export const link = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: 400,
    textDecoration: 'none',
    color: theme.colors.gray700,
  });

export const riotPolicies = (theme: Theme) =>
  css({
    ...theme.fonts.body,
    color: theme.colors.gray500,
    whiteSpace: 'pre-line',
  });
