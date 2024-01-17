import { extendBaseTheme } from '@chakra-ui/react';

import buttonTheme from '@/styles/theme/components/button';
import checkboxTheme from '@/styles/theme/components/checkbox';
import drawerTheme from '@/styles/theme/components/drawer';
import inputTheme from '@/styles/theme/components/input';
import modalTheme from '@/styles/theme/components/modal';
import radioTheme from '@/styles/theme/components/radio';
import tabsTheme from '@/styles/theme/components/tabs';
import textareaTheme from '@/styles/theme/components/textarea';
import { colors } from '@/styles/theme/constants/colors';
import { fonts } from '@/styles/theme/constants/fonts';

const baseTheme = extendBaseTheme({
  colors,
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  textStyles: fonts,
  components: {
    Checkbox: checkboxTheme,
    Modal: modalTheme,
    Tabs: tabsTheme,
    Input: inputTheme,
    Button: buttonTheme,
    Radio: radioTheme,
    Drawer: drawerTheme,
    Textarea: textareaTheme,
  },
});

const chakraTheme = {
  ...baseTheme,
  styles: {
    global: {
      html: {
        fontFamily:
          "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
        backgroundColor: 'gray100',
      },
    },
  },
};

export default chakraTheme;
