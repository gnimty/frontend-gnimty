import styled from '@emotion/styled';
import {
  background,
  border,
  buttonStyle,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  textStyle,
  typography,
} from 'styled-system';

import type {
  ColorProps,
  CursorProps,
  PointerEventsProps,
  TransformProps,
  VisibilityProps,
  WhiteSpaceProps,
  WordBreakProps,
} from '@/styles/customStyledSystem';
import {
  color,
  cursor,
  pointerEvents,
  shouldForwardProp,
  transform,
  visibility,
  whiteSpace,
  wordBreak,
} from '@/styles/customStyledSystem';

import type { ComponentProps } from 'react';
import type {
  BackgroundProps,
  BorderProps,
  ButtonStyleProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TextStyleProps,
  TypographyProps,
} from 'styled-system';

interface Props
  extends BackgroundProps,
    BorderProps,
    ColorProps,
    FlexboxProps,
    GridProps,
    ButtonStyleProps,
    TextStyleProps,
    LayoutProps,
    PositionProps,
    ShadowProps,
    SpaceProps,
    TypographyProps,
    CursorProps,
    WhiteSpaceProps,
    WordBreakProps,
    TransformProps,
    VisibilityProps,
    PointerEventsProps {}

export const Box = styled('div', { shouldForwardProp })<Props>(
  background,
  border,
  color,
  flexbox,
  grid,
  buttonStyle,
  textStyle,
  layout,
  position,
  space,
  shadow,
  typography,
  cursor,
  whiteSpace,
  wordBreak,
  transform,
  visibility,
  pointerEvents,
);

export interface BoxProps extends ComponentProps<typeof Box> {}
