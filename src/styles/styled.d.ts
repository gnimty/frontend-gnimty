import type { ColorsTypes } from './constants/colors';
import type { FontsTypes } from './constants/fonts';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
    fonts: FontsTypes;
  }
}
