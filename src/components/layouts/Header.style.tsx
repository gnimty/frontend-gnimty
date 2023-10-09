import { css } from '@emotion/react';

import type { Theme } from '@/styles/theme';

export const headerRoot = css({
  display: 'flex',
  width: '1080px',
  padding: '28px 0',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 auto',
});

export const nav = css({
  display: 'flex',
  gap: '40px',
});

export const link = (options: { isActive: boolean }) => (theme: Theme) =>
  css({
    ...theme.fonts.t1,
    fontWeight: options.isActive ? 700 : 400,
    textDecoration: 'none',
    color: options.isActive ? theme.colors.gray800 : theme.colors.gray600,
  });
