import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  borderRadius: '4px',
  bg: 'main',
  _disabled: {
    cursor: 'not-allowed',
    boxShadow: 'none',
    bg: 'gray200',
    color: 'gray500',
  },
  _hover: {
    bg: 'gray800',
    _disabled: {
      bg: 'initial',
    },
  },
});

const variantUnstyled = defineStyle({
  bg: 'none',
  color: 'inherit',
  display: 'inline',
  lineHeight: 'inherit',
  m: '0',
  p: '0',
});

const variantDefault = defineStyle({
  bg: 'main',
  color: 'white',
  display: 'inline',
  lineHeight: 'inherit',
  m: '0',
  p: '0',
});

const variantLine = defineStyle({
  bg: 'white',
  color: 'gray700',
  border: '1px solid',
  borderColor: 'gray200',
  display: 'inline',
  lineHeight: 'inherit',
  m: '0',
  p: '0',
});

const variants = {
  unstyled: variantUnstyled,
  default: variantDefault,
  line: variantLine,
};

const sizes = {
  lg: defineStyle({
    h: '48px',
    minW: '160px',
    textStyle: 't2',
    fontWeight: '700',
    py: '14px',
  }),
  md: defineStyle({
    h: '40px',
    minW: '80px',
    textStyle: 't2',
    fontWeight: '400',
    py: '10px',
  }),
  unstyled: defineStyle({}),
};

const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'unstyled',
    size: 'unstyled',
  },
});

export default buttonTheme;
