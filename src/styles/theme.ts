import { colors } from './constants/colors';
import { fonts } from './constants/fonts';

const theme = {
  colors,
  fonts,
  zIndices: {
    dropdown: 500,
  },
};

export default theme;

export type Theme = typeof theme;
