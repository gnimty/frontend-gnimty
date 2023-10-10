import { extendBaseTheme } from '@chakra-ui/react';

import { colors } from './constants/colors';
import { fonts } from './constants/fonts';

const chakraTheme = extendBaseTheme({
  colors,
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  textStyles: fonts,
});

export default chakraTheme;
