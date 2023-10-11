import { extendBaseTheme } from '@chakra-ui/react';

import { colors } from './constants/colors';
import { fonts } from './constants/fonts';

const baseTheme = extendBaseTheme({
  colors,
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  textStyles: fonts,
});

const chakraTheme = { ...baseTheme, styles: {} };

export default chakraTheme;
