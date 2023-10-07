// https://stackoverflow.com/questions/53711454/styled-system-props-typing-with-typescript
import isPropValid from '@emotion/is-prop-valid';
import memoize from '@emotion/memoize';
import defaultShouldForwardProp from '@styled-system/should-forward-prop';
import { color as ssColor, compose, system } from 'styled-system';

import type * as CSS from 'csstype';
import type { ColorProps as SSColorProps, ResponsiveValue, TextColorProps } from 'styled-system';

export interface ColorProps extends Omit<SSColorProps, 'color'> {
  textColor?: TextColorProps['color'];
  inputCaretColor?: TextColorProps['color'];
}

export const color = compose(
  ssColor,
  system({
    textColor: { property: 'color', scale: 'colors' },
  }),
);

export interface CursorProps {
  cursor?: ResponsiveValue<CSS.Properties['cursor']>;
}

export const cursor = system({
  cursor: {
    property: 'cursor',
  },
});

export interface WhiteSpaceProps {
  whiteSpace?: ResponsiveValue<CSS.Properties['whiteSpace']>;
}

export const whiteSpace = system({
  whiteSpace: {
    property: 'whiteSpace',
  },
});

export interface WordBreakProps {
  wordBreak?: ResponsiveValue<CSS.Properties['wordBreak']>;
}

export const wordBreak = system({
  wordBreak: {
    property: 'wordBreak',
  },
});

export interface TransformProps {
  transform?: ResponsiveValue<CSS.Properties['transform']>;
}

export const transform = system({
  transform: {
    property: 'transform',
  },
});

export interface VisibilityProps {
  visibility?: ResponsiveValue<CSS.Properties['visibility']>;
}

export const visibility = system({
  visibility: {
    property: 'visibility',
  },
});

export interface PointerEventsProps {
  pointerEvents?: ResponsiveValue<CSS.Properties['pointerEvents']>;
}

export const pointerEvents = system({
  pointerEvents: {
    property: 'pointerEvents',
  },
});

export interface WebkitLineClampProps {
  webkitLineClamp?: ResponsiveValue<CSS.Properties['WebkitLineClamp']>;
}

export const webkitLineClamp = system({
  webkitLineClamp: {
    property: 'WebkitLineClamp',
  },
});

const additionalSystemProps = compose(cursor, whiteSpace, transform, visibility).propNames ?? [];

export function createShouldForwardProp(props: string[]) {
  const regex = new RegExp(`^(${props.join('|')})$`);
  return memoize((prop: string) => isPropValid(prop) && !regex.test(prop) && defaultShouldForwardProp(prop));
}

export const shouldForwardProp = createShouldForwardProp(additionalSystemProps);
