import { ColorsTypes } from './constants/colors';
import { FontsTypes } from './constants/fonts';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
    fonts: FontsTypes;
  }
}
