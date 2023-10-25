declare module '*.svg' {
  import type { ComponentPropsWithoutRef, FC } from 'react';

  const content: FC<ComponentPropsWithoutRef<'svg'>>;

  export default content;
}
