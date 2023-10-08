import type { Status } from '@/api/types';
import theme from '@/styles/theme';

import type { ComponentPropsWithoutRef } from 'react';

const signColors: Record<Status, string> = {
  ONLINE: theme.colors.green800,
  AWAY: theme.colors.yellow800,
  OFFLINE: theme.colors.gray400,
};

interface StatusIndicatorProps extends ComponentPropsWithoutRef<'svg'> {
  status: Status;
  /**
   * @default 6
   */
  width?: number;
  /**
   * @default 6
   */
  height?: number;
}

export default function StatusIndicator(props: StatusIndicatorProps) {
  const { status, width = 6, height = 6, ...restProps } = props;

  return (
    <svg viewBox="0 0 6 6" width={width} height={height} {...restProps}>
      <circle cx="3" cy="3" r="3" fill={signColors[status]} />
    </svg>
  );
}
