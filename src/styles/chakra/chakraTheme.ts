import { extendTheme } from '@chakra-ui/react';

import { checkboxTheme } from '@/styles/chakra/checkboxTheme';
import { colors } from '@/styles/constants/colors';
import { fonts } from '@/styles/constants/fonts';

const chakraTheme = extendTheme({
  colors,
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  textStyles: fonts,
  components: { Checkbox: checkboxTheme },
});

export default chakraTheme;
