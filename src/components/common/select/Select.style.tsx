import { css } from '@emotion/react';

import type { Theme } from '@/styles/theme';

export const selectWrapper = css({
  position: 'relative',
  display: 'inline-block',
});

export const selectButton = (theme: Theme) =>
  css({
    width: 'inherit',
    padding: '10px',
    paddingLeft: '12px',
    backgroundColor: theme.colors.white,
    color: theme.colors.gray800,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '4px',
    border: `1px solid ${theme.colors.gray200}`,
  });

export const leftAsset = css({
  position: 'relative',
  width: '20px',
  height: '20px',
  marginRight: '4px',
});

export const selectButtonText = (theme: Theme) =>
  css({
    ...theme.fonts.t2,
    fontWeight: '400',
  });

export const selectButtonArrow = (theme: Theme) =>
  css({
    color: theme.colors.gray800,
    display: 'block',
    marginLeft: '12px',
  });

export const options = (options: { isOpened: boolean }) => (theme: Theme) =>
  css(
    {
      display: options.isOpened ? 'block' : 'none',
    },
    {
      zIndex: theme.zIndices.dropdown,
      position: 'absolute',
      top: 'calc(100% + 4px)',
      backgroundColor: theme.colors.white,
      borderRadius: '4px',
      border: `1px solid ${theme.colors.gray200}`,
      width: '100%',
      boxShadow: '0px 2px 6px 0px rgb(17 17 17 / 0.1)',
    },
  );

export const option = (options: { isSelected: boolean }) => (theme: Theme) =>
  css(
    {
      color: options.isSelected ? theme.colors.gray800 : theme.colors.gray600,
    },
    {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '10px 12px',
      borderBottom: `1px solid ${theme.colors.gray100}`,

      '&:first-of-type': {
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
      },
      '&:last-of-type': {
        borderBottom: 'none',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
      },
    },
  );
