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

const chakraTheme = {
  ...baseTheme,
  styles: {
    global: {
      html: {
        'font-family': `'Pretendard Variable',
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif`,
      },
      'background-color': '#f8f8f8',
    },
  },
};

export default chakraTheme;
