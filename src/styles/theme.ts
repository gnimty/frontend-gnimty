import { colors } from '@/styles/constants/colors';
import { fonts } from '@/styles/constants/fonts';
import { weightStyles } from '@/styles/constants/weights';

import type { Theme } from 'styled-system';

const theme: Theme = {
  colors: {
    ...colors,
  },
  textStyles: {
    ...fonts,
  },
  fontWeights: {
    ...weightStyles,
  },
};

export default theme;
