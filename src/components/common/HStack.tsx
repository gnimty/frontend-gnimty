import { forwardRef } from 'react';

import type { BoxProps } from '@/components/common/Box';
import { Box } from '@/components/common/Box';

import type { PropsWithChildren } from 'react';

export interface HStackProps extends PropsWithChildren<BoxProps> {}

export const HStack = forwardRef<HTMLDivElement, HStackProps>(({ children, ...restProps }, ref) => {
  return (
    <Box display="flex" flexDirection="row" {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
