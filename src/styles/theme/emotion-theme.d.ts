import type { Theme as CustomTheme } from './emotionTheme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
