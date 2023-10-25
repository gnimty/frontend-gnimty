import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyleControl = defineStyle({
  w: '18px',
  h: '18px',
  border: '1px solid',
  borderRadius: '2px',
  borderColor: 'gray500',
  bg: 'transparent',

  _checked: {
    bg: 'main',
    border: 0,
  },

  _focusVisible: {
    boxShadow: 'none',
  },
});

const baseStyleContainer = defineStyle({
  _disabled: { cursor: 'not-allowed' },
});

const baseStyleLabel = defineStyle({
  userSelect: 'none',
  _disabled: { opacity: 0.4 },
});

const baseStyleIcon = defineStyle({
  transitionProperty: 'transform',
  transitionDuration: 'normal',
});

const baseStyle = helpers.definePartsStyle({
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: baseStyleControl,
  label: baseStyleLabel,
});

const sizes = {
  default: helpers.definePartsStyle({
    control: defineStyle({
      boxSize: '18px',
      margin: '3px',
    }),
    label: defineStyle({
      marginLeft: '4px',
    }),
  }),
};

const checkboxTheme = helpers.defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'default',
  },
});

export default checkboxTheme;
