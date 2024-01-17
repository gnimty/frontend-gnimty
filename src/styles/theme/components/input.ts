import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system';
import { getColorVar } from '@chakra-ui/theme-tools';

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
  sm: helpers.definePartsStyle({
    [$padding.variable]: '10px 10px 10px 12px',
    [$borderRadius.variable]: '4px',
    [$height.variable]: '40px',
  }),
};

const sizes = {
  lg: helpers.definePartsStyle({
    field: size.lg,
    group: size.lg,
  }),
  sm: helpers.definePartsStyle({
    field: size.sm,
    group: size.sm,
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
        borderColor: getColorVar(theme, ec, '') as string,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColorVar(theme, fc, '') as string,
      },
    },
  };
});

const variantUnstyled = helpers.definePartsStyle({
  field: {
    bg: 'transparent',
    px: '0',
    height: 'auto',
  },
  addon: {
    bg: 'transparent',
    px: '0',
    height: 'auto',
  },
});

const variantDefault = helpers.definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      bg: 'white',
      textStyle: 't2',
      fontWeight: '400',
      border: '1px solid',
      borderColor: 'gray200',
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _invalid: {
        borderColor: getColorVar(theme, ec, '') as string,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColorVar(theme, fc, '') as string,
      },
      _disabled: {
        bg: 'gray200',
        border: '1px solid',
        borderColor: 'gray300',
      },
      _placeholder: {
        textStyle: 't2',
        fontWeight: 'regular',
        color: 'gray500',
      },
    },
  };
});

const variants = {
  outline: variantOutline,
  unstyled: variantUnstyled,
  default: variantDefault,
};

const inputTheme = helpers.defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'lg',
    variant: 'unstyled',
  },
});

export default inputTheme;
