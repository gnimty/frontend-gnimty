import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

import inputTheme from '@/styles/theme/components/input';

const baseStyle = defineStyle({
  ...inputTheme.baseStyle?.field,
  resize: 'none',
});

const variants = {
  outline: defineStyle((props) => inputTheme.variants?.outline(props).field ?? {}),
  unstyled: inputTheme.variants?.unstyled.field ?? {},
  default: defineStyle((props) => inputTheme.variants?.default(props).field ?? {}),
};

const sizes = {
  sm: inputTheme.sizes?.sm.field ?? {},
  lg: inputTheme.sizes?.lg.field ?? {},
};

const textareaTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'lg',
    variant: 'outline',
  },
});

export default textareaTheme;
