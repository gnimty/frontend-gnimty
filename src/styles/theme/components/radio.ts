import { radioAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
import { runIfFn } from '@chakra-ui/utils';

const helpers = createMultiStyleConfigHelpers(parts.keys);
const circleSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="5" fill="#DE2E39"/>  
    </svg>
  `;
const base64 = btoa(circleSvg);

const baseStyleControl = defineStyle({
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'gray500',
  bg: 'transparent',
  margin: '2.5px',
  position: 'relative',

  _checked: {
    background: `url('data:image/svg+xml;base64,${base64}')`,
    backgroundRepeat: 'no-repeat',
    borderColor: 'main',
  },
});

const baseStyleContainer = defineStyle({});

const baseStyleLabel = defineStyle({
  userSelect: 'none',
  marginLeft: '8px',
  width: 'full',
});

const baseStyle = helpers.definePartsStyle((props) => ({
  label: baseStyleLabel,
  container: baseStyleContainer,
  control: runIfFn(baseStyleControl, props),
}));

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
