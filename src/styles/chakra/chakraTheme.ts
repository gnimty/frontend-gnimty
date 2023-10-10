import { extendBaseTheme } from '@chakra-ui/react';

import { colors } from '@/styles/constants/colors';
import { fonts } from '@/styles/constants/fonts';

const chakraTheme = extendBaseTheme({
  colors,
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  textStyles: fonts,
});

export default chakraTheme;
