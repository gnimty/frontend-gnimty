import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, cssVar, defineStyle } from '@chakra-ui/styled-system';
import { getColorVar, mode } from '@chakra-ui/theme-tools';

import { fonts } from '@/styles/theme/constants/fonts';

const helpers = createMultiStyleConfigHelpers(parts.keys);

const $height = cssVar('input-height');
const $padding = cssVar('input-padding');
const $borderRadius = cssVar('input-border-radius');

const baseStyle = helpers.definePartsStyle({
  field: {
    textStyle: 't2',
    width: '100%',
    height: $height.reference,
    padding: $padding.reference,
    borderRadius: $borderRadius.reference,
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
  group: {
    ':focus-visible': {
      outline: 0,
    },
  },
});

const size = {
  lg: helpers.definePartsStyle({
    [$padding.variable]: '14px 10px 14px 12px',
    [$borderRadius.variable]: '4px',
    [$height.variable]: '48px',
  }),
};

const sizes = {
  lg: helpers.definePartsStyle({
    field: size.lg,
    group: size.lg,
  }),
};

function getDefaults(props: Record<string, string | undefined>): {
  focusBorderColor: string;
  errorBorderColor: string;
} {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;

  return {
    focusBorderColor: fc ? fc : '',
    errorBorderColor: ec ? ec : '',
  };
}

const variantOutline = helpers.definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: '1px solid',
      borderColor: 'inherit',
      bg: 'inherit',
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _invalid: {
        borderColor: getColorVar(theme, ec, 'red800') as string,
        boxShadow: `0 0 0 1px ${getColorVar(theme, ec)}`,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColorVar(theme, fc, '') as string,
      },
    },
  };
});

const variants = {
  outline: variantOutline,
};

const inputTheme = helpers.defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'lg',
    variant: 'outline',
  },
});

export default inputTheme;
