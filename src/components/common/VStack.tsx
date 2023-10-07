import { forwardRef } from 'react';

import type { BoxProps } from '@/components/common/Box';
import { Box } from '@/components/common/Box';

import type { PropsWithChildren } from 'react';

export interface VStackProps extends PropsWithChildren<BoxProps> {}

export const VStack = forwardRef<HTMLDivElement, VStackProps>(({ children, ...restProps }, ref) => {
  return (
    <Box display="flex" flexDirection="column" {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
