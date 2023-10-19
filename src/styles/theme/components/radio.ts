import { radioAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(parts.keys);

const baseStyleControl = defineStyle({
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'gray500',
  bg: 'transparent',
  margin: '2.5px',

  _checked: {
    borderColor: 'main',
    _before: {
      content: `""`,
      display: 'inline-block',
      pos: 'relative',
      w: '75%',
      h: '75%',
      borderRadius: '50%',
      bg: 'main',
    },
  },
});

const baseStyleContainer = defineStyle({});

const baseStyleLabel = defineStyle({
  userSelect: 'none',
  marginLeft: '8px',
});

const baseStyle = helpers.definePartsStyle({
  label: baseStyleLabel,
  container: baseStyleContainer,
  control: baseStyleControl,
});

const sizes = {
  default: helpers.definePartsStyle({
    control: defineStyle({
      boxSize: '15px',
    }),
  }),
};

const radioTheme = helpers.defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'default',
  },
});

export default radioTheme;
