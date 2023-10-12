import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    borderWidth: '1px',
    borderRadius: '2px',
    borderColor: 'gray500',
    _checked: {
      bg: 'main',
      border: 'none',
    },
    _focus: {
      boxShadow: 'none',
    },
    _checkedAndFocus: {
      boxShadow: 'none',
    },
  },
});

const sizes = {
  default: definePartsStyle({
    control: defineStyle({
      boxSize: '18px',
      margin: '3px',
    }),
    label: defineStyle({
      fontSize: '12px',
      marginLeft: '4px',
    }),
  }),
};

export const checkboxTheme = defineMultiStyleConfig({
  sizes,
  baseStyle,
  defaultProps: {
    size: 'default',
  },
});
