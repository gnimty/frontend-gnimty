import type { Position } from '@/apis/types';

import Bottom from './Bottom';
import Jungle from './Jungle';
import Middle from './Middle';
import Top from './Top';
import Utility from './Utility';

import type { PositionIconProps } from './types';
import type { FC } from 'react';

export const positionImages: Record<Position, FC<PositionIconProps>> = {
  TOP: Top,
  JUNGLE: Jungle,
  MIDDLE: Middle,
  BOTTOM: Bottom,
  UTILITY: Utility,
};

interface PositionImageProps extends PositionIconProps {
  position: Position;
  fill?: string;
}

export default function PositionImage(props: PositionImageProps) {
  const { position, ...restProps } = props;

  const Icon = positionImages[position];
  return <Icon {...restProps} />;
}
