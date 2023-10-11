import { colors } from './constants/colors';
import { fonts } from './constants/fonts';

const emotionTheme = {
  colors,
  fonts,
  zIndices: {
    dropdown: 500,
  },
};

export default emotionTheme;

export type Theme = typeof emotionTheme;
